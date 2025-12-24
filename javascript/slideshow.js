function initSlideshow(containerId, jsonPath) {
    let slideIndex = 1;
    let slidesData = [];
    let autoPlayTimer = null;
    const AUTO_PLAY_DELAY = 10000; // Change this to your preferred threshold (ms)

    const container = document.getElementById(containerId);
    const wrapper = container.querySelector(".slides-wrapper");
    const caption = container.querySelector(".caption-container");
    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");

    // Load JSON
    fetch(jsonPath)
        .then(res => res.json())
        .then(data => {
            slidesData = data;
            buildSlides();
            showSlides(slideIndex);
            setupObserver();
        });

    function buildSlides() {
        slidesData.forEach(slide => {
            const slideDiv = document.createElement("div");
            slideDiv.className = "slide fade";

            const img = document.createElement("img");
            img.src = slide.src;
            slideDiv.appendChild(img);

            wrapper.appendChild(slideDiv);
        });
    }

    function showSlides(n) {
        const slides = wrapper.getElementsByClassName("slide");
        if (slides.length === 0) return;

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
        caption.textContent = slidesData[slideIndex - 1].caption;
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
        resetTimer();
    }

    function startTimer() {
        if (!autoPlayTimer) {
            autoPlayTimer = setInterval(() => {
                plusSlides(1);
            }, AUTO_PLAY_DELAY);
        }
    }

    function stopTimer() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }

    function resetTimer() {
        stopTimer();
        startTimer();
    }

    function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTimer(); // Slideshow is in view
                } else {
                    stopTimer();  // User scrolled away
                }
            });
        }, { threshold: 0.8 }); // Triggers when 80% of the slideshow is visible

        observer.observe(container);
    }

    // Hook up buttons
    prevBtn.addEventListener("click", () => plusSlides(-1));
    nextBtn.addEventListener("click", () => plusSlides(1));

    container.addEventListener("mouseenter", stopTimer);
    container.addEventListener("mouseleave", startTimer);
}

// Initialize both slideshows
initSlideshow("slideshow1", "../assets/ac_thrust/theory.json");
initSlideshow("slideshow2", "../assets/ac_thrust/test_stand.json");