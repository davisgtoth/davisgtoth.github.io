// let currentIndex = 0;
// const images = document.querySelectorAll('.image-sequence img');
// const totalImages = images.length;

// function showNextImage() {
//     images[currentIndex].classList.remove('active');
//     currentIndex = (currentIndex + 1) % totalImages;
//     images[currentIndex].classList.add('active');
// }

// setInterval(showNextImage, 1000); // Change image every second
const sequences = document.querySelectorAll('.image-sequence');

sequences.forEach(sequence => {
    const images = sequence.querySelectorAll('img');
    let currentIndex = 0;
    const totalImages = images.length;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 1500); // Change image every second
});