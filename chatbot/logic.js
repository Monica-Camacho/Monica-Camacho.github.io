document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar el HTML del Chatbot en la página
    const chatContainer = document.createElement("div");
    chatContainer.id = "moon-chatbot";
    
    // Ruta del avatar para la CABECERA
    const avatarPath = "img/avatar/chatbot.png"; 

    chatContainer.innerHTML = `
        <button id="chat-toggle-btn">
            <i class="ph ph-chat-teardrop-dots"></i> <span class="notification-dot"></span> </button>

        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <div class="header-info">
                    <img src="${avatarPath}" alt="Moon Bot" class="bot-avatar-large">
                    <div class="header-text">
                        <span class="name">Asistente Moon</span>
                        <span class="status">En línea</span>
                    </div>
                </div>
                <button id="chat-close-btn"><i class="ph ph-x"></i></button>
            </div>
            
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    ¡Hola! Soy el asistente virtual. 👋 ¿En qué puedo ayudarte hoy?
                </div>
            </div>
            
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Escribe aquí..." autocomplete="off">
                <button id="chat-send"><i class="ph ph-paper-plane-right"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // 2. Variables y Selectores
    const toggleBtn = document.getElementById("chat-toggle-btn");
    const closeBtn = document.getElementById("chat-close-btn");
    const chatWindow = document.getElementById("chat-window");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    const messagesArea = document.getElementById("chat-messages");

    // 3. Funciones
    function toggleChat() {
        chatWindow.classList.toggle("active");
        if (chatWindow.classList.contains("active")) {
            chatInput.focus();
            // Ocultar puntito de notificación al abrir
            const dot = document.querySelector(".notification-dot");
            if(dot) dot.style.display = "none";
        }
    }

    function addMessage(text, sender) {
        const div = document.createElement("div");
        div.classList.add("message", sender);
        div.innerHTML = text;
        messagesArea.appendChild(div);
        messagesArea.scrollTop = messagesArea.scrollHeight; 
    }

    function processInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Mensaje usuario
        addMessage(text, "user");
        chatInput.value = "";

        // 2. Efecto "Escribiendo..."
        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("message", "bot", "loading-msg");
        loadingDiv.innerHTML = '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
        messagesArea.appendChild(loadingDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;

        // 3. Respuesta del bot
        setTimeout(() => {
            messagesArea.removeChild(loadingDiv);
            const response = findResponse(text);
            addMessage(response, "bot");
        }, 800);
    }

    function findResponse(userInput) {
        const cleanInput = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (typeof chatData !== 'undefined') {
            const match = chatData.find(item => 
                item.keywords.some(keyword => cleanInput.includes(keyword))
            );
            return match ? match.response : defaultResponse;
        }
        return "Error: No puedo acceder a mi base de datos.";
    }

    // 4. Event Listeners
    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);
    sendBtn.addEventListener("click", processInput);
    
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processInput();
    });
});