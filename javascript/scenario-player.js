document.addEventListener("DOMContentLoaded", () => {

    class ScenarioPlayer {
        constructor(containerId, jsonPath) {
            this.container = document.getElementById(containerId);
            this.scenarios = [];

            this.imgElement = this.container.querySelector("img");
            this.captionContainer = this.container.querySelector(".caption-container");
            this.prevBtn = this.container.querySelector(".prev");
            this.nextBtn = this.container.querySelector(".next");

            this.scenarioIndex = 0;
            this.frameIndex = 0;
            this.interval = null;
            this.isPlaying = false;

            this.loadData(jsonPath);
        }

        loadData(path) {
            fetch(path)
                .then(response => response.json())
                .then(data => {
                    this.scenarios = data;
                    if (this.scenarios && this.scenarios.length > 0) {
                        this.initPlayer();
                    }
                })
                .catch(err => console.error("Error loading scenario data:", err));
        }

        initPlayer() {
            this.prevBtn.addEventListener("click", () => this.changeScenario(-1));
            this.nextBtn.addEventListener("click", () => this.changeScenario(1));

            // Render Frame 0 immediately so it's ready before scrolling
            this.renderStaticFrame();

            this.setupObserver();
        }

        renderStaticFrame() {
            const currentScenario = this.scenarios[this.scenarioIndex];
            const currentFrame = currentScenario.frames[0];

            this.imgElement.src = currentFrame.src;
            // UPDATED: Added display: block and margin-bottom to the title
            this.captionContainer.innerHTML = `
        <strong style="color: #ffffff; display: block; margin-bottom: 5px;">${currentScenario.title}</strong>
        <span style="color: #b0b0b0;">${currentFrame.caption}</span>
    `;
        }

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startLoop();
                    } else {
                        this.stopLoop();
                    }
                });
            }, { threshold: 0.6 });

            observer.observe(this.container);
        }

        updateDisplay() {
            const currentScenario = this.scenarios[this.scenarioIndex];

            // Increment index BEFORE painting
            this.frameIndex = (this.frameIndex + 1) % currentScenario.frames.length;

            const currentFrame = currentScenario.frames[this.frameIndex];

            this.imgElement.src = currentFrame.src;
            // UPDATED: Same change here
            this.captionContainer.innerHTML = `
        <strong style="color: #ffffff; display: block; margin-bottom: 5px;">${currentScenario.title}</strong>
        <span style="color: #b0b0b0;">${currentFrame.caption}</span>
    `;
        }

        startLoop() {
            if (!this.isPlaying) {
                if (this.interval) clearInterval(this.interval);
                this.interval = setInterval(() => this.updateDisplay(), 1500);
                this.isPlaying = true;
            }
        }

        stopLoop() {
            if (this.isPlaying) {
                clearInterval(this.interval);
                this.interval = null;
                this.frameIndex = 0;
                this.isPlaying = false;
                this.renderStaticFrame(); // Reset visual to Frame 0
            }
        }

        changeScenario(direction) {
            this.scenarioIndex += direction;
            if (this.scenarioIndex < 0) this.scenarioIndex = this.scenarios.length - 1;
            if (this.scenarioIndex >= this.scenarios.length) this.scenarioIndex = 0;

            this.frameIndex = 0;
            this.renderStaticFrame();

            // Restart loop so the user sees movement immediately
            this.isPlaying = false;
            this.startLoop();
        }
    }

    new ScenarioPlayer("road-player", "../assets/353/road.json");
    new ScenarioPlayer("desert-player", "../assets/353/desert.json");
    new ScenarioPlayer("sign-player", "../assets/353/sign.json");
});