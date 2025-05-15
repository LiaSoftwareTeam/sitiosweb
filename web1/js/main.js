document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const miembros = document.querySelectorAll('.miembro-card');
    const contactForm = document.getElementById('contactForm');
    const navItems = document.querySelectorAll('.nav-links a, .footer-links a, .btn');
    
    let currentSlide = 0;
    let slideInterval;

    // Iniciar el slider automático
    startSlider();

    // Función para iniciar el slider automático
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Función para detener el slider automático
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Función para mostrar un slide específico
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event Listeners para los botones del slider
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });

    // Menú hamburguesa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Filtrado de miembros del equipo
    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filtrosBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            btn.classList.add('active');
            
            const filtro = btn.getAttribute('data-filter');
            
            // Filtrar miembros
            miembros.forEach(miembro => {
                if (filtro === 'todos') {
                    miembro.style.display = 'block';
                    setTimeout(() => {
                        miembro.style.opacity = '1';
                        miembro.style.transform = 'translateY(0)';
                    }, 100);
                } else if (miembro.getAttribute('data-area') === filtro) {
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
            });
        });
    });

    // Scroll suave para los enlaces
    navItems.forEach(link => {
        if (link.hash) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Validación del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            // Validar nombre
            if (nombre.value.trim() === '') {
                showError(nombre, 'El nombre es requerido');
                isValid = false;
            } else {
                clearError(nombre);
            }
            
            // Validar email
            if (email.value.trim() === '') {
                showError(email, 'El email es requerido');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingrese un email válido');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validar mensaje
            if (mensaje.value.trim() === '') {
                showError(mensaje, 'El mensaje es requerido');
                isValid = false;
            } else {
                clearError(mensaje);
            }
            
            // Si el formulario es válido, mostrar mensaje de éxito
            if (isValid) {
                // Aquí normalmente enviarías los datos al servidor
                // Simulamos una respuesta exitosa
                contactForm.reset();
                
                // Crear y mostrar mensaje de éxito
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                
                contactForm.appendChild(successMsg);
                setTimeout(() => {
                    successMsg.classList.add('show');
                }, 10);
                
                // Remover mensaje después de 5 segundos
                setTimeout(() => {
                    successMsg.classList.remove('show');
                    setTimeout(() => {
                        contactForm.removeChild(successMsg);
                    }, 500);
                }, 5000);
            }
        });
    }

    // Función para mostrar error en el formulario
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        
        errorMsg.textContent = message;
        formGroup.classList.add('error');
        input.classList.add('shake');
        
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }

    // Función para limpiar error
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        
        errorMsg.textContent = '';
        formGroup.classList.remove('error');
    }

    // Función para validar email
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animaciones al hacer scroll
    const revealElements = document.querySelectorAll('.about-content, .curso-card, .miembro-card, .contacto-container');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('reveal', 'active');
            }
        });
    }
    
    // Ejecutar al cargar la página
    revealOnScroll();
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', revealOnScroll);
});