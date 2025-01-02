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
                this.classList.add('active'); // Add active class to stop blinking and hide cursor
            } else {
                hiddenContent.style.display = 'none';
                this.classList.remove('active'); // Remove active class to start blinking and show cursor
            }
        }
    });
});