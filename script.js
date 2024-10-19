const text = "cd davis_toth_portfolio";  // The text to type after cursor flashes
// const text = "davis toth portfolio";
const typingSpeed = 150;
let index = 0;
let flashCount = 0;
const flashLimit = 2; // Cursor will flash 3 times (on/off each flash counts as 2)
const flashDelay = 500; // Delay for cursor flashing

// Function to flash the cursor three times before typing starts
function flashCursor() {
    const cursor = document.getElementById('cursor');

    if (flashCount < flashLimit) {
        cursor.style.visibility = (flashCount % 2 === 0) ? 'visible' : 'hidden';
        flashCount++;
        setTimeout(flashCursor, flashDelay);
    } else {
        cursor.style.visibility = 'visible';  // Ensure cursor is visible after flashing
        type(); // Start typing the text after flashing
    }
}

// Function to type out the rest of the text
function type() {
    if (index < text.length) {
        document.getElementById('title').innerHTML += text.charAt(index);
        index++;
        setTimeout(type, typingSpeed);
    }
}

// Initialize the "> " first, then flash cursor
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('title').innerHTML = "> "; // Display "> " immediately
    setTimeout(flashCursor, flashDelay);  // Start flashing the cursor
});

// Show the navbar when the user scrolls
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const terminalContainer = document.getElementById('terminalContainer');

    if (window.scrollY > 100) { // Adjust when you want the navbar to appear
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    // Adjust terminal container (optional for smooth transition)
    terminalContainer.style.paddingTop = `${window.scrollY / 2}px`;
});