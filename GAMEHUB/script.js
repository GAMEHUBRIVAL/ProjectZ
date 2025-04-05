// ======================================================================
// Function to open the Game Menu:
// ----------------------------------------------------------------------
// • Closes all other sections (to avoid overlap) before displaying the
//   Game Menu section by modifying its "display" style.
// • ID: "game-menu" uniquely identifies this section in the HTML document.
// ======================================================================
function openMenu() {
    closeAll(); // Call function to close all other sections
    var menu = document.getElementById("game-menu"); // Get the Game Menu element by ID
    menu.style.display = "block"; // Make the Game Menu visible by setting "display" to "block"
}

// ======================================================================
// Function to close the Game Menu:
// ----------------------------------------------------------------------
// • Hides the Game Menu section by setting its "display" style to "none".
// • Useful for toggling between sections or when exiting this menu.
// ======================================================================
function closeMenu() {
    document.getElementById("game-menu").style.display = "none"; // Hide the Game Menu section
}

// ======================================================================
// Function to open the About Section:
// ----------------------------------------------------------------------
// • Closes all other sections before displaying the About Section
//   by modifying its "display" style.
// • ID: "game-about" uniquely identifies this section in the HTML document.
// ======================================================================
function openAbout() {
    closeAll(); // Call function to close all other sections
    document.getElementById("game-about").style.display = "block"; // Make the About Section visible
}

// ======================================================================
// Function to close the About Section:
// ----------------------------------------------------------------------
// • Hides the About Section by setting its "display" style to "none".
// • Useful for toggling between sections or when exiting this section.
// ======================================================================
function closeAbout() {
    document.getElementById("game-about").style.display = "none"; // Hide the About Section
}

// ======================================================================
// Function to open the Upcoming Games Section:
// ----------------------------------------------------------------------
// • Closes all other sections before displaying the Upcoming Games
//   Section by modifying its "display" style.
// • ID: "upcoming-game" uniquely identifies this section in the HTML document.
// ======================================================================
function openUpcoming() {
    closeAll(); // Call function to close all other sections
    document.getElementById("upcoming-game").style.display = "block"; // Make the Upcoming Games Section visible
}

// ======================================================================
// Function to close the Upcoming Games Section:
// ----------------------------------------------------------------------
// • Hides the Upcoming Games Section by setting its "display" style to "none".
// • Useful for toggling between sections or when exiting this section.
// ======================================================================
function closeUpcoming() {
    document.getElementById("upcoming-game").style.display = "none"; // Hide the Upcoming Games Section
}

// ======================================================================
// Function to open the Contact Section:
// ----------------------------------------------------------------------
// • Closes all other sections before displaying the Contact Section
//   by modifying its "display" style.
// • ID: "contact-game" uniquely identifies this section in the HTML document.
// ======================================================================
function openContact() {
    closeAll(); // Call function to close all other sections
    document.getElementById("contact-game").style.display = "block"; // Make the Contact Section visible
}

// ======================================================================
// Function to close the Contact Section:
// ----------------------------------------------------------------------
// • Hides the Contact Section by setting its "display" style to "none".
// • Useful for toggling between sections or when exiting this section.
// ======================================================================
function closeContact() {
    document.getElementById("contact-game").style.display = "none"; // Hide the Contact Section
}

// ======================================================================
// Function to close ALL Sections:
// ----------------------------------------------------------------------
// • Calls individual "close" functions for all sections to ensure
//   that none of the sections are left visible.
// • Helps maintain a clean and focused user interface by avoiding overlap.
// ======================================================================
function closeAll() {
    closeMenu(); // Close the Game Menu
    closeAbout(); // Close the About Section
    closeUpcoming(); // Close the Upcoming Games Section
    closeContact(); // Close the Contact Section
}