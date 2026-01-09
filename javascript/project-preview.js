document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById('projectList');
    const items = document.querySelectorAll('.project-item');
    const previewImage = document.getElementById('previewImage');
    const previewVideo = document.getElementById('previewVideo');
    const previewLabel = document.getElementById('previewLabel');
    const previewTags = document.getElementById('previewTags');
    const previewContent = document.querySelector('.preview-content');

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

    function updatePreview(index, autoPlay = true) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');

        // --- STEP 1: BACKGROUND FREEZE ---
        if (previewImage.src) {
            previewContent.style.backgroundImage = `url(${previewImage.src})`;
        }

        // --- STEP 2: PREPARE SWAP ---
        previewImage.style.transition = 'none';
        previewVideo.style.transition = 'none';

        previewImage.classList.remove('show');
        previewVideo.classList.remove('show');

        // Get data
        const currentItem = items[index];
        const src = currentItem.getAttribute('data-src');
        const type = currentItem.getAttribute('data-type');
        const poster = currentItem.getAttribute('data-poster');
        const name = currentItem.innerText;
        const tags = currentItem.getAttribute('data-tags');

        // Update Text
        previewLabel.innerText = `[PREVIEW: ${name}]`;
        previewTags.innerText = tags || "[TAGS]: ...";

        // --- STEP 3: CROSS-FADE ---
        void previewImage.offsetWidth; // Force Reflow

        previewImage.style.transition = 'opacity 0.6s ease';
        previewVideo.style.transition = 'opacity 0.6s ease';

        if (type === 'video') {
            previewImage.src = poster;
            previewVideo.src = src;
            previewVideo.poster = poster;
            previewVideo.load();

            previewImage.classList.add('show');

            previewVideo.oncanplay = () => {
                previewVideo.oncanplay = null;

                // FIX IS HERE: We removed "&& !isPaused"
                // We want the video to play if autoPlay is requested, even if the user is hovering.
                if (autoPlay) {
                    previewVideo.play().catch(e => console.log("Autoplay blocked"));
                }

                previewVideo.classList.add('show');
            };

        } else {
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