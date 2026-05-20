import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Award, Clock, Truck, MessageSquare } from 'lucide-react';

const slides = [
  {
    headline: 'Arte en cada',
    highlight: 'bocado dulce',
    sub: 'Tortas artesanales y postres premium elaborados con ingredientes de la más alta calidad para hacer inolvidable tu momento especial.',
    bgFrom: 'from-primary-50',
    bgTo: 'to-rose-100',
    emoji: '🎂',
  },
  {
    headline: 'Celebra con',
    highlight: 'sabor único',
    sub: 'Diseños personalizados para bodas, cumpleaños, baby showers y toda ocasión que merezca lo mejor.',
    bgFrom: 'from-amber-50',
    bgTo: 'to-rose-50',
    emoji: '🌹',
  },
  {
    headline: 'Pedidos a domicilio',
    highlight: 'rápido y fresco',
    sub: 'Entregamos en toda la ciudad. Haz tu pedido por WhatsApp y recibe tu torta recién hecha en la puerta de tu casa.',
    bgFrom: 'from-pink-50',
    bgTo: 'to-primary-50',
    emoji: '🚚',
  },
];



export default function Hero({ onProductsClick, onOrderClick }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col">
      {/* Main hero */}
      <div className={`flex-1 bg-gradient-to-br ${slide.bgFrom} ${slide.bgTo} transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Text */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Star size={14} fill="currentColor" />
                Pastelería artesanal premium
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
                {slide.headline}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 font-serif italic">
                  {slide.highlight}
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                {slide.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                <button onClick={onProductsClick} className="btn-primary text-base shadow-lg shadow-primary-200">
                  Ver Productos
                  <ChevronRight size={18} />
                </button>
                <button onClick={onOrderClick} className="btn-whatsapp text-base shadow-lg shadow-green-200 inline-flex items-center gap-2">
                  <MessageSquare size={18} />
                  Hacer Pedido
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? 'bg-primary-600 w-8' : 'bg-gray-300 w-2'}`}
                  />
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:flex justify-center items-center animate-fade-in">
              <div className="relative">
                {/* Main card */}
                <div className="w-80 h-80 img-placeholder rounded-3xl shadow-2xl flex items-center justify-center">
                  <span className="text-8xl animate-bounce-soft">{slide.emoji}</span>
                </div>           
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
