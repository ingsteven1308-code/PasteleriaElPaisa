import React, { useState } from 'react';
import { X, User, Phone, MapPin, Calendar, Clock, MessageSquare, Truck, Store, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../data/products';

const INITIAL = {
  name: '', phone: '', address: '', city: '',
  deliveryDate: '', deliveryTime: '', eventReason: '', notes: '',
  deliveryType: 'domicilio',
};

export default function OrderForm({ isOpen, onClose }) {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Requerido';
    if (!form.phone.trim()) e.phone = 'Requerido';
    if (!form.deliveryDate) e.deliveryDate = 'Requerido';
    if (!form.deliveryTime) e.deliveryTime = 'Requerido';
    if (form.deliveryType === 'domicilio' && !form.address.trim()) e.address = 'Requerido para domicilio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const productList = items
      .map(i => `  • ${i.name} (${i.size}) x${i.qty} = $${(i.price * i.qty).toLocaleString()}${i.options?.length ? `\n    Opciones: ${i.options.join(', ')}` : ''}`)
      .join('\n');

    const msg = `🎂 *NUEVO PEDIDO - Dulce Tentación*\n\n` +
      `👤 *Datos del cliente*\n` +
      `  Nombre: ${form.name}\n` +
      `  Teléfono: ${form.phone}\n` +
      `  Ciudad: ${form.city || 'No especificada'}\n\n` +
      `🛒 *Productos*\n${productList}\n\n` +
      `💰 *Total: $${total.toLocaleString()}*\n\n` +
      `🚚 *Entrega*\n` +
      `  Tipo: ${form.deliveryType === 'domicilio' ? '🏠 Domicilio' : '🏪 Recoger en tienda'}\n` +
      (form.deliveryType === 'domicilio' ? `  Dirección: ${form.address}\n` : '') +
      `  Fecha: ${form.deliveryDate}\n` +
      `  Hora: ${form.deliveryTime}\n` +
      (form.eventReason ? `  Motivo: ${form.eventReason}\n` : '') +
      (form.notes ? `\n📝 *Observaciones*\n  ${form.notes}` : '');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    clearCart();
    setForm(INITIAL);
    onClose();
  };

  if (!isOpen) return null;

  const Field = ({ label, icon: Icon, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
        <Icon size={14} className="text-primary-500" />
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputClass = (field) =>
    `w-full border ${errors[field] ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`;

  return (
    <div className="fixed inset-0 z-50 cart-overlay flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 pt-6 pb-8 rounded-t-3xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
            <X size={18} />
          </button>
          <div className="text-3xl mb-2">🎂</div>
          <h2 className="text-2xl font-bold">Finalizar pedido</h2>
          <p className="text-primary-200 text-sm mt-1">Completa los datos para enviarte el pedido por WhatsApp</p>

          {/* Order summary mini */}
          <div className="mt-4 bg-white/10 rounded-2xl p-3">
            <div className="text-xs text-primary-200 mb-2">Resumen del pedido ({items.length} productos)</div>
            {items.map(item => (
              <div key={item.cartKey} className="flex justify-between text-sm">
                <span>{item.name} x{item.qty}</span>
                <span className="font-semibold">${(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-white/20 mt-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Delivery type */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Tipo de entrega</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'domicilio', label: 'Domicilio', icon: Truck },
                { value: 'tienda', label: 'Recoger en tienda', icon: Store },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('deliveryType', value)}
                  className={`flex items-center gap-2 p-3 border-2 rounded-xl transition-all text-sm font-medium ${
                    form.deliveryType === value
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-primary-200'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre completo" icon={User} error={errors.name}>
              <input value={form.name} onChange={e => set('name', e.target.value)} className={inputClass('name')} placeholder="Tu nombre" />
            </Field>
            <Field label="Teléfono" icon={Phone} error={errors.phone}>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} className={inputClass('phone')} placeholder="300 000 0000" type="tel" />
            </Field>
          </div>

          {form.deliveryType === 'domicilio' && (
            <Field label="Dirección" icon={MapPin} error={errors.address}>
              <input value={form.address} onChange={e => set('address', e.target.value)} className={inputClass('address')} placeholder="Dirección de entrega" />
            </Field>
          )}

          <Field label="Ciudad" icon={MapPin} error={errors.city}>
            <input value={form.city} onChange={e => set('city', e.target.value)} className={inputClass('city')} placeholder="Ciudad" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Fecha de entrega" icon={Calendar} error={errors.deliveryDate}>
              <input type="date" value={form.deliveryDate} onChange={e => set('deliveryDate', e.target.value)} className={inputClass('deliveryDate')} min={new Date().toISOString().split('T')[0]} />
            </Field>
            <Field label="Hora de entrega" icon={Clock} error={errors.deliveryTime}>
              <input type="time" value={form.deliveryTime} onChange={e => set('deliveryTime', e.target.value)} className={inputClass('deliveryTime')} />
            </Field>
          </div>

          <Field label="Motivo del evento (opcional)" icon={MessageSquare} error={errors.eventReason}>
            <input value={form.eventReason} onChange={e => set('eventReason', e.target.value)} className={inputClass('eventReason')} placeholder="Ej: Cumpleaños, boda, graduación..." />
          </Field>

          <Field label="Observaciones adicionales" icon={MessageSquare} error={errors.notes}>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              className={`${inputClass('notes')} resize-none`}
              rows={3}
              placeholder="Dedica un mensaje, instrucciones especiales, alergias..."
            />
          </Field>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-green-200 text-base"
          >
            <Send size={18} />
            Enviar pedido por WhatsApp
          </button>
          <p className="text-xs text-center text-gray-400 pb-2">
            Al enviar, serás redirigido a WhatsApp con tu pedido completo listo para enviar.
          </p>
        </form>
      </div>
    </div>
  );
}
