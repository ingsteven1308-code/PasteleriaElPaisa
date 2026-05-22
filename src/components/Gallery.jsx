import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { galleryImages } from '../data/products';
import ResponsiveCarousel from './ResponsiveCarousel';
import pastelBoda from '../image/pastel_boda.png';
import pastelCarros from '../image/pastel_carros.jpeg';
import pastelCars from '../image/pastel_cars.jpeg';
import pastelDinosaurios from '../image/pastel_dinosaurios.png';
import pastelRealMadrid from '../image/pastel_real_madrid.jpeg';
import pastelStich from '../image/pastel_stich.jpeg';
import pastelMinecraft from '../image/pastel_minecraft.PNG?url';
import pastelNinoDinosaurio from '../image/Pastel_niño_dinosaurio.PNG?url';

const galleryCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'cumpleaños', label: 'Cumpleaños' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'bautizos', label: 'Bautizos' },
  { id: 'primera_comunion', label: 'Primera Comunión' },
  { id: 'especiales', label: 'Especiales' },
  
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

// Increased heights to make gallery items more prominent and similar to product cards
// Each entry uses responsive height classes: mobile (base), md (tablet), lg (desktop)
const heightClasses = [
  'h-64 md:h-72 lg:h-80',
  'h-64 md:h-72 lg:h-80',
  'h-56 md:h-64 lg:h-72',
  'h-72 md:h-80 lg:h-96',
  'h-64 md:h-72 lg:h-80',
  'h-64 md:h-72 lg:h-80',
  'h-56 md:h-64 lg:h-72',
  'h-64 md:h-72 lg:h-80',
  'h-56 md:h-64 lg:h-72',
  'h-64 md:h-72 lg:h-80',
  'h-64 md:h-72 lg:h-80',
  'h-72 md:h-80 lg:h-96',
];

const galleryImagesMap = {
  pastel_boda: pastelBoda,
  pastel_carros: pastelCarros,
  pastel_cars: pastelCars,
  pastel_dinosaurios: pastelDinosaurios,
  pastel_real_madrid: pastelRealMadrid,
  pastel_stich: pastelStich,
  pastel_minecraft: pastelMinecraft,
  pastel_nino_dinosaurio: pastelNinoDinosaurio,
};

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewImage, setQuickViewImage] = useState(null);
  const [quickViewTitle, setQuickViewTitle] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filtered = active === 'all'
    ? galleryImages
    : galleryImages.filter(img => {
      return img.category
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .includes(active.toLowerCase());
    });

  const mobileCardHeight = 'h-72 md:h-80';

  const renderGalleryItem = (img, idx) => {
    const imageSrc = img.image ? galleryImagesMap[img.image] : null;
    const cardHeightClass = isDesktop ? heightClasses[idx % heightClasses.length] : mobileCardHeight;

    return (
      <div
        className={`rounded-2xl overflow-hidden ${imageSrc ? 'bg-stone-50' : `bg-gradient-to-br ${gradients[idx % gradients.length]}`} ${cardHeightClass} relative group cursor-pointer hover:shadow-xl transition-shadow flex items-center justify-center`}
      >
        {imageSrc ? (
          <button
            type="button"
            onClick={() => {
              setQuickViewImage(imageSrc);
              setQuickViewTitle(img.title);
              setQuickViewOpen(true);
            }}
            className="w-full h-full"
            aria-label={`Vista rápida: ${img.title}`}
          >
            <img
              src={imageSrc}
              alt={img.title}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-6xl md:text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
              {emojis[idx % emojis.length]}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
          <div className="w-full p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="font-semibold text-sm">{img.title}</p>
          </div>
        </div>
      </div>
    );
  };

  // Close Quick View on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setQuickViewOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

        {/* Desktop: Masonry Grid | Mobile/Tablet: Carousel */}
        <div className="mb-12">
          {isDesktop ? (
            // Desktop: Masonry layout
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
              {filtered.map((img, i) => (
                <div key={img.id} className="break-inside-avoid animate-fade-in">
                  {renderGalleryItem(img, i)}
                </div>
              ))}
            </div>
          ) : (
            // Mobile/Tablet: Carousel
            <ResponsiveCarousel
              items={filtered}
              renderItem={renderGalleryItem}
              gridCols={4}
              autoplay={true}
              autoplayDelay={5000}
              showArrows={true}
              showIndicators={true}
              className="px-6"
            />
          )}
        </div>

        {/* Quick View Modal */}
        {quickViewOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setQuickViewOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />

            <div
              className="relative z-10 max-w-4xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setQuickViewOpen(false)}
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg z-20"
                aria-label="Cerrar vista rápida"
              >
                ✕
              </button>

              <div className="rounded-lg overflow-hidden bg-white">
                <div className="w-full flex items-center justify-center p-4 bg-black">
                  <img
                    src={quickViewImage}
                    alt={quickViewTitle}
                    className="max-h-[80vh] w-auto object-contain"
                  />
                </div>
                {quickViewTitle && (
                  <div className="p-4 text-center bg-white">
                    <p className="font-semibold text-gray-800">{quickViewTitle}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-500 mb-4">Quieres un diseno personalizado para tu evento?</p>
          <a
            href="https://wa.me/573136135417?text=Hola%2C%20quiero%20ver%20mas%20trabajos%20y%20hacer%20un%20pedido%20personalizado."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2"
          >
            <MessageSquare size={18} />
            Solicita tu diseno aqui
          </a>
        </div>
      </div>
    </section>
  );
}
