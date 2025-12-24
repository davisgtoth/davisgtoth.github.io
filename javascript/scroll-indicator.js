document.addEventListener("DOMContentLoaded", function () {
    const arrow = document.getElementById('scrollArrow');
    const firstSection = document.querySelector('.project-section'); // Targets the "Objective" section

    // Safety check
    if (!arrow || !firstSection) return;

    // 1. FADE IN (Same as before)
    setTimeout(() => {
        if (window.scrollY < 50) {
            arrow.classList.add('visible');
        }
    }, 5000);

    // 2. FADE OUT (Same as before)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            arrow.classList.remove('visible');
        }
    });

    // 3. THE CLICK ACTION (New Custom Logic)
    arrow.addEventListener('click', () => {
        const offset = 80; // Space for the navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = firstSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        // Call our custom function: Target position, Duration in ms (1000 = 1 second)
        customScrollTo(offsetPosition, 1000);
    });
});

/**
 * Custom Smooth Scroll Function
 * @param {number} targetPosition - The Y-coordinate to scroll to
 * @param {number} duration - Time in milliseconds for the scroll to complete
 */
function customScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // Calculate the next position using the easing function
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);

        // Keep animating until the duration is reached
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Easing function: "Ease In Out Quad"
    // Starts slow, speeds up in the middle, slows down at the end
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}