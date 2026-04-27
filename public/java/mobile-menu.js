
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    if (!header || !nav) return;

    if (!document.querySelector(".hamburger")) {
        const btn = document.createElement("button");
        btn.className = "hamburger";
        btn.setAttribute("aria-label", "Obrir menú");
        btn.setAttribute("aria-expanded", "false");
        btn.innerHTML = "☰";
        header.insertBefore(
            btn,
            header.querySelector(".language-switch") || header.lastChild
        );
    }

    const hamburger = document.querySelector(".hamburger");

    function openNav() {
        nav.classList.add("open");
        document.body.classList.add("nav-open");
        hamburger.classList.add("is-open");
        hamburger.setAttribute("aria-expanded", "true");
    }

    function closeNav() {
        nav.classList.remove("open");
        document.body.classList.remove("nav-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
    }

    hamburger.addEventListener("click", function (e) {
        e.stopPropagation();
        if (nav.classList.contains("open")) {
            closeNav();
        } else {
            openNav();
        }
    });

    document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape" && nav.classList.contains("open")) {
            closeNav();
        }
    });

    document.addEventListener("click", function (ev) {
        if (
            !nav.contains(ev.target) &&
            !hamburger.contains(ev.target) &&
            nav.classList.contains("open")
        ) {
            closeNav();
        }
    });

    function moveLanguageIntoNav() {
        const langSwitch = document.getElementById("languageSwitch");
        if (!langSwitch) return;

        if (window.innerWidth <= 768 && !nav.contains(langSwitch)) {
            nav.appendChild(langSwitch);
        } 
        else if (window.innerWidth > 768 && !header.contains(langSwitch)) {
            const beforeEl = header.querySelector("nav") || header.lastElementChild;
            header.insertBefore(langSwitch, beforeEl);
        }
    }

    moveLanguageIntoNav();
    window.addEventListener("resize", moveLanguageIntoNav);

    document.addEventListener("click", function (e) {

        const link = e.target.closest && e.target.closest("nav a");
        if (!link) return;

        const href = link.getAttribute("href") || "";

        if (href.startsWith("#")) {
            e.preventDefault();

            if (nav.classList.contains("open")) {
                closeNav();
            }

            setTimeout(function () {
                const target = document.querySelector(href);
                if (!target) return;

                const headerEl = document.querySelector("header");
                const headerHeight = headerEl ? headerEl.offsetHeight : 64;

                const y =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    (headerHeight + 8);

                window.scrollTo({
                    top: y,
                    behavior: "smooth"
                });

            }, 140);

            return;
        }

        if (href.includes("#")) {
            if (nav.classList.contains("open")) {
                closeNav();
            }
            return; 
        }

        if (nav.classList.contains("open")) {
            closeNav();
        }

    });

});
