/* ============================
   FLOATING PARTICLES MODULE
   ============================ */

export function initFloatingParticles() {
    const container = document.querySelector(".floating-icons");
    if (!container) return;

    const icons = [
        `<i class="fab fa-html5"></i>`,
        `<i class="fab fa-css3-alt"></i>`,
        `<i class="fab fa-js"></i>`,
        `<i class="fab fa-react"></i>`,
        `<i class="fas fa-code"></i>`,
        `<i class="fas fa-rocket"></i>`
    ];

    const TOTAL_PARTICLES = 6;

    // Create particles dynamically
    for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.innerHTML = icons[i % icons.length];

        // Random positions
        particle.style.top = Math.random() * 80 + "%";
        particle.style.left = Math.random() * 80 + "%";

        // Random size
        const size = Math.random() * 25 + 25;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        // Random animation delay
        particle.style.animationDelay = (Math.random() * 3) + "s";

        container.appendChild(particle);
    }
}
