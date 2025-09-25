/* ===============================================
   SERVICIO TÉCNICO DE TELEVISIÓN SMART TV
   JavaScript para funcionalidad interactiva especializada
   =============================================== */

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('📺 Servicio Técnico de TV cargado correctamente');
    
    // ===============================================
    // MANEJO DEL FORMULARIO DE CONTACTO ESPECIALIZADO
    // ===============================================
    
    // Obtenemos el formulario por su ID
    const contactForm = document.getElementById('contactForm');
    
    // Agregamos un event listener para cuando se envíe el formulario
    contactForm.addEventListener('submit', function(event) {
        // Prevenimos el comportamiento por defecto del formulario
        event.preventDefault();
        
        // Obtenemos los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const marca = document.getElementById('marca').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica de campos requeridos
        if (!nombre || !correo || !mensaje) {
            mostrarAlerta('⚠️ Por favor, completa todos los campos obligatorios.', 'warning');
            return;
        }
        
        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            mostrarAlerta('⚠️ Por favor, ingresa un correo electrónico válido.', 'warning');
            return;
        }
        
        // Validación de teléfono (si se proporciona)
        if (telefono && !validarTelefono(telefono)) {
            mostrarAlerta('⚠️ Por favor, ingresa un número de teléfono válido.', 'warning');
            return;
        }
        
        // Mostrar indicador de carga
        mostrarIndicadorCarga();
        
        // Simulamos el envío del formulario después de 2 segundos
        setTimeout(() => {
            // Log del formulario enviado
            console.log('📧 Formulario de consulta técnica enviado correctamente');
            console.log('👤 Cliente:', nombre);
            console.log('📬 Correo:', correo);
            console.log('📱 Teléfono:', telefono || 'No proporcionado');
            console.log('📺 Marca de TV:', marca || 'No especificada');
            console.log('🔧 Problema reportado:', mensaje);
            
            // Mostrar mensaje de éxito
            mostrarMensajeExito(nombre, marca);
            
            // Limpiar el formulario
            contactForm.reset();
        }, 2000);
    });
    
    // ===============================================
    // FUNCIONES DE VALIDACIÓN
    // ===============================================
    
    function validarTelefono(telefono) {
        // Expresión regular para validar teléfonos (formato flexible)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(telefono.replace(/[\s\-\(\)]/g, ''));
    }
    
    // ===============================================
    // FUNCIÓN PARA MOSTRAR INDICADOR DE CARGA
    // ===============================================
    function mostrarIndicadorCarga() {
        const submitButton = document.querySelector('.submit-button');
        const originalContent = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando consulta...';
        submitButton.disabled = true;
        
        // Guardamos el contenido original para restaurarlo después
        submitButton.dataset.originalContent = originalContent;
    }
    
    function restaurarBoton() {
        const submitButton = document.querySelector('.submit-button');
        const originalContent = submitButton.dataset.originalContent;
        
        if (originalContent) {
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
        }
    }
    
    // ===============================================
    // FUNCIÓN PARA MOSTRAR MENSAJE DE ÉXITO PERSONALIZADO
    // ===============================================
    function mostrarMensajeExito(nombre, marca) {
        // Restaurar el botón
        restaurarBoton();
        
        // Mensaje personalizado según la marca
        let mensajeMarca = '';
        if (marca) {
            const marcasNombres = {
                'samsung': 'Samsung',
                'lg': 'LG',
                'sony': 'Sony',
                'hisense': 'Hisense',
                'tcl': 'TCL',
                'otra': 'tu marca'
            };
            mensajeMarca = ` para tu ${marcasNombres[marca] || marca}`;
        }
        
        // Creamos un elemento para mostrar el mensaje
        const mensajeExito = document.createElement('div');
        mensajeExito.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #00d5ff, #9fd5d1);
                color: white;
                padding: 30px 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                text-align: center;
                font-weight: bold;
                max-width: 400px;
                animation: fadeInSuccess 0.5s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📺✅</div>
                <div style="font-size: 1.2rem; margin-bottom: 1rem;">
                    ¡Consulta enviada exitosamente!
                </div>
                <div style="font-size: 1rem; opacity: 0.9;">
                    Hola ${nombre}, he recibido tu consulta${mensajeMarca}. 
                    Te responderé en menos de 24 horas con un diagnóstico 
                    y presupuesto sin compromiso.
                </div>
                <div style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.8;">
                    <i class="fas fa-phone"></i> También puedes llamar al +1 (555) 123-4567
                </div>
            </div>
        `;
        
        // Agregamos estilos CSS para la animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInSuccess {
                from { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Agregamos el mensaje al body
        document.body.appendChild(mensajeExito);
        
        // Removemos el mensaje después de 5 segundos
        setTimeout(() => {
            mensajeExito.remove();
            style.remove();
        }, 5000);
    }
    
    // ===============================================
    // FUNCIÓN PARA MOSTRAR ALERTAS
    // ===============================================
    function mostrarAlerta(mensaje, tipo = 'info') {
        const colores = {
            'warning': '#ffc107',
            'error': '#dc3545',
            'info': '#17a2b8',
            'success': '#28a745'
        };
        
        const alerta = document.createElement('div');
        alerta.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${colores[tipo]};
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            ">
                ${mensaje}
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
            style.remove();
        }, 4000);
    }
    
    // ===============================================
    // NAVEGACIÓN SUAVE (SMOOTH SCROLLING)
    // ===============================================
    
    // Obtenemos todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Agregamos event listeners a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Solo procesamos enlaces que empiecen con #
            if (this.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                
                // Obtenemos el ID de la sección objetivo
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                // Si la sección existe, hacemos scroll suave
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    console.log(`🔗 Navegando a la sección: ${targetId}`);
                }
            }
        });
    });
    
    // ===============================================
    // EFECTO DE APARICIÓN AL HACER SCROLL
    // ===============================================
    
    // Función para verificar si un elemento está visible
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para agregar animación a los elementos
    function animateOnScroll() {
        const cards = document.querySelectorAll('.experience-card, .project-card');
        
        cards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                // Delay escalonado para efecto más dinámico
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ease forwards`;
                }, index * 100);
                
                console.log('✨ Animando elemento:', card.querySelector('h3')?.textContent || 'Tarjeta');
            }
        });
    }
    
    // Agregamos el event listener para el scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Ejecutamos la animación inicial
    animateOnScroll();
    
    // ===============================================
    // EFECTOS INTERACTIVOS ESPECIALIZADOS
    // ===============================================
    
    // Efecto hover mejorado para las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            console.log('🖱️ Hover en proyecto:', this.querySelector('h3')?.textContent);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto para los botones de "Ver más"
    const projectButtons = document.querySelectorAll('.project-button');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
            const projectTags = Array.from(this.closest('.project-card').querySelectorAll('.tag')).map(tag => tag.textContent);
            
            console.log(`🔍 Ver más del proyecto: ${projectTitle}`);
            console.log(`🏷️ Tags: ${projectTags.join(', ')}`);
            
            // Mostrar información detallada del proyecto
            mostrarDetallesProyecto(projectTitle, projectTags);
        });
    });
    
    // ===============================================
    // FUNCIÓN PARA MOSTRAR DETALLES DEL PROYECTO
    // ===============================================
    function mostrarDetallesProyecto(titulo, tags) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 20px;
                    max-width: 500px;
                    margin: 20px;
                    text-align: center;
                    animation: scaleIn 0.3s ease;
                ">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📺</div>
                    <h3 style="color: #00d5ff; margin-bottom: 1rem;">${titulo}</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        Este es un proyecto de ejemplo. En una implementación real, aquí se mostrarían 
                        detalles completos del trabajo realizado, fotos del antes y después, 
                        testimonios del cliente y más información técnica.
                    </p>
                    <div style="margin-bottom: 1.5rem;">
                        ${tags.map(tag => `<span style="background: #9fd5d1; color: #222; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; margin: 0.2rem; display: inline-block;">${tag}</span>`).join('')}
                    </div>
                    <button onclick="this.closest('.modal').remove()" style="
                        background: #00d5ff;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 25px;
                        font-weight: bold;
                        cursor: pointer;
                    ">
                        Cerrar
                    </button>
                </div>
            </div>
        `;
        
        modal.className = 'modal';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });
    }
    
    // ===============================================
    // FUNCIONALIDAD ADICIONAL PARA SERVICIO TÉCNICO
    // ===============================================
    
    // Contador de visitas (simulado)
    let visitas = localStorage.getItem('visitasServicioTV') || 0;
    visitas++;
    localStorage.setItem('visitasServicioTV', visitas);
    console.log(`📊 Visitas a la página: ${visitas}`);
    
    // Función para mostrar información de contacto rápido
    function mostrarContactoRapido() {
        const contactoRapido = document.createElement('div');
        contactoRapido.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(45deg, #ff6b35, #f7931e);
                color: white;
                padding: 15px 20px;
                border-radius: 50px;
                box-shadow: 0 5px 20px rgba(255, 107, 53, 0.4);
                z-index: 1000;
                cursor: pointer;
                animation: pulse 2s infinite;
            ">
                <i class="fas fa-phone" style="margin-right: 8px;"></i>
                Llamar Ahora
            </div>
        `;
        
        contactoRapido.addEventListener('click', function() {
            window.open('tel:+15551234567');
        });
        
        document.body.appendChild(contactoRapido);
    }
    
    // Mostrar botón de contacto rápido después de 3 segundos
    setTimeout(mostrarContactoRapido, 3000);
    
    // ===============================================
    // MENSAJE DE BIENVENIDA ESPECIALIZADO EN CONSOLA
    // ===============================================
    
    console.log(`
    📺 ===============================================
    📺    SERVICIO TÉCNICO DE TV - CARGADO
    📺 ===============================================
    📺 
    📺 ✅ JavaScript inicializado correctamente
    📺 ✅ Formulario de consulta técnica configurado
    📺 ✅ Navegación suave activada
    📺 ✅ Efectos de animación habilitados
    📺 ✅ Validaciones de formulario implementadas
    📺 
    📺 🔧 Funcionalidades especializadas:
    📺    • Formulario con validación de marca de TV
    📺    • Diagnóstico personalizado por marca
    📺    • Contacto rápido por teléfono
    📺    • Modal de detalles de proyectos
    📺    • Contador de visitas
    📺    • Alertas personalizadas
    📺 
    📺 📞 Contacto: +1 (555) 123-4567
    📺 📧 Email: ana.jimenez@serviciotv.com
    📺 
    📺 ===============================================
    `);
});

