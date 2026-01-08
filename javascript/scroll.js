document.addEventListener("DOMContentLoaded", () => {
    // --- VARIABLES ---
    const navbar = document.getElementById('navbar');
    const contentSections = document.querySelectorAll('.content-section');

    // Arrow Variables
    const arrow = document.getElementById('scrollArrow');
    const targetSection = document.getElementById('projects');

    // --- 1. NAVBAR & CONTENT REVEAL LOGIC (Existing) ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Show/Hide Navbar & Content
        if (scrollY > 60) {
            navbar.classList.add('visible');
            contentSections.forEach(section => {
                section.classList.add('visible');
            });
        } else {
            navbar.classList.remove('visible');
            contentSections.forEach(section => {
                section.classList.remove('visible');
            });
        }

        // --- 2. ARROW FADE OUT ON SCROLL ---
        if (arrow) {
            if (scrollY > 20) {
                arrow.classList.remove('visible');
            }
        }
    });

    // --- 3. ARROW FADE IN TIMER ---
    if (arrow) {
        setTimeout(() => {
            // Only show if user hasn't scrolled yet
            if (window.scrollY < 50) {
                arrow.classList.add('visible');
            }
        }, 6000); // 4000ms = 4 seconds delay. Adjust as needed.
    }

    // --- 4. ARROW CLICK (SMOOTH SCROLL) ---
    if (arrow && targetSection) {
        arrow.addEventListener('click', () => {
            const offset = 80; // Space for the navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetSection.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            customScrollTo(offsetPosition, 1000);
        });
    }
});

/**
 * Custom Smooth Scroll Function (Reused from your other file)
 */
function customScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}