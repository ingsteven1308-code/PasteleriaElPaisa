import React, { useState } from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import ResponsiveCarousel from './ResponsiveCarousel';

function ProductCard({ product, onDetail, onAdd }) {
  const colors = [
    'from-pink-200 to-rose-300',
    'from-red-200 to-pink-300',
    'from-rose-200 to-red-300',
    'from-fuchsia-200 to-pink-300',
  ];
  const color = colors[product.id % colors.length];

  return (
    <div className="card group flex flex-col h-full">
      {/* Image */}
      <div className={`relative h-52 bg-gradient-to-br ${color} flex items-center justify-center overflow-hidden rounded-t-lg`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🎂</span>
        {product.originalPrice && (
          <div className="absolute top-3 left-3 badge">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
        {product.featured && !product.originalPrice && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Destacado
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onDetail(product)}
            className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <Eye size={15} /> Vista rápida
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
            />
          ))}
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1 font-serif">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{product.shortDesc}</p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            {product.originalPrice && (
              <div className="text-gray-400 line-through text-sm">{formatCurrency(product.originalPrice)}</div>
            )}
            <div className="text-2xl font-black text-primary-600">{formatCurrency(product.price)}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDetail(product)}
              className="p-2 border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 rounded-xl transition-colors"
              aria-label="Ver detalle"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={() => onAdd(product)}
              className="btn-primary py-2 px-4 text-sm"
            >
              <ShoppingCart size={16} />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products({ onProductDetail }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem } = useCart();

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAdd = (product) => {
    addItem({ id: product.id, name: product.name, price: product.price, qty: 1, size: product.sizes[0], image: product.image });
  };

  const renderProductCard = (product) => (
    <ProductCard
      product={product}
      onDetail={onProductDetail}
      onAdd={handleAdd}
    />
  );

  return (
    <section id="productos" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🍰 Nuestros productos
          </div>
          <h2 className="section-title">Catálogo de Productos</h2>
          <p className="section-subtitle">Explora nuestra selección artesanal elaborada con amor y los mejores ingredientes.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Carousel Grid */}
        {filtered.length > 0 ? (
          <ResponsiveCarousel
            items={filtered}
            renderItem={renderProductCard}
            gridCols={4}
            autoplay={true}
            autoplayDelay={3500}
            singleOnMobileTablet={true}
            showArrows={true}
            showIndicators={true}
            className="px-6"
          />
        ) : (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl">🔍</span>
            <p className="mt-4 text-lg">No hay productos en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
}
