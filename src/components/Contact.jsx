import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send, CheckCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

const schedule = [
  { day: 'Lunes – Viernes', hours: '8:00 AM – 7:00 PM' },
  { day: 'Sábados', hours: '8:00 AM – 8:00 PM' },
  { day: 'Domingos', hours: '9:00 AM – 5:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola, soy ${form.name}.\n\nAsunto: ${form.subject}\n\n${form.message}\n\nCorreo: ${form.email}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            📞 Contáctanos
          </div>
          <h2 className="section-title">Estamos aquí para ti</h2>
          <p className="section-subtitle">¿Tienes preguntas o quieres hacer un pedido especial? Contáctanos por cualquier canal.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {/* Contact cards */}
            {[
              {
                icon: Phone, title: 'WhatsApp / Teléfono',
                content: '+57 300 123 4567',
                action: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank'),
                label: 'Escribir ahora',
                color: 'bg-green-50 border-green-200',
                iconColor: 'text-green-600 bg-green-100',
              },
              {
                icon: MapPin, title: 'Dirección',
                content: 'Calle 24 Norte #5-07, Armenia, Quindío',
                action: () => window.open('https://maps.google.com', '_blank'),
                label: 'Ver en mapa',
                color: 'bg-primary-50 border-primary-200',
                iconColor: 'text-primary-600 bg-primary-100',
              },
            ].map(({ icon: Icon, title, content, action, label, color, iconColor }) => (
              <div key={title} className={`flex gap-4 p-4 rounded-2xl border ${color}`}>
                <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-0.5">{title}</div>
                  <div className="text-gray-600 text-sm mb-2">{content}</div>
                  <button onClick={action} className="text-sm font-medium text-primary-600 hover:underline">{label} →</button>
                </div>
              </div>
            ))}

            {/* Schedule */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-primary-600" />
                <h4 className="font-bold text-gray-800">Horarios de atención</h4>
              </div>
              <div className="space-y-2">
                {schedule.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-600">{day}</span>
                    <span className="font-semibold text-gray-800">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Síguenos en redes</h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: '@PasteleriaElPaisa', color: 'from-pink-500 to-rose-500', url: 'https://www.instagram.com/tiventrujillo?igsh=MTU2bDhkaDYwb2Y3OQ%3D%3D&utm_source=qr' },
                  { icon: Facebook, label: 'PasteleriaElPaisa', color: 'from-blue-600 to-blue-700', url: 'https://www.facebook.com/share/18gMiAJNH3/?mibextid=wwXIfr' },
                ].map(({ icon: Icon, label, color, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 bg-gradient-to-r ${color} text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity`}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form + Map */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="rounded-2xl h-52 border border-gray-200 overflow-hidden relative">
              <iframe
                title="Ubicación de la pastelería"
                src="https://www.google.com/maps?q=Calle+24+Norte+%235-07,+Armenia,+Quind%C3%ADo&output=embed"
                className="absolute inset-0 w-full h-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
              <h4 className="font-bold text-gray-800 mb-2">Envíanos un mensaje</h4>

              {sent && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
                  <CheckCircle size={16} />
                  ¡Mensaje enviado! Te responderemos pronto.
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Tu nombre" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="Tu correo" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <input required value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="Asunto" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              <textarea required value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tu mensaje..." rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
              <button type="submit" className="w-full btn-primary justify-center">
                <Send size={16} />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
