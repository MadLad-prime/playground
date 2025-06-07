document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HERO: DAY/NIGHT THEME ---
    const hero = document.getElementById('home');
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 19) {
        // It's daytime (6 AM to 6:59 PM)
        hero.classList.add('day');
    } else {
        // It's nighttime
        hero.classList.add('night');
    }

    // --- 2. GALLERY: MODAL LOGIC ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('artwork-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.modal-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const title = item.dataset.title;
            const artist = item.dataset.artist;
            const description = item.dataset.description;

            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalArtist.textContent = `By ${artist}`;
            modalDescription.textContent = description;

            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    const closeTheModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    closeModal.addEventListener('click', closeTheModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Close only if clicking on the overlay itself
            closeTheModal();
        }
    });

    // --- 3. ESSAYS: SCROLL-IN ANIMATION ---
    const scrollElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing after it's visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => observer.observe(el));


    // --- 4. THE SECRET SURPRISE (for you!) ---
    // The famous Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let keySequence = [];
    const secretSurprise = document.getElementById('secret-surprise');

    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        // Keep the sequence array at the same length as the Konami code
        keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);

        if (keySequence.join('') === konamiCode.join('')) {
            secretSurprise.classList.add('revealed');
            // Hide it again after a few seconds
            setTimeout(() => {
                secretSurprise.classList.remove('revealed');
            }, 8000);
        }
    });

});