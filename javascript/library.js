document.addEventListener("DOMContentLoaded", () => {
    // 📚 Curated Library Database
    const libraryData = {
        "phys407": {
            code: "PHYS 407",
            title: "Introduction to General Relativity",
            review: "My absolute favorite course at UBC. It felt like a bridge between science fiction and real physics—exploring the geometry of spacetime and mathematically diving into things like time dilation, black hole orbits, and the theoretical limits of faster-than-light travel.",
            focus: [
                "Time dilation and length contraction",
                "Spacetime geometry & geodesics",
                "Orbits & wormholes",
                "Schwarzschild metric & black holes"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/PHYS/PHYS407.pdf",
            favorite: true
        },
        "phys350": {
            code: "PHYS 350",
            title: "Applications of Classical Mechanics",
            review: "It was incredibly satisfying to move beyond basic Newtonian mechanics into the abstract world of Lagrangian and Hamiltonian dynamics. The potential energy wells and oscillatory stability studied in this course are the fundamental principles utilized in Wireless Drone project!",
            focus: [
                "Lagrangian & Hamiltonian formalisms",
                "Coupled oscillations & normal modes",
                "Rigid body dynamics & rotations",
                "Potential wells & orbits"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/PHYS/PHYS350.pdf"
        },
        "phys304": {
            code: "PHYS 304",
            title: "Introduction to Quantum Mechanics",
            review: "Quantum mechanics is mind-bending but represents our true fundamental description of the universe. I loved learning the rigorous Dirac bra-ket formalism, mapping coordinate systems to operator spaces, and exploring quantum tunneling and the hydrogen atom model.",
            focus: [
                "Wave-particle duality & probability wavefunctions",
                "Dirac bra-ket notation & operators",
                "Heisenberg's uncertainty principle",
                "Quantum tunneling & hydrogen atom models"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/PHYS/PHYS304.pdf"
        },
        "phys408": {
            code: "PHYS 408",
            title: "Optics",
            review: "It was beautiful to see how vector calculus transforms Maxwell's equations into the electromagnetic wave PDE in my E&M courses. Optics took this to another level applying those wave equations to explain interference patterns, optical cavities and laser amplification which was highly satisfying.",
            focus: [
                "Maxwell's equations & Gaussian beams",
                "Diffraction, interference, and polarization",
                "Optical cavities & resonator design",
                "Laser physics & population inversion"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/PHYS/PHYS408.pdf"
        },
        "math307": {
            code: "MATH 307",
            title: "Applied Linear Algebra",
            review: "This course completely reframed linear algebra for me. Understanding orthogonality and basis vectors allowed me to view a Fourier Transform as coordinate change onto a basis of sinusoidal functions or roots of unity.",
            focus: [
                "Interpolation & vector spaces",
                "Orthogonality & Gram-Schmidt algorithm",
                "Matrix decompositions (LU, QR, SVD)",
                "Eigenvalue problems & discrete Fourier transforms"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/MATH/MATH307.pdf"
        },
        "math318": {
            code: "MATH 318",
            title: "Probability with Physical Applications",
            review: "Probability is essential for describing physical systems with noise or massive numbers of microstates. I really enjoyed learning about permutations, random variables, probability distributions, and using Markov chains to model transitions in statistical processes.",
            focus: [
                "Combinatorics & permutations",
                "Random variables & probability distributions",
                "Central Limit Theorem & statistical physics",
                "Markov chains & transition matrices"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/MATH/MATH318.pdf"
        },
        "math400": {
            code: "MATH 400",
            title: "Applied Partial Differential Equations",
            review: "One of the most engaging lecture series I took. It taught me how to tackle daunting partial differential equations using clever techniques like the method of characteristics, which we used to model real-world phenomena like traffic jams.",
            focus: [
                "Separation of variables & eigenfunction expansions",
                "Bessel functions & Legendre polynomials",
                "Method of characteristics for first-order PDEs",
                "Shock waves & traffic flow modeling"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/MATH/MATH400.pdf"
        },
        "elec221": {
            code: "ELEC 221",
            title: "Signals and Systems",
            review: "I loved the mathematical rigor of this course. It gave me a deep understanding of continuous and discrete systems, Fourier and Laplace transforms, and the absolute beauty of the Nyquist sampling theorem in signal processing.",
            focus: [
                "Linear Time-Invariant (LTI) systems",
                "Fourier transforms (discrete & continuous)",
                "Nyquist sampling theorem & signal aliasing",
                "Laplace transforms & transfer functions"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/ELEC/ELEC221.pdf"
        },
        "elec341": {
            code: "ELEC 341",
            title: "Systems and Control",
            review: "A core engineering class. It was fascinating to dissect system modeling and classical PID control from a strict mathematical standpoint, understanding the root-locus theory of why feedback stabilization works.",
            focus: [
                "Physical system modeling (mechanical/electrical)",
                "Transfer functions & block diagram reduction",
                "Root-locus & frequency response stability",
                "PID controller design & feedback loops"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/ELEC/ELEC341.pdf"
        },
        "elec431": {
            code: "ELEC 431",
            title: "Communication Systems",
            review: "An amazing synthesis of probability, signals, and math. It was fascinating to see how noise modeling, signal orthogonality, entropy, Huffman compression, and error correction all come together to transmit data reliably.",
            focus: [
                "Modulation techniques (AM, FM, QAM)",
                "Random processes & noise modeling",
                "Information theory & entropy",
                "Huffman compression & error correction coding"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/ELEC/ELEC431.pdf"
        },
        "cpen312": {
            code: "CPEN 312",
            title: "Digital Systems and Microcomputers",
            review: "Fascinating to trace the pathway from basic transistors up to logic gates, adders, and complete processors. Programming in low-level Assembly under strict hardware register constraints was a great challenge that directly inspired my Assembly Clock project.",
            focus: [
                "Logic gates & boolean algebra",
                "Combinational & sequential circuit design",
                "CPU register architecture & memory maps",
                "Low-level Assembly language programming"
            ],
            url: "https://davisgtoth.github.io/DavisLibrary/CPEN/CPEN312/Digital%20Logic.pdf"
        }
    };

    // 🖥️ Modal Elements
    const modal = document.getElementById("libraryModal");
    const modalCourseTitle = document.getElementById("modalCourseTitle");
    const modalReviewHeader = document.getElementById("modalReviewHeader");
    const modalReviewText = document.getElementById("modalReviewText");
    const modalFocusList = document.getElementById("modalFocusList");
    const modalPdfFrame = document.getElementById("modalPdfFrame");
    const modalPdfLink = document.getElementById("modalPdfLink");
    const modalMobilePdfLink = document.getElementById("modalMobilePdfLink");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    // Exit early if elements are missing
    if (!modal || !modalCourseTitle || !modalReviewHeader || !modalReviewText || !modalFocusList || !modalPdfFrame || !modalPdfLink || !modalMobilePdfLink || !modalCloseBtn) {
        return;
    }

    // 👆 Click event handler for file links
    const fileLinks = document.querySelectorAll(".file-link");
    fileLinks.forEach(link => {
        link.addEventListener("click", () => {
            const courseKey = link.getAttribute("data-course");
            const data = libraryData[courseKey];

            if (data) {
                // Populate Modal Data
                modalCourseTitle.textContent = `${data.code}: ${data.title}`;
                if (data.favorite) {
                    modalReviewHeader.innerHTML = `Davis's Review <span class="fav-star">★</span>`;
                } else {
                    modalReviewHeader.textContent = "Davis's Review";
                }
                modalReviewText.textContent = data.review;

                // Clear and repopulate focus list
                modalFocusList.innerHTML = "";
                data.focus.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    modalFocusList.appendChild(li);
                });

                // Update PDF link and frame
                modalPdfLink.href = data.url;
                modalMobilePdfLink.href = data.url;
                modalPdfFrame.src = data.url;

                // Open Modal
                modal.classList.add("open");
                document.body.style.overflow = "hidden"; // Prevent background scroll
            }
        });
    });

    // ❌ Close Modal function
    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = ""; // Restore scroll
        modalPdfFrame.src = ""; // Clear iframe source to stop rendering
    }

    // Close button click
    modalCloseBtn.addEventListener("click", closeModal);

    // Click outside modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });
});
