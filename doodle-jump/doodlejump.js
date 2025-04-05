//board
let board;
let boardWidth = 360;
let boardHeight = 650;
let context;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = boardHeight * 7 / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight
}

//physics (Doodle Jump Physics - Unchanged)
let velocityX = 0;
let velocityY = 0; //doodler jump speed (will be set initially)
let initialVelocityY = -8; //starting velocity Y
let gravity = 0.4;

//platforms (Doodle Jump Platform Logic - Unchanged)
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

// Game State Variables (Similar to Flappy Bird)
let score = 0;
let maxScore = 0; // Still used by updateScore logic
let gameOver = false;
let gameStarted = false; // Tracks if the game has started

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //load images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "./doodler-right.png"; // Make sure paths are correct
    doodler.img = doodlerRightImg;
    doodlerRightImg.onload = function() {
        // Draw initial doodler only if game hasn't started yet
        if (!gameStarted && doodler.img.complete) {
             context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
        }
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./doodler-left.png"; // Make sure paths are correct

    platformImg = new Image();
    platformImg.src = "./platform.png"; // Make sure paths are correct
    // Platform image onload is less critical for initial display if platforms are only placed on start

    // Don't set velocityY or placePlatforms here yet. Wait for game start.
    // velocityY = initialVelocityY;
    // placePlatforms();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}

function update() {
    requestAnimationFrame(update);

    // --- Start Screen Logic ---
    if (!gameStarted) {
        context.clearRect(0, 0, board.width, board.height); // Clear screen
        // Draw the initial doodler if image is ready
        if (doodler.img && doodler.img.complete) {
             context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
        }
        // Draw "Space to Start" message
    
        context.fillStyle = "red";
        context.font = "30px 'Comic Sans MS', sans-serif"; // Consistent font
        context.textAlign = "center";
        context.fillText("Space to Start", boardWidth/2, boardHeight/2);
        return; // Don't run game logic until started
    }

    // --- Game Over Logic ---
    if (gameOver) {
        context.fillStyle = "red";
        context.font = "30px 'Comic Sans MS', sans-serif"; // Consistent font
        context.textAlign = "center";

        // Optional: Add shadow for better visibility
        context.shadowColor = "black";
        context.shadowBlur = 5;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        context.fillText("GAME OVER", board.width / 2, board.height / 2 - 20);
        context.font = "30px 'Comic Sans MS', sans-serif"; // Slightly smaller for restart text
        context.fillText("Space to Restart", boardWidth/2, board.height / 2 + 20);

        context.shadowColor = "transparent"; // Reset shadow
        return; // Stop game logic when game is over
    }

    // --- Active Game Logic ---
    context.clearRect(0, 0, board.width, board.height);

    //doodler physics & movement (Original Doodle Jump logic)
    doodler.x += velocityX;
    // Wrap around screen horizontally
    if (doodler.x > boardWidth) {
        doodler.x = 0;
    } else if (doodler.x + doodler.width < 0) {
        doodler.x = boardWidth;
    }

    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height) { // Fell off bottom
        gameOver = true;
    }
    // Draw doodler (ensure image is loaded)
     if (doodler.img && doodler.img.complete) {
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
     }


    //platforms (Original Doodle Jump logic)
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        // Check if platform image is loaded before drawing/interacting
        if (!platform.img || !platform.img.complete) continue;

        // Slide platforms down when doodler is moving up in the top part of screen
        if (velocityY < 0 && doodler.y < boardHeight * 3 / 4) {
            platform.y -= initialVelocityY; // initialVelocityY is negative, so this moves platforms down
        }

        // Collision detection (only if falling downwards or still)
        if (detectCollision(doodler, platform) && velocityY >= 0) {
            velocityY = initialVelocityY; // Jump
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    // Clear platforms that have moved off screen and add new ones
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
        platformArray.shift(); //removes first element from the array
        newPlatform(); //replace with new platform on top
    }

    // Update score based on vertical movement (Original Doodle Jump logic)
    updateScore();

    // Display Score on Canvas (Top-Left - Like Flappy Bird)
    context.fillStyle = "red"; // Color for score text
    context.font = "30px 'Comic Sans MS', sans-serif"; // Consistent font
    context.textAlign = "left"; // Align text to the left
    context.textBaseline = "top"; // Align text to the top
    context.fillText(`Score: ${score}`, 10, 10); // Draw score at x=10, y=10

}

