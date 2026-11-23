import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider } from './KeralaElements';
import { Sparkles, Eye } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date(weddingData.weddingDate.isoDateTime).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);
  const lastSparkleTime = useRef(0);

  const triggerFullReveal = () => {
    setIsRevealed(true);
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F4E297', '#E86C8D', '#FFFDF5', '#264D24'],
        scalar: 1,
      });
    } catch (err) {
      console.warn('Confetti error:', err);
    }
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Setup Gold Scratch Surface Canvas
  useEffect(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = container.offsetWidth);
    const height = (canvas.height = container.offsetHeight);

    // Draw Gold Foil Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E6C250');
    grad.addColorStop(0.3, '#F4E297');
    grad.addColorStop(0.6, '#B38728');
    grad.addColorStop(1, '#8C6D1F');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle decorative pattern / border
    ctx.strokeStyle = '#FAF6EE';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);
  }, [isRevealed]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percent = Math.round((transparentCount / (pixels.length / 4)) * 100);
    setScratchProgress(percent);

    if (percent > 35) {
      triggerFullReveal();
    }
  };

  const triggerScratchSparkle = (clientX: number, clientY: number) => {
    const now = Date.now();
    if (now - lastSparkleTime.current < 75) return;
    lastSparkleTime.current = now;

    try {
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      confetti({
        particleCount: 6,
        spread: 40,
        startVelocity: 10,
        origin: { x, y },
        colors: ['#D4AF37', '#F4E297', '#E86C8D', '#FFFDF5'],
        scalar: 0.65,
        ticks: 35,
        disableForReducedMotion: true,
      });
    } catch (err) {
      // Ignore fallback
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    triggerScratchSparkle(clientX, clientY);
    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  return (
    <section className="py-12 px-4 bg-[#FDFBF7] relative select-none">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#541D30] uppercase mb-1">
          Counting Down To The Sacred Hour
        </p>

        <h2 className="font-cinzel-decorative text-2xl sm:text-3xl text-[#2C221E] font-bold">
          Until We Say "I Do"
        </h2>

        <GoldLotusDivider className="my-2 scale-90" />

        {/* Scratch Card Label Badge */}
        {!isRevealed && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#7A5C14] font-cinzel text-xs font-bold tracking-widest uppercase mb-4 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#541D30]" />
            <span>Scratch to Reveal</span>
          </div>
        )}

        {timeLeft.isPassed ? (
          <div className="py-8 px-6 bg-[#FAF6EE] border border-[#D4AF37] rounded-2xl max-w-lg mx-auto card-paper-texture">
            <h3 className="font-script text-4xl text-[#541D30] mb-2">The Wedding Celebration is Here!</h3>
            <p className="font-cormorant text-lg text-[#2C221E] italic">
              Thank you for blessing Vishnu & Nayana on their auspicious wedding day!
            </p>
          </div>
        ) : (
          <div className="relative max-w-2xl mx-auto my-4">
            {/* Countdown Grid Container */}
            <div
              ref={containerRef}
              className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-4 rounded-2xl bg-[#FAF6EE] border-2 border-[#D4AF37]/60 card-paper-texture shadow-xl overflow-hidden"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit, idx) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 shadow-md"
                >
                  <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#541D30] tracking-widest">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#7A5C14] uppercase mt-1">
                    {unit.label}
                  </span>
                </motion.div>
              ))}

              {/* SCRATCH CANVAS OVERLAY */}
              {!isRevealed && (
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="absolute inset-0 w-full h-full z-20 cursor-pointer touch-none transition-opacity duration-500 rounded-2xl shadow-lg"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
