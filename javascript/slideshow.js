function initSlideshow(containerId, jsonPath) {
    let slideIndex = 1;
    let slidesData = [];

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
    }

    // Hook up buttons
    prevBtn.addEventListener("click", () => plusSlides(-1));
    nextBtn.addEventListener("click", () => plusSlides(1));
}

// Initialize both slideshows
initSlideshow("slideshow1", "../assets/ac_thrust/theory.json");
initSlideshow("slideshow2", "../assets/ac_thrust/test_stand.json");