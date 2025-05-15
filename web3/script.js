document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const personalizaForm = document.getElementById('personaliza-form');
    const contactForm = document.getElementById('contact-form');
    const testimoniosTrack = document.querySelector('.testimonios-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // ===== Toggle de Tema Oscuro/Claro =====
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }
    
    // Función para cambiar el tema
    function toggleTheme() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    }
    
    // Event listener para el botón de tema
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // ===== Menú Móvil =====
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('menu-open');
        
        // Añadir índices para animación escalonada
        const navItems = document.querySelectorAll('.nav-links li');
        navItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
        });
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('menu-open');
        });
    });
    
    // ===== Scroll Suave =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // ===== Personalización de Moto =====
    if (personalizaForm) {
        const colorInputs = document.querySelectorAll('input[name="color"]');
        const modeloSelect = document.getElementById('modelo');
        const motoPreviewImg = document.getElementById('moto-preview-img');
        const colorOverlay = document.querySelector('.color-overlay');
        
        // Imágenes de modelos
        const modelImages = {
            quantum: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg',
            nebula: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
            vortex: 'https://images.pexels.com/photos/163210/motorcycle-racer-racing-race-163210.jpeg',
            eclipse: 'https://images.pexels.com/photos/595807/pexels-photo-595807.jpeg',
            phantom: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg',
            stealth: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg'
        };
        
        // Colores
        const colors = {
            neon: '#39ff14',
            purple: '#9d4edd',
            blue: '#00f0ff',
            red: '#ff3860'
        };
        
        // Actualizar imagen de moto según modelo seleccionado
        modeloSelect.addEventListener('change', function() {
            const selectedModel = this.value;
            motoPreviewImg.src = modelImages[selectedModel];
        });
        
        // Actualizar color de moto
        colorInputs.forEach(input => {
            input.addEventListener('change', function() {
                const selectedColor = this.value;
                colorOverlay.style.backgroundColor = colors[selectedColor];
            });
        });
        
        // Envío del formulario de personalización
        personalizaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recopilar datos del formulario
            const formData = new FormData(this);
            const modelo = formData.get('modelo');
            const color = formData.get('color');
            const accesorios = formData.getAll('accesorios[]');
            
            // Mostrar mensaje de confirmación
            alert(`¡Configuración enviada!\nModelo: ${modelo}\nColor: ${color}\nAccesorios: ${accesorios.join(', ') || 'Ninguno'}`);
            
            // Aquí se podría enviar los datos a un servidor
        });
    }
    
    // ===== Slider de Testimonios =====
    if (testimoniosTrack) {
        const testimonioCards = document.querySelectorAll('.testimonio-card');
        let currentIndex = 0;
        
        // Configurar ancho inicial
        function setupSlider() {
            const cardWidth = testimonioCards[0].offsetWidth;
            testimoniosTrack.style.width = `${cardWidth * testimonioCards.length}px`;
            testimonioCards.forEach(card => {
                card.style.width = `${cardWidth}px`;
            });
        }
        
        // Mover slider
        function moveSlider(index) {
            const cardWidth = testimonioCards[0].offsetWidth;
            testimoniosTrack.style.transform = `translateX(-${index * cardWidth}px)`;
            currentIndex = index;
        }
        
        // Event listeners para botones
        nextBtn.addEventListener('click', () => {
            if (currentIndex < testimonioCards.length - 1) {
                moveSlider(currentIndex + 1);
            } else {
                moveSlider(0); // Volver al inicio
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                moveSlider(currentIndex - 1);
            } else {
                moveSlider(testimonioCards.length - 1); // Ir al último
            }
        });
        
        // Auto-rotación
        let sliderInterval = setInterval(() => {
            if (currentIndex < testimonioCards.length - 1) {
                moveSlider(currentIndex + 1);
            } else {
                moveSlider(0);
            }
        }, 5000);
        
        // Detener auto-rotación al interactuar
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            
            btn.addEventListener('mouseleave', () => {
                sliderInterval = setInterval(() => {
                    if (currentIndex < testimonioCards.length - 1) {
                        moveSlider(currentIndex + 1);
                    } else {
                        moveSlider(0);
                    }
                }, 5000);
            });
        });
        
        // Inicializar slider
        setupSlider();
        
        // Reajustar slider al cambiar tamaño de ventana
        window.addEventListener('resize', setupSlider);
    }
    
    // ===== Validación de Formulario de Contacto =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validación básica
            if (nombre === '') {
                showError('nombre', 'Por favor, introduce tu nombre');
                return;
            }
            
            if (email === '') {
                showError('email', 'Por favor, introduce tu email');
                return;
            } else if (!isValidEmail(email)) {
                showError('email', 'Por favor, introduce un email válido');
                return;
            }
            
            if (mensaje === '') {
                showError('mensaje', 'Por favor, introduce un mensaje');
                return;
            }
            
            // Si todo está bien, mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            this.reset();
            
            // Aquí se podría enviar los datos a un servidor
        });
        
        // Función para mostrar errores
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            
            // Añadir clase de error
            field.classList.add('error');
            
            // Crear mensaje de error si no existe
            let errorMessage = field.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.style.color = '#ff3860';
                errorMessage.style.fontSize = '0.85rem';
                errorMessage.style.marginTop = '0.25rem';
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
            
            errorMessage.textContent = message;
            
            // Quitar error al escribir
            field.addEventListener('input', function() {
                field.classList.remove('error');
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            });
        }
        
        // Validar formato de email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // ===== Efectos de Scroll =====
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    // Iniciar animaciones
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
    
    // ===== Efecto Parallax en Hero =====
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
});