// Funcionalidades interactivas para el Centro Educativo Innovador

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Configuraciones específicas para secciones importantes
    // Hero section con efecto especial
    sr.reveal('.hero-content', {
        origin: 'top',
        distance: '80px',
        duration: 1500,
        delay: 100,
        opacity: 0,
        scale: 1.05
    });
    
    // Sección de carreras técnicas con efecto personalizado
    if (carrerasSection) {
        sr.reveal('#carreras-tecnicas .section-title', {
            origin: 'left',
            distance: '120px',
            duration: 1200,
            delay: 100
        });
        
        sr.reveal('#carreras-tecnicas .card', {
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            interval: 150 // Efecto escalonado entre tarjetas
        });
    }
    
    // Galería con efecto de cuadrícula
    sr.reveal('.galeria-item', {
        origin: 'bottom',
        distance: '30px',
        duration: 800,
        delay: 100,
        interval: 100,
        scale: 0.9,
        easing: 'ease-in-out'
    });
    
    // Elementos de accesibilidad
    sr.reveal('.accessibility-toggle, .accessibility-panel', {
        origin: 'right',
        distance: '50px',
        duration: 1000,
        delay: 300
    });

    // Referencias a elementos del DOM
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const carrerasSection = document.getElementById('carreras-tecnicas');
    const carrerasImages = carrerasSection ? carrerasSection.querySelectorAll('img') : [];
    
    // Función para el menú móvil
    menuToggle.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Accesibilidad por teclado para el menú móvil
    menuToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        }
    });
    
    // Cerrar menú al hacer clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Mejorar accesibilidad por teclado para todos los elementos interactivos
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (element.tagName.toLowerCase() !== 'input' && 
                    element.tagName.toLowerCase() !== 'textarea' && 
                    element.tagName.toLowerCase() !== 'select') {
                    e.preventDefault();
                    element.click();
                }
            }
        });
    });
    
    // Función para el header sticky y botón de regreso arriba
    // Usamos throttle para limitar la frecuencia de ejecución durante el scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Header sticky (esto se ejecuta sin throttle porque es ligero)
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
        
        // Efecto parallax en scroll con throttle
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                parallaxEffect();
                scrollTimeout = null;
            }, 20); // Limitar a 50 actualizaciones por segundo como máximo
        }
    });
    
    // Función para el efecto parallax optimizada
    function parallaxEffect() {
        // Cachear el valor de scrollY para evitar múltiples accesos
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Usar requestAnimationFrame para sincronizar con el refresco de pantalla
        requestAnimationFrame(() => {
            parallaxElements.forEach(element => {
                const parentSection = element.closest('.parallax-section');
                
                // Verificar si el elemento tiene un parentSection
                if (!parentSection) return;
                
                // Usar valores cacheados para mejorar rendimiento
                const sectionOffset = parentSection.getBoundingClientRect().top + scrollPosition;
                const sectionHeight = parentSection.offsetHeight;
                
                // Verificar si la sección está visible en el viewport o cerca
                // Añadimos un margen para precargar el efecto
                if (scrollPosition + windowHeight + 100 > sectionOffset && 
                    scrollPosition - 100 < sectionOffset + sectionHeight) {
                    
                    // Calcular la posición relativa para el efecto parallax
                    const distance = scrollPosition - sectionOffset;
                    const speed = 0.3; // Reducimos la velocidad para mejor rendimiento
                    
                    // Usar transform con translateY y will-change para optimizar
                    element.style.transform = `translateY(${distance * speed}px)`;
                }
            });
        });
    }
    
    // Iniciar el efecto parallax
    parallaxEffect();
    
    // Optimización para la sección de carreras técnicas
    if (carrerasSection) {
        // Usar IntersectionObserver para detectar cuando la sección está visible
        const carrerasObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la sección de carreras está visible o cerca de ser visible
                if (entry.isIntersecting) {
                    // Optimizar la carga de imágenes
                    carrerasImages.forEach(img => {
                        // Asegurarse de que la imagen tenga el atributo loading="lazy"
                        if (!img.hasAttribute('loading')) {
                            img.setAttribute('loading', 'lazy');
                        }
                        
                        // Aplicar will-change para optimizar el rendimiento de renderizado
                        img.style.willChange = 'transform';
                    });
                    
                    // Desconectar el observer una vez que se ha optimizado
                    carrerasObserver.disconnect();
                }
            });
        }, {
            // Configurar el umbral para que se active antes de que la sección sea completamente visible
            rootMargin: '200px',
            threshold: 0.1
        });
        
        // Comenzar a observar la sección de carreras
        carrerasObserver.observe(carrerasSection);
    }
    
    // Función para el botón de regreso arriba
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animación suave para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para el header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Activar enlaces de navegación según la sección visible (con throttling)
    let scrollThrottleTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollThrottleTimeout) {
            scrollThrottleTimeout = setTimeout(function() {
                let current = '';
                const sections = document.querySelectorAll('section');
                const scrollPosition = window.scrollY;
                
                sections.forEach(section => {
                    // Usar getBoundingClientRect para cálculos más precisos y eficientes
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + scrollPosition;
                    
                    if (scrollPosition >= sectionTop - 100) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                
                scrollThrottleTimeout = null;
            }, 100); // Reducir la frecuencia de actualización a 10 veces por segundo
        }
    });
    
    // Inicializar lightbox para la galería (versión optimizada)
    const galeriaLinks = document.querySelectorAll('.galeria-link');
    
    // Crear un único lightbox reutilizable para mejorar el rendimiento
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.display = 'none';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.loading = 'lazy';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Función para cerrar el lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Asignar eventos una sola vez
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Asignar eventos a los enlaces de la galería
    galeriaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.getAttribute('href');
            
            // Mostrar indicador de carga mientras se carga la imagen
            lightboxImg.style.opacity = '0';
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Actualizar la imagen
            lightboxImg.onload = function() {
                lightboxImg.style.opacity = '1';
            };
            lightboxImg.src = imgSrc;
        });
    });
    
    // Validación simple del formulario de contacto
    const contactForm = document.getElementById('formulario-contacto');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se implementaría la lógica para enviar el formulario
            // Por ahora solo mostramos un mensaje de éxito
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
        });
    }
    
    // Validación simple del formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se implementaría la lógica para suscribir al newsletter
            // Por ahora solo mostramos un mensaje de éxito
            alert('¡Gracias por suscribirte a nuestro boletín!');
            newsletterForm.reset();
        });
    }
    
    // Añadir estilos para el lightbox con optimizaciones de rendimiento
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.3s ease;
            will-change: opacity;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            opacity: 1;
            transition: opacity 0.5s ease;
            will-change: transform, opacity;
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .lightbox-close:hover {
            transform: scale(1.1);
        }
        
        /* Optimización para dispositivos móviles */
        @media (max-width: 768px) {
            .lightbox img {
                max-width: 95%;
                max-height: 95%;
            }
        }
    `;
    document.head.appendChild(style);
});