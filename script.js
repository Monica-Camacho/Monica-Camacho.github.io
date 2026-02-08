document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECTORES GLOBALES ---
    const appContainer = document.querySelector('.app-container');
    const sidebar = document.getElementById('sidebar');
    
    // Botones del Sidebar
    const toggleBtn = document.getElementById('sidebar-toggle');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    
    // Controles de Tema (Top Bar)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const variantSwitcher = document.getElementById('variant-switcher');
    const variantContainer = document.getElementById('variant-container');

    // NOTA: Ya no seleccionamos .nav-items ni .views porque la navegación
    // ahora es nativa del navegador mediante los enlaces <a href> en el HTML.

    // --- 2. LÓGICA DE TEMAS (Persistencia entre páginas) ---
    function applyTheme() {
        // Verificamos si los elementos existen (por seguridad)
        if (!darkModeToggle || !variantSwitcher) return;

        const isDark = darkModeToggle.checked;
        const selectedVariant = variantSwitcher.value;

        if (isDark) {
            // Modo Oscuro activado
            document.documentElement.setAttribute('data-theme', 'dark');
            if(variantContainer) variantContainer.classList.add('disabled');
        } else {
            // Modo Claro activado
            document.documentElement.setAttribute('data-theme', selectedVariant);
            if(variantContainer) variantContainer.classList.remove('disabled');
        }

        // Guardar en LocalStorage para que al cambiar de página se mantenga el color
        localStorage.setItem('moon-dark-mode', isDark);
        localStorage.setItem('moon-variant', selectedVariant);
    }

    // Listeners de cambio de tema
    if(darkModeToggle) darkModeToggle.addEventListener('change', applyTheme);
    if(variantSwitcher) variantSwitcher.addEventListener('change', applyTheme);

    // Cargar preferencias guardadas al iniciar cualquier página
    function loadSavedPreferences() {
        const savedDark = localStorage.getItem('moon-dark-mode');
        const savedVariant = localStorage.getItem('moon-variant');

        if (savedDark !== null && darkModeToggle) {
            darkModeToggle.checked = (savedDark === 'true');
        }
        if (savedVariant !== null && variantSwitcher) {
            variantSwitcher.value = savedVariant;
        }

        applyTheme();
    }
    
    loadSavedPreferences();

    // --- 3. CONTROL DEL SIDEBAR (Funcionalidad UI) ---
    
    // Toggle Desktop (Colapsar a mini)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            appContainer.classList.toggle('collapsed');
            
            // Rotación del icono de la flecha
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

    // Toggle Móvil (Abrir/Cerrar Drawer)
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el click llegue al document
            sidebar.classList.toggle('mobile-active');
        });
    }

    // Cerrar sidebar móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && mobileBtn) {
            if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-active');
            }
        }
    });
});