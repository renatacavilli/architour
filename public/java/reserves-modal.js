(function () {

    const overlay = document.getElementById('calendarOverlayStatic');
    const reserveButtons = document.querySelectorAll('.coac-button');
    const closeButton = document.getElementById('overlayCloseBtnStatic');

    if (!overlay) return;

    function toggleOverlay(forceState) {

        const isOpen = overlay.classList.contains('open');
        const shouldOpen = (typeof forceState === 'boolean')
            ? forceState
            : !isOpen;

        if (shouldOpen) {
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        } else {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        }
    }

    /* Obrir / Tancar amb botó reserva */
    reserveButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            toggleOverlay();
        });
    });

    /* Tancar amb la creu */
    if (closeButton) {
        closeButton.addEventListener('click', function (e) {
            e.preventDefault();
            toggleOverlay(false);
        });
    }

    /* Tancar amb tecla ESC */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            toggleOverlay(false);
        }
    });

})();
