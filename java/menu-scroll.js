let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Scroll cap a baix i ja hem baixat una mica
        header.classList.add('hide');
    } else if (scrollTop < lastScrollTop) {
        // Scroll cap amunt
        header.classList.remove('hide');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valors negatius
});
