const carouselContainer = document.querySelector('.carousel-container');
const carouselSlides = document.querySelector('.carousel-slides');
const carouselControls = document.querySelectorAll('.carousel-control');
const carouselNav = document.querySelector('.carousel-nav');
const slides = Array.from(carouselSlides.children); // Convert HTMLCollection to Array
const numSlides = slides.length;
let slideIndex = 0;
let intervalId;
let isPaused = false;

function createNavigationDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-nav-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            slideIndex = index;
            updateCarousel();
            resetInterval();
        });
        carouselNav.appendChild(dot);
    });
}

function updateCarousel() {
    carouselSlides.style.transform = `translateX(-${slideIndex * 100}%)`;
    const dots = carouselNav.querySelectorAll('.carousel-nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % numSlides;
    updateCarousel();
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + numSlides) % numSlides;
    updateCarousel();
}

function startInterval() {
    intervalId = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(intervalId);
    startInterval();
}

carouselControls.forEach(control => {
    control.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o clique no controle dispare eventos no container
        if (control.classList.contains('prev')) {
            prevSlide();
        } else {
            nextSlide();
        }
        resetInterval();
    });
});

carouselContainer.addEventListener('mouseenter', () => {
    isPaused = true;
    clearInterval(intervalId);
});

carouselContainer.addEventListener('mouseleave', () => {
    if (isPaused) {
        isPaused = false;
        startInterval();
    }
});

createNavigationDots();
updateCarousel();
startInterval();