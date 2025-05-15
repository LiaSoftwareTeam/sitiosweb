document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const slides = document.querySelectorAll('.slide');
    const filterBtns = document.querySelectorAll('.filtro-btn');
    const miembros = document.querySelectorAll('.miembro-card');
    const contactForm = document.getElementById('contactForm');
    
    // Función para el menú hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Slider automático
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Cambiar slide cada 5 segundos
    setInterval(nextSlide, 5000);
    
    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filtro para el equipo
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrar miembros del equipo
            miembros.forEach(miembro => {
                if (filter === 'todos') {
                    miembro.style.display = 'block';
                    setTimeout(() => {
                        miembro.style.opacity = '1';
                        miembro.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (miembro.getAttribute('data-area') === filter) {
                        miembro.style.display = 'block';
                        setTimeout(() => {
                            miembro.style.opacity = '1';
                            miembro.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        miembro.style.opacity = '0';
                        miembro.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            miembro.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Validación del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            // Validar nombre
            if (nombre.value.trim() === '') {
                showError(nombre, 'El nombre es obligatorio');
                isValid = false;
            } else {
                clearError(nombre);
            }
            
            // Validar email
            if (email.value.trim() === '') {
                showError(email, 'El email es obligatorio');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, introduce un email válido');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validar mensaje
            if (mensaje.value.trim() === '') {
                showError(mensaje, 'El mensaje es obligatorio');
                isValid = false;
            } else {
                clearError(mensaje);
            }
            
            // Si todo es válido, mostrar mensaje de éxito
            if (isValid) {
                alert('¡Mensaje enviado con éxito! Gracias por contactarnos.');
                contactForm.reset();
            }
        });
    }
    
    // Función para mostrar error
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        errorMsg.innerText = message;
        formGroup.classList.add('error');
        input.classList.add('error-input');
    }
    
    // Función para limpiar error
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        errorMsg.innerText = '';
        formGroup.classList.remove('error');
        input.classList.remove('error-input');
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .curso-card, .miembro-card, .contacto-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                if (element.classList.contains('about-content')) {
                    element.querySelector('.about-image').classList.add('slide-left');
                    element.querySelector('.about-text').classList.add('slide-right');
                } else {
                    element.classList.add('fade-in');
                }
            }
        });
    };
    
    // Ejecutar animaciones al cargar la página
    animateOnScroll();
    
    // Ejecutar animaciones al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
});