// Smooth scroll for hero CTA
document.addEventListener("DOMContentLoaded", () => {
    const cta = document.querySelector(".cta-btn");
    if (cta) {
        cta.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector("#features");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});

// Reveal animations for feature boxes
const revealElements = () => {
    const boxes = document.querySelectorAll(".feature-box");
    const triggerPoint = window.innerHeight * 0.85;

    boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerPoint) {
            box.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// Basic site logging
console.log("Brice Technologies frontend scripts loaded successfully.");