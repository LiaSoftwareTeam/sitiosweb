// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Toggle de tema claro/oscuro
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Función para cambiar el tema
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Cambiar el ícono según el tema
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Animación de aparición para los productos y funcionalidad de 'Ver más'
    const productCards = document.querySelectorAll('.product-card');
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para animar los elementos visibles
    function animateVisibleElements() {
        productCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('hidden')) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicialmente ocultar las cards de productos
    productCards.forEach((card, index) => {
        // Ocultar todos los productos después del cuarto
        if (index >= 4) {
            card.classList.add('hidden');
        }
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar la animación al cargar la página
    setTimeout(animateVisibleElements, 300);
    
    // Ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateVisibleElements);
    
    // Funcionalidad del botón 'Ver más'
    const viewMoreBtn = document.querySelector('.btn-view-more');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            const hiddenProducts = document.querySelectorAll('.product-card.hidden');
            
            // Mostrar todos los productos ocultos
            hiddenProducts.forEach(card => {
                card.classList.remove('hidden');
                // Asegurarse de que se animen al aparecer
                setTimeout(() => {
                    if (isInViewport(card)) {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    }
                }, 10);
            });
            
            // Ocultar el botón después de mostrar todos los productos
            this.style.display = 'none';
        });
    }
    
    // Menú desplegable del usuario
    const userProfile = document.querySelector('.user-profile');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (userProfile && dropdownMenu) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        
        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('active');
        });
    }
    
    // Carrusel de testimonios
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialSlider && testimonialCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = testimonialCards[0].offsetWidth + 20; // Ancho + margen
        
        // Función para mover el carrusel
        function moveCarousel() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialSlider.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
        
        // Mover el carrusel automáticamente cada 5 segundos
        setInterval(moveCarousel, 5000);
    }
    
    // Animación para botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-whatsapp');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Animación para la barra de búsqueda
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchBar && searchInput) {
        searchInput.addEventListener('focus', function() {
            searchBar.style.boxShadow = '0 0 0 2px var(--primary-color)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchBar.style.boxShadow = 'none';
        });
    }
});