// ===============================================
// FUNCIONES GLOBALES (fuera del DOMContentLoaded)
// ===============================================

// Función para mostrar información del servicio técnico
function mostrarInfoServicio() {
    console.log(`
    🔧 ===============================================
    🔧    INFORMACIÓN DEL SERVICIO TÉCNICO
    🔧 ===============================================
    🔧 
    🔧 📋 Servicio: Reparación Smart TV
    🔧 👩‍🔧 Técnico: Ana T. Jiménez P
    🔧 📺 Especialidad: Televisores Inteligentes
    🔧 📅 Año: 2025
    🔧 
    🔧 🛠️ Tecnologías del sitio:
    🔧    • HTML5 semántico
    🔧    • CSS3 con variables y Grid/Flexbox
    🔧    • JavaScript vanilla (ES6+)
    🔧    • Diseño responsive
    🔧    • Animaciones CSS avanzadas
    🔧    • Validaciones de formulario
    🔧 
    🔧 📺 Marcas soportadas:
    🔧    • Samsung Smart TV
    🔧    • LG OLED/WebOS
    🔧    • Sony Android TV
    🔧    • Hisense ULED
    🔧    • TCL Roku TV
    🔧    • Y muchas más...
    🔧 
    🔧 ===============================================
    `);
}

// Función para diagnóstico rápido (simulado)
function diagnosticoRapido(marca, problema) {
    console.log(`🔍 Diagnóstico rápido para ${marca}:`);
    console.log(`📋 Problema reportado: ${problema}`);
    console.log(`⏱️ Tiempo estimado de reparación: 2-4 horas`);
    console.log(`💰 Rango de costo: $80 - $200 USD`);
    console.log(`🛠️ Piezas necesarias: Evaluación en sitio`);
    console.log(`📞 Contacto inmediato recomendado`);
}