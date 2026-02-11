document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SELECTORES GLOBALES
    // ==========================================================================
    const appContainer = document.querySelector('.app-container');
    const sidebar = document.getElementById('sidebar');
    
    // Botones del Sidebar
    const toggleBtn = document.getElementById('sidebar-toggle');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    
    // Controles de Tema (Ubicados en el Top Bar)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const variantSwitcher = document.getElementById('variant-switcher');
    
    // (Opcional) Contenedor del selector, por si quisiéramos ocultarlo, 
    // pero en este nuevo diseño lo dejamos siempre visible.
    const variantContainer = document.getElementById('variant-container');


    // ==========================================================================
    // 2. LÓGICA DE TEMAS INTELIGENTE (La Magia)
    // ==========================================================================
    
    function applyTheme() {
        // Verificación de seguridad: si no existen los controles, no hacemos nada
        if (!darkModeToggle || !variantSwitcher) return;

        const isDark = darkModeToggle.checked;
        const selectedVariant = variantSwitcher.value; // 'moon', 'espresso', 'ocean'

        if (isDark) {
            // MODO OSCURO INTELIGENTE:
            // En lugar de poner solo 'dark', combinamos "variante + dark".
            // Ejemplo: si elegiste 'moon', aplica 'moon-dark'.
            document.documentElement.setAttribute('data-theme', `${selectedVariant}-dark`);
            
            // Aseguramos que el selector de variantes siga activo
            if(variantContainer) variantContainer.classList.remove('disabled');
        } else {
            // MODO CLARO NORMAL:
            // Aplica el tema tal cual viene del selector (ej: 'moon').
            document.documentElement.setAttribute('data-theme', selectedVariant);
            
            if(variantContainer) variantContainer.classList.remove('disabled');
        }

        // Guardamos las preferencias en la memoria del navegador
        localStorage.setItem('moon-dark-mode', isDark);
        localStorage.setItem('moon-variant', selectedVariant);
    }

    // Escuchamos los cambios en el switch y en el selector
    if(darkModeToggle) darkModeToggle.addEventListener('change', applyTheme);
    if(variantSwitcher) variantSwitcher.addEventListener('change', applyTheme);

    // Función para cargar lo que el usuario guardó la última vez
    function loadSavedPreferences() {
        const savedDark = localStorage.getItem('moon-dark-mode');
        const savedVariant = localStorage.getItem('moon-variant');

        // 1. Restaurar la variante (color)
        if (savedVariant !== null && variantSwitcher) {
            variantSwitcher.value = savedVariant;
        }
        
        // 2. Restaurar el modo oscuro (Check del switch)
        if (savedDark !== null && darkModeToggle) {
            darkModeToggle.checked = (savedDark === 'true');
        }

        // 3. Aplicar los cambios
        applyTheme();
    }
    
    // Ejecutamos la carga al iniciar
    loadSavedPreferences();


    // ==========================================================================
    // 3. CONTROL DEL SIDEBAR (Funcionalidad UI)
    // ==========================================================================
    
    // A) Toggle Desktop (Colapsar barra lateral a modo mini)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            appContainer.classList.toggle('collapsed');
            
            // Rotación del icono de la flecha (< a >)
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (appContainer.classList.contains('collapsed')) {
                    icon.classList.replace('ph-caret-left', 'ph-caret-right');
                } else {
                    icon.classList.replace('ph-caret-right', 'ph-caret-left');
                }
            }
        });
    }

    // B) Toggle Móvil (Abrir/Cerrar menú en celulares)
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al documento
            sidebar.classList.toggle('mobile-active');
        });
    }

    // C) Cerrar sidebar móvil al hacer clic fuera de él (UX)
    document.addEventListener('click', (e) => {
        // Solo aplica si estamos en pantalla pequeña y el menú está abierto
        if (window.innerWidth <= 768 && sidebar && mobileBtn) {
            // Si el clic NO fue en el sidebar Y NO fue en el botón de abrir
            if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-active');
            }
        }
    });
});