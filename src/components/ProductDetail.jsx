import React, { useState } from 'react';
import { X, ShoppingCart, Star, Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

export default function ProductDetail({ product, onClose }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const toggleOption = (opt) => {
    setSelectedOptions(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      size: selectedSize,
      options: selectedOptions,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const colors = ['from-pink-200 to-rose-300', 'from-red-100 to-pink-200', 'from-rose-100 to-red-200'];

  return (
    <div className="fixed inset-0 z-50 cart-overlay flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="relative">
            <div className={`h-72 md:h-full min-h-64 bg-gradient-to-br ${colors[imgIdx % colors.length]} flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none`}>
              <span className="text-7xl">🎂</span>
            </div>
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-primary-600 w-4' : 'bg-white/70'}`}
                    />
                  ))}
                </div>
              </>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>

            <h2 className="text-2xl font-bold font-serif text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-5">
              {product.originalPrice && (
                <span className="text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
              <span className="text-3xl font-black text-primary-600">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="badge">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Size */}
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">Tamaño</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:border-primary-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            {product.options.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Opciones (opcional)</div>
                <div className="flex flex-wrap gap-2">
                  {product.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-1.5 ${
                        selectedOptions.includes(opt)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-green-400'
                      }`}
                    >
                      {selectedOptions.includes(opt) && <Check size={12} />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-gray-700 mb-1">Ingredientes</div>
              <p className="text-xs text-gray-500">{product.ingredients.join(', ')}</p>
            </div>

            {/* Qty + Add */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold text-gray-800">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all text-sm ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {added ? <><Check size={16} /> Agregado</> : <><ShoppingCart size={16} /> Agregar al carrito</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
