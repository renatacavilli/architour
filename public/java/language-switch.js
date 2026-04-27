document.addEventListener("DOMContentLoaded", function () {
    const languages = [
        { code: "ca", label: "CA" },
        { code: "en", label: "EN" },
        { code: "cast", label: "ES" } 
    ];

    
    function ensureContainer() {
        let container = document.getElementById("languageSwitch");
        if (container) return container;
        
        container = document.createElement("div");
        container.id = "languageSwitch";
        
        const header = document.querySelector("header");
        if (header) {
            header.appendChild(container);
        } else {
            
            document.body.insertBefore(container, document.body.firstChild);
        }
        return container;
    }

    const container = ensureContainer();
    if (!container) return;

    
    function normalizeLangSegment(seg) {
        if (!seg) return null;
        seg = seg.toLowerCase();
        if (seg === "ca" || seg === "cat") return "ca";
        if (seg === "en" || seg === "eng" ) return "en";
        if (seg === "cast" || seg === "es" || seg === "es-ES") return "cast";
        return null;
    }

    function getPathParts() {
        return window.location.pathname.split("/").filter(Boolean);
    }

    function getCurrentLang() {
        const parts = getPathParts();
        if (!parts.length) return "ca";
        const candidate = normalizeLangSegment(parts[0]);
        return candidate || "ca";
    }

    function getRestOfPath() {
        const parts = getPathParts();
        if (!parts.length) return "";
        
        const firstNorm = normalizeLangSegment(parts[0]);
        if (firstNorm) {
            return parts.slice(1).join("/");
        }
        
        return parts.join("/");
    }

    function buildUrl(lang) {
        const rest = getRestOfPath();
        // si rest és buit, retornem la carpeta d'idioma
        return rest ? `/${lang}/${rest}` : `/${lang}/`;
    }

    
    const currentLang = getCurrentLang();
    const btnLabel = `🌐 CA / EN / ES`;

    const dropdown = document.createElement("div");
    dropdown.className = "custom-lang"; // manté classe perquè  el CSS funcioni

    dropdown.innerHTML = `
        <button class="lang-btn" aria-haspopup="true" aria-expanded="false">${btnLabel}</button>
        <ul class="lang-menu" role="menu">
        ${languages
            .map(l => {
                const url = buildUrl(l.code);
            const isActive = (l.code === currentLang) ? ' class="active" aria-current="true"' : "";
            return `<li${isActive}><a role="menuitem" href="${url}" data-lang="${l.code}">${l.label}</a></li>`;
            })
            .join("")}
        </ul>
    `;

    
    container.innerHTML = "";
    container.appendChild(dropdown);

    const btn = dropdown.querySelector(".lang-btn");
    const menu = dropdown.querySelector(".lang-menu");

  // Toggle menú
    btn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        const isOpen = menu.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

  // Tanquem si fem clic fora
    document.addEventListener("click", function (ev) {
        if (!dropdown.contains(ev.target)) {
            if (menu.classList.contains("open")) {
                menu.classList.remove("open");
                btn.setAttribute("aria-expanded", "false");
            }
        }
    });

  // Tanca amb ESC
    document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape" && menu.classList.contains("open")) {
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
            btn.focus();
        }
    });

    
    const params = new URLSearchParams(location.search);
    if (params.get("debug") === "1") {
        console.log("language-switch debug:", {
            pathname: location.pathname,
            parts: getPathParts(),
            currentLang,
            rest: getRestOfPath()
        });
    }
});