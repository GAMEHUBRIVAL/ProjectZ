//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

// Game State Variables
let gameOver = false;
let score = 0;
let gameStarted = false; // Tracks if the game has started
let pipeInterval; // Holds the interval timer for placing pipes

window.onload = function() {
    // Setup Canvas
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    // Load bird image
    birdImg = new Image();
    birdImg.src = "./flappybird.png"; // Make sure this path is correct
    birdImg.onload = function() {
        // Draw initial bird position immediately once loaded
        if (!gameStarted) { // Only draw if game hasn't started (avoids drawing over start message later)
             context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        }
    }

    // Load pipe images
    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png"; // Make sure this path is correct

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png"; // Make sure this path is correct

    // Start the animation loop - it will initially show the start screen
    requestAnimationFrame(update);
    // Pipe placement interval is started later in moveBird function

    // Listen for key presses (for starting/playing the game)
    document.addEventListener("keydown", moveBird);
}

// Main Game Loop
function update() {
    requestAnimationFrame(update); // Keep the loop going for animation

    // --- Start Screen Logic ---
    if (!gameStarted) {
        // Draw "Space to Start" message
        context.fillStyle = "red";
        context.font = "30px 'Comic Sans MS', sans-serif"; // Consistent font
        context.textAlign = "center";
        // Ensure bird is drawn (might need to redraw if canvas clears somehow)
        if (birdImg.complete) { // Check if bird image is loaded before drawing
             context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        }
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

    // --- Active Game Logic (runs only if gameStarted is true and not gameOver) ---
    context.clearRect(0, 0, board.width, board.height); // Clear canvas for new frame

    // Bird physics and drawing
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity, prevent going above canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Check for falling out of bounds
    if (bird.y > board.height) {
        gameOver = true;
    }

    // Pipes logic and drawing
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX; // Move pipes left
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        // Score Increment Logic
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; // Increment score (0.5 for each pipe = 1 per pair)
            pipe.passed = true;
        }

        // Collision Detection
        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // Remove pipes that have moved off-screen
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); // Removes the first element from the array
    }

    // Display Score on Canvas (Top-Left)
    context.fillStyle = "red"; // Color for score text
    context.font = "30px 'Comic Sans MS', sans-serif"; // Consistent font
    context.textAlign = "left"; // Align text to the left
    context.fillText(`Score: ${Math.floor(score)}`, 10, 40); // Draw score at x=10, y=40

}

// Function to Place Pipes periodically
function placePipes() {
    // Don't place pipes if game is over or hasn't started
    if (gameOver || !gameStarted) {
        return;
    }

    // Calculate random Y position for pipes, ensuring an opening
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2); // Adjust randomness range
    let openingSpace = board.height/4; // Gap between top and bottom pipes

    // Create top pipe
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false // Flag to track if bird passed this pipe for scoring
    }
    pipeArray.push(topPipe);

    // Create corresponding bottom pipe
    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace, // Position below the gap
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

// Function to Handle User Input (Keyboard)
function moveBird(e) {
    // Check for Spacebar, Arrow Up, or 'X' key
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {

        if (!gameStarted) {
            // --- Action: Start the Game ---
            gameStarted = true;
            gameOver = false;     // Ensure game isn't marked as over
            bird.y = birdY;       // Reset bird position
            velocityY = -6;       // Apply initial jump velocity
            score = 0;            // Reset score
            pipeArray = [];       // Clear any pipes from a previous game

            // Start the pipe generation interval ONLY when game starts
            if (pipeInterval) clearInterval(pipeInterval); // Clear any existing timer first
            pipeInterval = setInterval(placePipes, 1500); // Place pipes every 1.5 seconds

        } else if (gameOver) {
            // --- Action: Restart the Game (when game is over) ---
            bird.y = birdY;       // Reset bird position
            pipeArray = [];       // Clear pipes
            score = 0;            // Reset score
            gameOver = false;     // Set game state to active
            velocityY = 0;        // Reset vertical velocity (gravity will take over)
            // Note: pipeInterval continues running unless explicitly stopped on game over

        } else {
            // --- Action: Jump (during active game) ---
            velocityY = -6;       // Apply jump velocity
        }
    }
}

// Function for Collision Detection (Axis-Aligned Bounding Box)
function detectCollision(a, b) {
    // Returns true if rectangle 'a' overlaps rectangle 'b'
    return a.x < b.x + b.width &&   // a's left edge is left of b's right edge
           a.x + a.width > b.x &&   // a's right edge is right of b's left edge
           a.y < b.y + b.height &&  // a's top edge is above b's bottom edge
           a.y + a.height > b.y;    // a's bottom edge is below b's top edge
}