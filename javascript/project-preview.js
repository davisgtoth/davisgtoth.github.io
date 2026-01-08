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
    let hasStarted = false;

    // --- NEW: PRELOADER FUNCTION ---
    // This forces the browser to download all poster images in the background immediately.
    function preloadImages() {
        items.forEach(item => {
            const posterSrc = item.getAttribute('data-poster');
            if (posterSrc) {
                const img = new Image();
                img.src = posterSrc; // This caches the image
            }
        });
    }

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
            // 1. Show the static image immediately (It should now be cached!)
            previewImage.src = poster;
            previewImage.classList.add('show');

            // 2. Hide video while it loads
            previewVideo.classList.remove('show');

            // 3. Load video in background
            previewVideo.src = src;
            previewVideo.poster = poster;
            previewVideo.load();

            // 4. Wait for video to be ready before swapping
            previewVideo.oncanplay = () => {
                previewVideo.oncanplay = null; // Remove listener

                if (autoPlay && !isPaused) {
                    var playPromise = previewVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => { console.log("Autoplay blocked/interrupted") });
                    }
                }

                // 5. The Swap: Only show video once it's actually ready
                previewVideo.classList.add('show');
                previewImage.classList.remove('show');
            };

        } else {
            // Image Logic
            previewVideo.classList.remove('show');
            previewVideo.pause();
            previewVideo.oncanplay = null;

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

    // --- INITIALIZATION ---

    // 1. Run Preloader ASAP
    preloadImages();

    // 2. Initialize the layout (Show item 0)
    updatePreview(0, false);

    // 3. Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                updatePreview(currentIndex, true);
                startAutoCycle();
                observer.disconnect();
            }
        });
    }, { threshold: 0.8 });

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