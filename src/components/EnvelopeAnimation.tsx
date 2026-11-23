import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playTempleBellChime } from './MusicController';

interface EnvelopeAnimationProps {
  onOpenComplete: () => void;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ onOpenComplete }) => {
  const [isPlayingVideo2, setIsPlayingVideo2] = useState(false);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingVideo2) return;

    // Trigger ceremonial Web Audio chime
    playTempleBellChime();

    // Trigger gold and floral confetti sparkles
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F4E297', '#E86C8D', '#FFFDF5', '#264D24'],
        scalar: 1,
      });
    } catch (err) {
      console.warn('Confetti effect failed:', err);
    }

    setIsPlayingVideo2(true);
  };

  const handleVideo2Ended = () => {
    onOpenComplete();
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 select-none">
      {/* Video Display Container Frame */}
      <div className="relative w-full overflow-hidden rounded-2xl border-2 border-[#D4AF37] shadow-2xl bg-[#1A1412] card-paper-texture">
        {/* Corner Filigree Ornaments */}
        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />

        {!isPlayingVideo2 ? (
          /* Video 1 (Initial Teaser Video) */
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto max-h-[60vh] object-contain mx-auto block"
          >
            <source src="/assets/video1.MOV" type="video/mp4" />
            <source src="/assets/video1.MOV" type="video/quicktime" />
          </video>
        ) : (
          /* Video 2 (Full Ceremony Video playing after Open Invitation click) */
          <div className="relative w-full">
            <video
              ref={video2Ref}
              autoPlay
              playsInline
              preload="auto"
              onEnded={handleVideo2Ended}
              className="w-full h-auto max-h-[65vh] object-contain mx-auto block"
            >
              <source src="/assets/video2.MOV" type="video/mp4" />
              <source src="/assets/video2.MOV" type="video/quicktime" />
            </video>

            {/* Skip / Enter Website Button */}
            <button
              onClick={onOpenComplete}
              className="absolute bottom-4 right-4 z-30 px-4 py-1.5 rounded-full bg-[#1A1412]/80 border border-[#D4AF37] text-[#FAF6EE] font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#1A1412] transition-all cursor-pointer shadow-lg"
            >
              Enter Website &rarr;
            </button>
          </div>
        )}
      </div>

      {/* "Open Invitation" Traditional Gold Button */}
      {!isPlayingVideo2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 z-50"
        >
          <button
            onClick={handleOpenClick}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4E297] to-[#B38728] text-[#1A1412] font-cinzel text-sm tracking-[0.25em] font-bold uppercase shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full border border-[#FAF6EE]/60" />
            <span className="text-base animate-pulse">🪔</span>
            <span>Open Invitation</span>
            <span className="text-base animate-pulse">🌺</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
