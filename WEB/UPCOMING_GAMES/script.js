// ======================================================================
// Define an Array of Game Objects:
// ----------------------------------------------------------------------
// Each game object contains the following properties:
// - "title": Name of the game.
// - "release": The release status of the game.
// - "image": Path to the image asset for the game.
// ======================================================================
const games = [
    {
        title: "The King's Crowns",
        release: "Coming soon—prepare for the adventure!",
        image: "the-kings-crowns.png"
    },
    {
        title: "Castle 🏰 Escape",
        release: "Escape a puzzle-filled 13th-century tower!",
        image: "castle-escape.png"
    },
    {
        title: "Bitty Jump",
        release: "Jump, dodge, collect—coming soon!",
        image: "bitty-jump.png"
    }
];

// ======================================================================
// Get the Element to Hold the Game Cards:
// ----------------------------------------------------------------------
// • Target the element in the HTML with the ID "games-list".
// • This is where game cards will be dynamically appended.
// ======================================================================
const gamesList = document.getElementById("games-list"); // Find the "games-list" element by ID

// ======================================================================
// Loop Through Each Game in the Array:
// ----------------------------------------------------------------------
// • For every game in the "games" array:
//   - Create a new div element to act as the game card.
//   - Populate the game card with title, release status, and image.
//   - Append the game card to the "games-list" container.
// ======================================================================
games.forEach(game => {
    // Create a new div element for the game card
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card"); // Add "game-card" class for styling

    // Populate the game card with inner HTML
    gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}" width="100%" height="175px" style="border-radius:10px;"> <!-- Image with styling -->
        <h2>${game.title}</h2> <!-- Title of the game -->
        <p>Status: ${game.release}</p> <!-- Game release status -->
    `;

    // ==================================================================
    // Add an Event Listener for Game Card Click Events:
    // ------------------------------------------------------------------
    // • When the game card is clicked, show an alert with a friendly
    //   message encouraging users to anticipate upcoming gameplay.
    // ==================================================================
    gameCard.addEventListener("click", () => {
        alert("🎮 Hey gamers! 🚀\nOur game is getting some love and attention behind the scenes.\nHang tight and get ready for an awesome adventure that's just around the corner! 🕹️✨"); // Alert message upon click
    });

    // Append the game card to the "games-list" element
    gamesList.appendChild(gameCard); // Add the game card to the container
});