// Base de conocimiento del Chatbot
const chatData = [
    // --- SALUDOS Y BÁSICOS ---
    {
        keywords: ["hola", "buenos", "buenas", "que tal", "hey", "inicio", "empezar", "menu"],
        response: "¡Hola! 👋 Soy el asistente virtual de Moon Dev. Puedo ayudarte con:<br><br>✨ <strong>Servicios</strong> (Web, Soporte, Excel)<br>💰 <strong>Cotizaciones</strong><br>📍 <strong>Ubicación</strong><br>👩‍💻 <strong>Sobre Mónica</strong><br><br>¿Qué te gustaría saber?"
    },
    {
        keywords: ["adios", "bye", "gracias", "hasta luego", "cerrar"],
        response: "¡Fue un placer! Si tienes más dudas, aquí estaré. Que tengas un día productivo. 🚀"
    },

    // --- SERVICIOS ESPECÍFICOS ---
    {
        keywords: ["servicios", "que haces", "que ofreces", "catalogo"],
        response: "Ofrezco soluciones en tres áreas clave:<br>1. 🌐 <strong>Desarrollo Web:</strong> Sitios, Portafolios y Landing Pages.<br>2. 🛠️ <strong>Soporte Técnico:</strong> Mantenimiento, formateo y optimización.<br>3. 📊 <strong>Datos:</strong> Automatización con Excel y Macros."
    },
    {
        keywords: ["web", "pagina", "sitio", "landing", "internet"],
        response: "Desarrollo sitios web modernos y responsivos (que se ven bien en celular). Ideales para portafolios, negocios locales o marcas personales. Uso HTML, CSS, JS y Python. 💻"
    },
    {
        keywords: ["soporte", "tecnico", "mantenimiento", "lenta", "virus", "computadora", "laptop", "pc"],
        response: "¿Tu equipo falla? 🔧 Ofrezco soluciones flexibles:<br>1. 🏠 <strong>Presencial:</strong> En Villahermosa (Hardware/Limpieza física).<br>2. 🌐 <strong>Remoto:</strong> ¡Atiendo a todo México! Te ayudo a distancia con tu PC para limpiar virus, instalar programas y optimizar velocidad."
    },
    {
        keywords: ["remoto", "a distancia", "teamviewer", "anydesk", "lejos", "online"],
        response: "¡Sí! 🖥️ Si tienes internet, puedo arreglar problemas de software a distancia (virus, lentitud, drivers). Usamos herramientas seguras como AnyDesk o TeamViewer. ¡Es rápido y sin que salgas de casa!"
    },
    {
        keywords: ["excel", "datos", "automatizacion", "macros", "tablas", "admin"],
        response: "Gracias a mi perfil administrativo, soy experta en Excel. 📉 Puedo crear plantillas automatizadas, dashboards y macros para que ahorres horas de trabajo manual."
    },

    // --- COTIZACIONES Y PAGOS ---
    {
        keywords: ["precio", "costo", "cuanto", "cobras", "cotizacion", "presupuesto", "tarifa"],
        response: "Cada proyecto es único ✨. <br>- <strong>Soporte:</strong> Desde precios base por servicio.<br>- <strong>Web/Excel:</strong> Depende de la complejidad.<br><br>¡Escríbeme por WhatsApp para darte un estimado rápido!"
    },
    {
        keywords: ["pagos", "factura", "transferencia", "dinero", "metodos"],
        response: "Acepto transferencias bancarias 💳 y efectivo. Para proyectos grandes, solemos trabajar con un anticipo del 50% para iniciar."
    },

    // --- CONTACTO Y UBICACIÓN ---
    {
        keywords: ["contacto", "telefono", "celular", "whatsapp", "llamar", "correo", "email"],
        response: "¡Hablemos! 💬<br>📱 <strong>WhatsApp:</strong> <a href='https://wa.me/529931546794' target='_blank'>+52 993 154 6794</a><br>📧 <strong>Correo:</strong> m.camacho.dev@gmail.com"
    },
    {
        keywords: ["ubicacion", "donde", "pais", "ciudad", "villahermosa", "tabasco"],
        response: "Estoy en <strong>Villahermosa, Tabasco, México 🇲🇽</strong>. <br>Hago soporte técnico presencial en la ciudad y desarrollo web/datos de forma remota para todo el mundo. 🌎"
    },
    {
        keywords: ["horario", "horas", "cuando", "abierto"],
        response: "Suelo responder mensajes de Lunes a Viernes de 9:00 AM a 6:00 PM. Si escribes fuera de horario, te contestaré a primera hora del día siguiente. ⏰"
    },

    // --- PERFIL PROFESIONAL (AUTORIDAD) ---
    {
        keywords: ["monica", "quien eres", "perfil", "experiencia", "estudios", "ingeniera"],
        response: "Soy <strong>Mónica Camacho</strong>. 👩‍🎓<br>Ingeniera en Sistemas Computacionales con carrera técnica en Contabilidad. Esta mezcla me permite entender tanto el código como las necesidades de tu negocio."
    },
    {
        keywords: ["cv", "curriculum", "hoja de vida", "resume"],
        response: "¡Claro! Puedes ver y descargar mi CV actualizado directamente en la sección de 'Inicio' de esta página, o solicitármelo por correo. 📄"
    },
    {
        keywords: ["stack", "tecnologias", "lenguajes", "programas"],
        response: "Mi caja de herramientas incluye: 🛠️<br>- <strong>Web:</strong> HTML5, CSS3, JavaScript, Bootstrap.<br>- <strong>Backend/Datos:</strong> Python, SQL.<br>- <strong>Admin:</strong> Excel Avanzado (VBA/Macros)."
    },

    // --- PERSONALIDAD / VARIOS ---
    {
        keywords: ["moon", "luna", "nombre", "marca"],
        response: "Moon Dev nace de mi apodo 'Moon' (o Moni) y mi gusto por la estética nocturna y el enfoque tranquilo para resolver problemas complejos. 🌙"
    },
    {
        keywords: ["ayuda", "help", "soporte"],
        response: "Intenta escribiendo palabras clave como: 'servicios', 'contacto', 'precios' o 'experiencia'. ¡Estoy aprendiendo!"
    }
];

// Respuesta por defecto
const defaultResponse = "Mmm, no estoy segura de entender eso 🤔. Intenta preguntar por mis 'servicios', 'contacto' o 'precios'.";