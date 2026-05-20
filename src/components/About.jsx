import React from 'react';
import { Heart, Award, Users, Leaf } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Pasión', desc: 'Cada torta es elaborada con amor y dedicación, poniendo el alma en cada detalle.' },
  { icon: Award, title: 'Calidad', desc: 'Usamos solo ingredientes frescos y de primera calidad para garantizar el mejor sabor.' },
  { icon: Users, title: 'Familia', desc: 'Somos un equipo familiar que trata a cada cliente como parte de nuestra familia.' },
  { icon: Leaf, title: 'Frescura', desc: 'Elaboramos nuestros productos diariamente para garantizar frescura y sabor.' },
];

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-primary-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="img-placeholder rounded-3xl h-64 flex items-center justify-center">
                <span className="text-6xl">👩‍🍳</span>
              </div>
              <div className="bg-gradient-to-br from-red-200 to-rose-300 rounded-3xl h-64 flex items-center justify-center mt-8">
                <span className="text-6xl">🎂</span>
              </div>
              <div className="bg-gradient-to-br from-rose-200 to-pink-300 rounded-3xl h-48 flex items-center justify-center">
                <span className="text-5xl">🧁</span>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl h-48 flex items-center justify-center -mt-8">
                <span className="text-5xl">🌹</span>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 max-w-48">
              <div className="text-4xl font-black text-primary-600">3</div>
              <div className="text-sm text-gray-600 font-medium">Años endulzando momentos especiales</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              ❤️ Nuestra historia
            </div>
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-6 leading-tight">
              Creando momentos{' '}
              <span className="text-primary-600 italic">dulces e inolvidables</span>{' '}
              desde 2023
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Pastelería El Paisa nació del sueño de una familia apasionada por la repostería artesanal. Lo que comenzó como un pequeño emprendimiento familiar se ha convertido en la pastelería de referencia en la ciudad, reconocida por la calidad, creatividad y el amor que ponemos en cada creación.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Cada torta que sale de nuestra cocina lleva consigo años de experiencia, ingredientes seleccionados y, sobre todo, el deseo de hacer que cada celebración sea perfecta e inolvidable.
            </p>

            {/* Mission / Vision */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-bold text-gray-800 mb-1">Nuestra Misión</h4>
                <p className="text-sm text-gray-500">Endulzar cada momento especial con creaciones artesanales únicas, elaboradas con los mejores ingredientes y todo nuestro amor.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🌟</div>
                <h4 className="font-bold text-gray-800 mb-1">Nuestra Visión</h4>
                <p className="text-sm text-gray-500">Ser la pastelería artesanal más reconocida y querida, sinónimo de calidad, creatividad y momentos felices.</p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
