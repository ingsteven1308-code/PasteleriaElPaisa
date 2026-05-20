import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, Heart, MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

const links = {
  Navegación: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Promociones', href: '#promociones' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ],
  Categorías: [
    { label: 'Tortas artesanales', href: '#productos' },
    { label: 'Cupcakes', href: '#productos' },
    { label: 'Postres', href: '#productos' },
    { label: 'Tortas temáticas', href: '#productos' },
    { label: 'Tortas de bodas', href: '#productos' },
  ],
};

export default function Footer() {
  const nav = (href) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Top CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white font-serif">¿Lista para encargar tu torta?</h3>
            <p className="text-primary-200 text-sm mt-1">Escríbenos y hacemos realidad tu pedido soñado</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20hacer%20un%20pedido.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-white text-primary-700 font-bold px-8 py-3 rounded-full hover:bg-primary-50 transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare size={18} />
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold font-serif">D</span>
              </div>
              <div>
                <span className="block text-white font-bold font-serif text-lg leading-none">Pastelería El Paisa</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Pastelería Artesanal</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Endulzando momentos especiales desde 2023. Tortas artesanales, cupcakes y postres elaborados con amor y los mejores ingredientes.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/tiventrujillo?igsh=MTU2bDhkaDYwb2Y3OQ%3D%3D&utm_source=qr', label: 'Instagram' },
                { icon: Facebook, href: 'https://www.facebook.com/share/18gMiAJNH3/?mibextid=wwXIfr', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-primary-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.label}>
                    <button
                      onClick={() => nav(item.href)}
                      className="text-sm hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: '+57 300 123 4567', href: `https://wa.me/${WHATSAPP_NUMBER}` },
                { icon: MapPin, text: 'Calle 24 Norte #5-07, Armenia, Quindío', href: 'https://maps.google.com' },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-sm hover:text-primary-400 transition-colors">
                    <Icon size={15} className="flex-shrink-0 mt-0.5 text-primary-500" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-gray-800">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Horarios</div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Lun – Vie</span>
                  <span className="text-white">8am – 7pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="text-white">8am – 8pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-white">9am – 5pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© 2026 Pastelería El Paisa Pastelería. Todos los derechos reservados.</span>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/document/Politica_Tratamiento_Datos_Pasteleria_El_Paisa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Política de Tratamiento de Datos
            </a>
            <span className="flex items-center gap-1 text-gray-400">
              Hecho con <Heart size={12} className="text-primary-500 fill-primary-500" /> para endulzar tu vida
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
