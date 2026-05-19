import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Promotions from './components/Promotions';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import WhatsAppButton from './components/WhatsAppButton';
import { WHATSAPP_NUMBER } from './data/products';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const scrollToProducts = () => {
    document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsAppDirect = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido%20personalizado.`, '_blank');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setTimeout(() => setOrderFormOpen(true), 300);
  };

  return (
    <>
      <Loader visible={loading} />

      <div className={`min-h-screen transition-opacity duration-500 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Header onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onProductsClick={scrollToProducts} onOrderClick={openWhatsAppDirect} />
        <Promotions onProductClick={setSelectedProduct} />
        <Products onProductDetail={setSelectedProduct} />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Modals & drawers */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <OrderForm
        isOpen={orderFormOpen}
        onClose={() => setOrderFormOpen(false)}
      />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <WhatsAppButton />
    </div>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
