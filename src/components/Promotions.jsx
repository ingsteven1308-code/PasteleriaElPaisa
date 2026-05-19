import React from 'react';
import { Tag, Clock, ShoppingCart } from 'lucide-react';
import { promotions, products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Promotions({ onProductClick }) {
  const { addItem } = useCart();

  const handleAdd = (promo) => {
    const product = products.find(p => p.id === promo.productId);
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, qty: 1, size: product.sizes[0], image: product.image });
  };

  return (
    <section id="promociones" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Tag size={14} />
            Ofertas especiales
          </div>
          <h2 className="section-title">Promociones del Mes</h2>
          <p className="section-subtitle">Aprovecha estas ofertas por tiempo limitado y disfruta nuestros mejores productos a precios increíbles.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {promotions.map((promo, idx) => {
            const product = products.find(p => p.id === promo.productId);
            return (
              <div
                key={promo.id}
                className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${promo.bgColor} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Discount badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-black text-lg px-3 py-1 rounded-2xl shadow-md rotate-3">
                  -{promo.discount}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-4xl">
                    🎂
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-white/80 mb-4 text-sm leading-relaxed">{promo.description}</p>

                  {product && (
                    <div className="flex items-baseline gap-3 mb-6">
                      {product.originalPrice && (
                        <span className="text-white/60 line-through text-sm">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-3xl font-black">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-white/70 text-xs mb-6">
                    <Clock size={12} />
                    Válido hasta: {promo.validUntil}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => product && onProductClick(product)}
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                    >
                      Ver detalle
                    </button>
                    <button
                      onClick={() => handleAdd(promo)}
                      className="flex-1 bg-white text-gray-900 font-bold py-2.5 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart size={15} />
                      Agregar
                    </button>
                  </div>
                </div>

                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
