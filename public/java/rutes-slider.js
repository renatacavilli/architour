// =========================
// RUTES SLIDER
// =========================

document.addEventListener('DOMContentLoaded', function () {

    const slider  = document.getElementById('rutesSlider');
    const prevBtn = document.getElementById('rutesPrev');
    const nextBtn = document.getElementById('rutesNext');

    if (!slider || !prevBtn || !nextBtn) return;

    function getSlideWidth() {
        const card = slider.querySelector('.ruta-card');
        if (!card) return 0;
        const cardWidth = card.offsetWidth;
        const gap = parseFloat(getComputedStyle(slider).gap) || 0;
        return cardWidth + gap;
    }

    function maxScrollLeft() {
        return Math.max(0, slider.scrollWidth - slider.clientWidth);
    }

    function safeScrollTo(left) {
        const max = maxScrollLeft();
        const target = Math.max(0, Math.min(left, max));
        slider.scrollTo({ left: target, behavior: 'smooth' });
    }

    nextBtn.addEventListener('click', function () {
        const slideWidth = getSlideWidth();
        const newLeft = slider.scrollLeft + slideWidth;
        safeScrollTo(newLeft);
    });

    prevBtn.addEventListener('click', function () {
        const slideWidth = getSlideWidth();
        const newLeft = slider.scrollLeft - slideWidth;
        safeScrollTo(newLeft);
    });

    let isDragging = false;
    let startX = 0;

    slider.addEventListener('touchstart', function(e){
        isDragging = false;
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchmove', function(e){
        const dx = Math.abs(e.touches[0].clientX - startX);
        if (dx > 10) isDragging = true; 
    }, { passive: true });

    slider.querySelectorAll('.ruta-link').forEach(a => {
        a.addEventListener('click', function(e){
            if (isDragging) {
                // Si ha estat un swipe, evitem que el click s'activi (impedeix navegacions accidentals)
                e.preventDefault();
                return;
            }
            // Si no hi ha drag, deixem que el link funcioni normalment
        });
    });

    let resizeTimer = null;
    window.addEventListener('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const slides = Array.from(slider.querySelectorAll('.ruta-link'));
            if (!slides.length) return;
            const rect = slider.getBoundingClientRect();
            let closestIndex = 0;
            let minDist = Infinity;
            slides.forEach((s, i) => {
                const r = s.getBoundingClientRect();
                const center = (r.left + r.right) / 2;
                const dist = Math.abs(center - (rect.left + rect.width / 2));
                if (dist < minDist) {
                    minDist = dist;
                    closestIndex = i;
                }
            });
            const targetEl = slides[closestIndex];
            if (targetEl) {
                const offsetLeft = targetEl.offsetLeft + (targetEl.offsetWidth / 2) - (slider.clientWidth / 2);
                safeScrollTo(offsetLeft);
            }
        }, 120);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });

});