function moveDoodler(e) {
    if (e.code == "Space") {
        if (!gameStarted) {
             // --- Action: Start the Game ---
             gameStarted = true;
             gameOver = false;
             // Reset doodler position and state (image might already be right)
             doodler.x = doodlerX;
             doodler.y = doodlerY;
             doodler.img = doodlerRightImg; // Start facing right
             // Reset physics
             velocityX = 0;
             velocityY = initialVelocityY; // Start with an upward jump
             // Reset score
             score = 0;
             maxScore = 0; // Reset maxScore used in updateScore
             // Place initial platforms
             placePlatforms();

        } else if (gameOver) {
             // --- Action: Restart the Game ---
             // Reset doodler object/state
             doodler = {
                 img: doodlerRightImg, // Start facing right
                 x: doodlerX,
                 y: doodlerY,
                 width: doodlerWidth,
                 height: doodlerHeight
             }
             // Reset physics
             velocityX = 0;
             velocityY = initialVelocityY; // Start with upward jump
             // Reset score
             score = 0;
             maxScore = 0;
             // Reset game state flags
             gameOver = false;
             // gameStarted remains true
             // Place initial platforms
             placePlatforms();
        }
        // Note: Space doesn't do anything during active gameplay in this setup
    } else if (gameStarted && !gameOver) {
         // Only allow movement if game is active
        if (e.code == "ArrowRight" || e.code == "KeyD") { //move right
            velocityX = 4;
            doodler.img = doodlerRightImg;
        } else if (e.code == "ArrowLeft" || e.code == "KeyA") { //move left
            velocityX = -4;
            doodler.img = doodlerLeftImg;
        }
    }
     // Optional: Allow starting the game with arrow keys too?
     else if (!gameStarted && (e.code == "ArrowRight" || e.code == "KeyD" || e.code == "ArrowLeft" || e.code == "KeyA")) {
         // Treat first directional press as starting the game
         moveDoodler({ code: "Space" }); // Simulate Space press to start
         // Apply the initial direction
         if (e.code == "ArrowRight" || e.code == "KeyD") {
             velocityX = 4;
             doodler.img = doodlerRightImg;
         } else {
             velocityX = -4;
             doodler.img = doodlerLeftImg;
         }
     }
}


// --- Platform Placement (Original Doodle Jump logic - Unchanged) ---
function placePlatforms() {
    platformArray = [];

    // Starting platform
    let platform = {
        img: platformImg,
        x: boardWidth / 2 - platformWidth / 2, // Centered starting platform
        y: boardHeight - 50, // A bit lower to ensure doodler lands on it
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(platform);

    // Generate initial visible platforms
    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * boardWidth * 3 / 4); // Random horizontal position (left bias)
        let platform = {
            img: platformImg,
            x: randomX,
            y: boardHeight - 75 * i - 150, // Staggered vertical positions upwards
            width: platformWidth,
            height: platformHeight
        }
        platformArray.push(platform);
    }
}

// --- New Platform Generation (Original Doodle Jump logic - Unchanged) ---
function newPlatform() {
    let randomX = Math.floor(Math.random() * boardWidth * 3 / 4); //(0-1) * boardWidth*3/4
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight, // Spawn just above the screen
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(platform);
}

// --- Collision Detection (Original Doodle Jump logic - Unchanged) ---
function detectCollision(a, b) {
    // Ensure objects and dimensions are valid before checking
    if (!a || !b || !a.width || !a.height || !b.width || !b.height) {
        return false;
    }
    return a.x < b.x + b.width &&   // a's left edge doesn't reach b's right edge
           a.x + a.width > b.x &&   // a's right edge passes b's left edge
           a.y < b.y + b.height &&  // a's top edge doesn't reach b's bottom edge
           a.y + a.height > b.y;    // a's bottom edge passes b's top edge
}

// --- Score Update (Original Doodle Jump logic - Modified Display) ---
function updateScore() {
    // Calculate score based on upward movement (original logic)
    let points = Math.floor(10 * Math.random()); // Random points (adjust multiplier as needed)
    if (velocityY < 0) { //negative going up
        maxScore += points;
        if (score < maxScore) {
            score = maxScore; // Score increases based on max height reached
        }
    }
    // No score decrease when falling in this version, but maxScore might decrease if points were random
    // else if (velocityY >= 0) {
    //     maxScore -= points; // This part is debatable if needed
    // }

    // *** REMOVED: document.getElementById("score").textContent = score; ***
    // Score is now drawn directly onto the canvas in the update() function
}