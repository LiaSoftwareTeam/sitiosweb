document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let interval;

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Función para avanzar a la siguiente diapositiva
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Función para retroceder a la diapositiva anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Configurar el carrusel automático
    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Eventos para los botones de navegación
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Eventos para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Iniciar el carrusel automático
    startAutoSlide();

    // Pausar el carrusel cuando el mouse está sobre él
    document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoSlide);
});