import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { galleryImages } from '../data/products';

const galleryCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'tortas', label: 'Tortas' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'especiales', label: 'Especiales' },
  { id: 'local', label: 'Nuestra tienda' },
];

const gradients = [
  'from-pink-200 to-rose-300',
  'from-red-200 to-pink-300',
  'from-rose-300 to-red-400',
  'from-fuchsia-200 to-pink-200',
  'from-amber-200 to-rose-200',
  'from-red-100 to-rose-200',
];

const emojis = ['🎂', '🌹', '🧁', '💍', '🎉', '🍰', '🌸', '🎊', '💐', '✨', '🎁', '🍓'];

const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-48', 'h-60', 'h-52', 'h-64', 'h-48', 'h-56', 'h-60', 'h-72'];

export default function Gallery() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === active);

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            📸 Nuestras creaciones
          </div>
          <h2 className="section-title">Galería de Arte</h2>
          <p className="section-subtitle">Cada pieza es única. Descubre el trabajo artesanal que hacemos con amor para cada ocasión especial.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {galleryCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                active === cat.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className={`break-inside-avoid rounded-2xl overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} ${heights[i % heights.length]} flex flex-col items-center justify-center relative group cursor-pointer hover:shadow-xl transition-shadow animate-fade-in`}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {emojis[i % emojis.length]}
              </span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                <div className="w-full p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-semibold text-sm">{img.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">¿Quieres un diseño personalizado para tu evento?</p>
          <a
            href={`https://wa.me/573001234567?text=Hola%2C%20quiero%20ver%20más%20trabajos%20y%20hacer%20un%20pedido%20personalizado.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2"
          >
            <MessageSquare size={18} />
            Solicita tu diseño aquí
          </a>
        </div>
      </div>
    </section>
  );
}
