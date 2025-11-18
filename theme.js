// theme.js – iOS icon-only toggle

export function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');

    const setLight = () => {
        document.body.classList.add('light-mode');
        icon.className = "fas fa-sun";
        localStorage.setItem("theme", "light");
    };

    const setDark = () => {
        document.body.classList.remove('light-mode');
        icon.className = "fas fa-moon";
        localStorage.setItem("theme", "dark");
    };

    // Load saved theme
    if (localStorage.getItem("theme") === "light") {
        setLight();
    } else {
        setDark();
    }

    toggle.addEventListener("click", () => {
        if (document.body.classList.contains("light-mode")) {
            setDark();
        } else {
            setLight();
        }

        // GSAP pop animation
        if (window.gsap) {
            gsap.fromTo(icon, { scale: 0.7 }, { scale: 1, duration: 0.25, ease: "power2.out" });
        }
    });
}
