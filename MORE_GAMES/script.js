// ======================================================================
// Define Sections with Their Respective Games:
// ----------------------------------------------------------------------
// This object categorizes games into sections (Action-Adventure, Puzzle-Platformers,
// Sports-Action). Each game entry includes:
// - "title": Name of the game.
// - "description": A brief overview or teaser for the game.
// - "image": Path to the game image asset.
// - "url": External link to more details or gameplay.
// ======================================================================
const sections = {
    aa: [ // Action-Adventure section
        {
            title: "Triangle: Back To Home",
            description: "Lost in a cave, your mission is to find your way out and return home. It may be challenging, but don't give up—you can do it. 🌟🕳️🏡",
            image: "triangle-back-to-home.png",
            url: "https://example.com/triangle-back-to-home"
        },
        {
            title: "Backcountry",
            description: "Step into the Wild West—hack, shoot, and collect bounties! Kill or be killed in this fast-paced adventure. The world resets every midnight UTC for a fresh challenge. Play now! 🤠🔥",
            image: "backcountry.png",
            url: "https://example.com/backcountry"
        },
        {
            title: "Planet Defence",
            description: "Shoot down the waves of incoming asteroids to save your people and achieve a high score.",
            image: "planet-defence.png",
            url: "https://example.com/planet-defence"
        },
        {
            title: "Planetfall",
            description: "Locate the satellite station on each planet and shut it down. Good luck! 🚀🛰️",
            image: "planetfall.png",
            url: "https://example.com/planetfall"
        }
    ],
    pp: [ // Puzzle-Platformers section
        {
            title: "The Wandering Wraith",
            description: "Oh, a lost soul wandering! 👻 How sorrowful! Fear not, spectral friend. I shall gladly guide your ethereal form through this mortal coil back to your final resting place. 🌍➡️🪦",
            image: "the-wandering-wraith.png",
            url: "https://example.com/the-wandering-wraith"
        },
        {
            title: "Re-Wire",
            description: "Rewire the power nodes to bring the system back online. Good luck! ⚡🔧",
            image: "re-wire.png",
            url: "https://example.com/re-wire"
        },
        {
            title: "Everyone's Sky",
            description: "Bring peace or war to the galaxy. Complete missions, study planets, and defend against threats. Make allies or enemies with your choices. The galaxy's fate is in your hands! 🌌🛡️🚀",
            image: "everyones-sky.png",
            url: "https://example.com/everyones-sky"
        },
        {
            title: "Coup Ahoo",
            description: "Defeat 💥 your 13 incompetent fleet members 🚢 one by one to seize command 👑. Gather cargo dice 🎲 and recruit allies 🤝 like merchants 💰 and carpenters 🛠️ to aid you 👍.",
            image: "coup-ahoo.png",
            url: "https://example.com/retrohaunt"
        }
    ],
    sa: [ // Sports-Action section
        {
            title: "Racer",
            description: "Start from the back of the pack and race to finish first. Win to advance to the next race! 🏁🚗",
            image: "racer.png",
            url: "https://example.com/racer"
        },
        {
            title: "SQUAD 13",
            description: "When hope is lost, the World Police sends SQUAD 13 for the most dangerous missions. Feared by the worst terrorists, this is their story.",
            image: "squad-13.png",
            url: "https://example.com/squad-13"
        },
        {
            title: "Salvadoran Reclamation: MS-13",
            description: "Under President Nayib Bukele's command, you're tasked with taking out the MS-13 gangs scattered throughout the country.",
            image: "salvadoran-reclamation-ms-13.png",
            url: "https://example.com/coup-ahoo"
        },
        {
            title: "Wander",
            description: "Explore a desolate wilderness with your grappling hook. 🏔️🪢",
            image: "wander.png",
            url: "https://example.com/wander"
        }
    ]
};

// ======================================================================
// Iterate Through Each Section:
// ----------------------------------------------------------------------
// For each section (Action-Adventure, Puzzle-Platformers, Sports-Action):
// 1. Access the respective container in the HTML.
// 2. Dynamically create game cards for each game.
// 3. Append these game cards to the container.
// ======================================================================
Object.keys(sections).forEach(section => {
    // Find the grid container in the current section
    const sectionElement = document.getElementById(section).querySelector(".grid-container");

    // Iterate through each game in the current section
    sections[section].forEach(game => {
        // Create a new div element for the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card"); // Assign CSS class for styling

        // Set the inner HTML of the game card with game details
        gameCard.innerHTML = `
            <a href="${game.url}" target="_blank" style="text-decoration: none; color: inherit;">
                <img src="${game.image}" alt="${game.title}" width="100%" height="175px" style="border-radius:10px;">
                <h1>${game.title}</h1>
                <p>${game.description}</p>
            </a>
        `;

        // Append the game card to the section element (grid container)
        sectionElement.appendChild(gameCard);
    });
});