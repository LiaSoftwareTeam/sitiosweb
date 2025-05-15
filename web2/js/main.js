document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    const contactForm = document.getElementById('contactForm');
    const revealElements = document.querySelectorAll('.reveal');

    // Función para manejar el menú hamburguesa
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Scroll suave para enlaces de navegación
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

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 37, 64, 0.98)';
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(10, 37, 64, 0.95)';
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        // Animaciones al hacer scroll
        revealOnScroll();
    });

    // Filtro para el equipo
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            teamMembers.forEach(member => {
                if (filterValue === 'todos') {
                    member.style.display = 'block';
                    setTimeout(() => {
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, 100);
                } else if (member.getAttribute('data-category') === filterValue) {
                    member.style.display = 'block';
                    setTimeout(() => {
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    member.style.opacity = '0';
                    member.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        member.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Validación del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validar campos requeridos
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const errorMessage = input.nextElementSibling;
                if (input.value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    errorMessage.textContent = 'Este campo es obligatorio';
                    errorMessage.style.display = 'block';
                } else {
                    input.style.borderColor = '#e9ecef';
                    errorMessage.style.display = 'none';
                }
            });
            
            // Validar formato de email
            const emailInput = this.querySelector('#email');
            const emailError = emailInput.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#dc3545';
                emailError.textContent = 'Por favor, introduce un email válido';
                emailError.style.display = 'block';
            }
            
            // Si el formulario es válido, mostrar mensaje de éxito
            if (isValid) {
                alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                this.reset();
            }
        });
    }

    // Función para revelar elementos al hacer scroll
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Inicializar animaciones al cargar la página
    revealOnScroll();
});