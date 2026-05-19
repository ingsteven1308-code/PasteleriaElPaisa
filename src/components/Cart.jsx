import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart({ isOpen, onClose, onCheckout }) {
  const { items, total, updateQty, removeItem } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 cart-overlay" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <ShoppingBag size={20} className="text-primary-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">Mi carrito</h2>
              <p className="text-xs text-gray-500">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={36} className="text-primary-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-400 text-sm">Agrega productos para comenzar tu pedido</p>
              <button onClick={onClose} className="btn-primary mt-6">
                Ver productos
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.cartKey} className="flex gap-4 bg-gray-50 rounded-2xl p-4">
                <div className="w-16 h-16 img-placeholder rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎂</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{item.size}</p>
                  {item.options?.length > 0 && (
                    <p className="text-xs text-gray-400 mb-2 truncate">{item.options.join(', ')}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQty(item.cartKey, item.qty - 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.cartKey, item.qty + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary-600 text-sm">
                        ${(item.price * item.qty).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.cartKey)}
                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Domicilio</span>
                <span className="text-green-600">A convenir</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-lg pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-primary-600">${total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full btn-primary justify-center text-base py-4 inline-flex items-center gap-2"
            >
              <MessageSquare size={18} />
              Comprar ahora
            </button>
            <p className="text-xs text-center text-gray-400">
              Te redirigiremos a WhatsApp para completar tu pedido
            </p>
          </div>
        )}
      </div>
    </>
  );
}
