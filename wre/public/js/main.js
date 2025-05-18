// Funcionalidades interactivas para el Centro Educativo Innovador

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del menú responsive
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Función para alternar el menú
    function toggleMenu() {
        navMenu.classList.toggle('active');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    }

    // Event listener para el botón del menú
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1000) {
                toggleMenu();
            }
        });
    });

    // Cerrar el menú al redimensionar la ventana a un tamaño de escritorio
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Inicializar ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false,
        mobile: true,
        desktop: true
    });
    
    // Configuraciones específicas para diferentes elementos
    // Títulos principales con efecto desde abajo
    sr.reveal('h1, h2', {
        origin: 'bottom',
        distance: '50px',
        duration: 1200,
        delay: 100
    });
    
    // Párrafos con efecto de fade
    sr.reveal('p', {
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        delay: 200
    });
    
    // Imágenes con efecto desde la izquierda
    sr.reveal('.section-img, .galeria-item', {
        origin: 'left',
        distance: '100px',
        duration: 1200,
        delay: 300
    });
    
    // Tarjetas y elementos de lista con efecto escalonado
    sr.reveal('.card, .feature-item, li', {
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        delay: 200,
        interval: 100 // Retraso entre elementos consecutivos
    });
    
    // Botones y elementos de acción con efecto de zoom
    sr.reveal('.btn, button, .cta', {
        distance: '0px',
        scale: 0.85,
        duration: 800,
        delay: 300
    });
    
    // Secciones completas con efecto sutil
    sr.reveal('section', {
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 100,
        opacity: 0,
        scale: 0.98
    }, 200);
    
    // Elementos del formulario con efecto escalonado
    sr.reveal('input, textarea, select, .form-group', {
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        delay: 200,
        interval: 100
    });
    
    // Elementos del footer con efecto desde abajo
    sr.reveal('.footer-col, .footer-bottom', {
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        delay: 200,
        interval: 150
    });
    
    // Hero section con efecto especial
    sr.reveal('.hero-content', {
        origin: 'top',
        distance: '80px',
        duration: 1500,
        delay: 100,
        opacity: 0,
        scale: 1.05
    });
});