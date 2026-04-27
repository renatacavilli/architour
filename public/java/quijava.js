document.addEventListener("DOMContentLoaded", () => {
    const info = document.getElementById("qui-info");

    const textos = {
        general: `<p>Les rutes d’arquitectura, com totes les activitats d’architour, estan destinats a tothom interessat i sensible a descobrir, explorar, gaudir i endinsar-se en l'arquitectura i la ciutat. El públic d’architour són viatgers, gent àvida pel concepte antropolòpic del viatge.</p>
        <p>Architour és un projecte creat i liderat per Ariel Cavilli. També hi col·laboren, en l’equip, Fabiana Palmero i Núria Oliver, tots arquitectes. Si architour està adreçat bàsicament a viatgers –o apel·la a aquest esperit- ho és també perquè tot l’equip són viatgers apassionats. </p>`,

        nuria: `<p>Nascuda i criada a Vic, Catalunya, es va graduar com a arquitecta a l'Escola Tècnica Superior d'Arquitectura del Vallès (ETSAV) de la Universitat Politècnica de Catalunya el 1999 i es va col·legiar al COAC el mateix any. A part de la Història —Núria va començar a estudiar història abans d’arquitectura— s'ha especialitzat en Planificació Urbana i ha treballat al Departament d'Urbanisme de l'Ajuntament de Vic en la redacció del nou POUM ara vigent. Ara també treballa en la direcció de la redacció del nou POUM de Manresa.</p>
        <p>La Núria és la part “local” del projecte, i va ser un veritable imant per a l’Ariel i per a la Fabiana. Amb els seus coneixements i el seu amor per Catalunya ha encomanat la resta de l’equip, i per tant també és important per al projecte. Bàsicament és consultora dels continguts i la planificació de les rutes, així com a guia de grups. Domina l’italià —va fer Erasmus a Venècia— i té coneixements d’anglès.</p>`,

        fabiana: `<p>Nascuda i criada a Buenos Aires, Argentina, es va graduar com arquitecta a la UBA el 1995. Va acabar els estudis de postgrau en Arquitectura Mediambiental a la UBA, va ensenyar a la universitat i va continuar aquest enfocament amb un màster en Medi Ambient Urbà i Sostenibilitat a la UPC quan va arribar a Barcelona el 2001. Va homologar el títol a l'Escola Tècnica Superior d'Arquitectura del Vallès (ETSAV) de la Universitat Politècnica de Catalunya el 2004 i es va col·legiar al COAC el 2005.</p>
        <p>L'ambient català i la seva cultura també la van fascinar, un fet no totalment imprevisible ja que, a més d’italiana arran dels seus avis emigrants, la seva àvia materna era mallorquina. També interessada en el disseny estructural, ensenya a la Universitat Politècnica de Catalunya: això i gestió urbanística. La Fabiana i la Núria comparteixen despatx des de 2005, adreçat bàsicament a l’urbanisme i a l’arquitectura d’edificació. És fonamental per a Architour des del començament, s'ocupa de la logística i del disseny gràfic. </p>`,

        ariel: `<p>Nascut i criat a Buenos Aires, Argentina –també amb nacionalitat italiana perquè els seus avis van emigrar a l’Argentina-, es va graduar com  arquitecte a la Universidad de Buenos Aires (UBA) el 1994. Després d'acabar els estudis de postgrau en Arquitectura Mediambiental a la UBA, va continuar aquest camp i el d’Història de l’Arquitectura com a professor universitari fins que va arribar a Barcelona el 2001 per dur a terme un doctorat en Teoria i Història de l'Arquitectura de la Universitat Politècnica de Catalunya (UPC). Va homologar el títol a l'Escola Tècnica Superior d'Arquitectura de Barcelona (ETSAB) de la Universitat Politècnica de Catalunya el 2004 i es va col·legiar al COAC el mateix any.</p>
        <p>Seduït pel doctorat i per la riquesa de Barcelona com a fenomen de la ciutat, com a evolució històrica, urbanística, arquitectònica i cultural, va fundar Architour el 2009. També, com extensió de la tesi -encara pendent- en la qual la investigació i la recerca s’expressen en una nova experiència antropològica i enriquidora del viatge. Des de 2022 és arquitecte del Departament de Cultura de la Generalitat, especialista en patrimoni arquitectònic, una matèria consubstancial en l’enfocament de tot plegat. S’encarrega del procés de recerca i investigació necessari per dissenyar totes les activitats i rutes. És també guia dels recorreguts i professor dels programes educatius.</p>`
    };

    // Elements i capes DOM
    const cutouts = {
        ariel: document.querySelector(".cutout-ariel"),
        fabiana: document.querySelector(".cutout-fabiana"),
        nuria: document.querySelector(".cutout-nuria")
    };

    const personas = document.querySelectorAll(".persona");
    const quiFoto = document.querySelector(".qui-foto");

    // Ordre del cicle
    const order = ["ariel", "fabiana", "nuria"];
    const DURATION = 10000; // 10 segons

    let currentIndex = 0;
    let intervalId = null;
    let pausedByHover = false;
    let hoverCount = 0;

    Object.values(cutouts).forEach(el => {
        if (el && el.src) {
            const img = new Image();
            img.src = el.src;
        }
    });

    try {
        const computedRadius = quiFoto ? window.getComputedStyle(quiFoto).borderRadius : null;
        Object.values(cutouts).forEach(el => {
            if (el) {
                if (computedRadius) el.style.borderRadius = computedRadius;
                el.style.willChange = "opacity";
                el.style.transition = el.style.transition || "opacity 0.6s ease";
                
                el.style.pointerEvents = "none";
            }
        });
    } catch (e) {
        
        console.warn("No s'ha pogut aplicar l'estil dinàmic a les cutouts:", e);
    }

    function clearActiveCutouts(except = null) {
        Object.entries(cutouts).forEach(([key, el]) => {
            if (el && key !== except) {
                el.classList.remove("active");
            }
        });
    }

    function showPerson(nom, manual = false) {
        const el = cutouts[nom];

        if (el) {
            el.classList.add("active");
        }

        clearActiveCutouts(nom);

        const noms = {
            ariel: "Ariel",
            fabiana: "Fabiana",
            nuria: "Núria"
        };

        const displayName = noms[nom] || (nom.charAt(0).toUpperCase() + nom.slice(1));

        info.innerHTML = `<div class="persona-name">${displayName}</div>` + (textos[nom] || textos.general);
        info.classList.add("text-persona");

        if (manual) {
            stopAnimation();
            pausedByHover = true;
        } else {
            pausedByHover = false;
        }
    }

    function showGeneral() {
    clearActiveCutouts();
    info.innerHTML = ""; 
    info.classList.remove("text-persona");
}


    function nextInCycle() {
        currentIndex = (currentIndex + 1) % order.length;
        showPerson(order[currentIndex], false);
    }

    function startAnimation() {
        stopAnimation();
        // Mostrar immediatament la persona actual (això evita un moment neutre)
        showPerson(order[currentIndex], false);
        intervalId = setInterval(() => {
            nextInCycle();
        }, DURATION);
    }

    function stopAnimation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    personas.forEach(persona => {
        const nom = persona.dataset.nom;

        persona.addEventListener("pointerenter", () => {
            hoverCount++;
            showPerson(nom, true);
        });

        persona.addEventListener("pointerleave", () => {
            hoverCount = Math.max(0, hoverCount - 1);
            if (hoverCount === 0) {
                showGeneral();
                pausedByHover = false;
                setTimeout(() => {
                    if (!pausedByHover) startAnimation();
                }, 250);
            }
        });

        persona.addEventListener("focus", () => {
            hoverCount++;
            showPerson(nom, true);
        });

        persona.addEventListener("blur", () => {
            hoverCount = Math.max(0, hoverCount - 1);
            if (hoverCount === 0) {
                showGeneral();
                pausedByHover = false;
                setTimeout(() => {
                    if (!pausedByHover) startAnimation();
                }, 250);
            }
        });

        persona.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            hoverCount = 1;
            showPerson(nom, true);
        });
    });

    if (quiFoto) {
        quiFoto.addEventListener("pointerleave", () => {
            if (hoverCount === 0) {
                showGeneral();
                pausedByHover = false;
                setTimeout(() => {
                    if (!pausedByHover) startAnimation();
                }, 250);
            }
        });
    }

    currentIndex = 0;
    startAnimation();
});
