// Funcionalidades de accesibilidad para el Centro Educativo

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const highContrastToggle = document.getElementById('high-contrast');
    const largeTextToggle = document.getElementById('large-text');
    const textSpacingToggle = document.getElementById('text-spacing');
    const largeCursorToggle = document.getElementById('large-cursor');
    const textToSpeechToggle = document.getElementById('text-to-speech');
    
    // Variable para controlar si el texto a voz está activo
    let textToSpeechActive = false;
    
    // Verificar si el navegador soporta la API de síntesis de voz
    const speechSynthesisSupported = 'speechSynthesis' in window;
    
    // Función para mostrar/ocultar el panel de accesibilidad
    accessibilityToggle.addEventListener('click', function() {
        accessibilityPanel.classList.toggle('active');
    });
    
    // Cerrar panel al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!accessibilityPanel.contains(event.target) && event.target !== accessibilityToggle) {
            accessibilityPanel.classList.remove('active');
        }
    });
    
    // Función para alto contraste
    highContrastToggle.addEventListener('change', function() {
        document.body.classList.toggle('high-contrast', this.checked);
        // Guardar preferencia en localStorage
        localStorage.setItem('highContrast', this.checked);
    });
    
    // Función para texto ampliado
    largeTextToggle.addEventListener('change', function() {
        document.body.classList.toggle('large-text', this.checked);
        // Guardar preferencia en localStorage
        localStorage.setItem('largeText', this.checked);
    });
    
    // Función para espaciado de texto
    textSpacingToggle.addEventListener('change', function() {
        document.body.classList.toggle('text-spacing', this.checked);
        // Guardar preferencia en localStorage
        localStorage.setItem('textSpacing', this.checked);
    });
    
    // Función para cursor ampliado
    largeCursorToggle.addEventListener('change', function() {
        document.body.classList.toggle('large-cursor', this.checked);
        // Guardar preferencia en localStorage
        localStorage.setItem('largeCursor', this.checked);
    });
    
    // Función para texto a voz
    if (speechSynthesisSupported) {
        textToSpeechToggle.addEventListener('change', function() {
            textToSpeechActive = this.checked;
            document.body.classList.toggle('text-to-speech-active', this.checked);
            // Guardar preferencia en localStorage
            localStorage.setItem('textToSpeech', this.checked);
            
            // Añadir o quitar los event listeners para el texto a voz
            if (this.checked) {
                addTextToSpeechListeners();
            } else {
                removeTextToSpeechListeners();
                // Detener cualquier síntesis de voz en curso
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                }
            }
        });
    } else {
        // Si el navegador no soporta la API, deshabilitar la opción
        textToSpeechToggle.disabled = true;
        textToSpeechToggle.parentElement.classList.add('disabled');
        const description = textToSpeechToggle.parentElement.nextElementSibling;
        if (description) {
            description.textContent = 'Tu navegador no soporta esta función';
        }
    }
    
    // Cargar preferencias guardadas
    function loadAccessibilityPreferences() {
        // Alto contraste
        if (localStorage.getItem('highContrast') === 'true') {
            highContrastToggle.checked = true;
            document.body.classList.add('high-contrast');
        }
        
        // Texto ampliado
        if (localStorage.getItem('largeText') === 'true') {
            largeTextToggle.checked = true;
            document.body.classList.add('large-text');
        }
        
        // Espaciado de texto
        if (localStorage.getItem('textSpacing') === 'true') {
            textSpacingToggle.checked = true;
            document.body.classList.add('text-spacing');
        }
        
        // Cursor ampliado
        if (localStorage.getItem('largeCursor') === 'true') {
            largeCursorToggle.checked = true;
            document.body.classList.add('large-cursor');
        }
        
        // Texto a voz
        if (speechSynthesisSupported && localStorage.getItem('textToSpeech') === 'true') {
            textToSpeechToggle.checked = true;
            textToSpeechActive = true;
            document.body.classList.add('text-to-speech-active');
            addTextToSpeechListeners();
        }
    }
    
    // Inicializar preferencias guardadas
    loadAccessibilityPreferences();
    
    // Añadir navegación por teclado
    document.addEventListener('keydown', function(e) {
        // Abrir/cerrar panel de accesibilidad con Alt+A
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            accessibilityPanel.classList.toggle('active');
        }
        
        // Cerrar panel con Escape
        if (e.key === 'Escape' && accessibilityPanel.classList.contains('active')) {
            accessibilityPanel.classList.remove('active');
        }
    });
    
    // Añadir clase para enfoque visible a todos los elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    interactiveElements.forEach(element => {
        element.classList.add('focus-visible');
    });
    
    // Funciones para texto a voz
    function speakText(text) {
        if (!speechSynthesisSupported || !textToSpeechActive) return;
        
        // Cancelar cualquier síntesis de voz en curso
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        // Crear un nuevo objeto de síntesis de voz
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configurar el idioma en español
        utterance.lang = 'es-ES';
        
        // Iniciar la síntesis de voz
        window.speechSynthesis.speak(utterance);
    }
    
    function handleTextToSpeech(event) {
        // Verificar si el texto a voz está activo
        if (!textToSpeechActive) return;
        
        // Obtener el texto del elemento clickeado o su contenido
        let text = '';
        
        // Si es un elemento de formulario
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            // Para inputs y textareas, leer el placeholder o el valor
            text = event.target.placeholder || event.target.value || event.target.getAttribute('aria-label') || 'Campo de entrada';
        } else if (event.target.tagName === 'IMG') {
            // Para imágenes, leer el alt text
            text = event.target.alt || 'Imagen';
        } else {
            // Para otros elementos, obtener el texto visible
            text = event.target.textContent.trim();
            
            // Si no hay texto, intentar obtener el aria-label
            if (!text) {
                text = event.target.getAttribute('aria-label') || '';
            }
        }
        
        // Si hay texto para leer
        if (text) {
            speakText(text);
        }
    }
    
    function addTextToSpeechListeners() {
        // Añadir el event listener a todo el documento
        document.addEventListener('click', handleTextToSpeech);
    }
    
    function removeTextToSpeechListeners() {
        // Quitar el event listener
        document.removeEventListener('click', handleTextToSpeech);
    }
});