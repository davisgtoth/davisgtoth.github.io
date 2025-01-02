window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const terminalContainer = document.getElementById('terminalContainer');
    const projectsSection = document.getElementById('projects');
    const contentSections = document.querySelectorAll('.content-section'); // Get all content sections

    const scrollY = window.scrollY;

    // Show the navbar after scrolling a bit
    if (scrollY > 30) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    // Apply smooth scrolling for projects and all content sections
    if (scrollY > 10) {
        const offset = scrollY / 1.7; // Adjust this factor to control how fast it scrolls up

        // Move the projects section title faster
        projectsSection.style.transform = `translateY(-${offset}px)`;

        // Move all other content sections together with projects
        contentSections.forEach(section => {
            section.style.transform = `translateY(-${offset}px)`;
        });

        // Optional smooth transition for terminal container
        terminalContainer.style.paddingTop = `${scrollY / 2}px`;
    } else {
        // Reset positions when scrolled back to the top
        projectsSection.style.transform = 'translateY(0)';
        contentSections.forEach(section => {
            section.style.transform = 'translateY(0)';
        });

        // Reset terminal container padding
        terminalContainer.style.paddingTop = '0';
    }

    // Add event listeners to anchor links
    const anchorLinks = document.querySelectorAll('.anchor-link');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Hide any visible command content
            const visibleCommands = document.querySelectorAll('.hidden-content');
            visibleCommands.forEach(command => {
                command.style.display = 'none';
                const commandElement = command.previousElementSibling;
                if (commandElement && commandElement.classList.contains('command')) {
                    commandElement.classList.remove('active'); // Show cursor
                }
            });

            // Scroll to the specified y value
            const yValue = parseInt(link.getAttribute('data-y'), 10);
            window.scrollTo({ top: yValue, behavior: 'smooth' });
        });
    });
});