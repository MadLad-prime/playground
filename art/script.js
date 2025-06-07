document.addEventListener('DOMContentLoaded', () => {

    const transitioner = document.getElementById('transitioner');
    
    // --- All cursor-related code has been removed. ---


    // --- SMOOTH SPA NAVIGATION (Unchanged) ---
    const navLinks = document.querySelectorAll('.nav-link');
    let isTransitioning = false;
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if (isTransitioning || link.classList.contains('active-link')) return;
            isTransitioning = true;
            
            const targetId = link.dataset.target;
            transitioner.style.transformOrigin = 'top';
            transitioner.style.transform = 'scaleY(1)';
            transitioner.classList.add('is-active');

            setTimeout(() => {
                document.querySelector('.view.active').classList.remove('active');
                document.getElementById(targetId).classList.add('active');
                document.querySelector('.nav-link.active-link').classList.remove('active-link');
                link.classList.add('active-link');
                transitioner.style.transformOrigin = 'bottom';
                transitioner.style.transform = 'scaleY(0)';
            }, 800);

            transitioner.addEventListener('transitionend', () => isTransitioning = false, { once: true });
        });
    });

    // --- GALLERY MODAL (Unchanged) ---
    document.querySelectorAll('.gallery-item').forEach(item => { /* ... modal logic ... */ });

    // --- ESSAY INTERSECTION OBSERVER (Unchanged) ---
    const essayObserver = new IntersectionObserver((entries, observer) => { /* ... observer logic ... */ }, { root: document.querySelector('#essays'), threshold: 0.6 });
    document.querySelectorAll('#essays p, #essays blockquote').forEach(el => essayObserver.observe(el));

    // --- THE REFINED SECRET SURPRISE ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let keySequence = [];
    const secretPanel = document.getElementById('curators-note');

    document.addEventListener('keydown', e => {
        keySequence.push(e.key);
        keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);

        if (keySequence.join('').toLowerCase() === konamiCode.join('')) {
            secretPanel.classList.add('is-visible');
        }
    });

    document.querySelector('.close-note').addEventListener('click', () => {
        secretPanel.classList.remove('is-visible');
    });

});