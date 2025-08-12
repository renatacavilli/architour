document.addEventListener("DOMContentLoaded", () => {
    const info = document.getElementById("qui-info");

    const textos = {
        general: `<p>architour compta amb l’ajuda d’un grup d’arquitectes i professionals col·laboradors. Tots: l’Ariel, la Fabiana i la Núria exerceixen l’arquitectura com a pràctica liberal.</p>
        <p>Els recorreguts estan destinats a tothom interessat i sensible a descobrir, explorar, gaudir i endinsar-se en l'arquitectura i la ciutat. El públic d’architour són viatgers, és gent que sent avidesa pel concepte antropològic del viatge i pel fet d’aprendre i interactuar amb la novetat.</p>`,

        nuria: `<p>Nascuda i criada a Vic, Catalunya, es va graduar com a arquitecta a l'Escola Tècnica Superior d'Arquitectura del Vallès (ETSAV) de la Universitat Politècnica de Catalunya el 1999 i es va col·legiar al COAC el mateix any. A part de la Història —Núria va començar a estudiar història abans d’arquitectura— s'ha especialitzat en Planificació Urbana i ha treballat al Departament d'Urbanisme de l'Ajuntament de Vic en la redacció del nou POUM ara vigent. Ara també treballa en la direcció de la redacció del nou POUM de Manresa.</p>
        <p>La Núria és la part “local” del projecte, i va ser un veritable imant per a l’Ariel i per a la Fabiana. Amb els seus coneixements i el seu amor per Catalunya ha encomanat la resta de l’equip, i per tant també és important per al projecte. Bàsicament és consultora dels continguts i la planificació de les rutes, així com a guia de grups. Domina l’italià —va fer Erasmus a Venècia— i té coneixements d’anglès.</p>`,

        fabiana: `<p>Nascuda i criada a Buenos Aires, Argentina, es va graduar com a arquitecta a la UBA el 1995. Va acabar els estudis de postgrau en Arquitectura Mediambiental a la UBA, va ensenyar a la universitat i va continuar aquest enfocament amb un màster en Medi Ambient Urbà i Sostenibilitat a la UPC quan va arribar a Barcelona el 2001. Va homologar el títol a l'Escola Tècnica Superior d'Arquitectura del Vallès (ETSAV) de la Universitat Politècnica de Catalunya el 2004 i es va col·legiar al COAC el 2005.</p>
        <p>L'ambient català i la seva cultura també la van fascinar, un fet no totalment imprevisible ja que, a més d’italiana arran dels seus avis emigrants, la seva àvia materna era mallorquina. També interessada en el disseny estructural, ensenya a la UPC. És fonamental per a Architour des del començament, s'ocupa de la guia de grups, de la logística i del disseny gràfic. Té nivell D en català i domina l’anglès fruit d’haver estudiat tota la infantesa en una escola irlandesa.</p>`,

        ariel: `<p>Nascut i criat a Buenos Aires, Argentina —també amb nacionalitat italiana perquè els seus avis van emigrar a l’Argentina—, es va graduar com a arquitecte a la Universidad de Buenos Aires (UBA) el 1994. Després d'acabar els estudis de postgrau en Arquitectura Mediambiental a la UBA, va continuar aquest camp i el d’Història de l’Arquitectura com a professor universitari fins que va arribar a Barcelona el 2001 per dur a terme un doctorat en Teoria i Història de l'Arquitectura de la Universitat Politècnica de Catalunya (UPC). Va homologar el títol a l'Escola Tècnica Superior d'Arquitectura de Barcelona (ETSAB) de la Universitat Politècnica de Catalunya el 2004 i es va col·legiar al COAC el mateix any.</p>
        <p>Seduït pel doctorat i per la tesi en curs —una crítica sobre la façana lluminosa com a dispositiu publicitari— i per la riquesa de Barcelona, va ser imantat pel fenomen de la ciutat com a interacció històrica, urbanística, arquitectònica i cultural. Va fundar Architour el 2009 com una continuació del seu procés de tesi en el qual la investigació i la recerca revelen una nova experiència antropològica i enriquidora del viatge. S’encarrega del procés de recerca i investigació necessari per idear els recorreguts d’arquitectura i és també guia d’aquestes rutes. Té nivell C en català i Proficiency in English d’anglès.</p>`
    };

    document.querySelectorAll(".persona").forEach(persona => {
        persona.addEventListener("mouseenter", () => {
            const nom = persona.dataset.nom;
            info.innerHTML = textos[nom];
            info.classList.add("text-persona");
        });

        persona.addEventListener("mouseleave", () => {
            info.innerHTML = textos.general;
            info.classList.remove("text-persona");
        });
    });
});
