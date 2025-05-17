// Función para crear y mostrar la modal
function createModal(title, content) {
    // Crear elementos de la modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', 'modal-title');

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const modalTitle = document.createElement('h2');
    modalTitle.id = 'modal-title';
    modalTitle.textContent = title;

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Cerrar modal');

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = content;

    // Estructurar la modal
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalOverlay.appendChild(modalContent);

    // Añadir la modal al body
    document.body.appendChild(modalOverlay);

    // Mostrar la modal con una animación suave
    setTimeout(() => modalOverlay.classList.add('active'), 10);

    // Manejar el cierre de la modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.remove(), 300);
    }

    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Manejar tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // Mantener el foco dentro de la modal
    const focusableElements = modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    modalContent.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    firstFocusable.focus();
}

// Contenido de las carreras
const carrerasInfo = {
    'informatica': {
        titulo: 'Técnico en Informática',
        contenido: `
            <h3>Descripción del Programa</h3>
            <p>Forma profesionales capaces de desarrollar soluciones tecnológicas y mantener infraestructuras informáticas.</p>
            
            <h4>Duración</h4>
            <p>3 años</p>
            
            <h4>Plan de Estudios</h4>
            <ul>
                <li>Programación estructurada y orientada a objetos</li>
                <li>Desarrollo web y móvil</li>
                <li>Bases de datos</li>
                <li>Redes y seguridad informática</li>
                <li>Mantenimiento de hardware y software</li>
            </ul>
            
            <h4>Oportunidades Laborales</h4>
            <ul>
                <li>Desarrollador de software</li>
                <li>Administrador de sistemas</li>
                <li>Soporte técnico</li>
                <li>Analista de sistemas</li>
            </ul>
        `
    },
    'enfermeria': {
        titulo: 'Técnico en Enfermería',
        contenido: `
            <h3>Descripción del Programa</h3>
            <p>Prepara profesionales de la salud capacitados para brindar cuidados integrales a pacientes.</p>
            
            <h4>Duración</h4>
            <p>3 años</p>
            
            <h4>Plan de Estudios</h4>
            <ul>
                <li>Anatomía y fisiología</li>
                <li>Procedimientos básicos de enfermería</li>
                <li>Farmacología</li>
                <li>Atención materno-infantil</li>
                <li>Primeros auxilios y emergencias</li>
            </ul>
            
            <h4>Oportunidades Laborales</h4>
            <ul>
                <li>Hospitales y clínicas</li>
                <li>Centros de salud</li>
                <li>Residencias geriátricas</li>
                <li>Consultorios médicos</li>
            </ul>
        `
    },
    'contabilidad': {
        titulo: 'Técnico en Contabilidad',
        contenido: `
            <h3>Descripción del Programa</h3>
            <p>Forma profesionales expertos en el manejo y control de información financiera y contable.</p>
            
            <h4>Duración</h4>
            <p>3 años</p>
            
            <h4>Plan de Estudios</h4>
            <ul>
                <li>Contabilidad general</li>
                <li>Legislación tributaria</li>
                <li>Software contable</li>
                <li>Análisis financiero</li>
                <li>Costos y presupuestos</li>
            </ul>
            
            <h4>Oportunidades Laborales</h4>
            <ul>
                <li>Asistente contable</li>
                <li>Auxiliar tributario</li>
                <li>Analista de costos</li>
                <li>Gestor administrativo</li>
            </ul>
        `
    },
    'comercio': {
        titulo: 'Técnico en Comercio',
        contenido: `
            <h3>Descripción del Programa</h3>
            <p>Forma profesionales capacitados en la producción agrícola y pecuaria, con conocimientos en manejo sostenible de recursos naturales y tecnología aplicada al campo.</p>
            
            <h4>Duración</h4>
            <p>3 años</p>
            
            <h4>Plan de Estudios</h4>
            <ul>
                 <li>Producción vegetal</li>
  <li>Manejo de animales</li>
  <li>Técnicas de riego y suelos</li>
  <li>Agroindustria y transformación</li>
  <li>Gestión ambiental y sostenibilidad</li>
            </ul>
            
            <h4>Oportunidades Laborales</h4>
            <ul>
               <li>Técnico agropecuario</li>
  <li>Encargado de finca o invernadero</li>
  <li>Asistente en proyectos agrícolas</li>
  <li>Supervisor de producción agropecuaria</li>
            </ul>
        `
    },
    'mercadeo': {
        titulo: 'Técnico en Mercadeo',
        contenido: `
            <h3>Descripción del Programa</h3>
            <p>Forma profesionales especializados en estrategias de marketing y promoción comercial.</p>
            
            <h4>Duración</h4>
            <p>3 años</p>
            
            <h4>Plan de Estudios</h4>
            <ul>
                <li>Marketing digital</li>
                <li>Investigación de mercados</li>
                <li>Publicidad y promoción</li>
                <li>Branding</li>
                <li>Estrategia de contenidos</li>
            </ul>
            
            <h4>Oportunidades Laborales</h4>
            <ul>
                <li>Coordinador de marketing</li>
                <li>Community manager</li>
                <li>Analista de mercados</li>
                <li>Gestor de marca</li>
            </ul>
        `
    },
    'cocina': {
        titulo: 'Técnico en Cocina',
        contenido: `
            <h3>Descripción del Programa</h3>
            <p>Prepara profesionales en el arte culinario y la gestión de cocina.</p>
            
            <h4>Duración</h4>
            <p>3 años</p>
            
            <h4>Plan de Estudios</h4>
            <ul>
                <li>Técnicas culinarias</li>
                <li>Pastelería y panadería</li>
                <li>Cocina internacional</li>
                <li>Gestión de restaurantes</li>
                <li>Seguridad alimentaria</li>
            </ul>
            
            <h4>Oportunidades Laborales</h4>
            <ul>
                <li>Chef de cocina</li>
                <li>Pastelero</li>
                <li>Supervisor de catering</li>
                <li>Gestor de restaurante</li>
            </ul>
        `
    }
};

// Inicializar los eventos de las modales
document.addEventListener('DOMContentLoaded', function() {
    const carrerasLinks = document.querySelectorAll('.galeria-link');
    
    carrerasLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const carrera = this.closest('.galeria-item').querySelector('h3').id.replace('-heading', '');
            const info = carrerasInfo[carrera];
            if (info) {
                createModal(info.titulo, info.contenido);
            }
        });
    });
});