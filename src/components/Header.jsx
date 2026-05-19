import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../data/products';
import logo from '../image/logo-pasteleria.jpeg';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#promociones', label: 'Promociones' },
  { href: '#galeria', label: 'Galería' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header({ onCartOpen }) {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido.`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" onClick={() => handleNav('#inicio')} className="flex items-center gap-3 group">
            <img src={logo} alt="Pastelería El Paisa" className="w-12 h-12 rounded-2xl object-cover shadow-lg" />
            <div>
              <span className="block text-lg font-bold font-serif text-primary-700 leading-none">Pastelería</span>
              <span className="block text-xs font-medium text-gray-500 leading-none tracking-widest uppercase">El Paisa</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openWhatsApp}
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:shadow-md"
            >
              <Phone size={15} />
              <span className="hidden md:inline">WhatsApp</span>
            </button>

            <button
              onClick={onCartOpen}
              className="relative p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
              aria-label="Carrito"
            >
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-soft">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="w-full text-left px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={openWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 rounded-xl mt-2"
          >
            <Phone size={16} />
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </header>
  );
}
