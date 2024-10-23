// // JavaScript to toggle the visibility of the description
// // const clickableText = document.querySelector('.command');
// // const description = document.getElementById('command-output');
// const clickableElements = document.querySelectorAll('.command');
// const hiddenContents = document.querySelectorAll('.command-output');

// // clickableText.addEventListener('click', () => {
// //     if (description.style.display === "none" || description.style.display === "") {
// //         description.style.display = "block"; // Show the hidden content
// //     } else {
// //         description.style.display = "none"; // Hide it again
// //     }
// // });

// clickableElements.forEach((clickable, index) => {
//     clickable.addEventListener('click', () => {
//         // Toggle display of the corresponding hidden content
//         const correspondingContent = hiddenContents[index];
//         if (correspondingContent.style.display === "none" || correspondingContent.style.display === "") {
//             correspondingContent.style.display = "block";
//         } else {
//             correspondingContent.style.display = "none";
//         }
//     });
// });

// Select all elements with the class "command"
const commandElements = document.querySelectorAll('.command');

commandElements.forEach(command => {
    // Add click event listener to each command element
    command.addEventListener('click', function () {
        // Find the next element with the class "hidden-content" after the clicked command
        const hiddenContent = this.nextElementSibling;

        // Toggle the visibility of the hidden content
        if (hiddenContent && hiddenContent.classList.contains('hidden-content')) {
            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                hiddenContent.style.display = 'block';
            } else {
                hiddenContent.style.display = 'none';
            }
        }
    });
});