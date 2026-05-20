/**
 * ============================================
 * GUÍA DE CONFIGURACIÓN RÁPIDA
 * Carruseles Responsivos - ResponsiveCarousel
 * ============================================
 */

// IMPORTAR EN CUALQUIER COMPONENTE:
// import ResponsiveCarousel from './ResponsiveCarousel';

/**
 * PARÁMETROS DISPONIBLES
 * =====================
 */
const CAROUSEL_CONFIG = {
  
  items: [],                    // REQUERIDO: Array de items a mostrar
  renderItem: (item) => {},     // REQUERIDO: Función para renderizar cada item
  
  // OPCIONALES
  gridCols: 3,                  // Columnas en desktop: 2, 3 o 4 (default: 3)
  autoplay: true,               // Activar auto-play (default: true)
  autoplayDelay: 5000,          // Milisegundos entre slides (default: 5000 = 5s)
  showArrows: true,             // Mostrar flechas prev/next (default: true)
  showIndicators: true,         // Mostrar puntos indicadores (default: true)
  className: '',                // Clases Tailwind adicionales
};

/**
 * EJEMPLOS DE USO
 * ===============
 */

// 1. CARRUSEL BÁSICO CON AUTO-PLAY
<ResponsiveCarousel
  items={products}
  renderItem={(product) => <ProductCard product={product} />}
  gridCols={4}
  autoplay={true}
  autoplayDelay={5000}
/>

// 2. CARRUSEL MANUAL (SIN AUTO-PLAY)
<ResponsiveCarousel
  items={filteredProducts}
  renderItem={(product) => <ProductCard {...product} />}
  autoplay={false}
  showArrows={true}
  showIndicators={true}
/>

// 3. CARRUSEL MINIMALISTA (SIN INDICADORES)
<ResponsiveCarousel
  items={galleryItems}
  renderItem={(item) => <GalleryItem item={item} />}
  showIndicators={false}
  showArrows={true}
/>

// 4. CARRUSEL CON CLASES TAILWIND PERSONALIZADAS
<ResponsiveCarousel
  items={data}
  renderItem={(item) => <ItemComponent item={item} />}
  className="px-8 py-4"
/>

/**
 * COMPORTAMIENTO RESPONSIVO AUTOMÁTICO
 * ====================================
 */
const BREAKPOINTS = {
  mobile: '< 768px',      // 1 item per slide
  tablet: '768px - 1023px', // 2 items per slide
  desktop: '>= 1024px',   // Grid (gridCols especificado)
};

/**
 * INDICADORES (PAGINATION)
 * =======================
 */
const INDICATOR_STYLES = {
  inactive: 'bg-gray-300 w-2 h-2 rounded-full',
  active: 'bg-pink-500 w-6 h-2 rounded-full',
  transition: '0.3s ease',
};

/**
 * FLECHAS DE NAVEGACIÓN
 * ====================
 */
const ARROW_STYLES = {
  background: 'white',
  shadow: 'shadow-lg',
  hoverEffect: 'hover:bg-pink-50 hover:shadow-xl',
  position: {
    prev: 'left-0 -ml-4',
    next: 'right-0 -mr-4',
  },
  hiddenOn: 'mobile',
};

/**
 * SWIPER MODULES USADOS
 * ====================
 */
const SWIPER_MODULES = [
  'Navigation',      // Flechas prev/next
  'Pagination',      // Indicadores/puntos
  'Autoplay',        // Auto-play automático
  'EffectCoverflow', // Efecto visual (puede cambiarse)
];

/**
 * PROPIEDADES DE SWIPER
 * ====================
 */
const SWIPER_PROPERTIES = {
  spaceBetween: 20,           // Espacio entre slides
  grabCursor: true,           // Cursor mano al pasar
  loop: 'auto',               // Loop automático si hay más items
  disableOnInteraction: false, // Continúa auto-play después de interacción
  pauseOnMouseEnter: true,    // Pausa al pasar mouse
};

/**
 * PERSONALIZAR VELOCIDAD DE AUTO-PLAY
 * ==================================
 */
const AUTO_PLAY_CONFIGS = {
  'LENTO (8 seg)': 8000,
  'NORMAL (5 seg)': 5000,      // RECOMENDADO
  'RÁPIDO (3 seg)': 3000,
  'MUY RÁPIDO (2 seg)': 2000,
};

/**
 * PERSONALIZAR COLUMNAS EN DESKTOP
 * ================================
 */
const GRID_COLUMNS = {
  'COMPACTO': 2,      // 2 columnas
  'NORMAL': 3,        // 3 columnas (DEFAULT)
  'AMPLIO': 4,        // 4 columnas
};

/**
 * CASOS DE USO EN EL PROYECTO
 * ===========================
 */

const CURRENT_IMPLEMENTATIONS = {
  
  'Promociones': {
    gridCols: 3,
    autoplay: true,
    autoplayDelay: 5000,
    showArrows: true,
    showIndicators: true,
  },

  'Productos': {
    gridCols: 4,
    autoplay: false,      // Manual browsing
    showArrows: true,
    showIndicators: true,
  },

  'Galería': {
    gridCols: 4,
    autoplay: true,
    autoplayDelay: 5000,
    showArrows: true,
    showIndicators: true,
  },
};

/**
 * CÓMO CAMBIAR CONFIGURACIÓN
 * ==========================
 */

// CAMBIAR VELOCIDAD AUTO-PLAY:
// En el componente padre, cambiar:
autoplayDelay={3000}  // de 5000 a 3000

// CAMBIAR NÚMERO DE COLUMNAS:
// En el componente padre, cambiar:
gridCols={2}  // de 3 a 2 (más compacto)

// ACTIVAR/DESACTIVAR AUTO-PLAY:
// En el componente padre, cambiar:
autoplay={false}  // de true a false

// OCULTAR INDICADORES:
// En el componente padre, cambiar:
showIndicators={false}  // de true a false

/**
 * SOLUCIÓN DE PROBLEMAS
 * ====================
 */

// ¿El carrusel no se mueve?
// → Verificar que items.length > 0
// → Verificar que renderItem devuelve JSX válido

// ¿Auto-play no funciona?
// → Verificar que autoplay={true}
// → Verificar que autoplayDelay es un número válido
// → En mobile puede estar pausado (feature)

// ¿Flechas no visibles?
// → En mobile están ocultas por defecto (UX)
// → Usar showArrows={true} para forzar visibilidad

// ¿Indicadores no se actualizan?
// → Verificar que showIndicators={true}
// → Reintentar con gridCols={3} por defecto

/**
 * RECURSOS ADICIONALES
 * ====================
 */

// DOCUMENTACIÓN:
// - Archivo: RESPONSIVE_CAROUSEL_DOCS.md
// - Componente: src/components/ResponsiveCarousel.jsx

// SWIPER.JS DOCS:
// - https://swiperjs.com/
// - https://swiperjs.com/react

// TAILWIND CSS:
// - https://tailwindcss.com/

/**
 * ✨ IMPLEMENTACIÓN COMPLETA ✨
 * 
 * El carrusel responsivo está completamente
 * integrado y listo para usar en cualquier
 * componente React.
 * 
 * ¡Solo importar y pasar props! 🚀
 */
