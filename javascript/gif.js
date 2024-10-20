const captionsArray = [
    [
        "threshold for white road lines",
        "threshold for white road lines",
        "at buffer above bottom, find left and rightmost white points",
        "at buffer above bottom, find left and rightmost white points",
        "at buffer above bottom, find left and rightmost white points",
        "calculate middle of road and compare against centre of screen for error",
        "calculate middle of road and compare against centre of screen for error",
        "calculate middle of road and compare against centre of screen for error"
    ],
    [
        "threshold for white road lines",
        "threshold for white road lines",
        "find contours, filter by arc length and height",
        "find contours, filter by arc length and height",
        "write remaining contours to blank image",
        "write remaining contours to blank image",
        "find edge points, centre, and calculate error",
        "find edge points, centre, and calculate error"
    ],
    [
        "threshold for the sign in two ways, logical AND the results",
        "threshold for the sign in two ways, logical AND the results",
        "threshold for the sign in two ways, logical AND the results",
        "threshold for the sign in two ways, logical AND the results",
        "filter for the biggest contour",
        "filter for the biggest contour",
        "find the corners, crop and perspective transform",
        "find the corners, crop and perspective transform",
        "find the corners, crop and perspective transform",
    ],
];

// Function to initialize each image-sequence container
document.querySelectorAll('.image-sequence-container').forEach((container, index) => {
    const sequences = container.querySelectorAll('.image-sequence'); // Handle multiple sequences in the container
    const captionElement = document.getElementById(`image-caption-${index + 1}`);
    const captions = captionsArray[index];
    let currentIndex = 0;
    let intervalId = null;
    let isPlaying = false;

    // Function to update the caption
    function updateCaption() {
        captionElement.textContent = captions[currentIndex]; // Change caption based on the updated index
    }

    // Function to update the image in a sequence
    function updateImage(sequence) {
        const images = sequence.querySelectorAll('img');
        images.forEach(image => image.classList.remove('active')); // Remove 'active' class from all images
        images[currentIndex].classList.add('active'); // Add 'active' class to the current image
    }

    // Function to start playing both sequences
    function startPlaying() {
        if (!isPlaying) {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % sequences[0].querySelectorAll('img').length; // Increment index first
                sequences.forEach(sequence => {
                    updateImage(sequence); // Update each sequence's images after incrementing index
                });
                updateCaption(); // Update caption based on the incremented index
            }, 1500); // Change image every 1.5 seconds
            isPlaying = true;
        }
    }

    // Function to stop playing both sequences
    function stopPlaying() {
        if (isPlaying) {
            clearInterval(intervalId);
            currentIndex = 0; // Reset to the first image
            sequences.forEach(sequence => {
                updateImage(sequence); // Reset each sequence to the first image
            });
            updateCaption(); // Reset caption to the first image
            isPlaying = false;
        }
    }

    // Create an Intersection Observer to monitor both sequences
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startPlaying(); // Start playing when in view
            } else {
                stopPlaying(); // Stop when out of view
            }
        });
    }, { threshold: 0.5 });

    // Observe both image sequences within the container
    sequences.forEach(sequence => observer.observe(sequence));
});