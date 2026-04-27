
document.addEventListener('DOMContentLoaded', function () {

    const navUL = document.querySelector('nav ul');
    if (!navUL) return;

    const path = window.location.pathname;
    let lang = "ca";

    if (path.startsWith("/cast/")) {
        lang = "cast";
    } else if (path.startsWith("/en/")) {
        lang = "en";
    }


    const t = {
    ca: {
        inici: "Inici",
        com: "Com",
        qui: "Qui",
        rutes: "Rutes",
        viatges: "Viatges",
        study: "Study Abroad",
        educacio: "Educació",
        contacte: "Contacte",
        routes: [
            "Gòtic (Barcelona)",
            "Nova Barcelona",
            "Barcelona Jardí",
            "Born i Ribera (Barcelona)",
            "Eixample (Barcelona)",
            "Barceloneta i Façana Marítima",
            "Vic"
        ]
    },
    cast: {
        inici: "Inicio",
        com: "Cómo",
        qui: "Quién",
        rutes: "Rutas",
        viatges: "Viajes",
        study: "Study Abroad",
        educacio: "Educación",
        contacte: "Contacto",
        routes: [
            "Gótico (Barcelona)",
            "Nueva Barcelona",
            "Barcelona Jardín",
            "Born y Ribera (Barcelona)",
            "Eixample (Barcelona)",
        "Barceloneta y Frente Marítimo",
        "Vic"
        ]
    },
    en: {
        inici: "Home",
        com: "How",
        qui: "Who",
        rutes: "Routes",
        viatges: "Journeys",
        study: "Study Abroad",
        educacio: "Education",
        contacte: "Contact",
        routes: [
            "Gothic (Barcelona)",
            "New Barcelona",
            "Barcelona Garden",
            "Born & Ribera (Barcelona)",
            "Eixample (Barcelona)",
            "Barceloneta & Seafront",
            "Vic"
        ]
        }
    };


    const routes = [
        { file: 'gotic.html' },
        { file: 'nova-barcelona.html' },
        { file: 'barcelona-jardi.html' },
        { file: 'born-ribera.html' },
        { file: 'eixample.html' },
        { file: 'barceloneta-facana.html' },
        { file: 'vic.html' }
    ];

    const routesHtml = routes
        .map((r, i) =>
        `<li><a href="/${lang}/rutes/${r.file}">${t[lang].routes[i]}</a></li>`
        )
        .join('\n');

    const navHtml = `
        <li><a href="/${lang}/index.html#inici">${t[lang].inici}</a></li>
        <li><a href="/${lang}/index.html#com">${t[lang].com}</a></li>
        <li><a href="/${lang}/index.html#qui">${t[lang].qui}</a></li>
        <li class="nav-rutes">
            <a href="/${lang}/index.html#rutes">${t[lang].rutes}</a>
            <ul class="dropdown-menu">
                ${routesHtml}
            </ul>
        </li>
        <li><a href="/${lang}/index.html#viatges">${t[lang].viatges}</a></li>
        <li><a href="/${lang}/index.html#study-abroad">${t[lang].study}</a></li>
        <li><a href="/${lang}/index.html#educacio">${t[lang].educacio}</a></li>
        <li><a href="/${lang}/index.html#contacte">${t[lang].contacte}</a></li>
    `;

    navUL.innerHTML = navHtml;

});