import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ResponsiveCarousel Component
 * 
 * Desktop: Grid layout (2, 3, or 4 columns based on gridCols)
 * Tablet: Carousel with 2 slides
 * Mobile: Carousel with 1 slide
 * 
 * Features:
 * - Auto-play smooth animation
 * - Touch swipe support
 * - Navigation arrows
 * - Minimal indicators
 * - Premium design with smooth transitions
 * - Optimized performance
 */
export default function ResponsiveCarousel({
  items = [],
  renderItem,
  gridCols = 3,
  autoplay = true,
  autoplayDelay = 4000,
  showArrows = true,
  showIndicators = true,
  className = '',
}) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop grid layout
  if (isDesktop) {
    const gridColsClass = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    }[gridCols] || 'md:grid-cols-3';

    return (
      <div className={`grid gap-6 grid-cols-1 ${gridColsClass} ${className}`}>
        {items.map((item, idx) => (
          <div key={item.id || idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    );
  }

  // Mobile & Tablet carousel layout
  const slidesPerView = isMobile ? 1 : 2;

  return (
    <div className={`relative carousel-container ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        autoplay={
          autoplay && {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        }
        pagination={
          showIndicators && {
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }
        }
        navigation={
          showArrows && {
            nextEl: '.carousel-button-next',
            prevEl: '.carousel-button-prev',
            enabled: true,
          }
        }
        grabCursor={true}
        loop={items.length > slidesPerView}
        className="pb-12"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={item.id || idx}>
            {({ isActive }) => (
              <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-90'}`}>
                {renderItem(item, idx)}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            className="carousel-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 md:-ml-6 bg-white shadow-lg rounded-full p-2 hover:bg-primary-50 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          <button
            className="carousel-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 md:-mr-6 bg-white shadow-lg rounded-full p-2 hover:bg-primary-50 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </>
      )}

      {/* Custom Pagination Styling */}
      <style>{`
        .carousel-container :global(.swiper-pagination) {
          bottom: -5px !important;
        }

        .carousel-container :global(.swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          background-color: #d1d5db;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .carousel-container :global(.swiper-pagination-bullet-active) {
          background-color: #ec4899;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }

        .carousel-container :global(.swiper-button-disabled) {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Smooth transitions */
        .carousel-container :global(.swiper-slide) {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        /* Touch feedback */
        .carousel-container :global(.swiper-slide-active) {
          transform: scale(1);
        }

        @media (max-width: 768px) {
          .carousel-container :global(.swiper-button-prev),
          .carousel-container :global(.swiper-button-next) {
            display: none;
          }

          .carousel-container :global(.swiper-pagination) {
            bottom: 5px !important;
          }
        }
      `}</style>
    </div>
  );
}
