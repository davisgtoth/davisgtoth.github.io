document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById('projectList');
    const items = document.querySelectorAll('.project-item');
    const previewImage = document.getElementById('previewImage');
    const previewVideo = document.getElementById('previewVideo');
    const previewLabel = document.getElementById('previewLabel');
    const previewTags = document.getElementById('previewTags');

    let currentIndex = 0;
    let autoCycleInterval;
    let isPaused = false;
    let hasStarted = false; // Flag to ensure we don't restart it if the user just scrolled up and down

    // Function to update the preview pane
    function updatePreview(index, autoPlay = true) {
        items.forEach(item => item.classList.remove('active'));

        const currentItem = items[index];
        currentItem.classList.add('active');

        // Get data
        const src = currentItem.getAttribute('data-src');
        const type = currentItem.getAttribute('data-type');
        const poster = currentItem.getAttribute('data-poster');
        const name = currentItem.innerText;
        const tags = currentItem.getAttribute('data-tags');

        // Update Label
        previewLabel.innerText = `[PREVIEW: ${name}]`;
        previewTags.innerText = tags || "[TAGS]: ...";

        // Update Media
        if (type === 'video') {
            previewImage.classList.remove('show');
            previewVideo.poster = poster;
            previewVideo.src = src;
            previewVideo.classList.add('show');

            if (autoPlay) {
                var playPromise = previewVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => { });
                }
            }
        } else {
            previewVideo.classList.remove('show');
            previewVideo.pause();
            previewImage.src = src;
            previewImage.classList.add('show');
        }
    }

    // Function to cycle to the next project
    function cycleNext() {
        if (!isPaused) {
            currentIndex = (currentIndex + 1) % items.length;
            updatePreview(currentIndex);
        }
    }

    // --- TIMER CONTROL ---
    function startAutoCycle() {
        clearInterval(autoCycleInterval);
        autoCycleInterval = setInterval(cycleNext, 4000);
    }

    function stopAutoCycle() {
        clearInterval(autoCycleInterval);
    }

    // --- INITIALIZATION & OBSERVER ---

    // 1. Initialize the layout (Show item 0), but DO NOT start the timer yet.
    updatePreview(0, false);

    // 2. Set up the Intersection Observer to watch the section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the section is visible AND we haven't started yet
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true; // Lock it so scrolling away/back doesn't reset the order
                updatePreview(currentIndex, true);
                startAutoCycle();
                observer.disconnect(); // We only need to catch this once
            }
        });
    }, { threshold: 0.8 });

    // Start watching the project list
    if (projectList) {
        observer.observe(projectList);
    }

    // --- INTERACTION ---

    items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            isPaused = true;
            stopAutoCycle();
            currentIndex = index;
            updatePreview(currentIndex);
        });
    });

    projectList.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoCycle();
    });
});