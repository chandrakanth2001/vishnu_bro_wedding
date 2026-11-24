import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2, Play, Pause } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider } from './KeralaElements';

export const PhotoGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Exactly 5 unique pictures without duplicates
  const images = weddingData.gallery.slice(0, 5);

  // Smooth auto-scroll loop for the 5 pictures
  useEffect(() => {
    if (isPaused) return;
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      if (direction === 'right') {
        if (container.scrollLeft >= maxScroll - 5) {
          setDirection('left');
        } else {
          container.scrollLeft += 1.5;
        }
      } else {
        if (container.scrollLeft <= 5) {
          setDirection('right');
        } else {
          container.scrollLeft -= 1.5;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, direction]);

  const handleScroll = (scrollDirection: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: scrollDirection === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrevLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1));
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1));
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          {/* <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#B38728] uppercase mb-1">
            Visual Memories & Special Moments
          </p> */}
          <h2 className="font-cinzel-decorative text-xl sm:text-5xl text-[#2C221E] font-bold">
            A Little Story of Us
          </h2>
          <GoldLotusDivider className="my-3" />
        </div>

        {/* Carousel Control Bar & Direction Toggle */}
        <div className="flex items-center justify-between max-w-6xl mx-auto mb-4 px-4 font-cinzel text-xs font-semibold text-[#7A5C14]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="tracking-wider uppercase text-[11px] sm:text-xs">
              Click to open
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Direction Left/Right Toggle Buttons */}
            <button
              onClick={() => {
                setDirection('left');
                handleScroll('left');
              }}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                direction === 'left'
                  ? 'bg-[#D4AF37] text-[#FAF6EE] border-[#D4AF37] shadow-md'
                  : 'bg-[#FAF6EE] text-[#7A5C14] border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setDirection('right');
                handleScroll('right');
              }}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                direction === 'right'
                  ? 'bg-[#D4AF37] text-[#FAF6EE] border-[#D4AF37] shadow-md'
                  : 'bg-[#FAF6EE] text-[#7A5C14] border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#FAF6EE] text-[#7A5C14] hover:bg-[#D4AF37] hover:text-[#FAF6EE] transition-all cursor-pointer shadow-sm"
              title={isPaused ? 'Resume Loop' : 'Pause Loop'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">
                {isPaused ? 'Play' : 'Pause'}
              </span>
            </button>
          </div>
        </div>

        {/* SMOOTH SIDEWAYS FLOWING CAROUSEL */}
        <div className="relative w-full overflow-hidden py-4 border-y border-[#D4AF37]/30 bg-[#FAF6EE]/40 rounded-3xl">
          {/* Subtle Side Fade Gradients for Luxurious Edge Blend */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FDFBF7] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FDFBF7] to-transparent z-20 pointer-events-none" />

          {/* Carousel Track Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-12 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, idx) => {
              return (
                <div
                  key={`gallery-${img.id}-${idx}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 bg-[#FAF6EE] border-2 border-[#D4AF37] rounded-2xl overflow-hidden shadow-lg card-paper-texture cursor-pointer hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Corner Filigree Accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />

                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF6EE] flex items-center justify-center relative">
                    <img
                      src={img.url}
                      alt={img.caption || 'Gallery Image'}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/85 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>

                  {/* Caption Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
                    {img.title && (
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#FAF6EE] drop-shadow-md mb-0.5">
                        {img.title}
                      </h3>
                    )}
                    {/* <p className="font-cormorant text-sm sm:text-base italic text-white line-clamp-2 drop-shadow-md font-medium">
                      {img.caption}
                    </p> */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#FAF6EE]/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40 group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FULLSCREEN LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#1A1412]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 z-50 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevLightbox();
                }}
                className="absolute left-4 sm:left-8 z-50 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextLightbox();
                }}
                className="absolute right-4 sm:right-8 z-50 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Image Preview */}
              <div
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].caption || 'Gallery Image'}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl border-2 border-[#D4AF37]/70 shadow-2xl"
                />

                <div className="mt-4 text-center text-white max-w-xl">
                  <span className="font-cinzel text-xs text-[#D4AF37] uppercase tracking-widest font-semibold block mb-1">
                    {lightboxIndex + 1} / {images.length}
                  </span>
                  {images[lightboxIndex].title && (
                    <h3 className="font-cinzel text-xl font-bold text-[#F4E297] mb-1">
                      {images[lightboxIndex].title}
                    </h3>
                  )}
                  {/* <p className="font-cormorant text-lg italic text-white font-semibold drop-shadow-md mt-1">
                    {images[lightboxIndex].caption}
                  </p> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
