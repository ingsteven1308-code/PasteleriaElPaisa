/**
 * ============================================
 * EJEMPLO DE USO - ResponsiveCarousel
 * Copia y adapta para otros componentes
 * ============================================
 */

import React, { useState } from 'react';
import ResponsiveCarousel from './ResponsiveCarousel';
import { myData } from '../data/myData'; // Tu fuente de datos

/**
 * EJEMPLO 1: CARRUSEL SIMPLE
 * ==========================
 */
export function CarouselSimple() {
  const renderItem = (item) => (
    <div className="bg-white rounded-lg p-4 shadow-md h-full">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Mi Sección</h2>
      <ResponsiveCarousel
        items={myData}
        renderItem={renderItem}
        gridCols={3}
        autoplay={true}
        autoplayDelay={5000}
      />
    </section>
  );
}

/**
 * EJEMPLO 2: CARRUSEL CON FILTROS
 * ===============================
 */
export function CarouselFiltered() {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all'
    ? myData
    : myData.filter(item => item.category === filter);

  const renderItem = (item) => (
    <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl p-6 h-full flex flex-col items-center justify-center">
      <span className="text-4xl mb-3">{item.emoji}</span>
      <h3 className="font-bold text-center">{item.title}</h3>
    </div>
  );

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Sección Filtrada</h2>

      {/* Botones de filtro */}
      <div className="flex justify-center gap-3 mb-8">
        {['all', 'category1', 'category2'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium ${
              filter === cat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Carrusel responsivo */}
      <ResponsiveCarousel
        items={filteredItems}
        renderItem={renderItem}
        gridCols={3}
        autoplay={false}
        showArrows={true}
        showIndicators={true}
      />
    </section>
  );
}

/**
 * EJEMPLO 3: CARRUSEL CON ACCIONES
 * ================================
 */
export function CarouselWithActions() {
  const handleItemClick = (item) => {
    console.log('Item seleccionado:', item);
    // Ejecutar acción
  };

  const renderItem = (item) => (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      <div className="h-40 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
        <span className="text-5xl">{item.icon}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Ver más
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Mis Items</h2>
        <ResponsiveCarousel
          items={myData}
          renderItem={renderItem}
          gridCols={4}
          autoplay={false}
          showIndicators={true}
        />
      </div>
    </section>
  );
}

/**
 * EJEMPLO 4: CARRUSEL MINIMALISTA
 * ==============================
 */
export function CarouselMinimal() {
  const renderItem = (item) => (
    <div className="flex items-center justify-center bg-white rounded-lg p-8">
      <div className="text-center">
        <p className="text-6xl mb-4">{item.emoji}</p>
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
      </div>
    </div>
  );

  return (
    <ResponsiveCarousel
      items={myData}
      renderItem={renderItem}
      gridCols={2}
      autoplay={true}
      autoplayDelay={4000}
      showArrows={false}    // Sin flechas
      showIndicators={false} // Sin indicadores
    />
  );
}

/**
 * EJEMPLO 5: CARRUSEL CON DATOS COMPLEJOS
 * ======================================
 */
export function CarouselComplex() {
  const renderItem = (item) => (
    <div className="h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
      {/* Imagen simulada */}
      <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
        <span className="text-6xl">{item.emoji}</span>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col h-64">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{item.longDescription}</p>

        {/* Precio o meta información */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-black text-orange-600">${item.price}</span>
          <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            ⭐ {item.rating}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
            Agregar
          </button>
          <button className="flex-1 border-2 border-orange-500 text-orange-500 py-2 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
            Detalles
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Catálogo Premium</h2>
          <p className="text-gray-600">Nuestros mejores productos</p>
        </div>

        <ResponsiveCarousel
          items={myData}
          renderItem={renderItem}
          gridCols={4}
          autoplay={false}
          showArrows={true}
          showIndicators={true}
          className="px-6"
        />
      </div>
    </section>
  );
}

/**
 * CÓMO USAR ESTOS EJEMPLOS
 * ======================
 */

// 1. Copia la función que quieres usar
// 2. Adapta los datos (items, renderItem)
// 3. Modifica estilos según tu marca
// 4. Ajusta configuración (gridCols, autoplay, etc)

/**
 * PASOS PARA PERSONALIZAR
 * =======================
 */

// PASO 1: Define tus datos
const misDatos = [
  { id: 1, name: 'Item 1', emoji: '🎂' },
  { id: 2, name: 'Item 2', emoji: '🍰' },
  // ...
];

// PASO 2: Crea función renderItem
const miRenderItem = (item) => (
  <div className="tu-estilo">
    {item.name}
  </div>
);

// PASO 3: Usa ResponsiveCarousel
<ResponsiveCarousel
  items={misDatos}
  renderItem={miRenderItem}
  gridCols={3}
/>

/**
 * PROPIEDADES A RECORDAR
 * ====================
 * 
 * - Cada item debe tener un 'id' único
 * - renderItem recibe (item, index)
 * - gridCols: 2, 3 o 4 (desktop)
 * - autoplayDelay en milisegundos
 * - showArrows se oculta en mobile
 * - Responsive: automático según viewport
 * 
 */
