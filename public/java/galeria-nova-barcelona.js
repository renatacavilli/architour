document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".inici-galeria");
    if (!container) return;

    const imatges = [
        "/imatges/galerianovabarcelona1.jpg",
        "/imatges/galerianovabarcelona2.jpg",
        "/imatges/galerianovabarcelona3.jpg",
        "/imatges/galerianovabarcelona4.jpg",
        "/imatges/galerianovabarcelona5.jpg",
        "/imatges/galerianovabarcelona6.jpg",
    ];

    imatges.forEach(src => { new Image().src = src; });

    container.innerHTML = "";
    const imgA = document.createElement("img");
    const imgB = document.createElement("img");
    imgA.className = "slide visible";
    imgB.className = "slide";
    imgA.src = imatges[0];
    imgB.src = imatges[1];
    imgA.alt = imgB.alt = "Ruta Gòtic";
    container.append(imgA, imgB);

    let currentIndex = 0;
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % imatges.length;
        const visible = container.querySelector(".slide.visible");
        const hidden = container.querySelector(".slide:not(.visible)");
        hidden.src = imatges[nextIndex];
        void hidden.offsetWidth;
        hidden.classList.add("visible");
        visible.classList.remove("visible");
        currentIndex = nextIndex;
    }, 4000);
});
