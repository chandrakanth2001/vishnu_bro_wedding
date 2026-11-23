import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  depth: number; // 0.2 (far background) to 1.0 (foreground)
  size: number;
  speedY: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  rotation: number;
  rotSpeed: number;
  flipX: number;
  flipSpeed: number;
  type: 'rose' | 'jasmine';
  variant: number;
  alpha: number;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Preload candidate images from assets folder
    const loadedRoseImages: HTMLImageElement[] = [];
    const loadedJasmineImages: HTMLImageElement[] = [];

    const rosePaths = [
      '/assets/rosepetals.png',
      '/assets/rosepetals.jpg',
      '/assets/rosepetals.jpeg',
      '/assets/rose_petal.png',
      '/assets/rose_petal.jpg',
      '/assets/rose.png',
      '/assets/petal.png',
    ];

    const jasminePaths = [
      '/assets/jasmine.png',
      '/assets/jasmine.jpg',
      '/assets/jasmine.jpeg',
      '/assets/jasmine_flower.png',
      '/assets/jasmine_flower.jpg',
      '/assets/jasmine.png',
    ];

    rosePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedRoseImages.push(img);
      };
    });

    jasminePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedJasmineImages.push(img);
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 22 particles across depth layers for a gentle, serene flow
    const particleCount = 22;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const randDepth = Math.random();
      let depth: number;
      if (randDepth < 0.35) {
        depth = 0.25 + Math.random() * 0.2; // Background: low opacity, small, slow
      } else if (randDepth < 0.75) {
        depth = 0.5 + Math.random() * 0.25; // Midground: medium opacity
      } else {
        depth = 0.8 + Math.random() * 0.2; // Foreground: high quality, crisp
      }

      const isMobile = width < 640;
      const screenScale = isMobile ? 0.55 : Math.min(1.0, Math.max(0.75, width / 1200));
      const alpha = depth < 0.5 ? 0.25 + depth * 0.4 : 0.65 + (depth - 0.5) * 0.7;
      const baseSize = (12 + Math.random() * 14) * screenScale;
      const size = baseSize * depth;

      const baseX = Math.random() * width;

      particles.push({
        id: i,
        x: baseX,
        y: Math.random() * (height + 200) - 100,
        baseX,
        depth,
        size,
        speedY: (0.12 + Math.random() * 0.28) * (0.4 + depth * 0.5), // Serene, ultra-slow float
        swayAmp: (12 + Math.random() * 25) * depth * screenScale,
        swayFreq: 0.003 + Math.random() * 0.006,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008 * (0.8 + depth),
        flipX: Math.random() * Math.PI,
        flipSpeed: (0.004 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
        type: i % 2 === 0 ? 'rose' : 'jasmine',
        variant: Math.floor(Math.random() * 3),
        alpha: Math.min(1.0, alpha),
      });
    }

    // Sort particles by depth ascending so background is drawn first
    particles.sort((a, b) => a.depth - b.depth);

    let time = 0;

    // Procedural Fallback Renderers
    const drawRosePetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const scaleX = Math.cos(p.flipX);
      ctx.scale(scaleX, 1);
      ctx.globalAlpha = p.alpha;

      if (loadedRoseImages.length > 0) {
        const img = loadedRoseImages[p.variant % loadedRoseImages.length];
        ctx.drawImage(img, -p.size, -p.size, p.size * 2, p.size * 2);
      } else {
        // High quality vector rose petal
        const r = p.size;
        ctx.beginPath();
        if (p.variant === 0) {
          // Heart-shaped curved rose petal
          ctx.moveTo(0, -r);
          ctx.bezierCurveTo(r * 1.1, -r * 0.8, r * 1.2, r * 0.4, 0, r);
          ctx.bezierCurveTo(-r * 1.2, r * 0.4, -r * 1.1, -r * 0.8, 0, -r);
        } else if (p.variant === 1) {
          // Curved side-profile petal
          ctx.moveTo(-r * 0.3, -r);
          ctx.bezierCurveTo(r * 1.4, -r * 0.5, r * 1.0, r * 0.8, -r * 0.2, r * 0.9);
          ctx.bezierCurveTo(-r * 0.9, r * 0.5, -r * 0.8, -r * 0.5, -r * 0.3, -r);
        } else {
          // Oval flutter petal
          ctx.moveTo(0, -r * 0.9);
          ctx.bezierCurveTo(r * 0.9, -r * 0.6, r * 1.1, r * 0.6, 0, r * 0.9);
          ctx.bezierCurveTo(-r * 1.1, r * 0.6, -r * 0.9, -r * 0.6, 0, -r * 0.9);
        }

        // Luxurious velvet rose gradient
        const grad = ctx.createRadialGradient(-r * 0.2, -r * 0.3, r * 0.1, 0, 0, r * 1.3);
        grad.addColorStop(0, '#E83E8C'); // Vivid Rose Pink highlight
        grad.addColorStop(0.4, '#C41E3A'); // Crimson Red body
        grad.addColorStop(0.85, '#8B0000'); // Deep Maroon shade
        grad.addColorStop(1, '#5C0011'); // Dark velvet rim

        ctx.fillStyle = grad;
        ctx.fill();

        // Delicate petal vein highlight
        ctx.beginPath();
        ctx.moveTo(0, r * 0.7);
        ctx.quadraticCurveTo(r * 0.15, 0, 0, -r * 0.6);
        ctx.strokeStyle = 'rgba(255, 200, 210, 0.35)';
        ctx.lineWidth = Math.max(0.8, r * 0.06);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawJasmineBlossom = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const scaleX = Math.cos(p.flipX);
      ctx.scale(scaleX, 1);
      ctx.globalAlpha = p.alpha;

      if (loadedJasmineImages.length > 0) {
        const img = loadedJasmineImages[p.variant % loadedJasmineImages.length];
        ctx.drawImage(img, -p.size, -p.size, p.size * 2, p.size * 2);
      } else {
        const r = p.size * 0.95;
        const petalCount = p.variant === 1 ? 6 : 5;

        // Draw 5 or 6 white jasmine petals radiating out
        for (let i = 0; i < petalCount; i++) {
          const angle = (i * 2 * Math.PI) / petalCount;
          ctx.save();
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-r * 0.35, -r * 0.45, -r * 0.3, -r * 0.9, 0, -r * 1.05);
          ctx.bezierCurveTo(r * 0.3, -r * 0.9, r * 0.35, -r * 0.45, 0, 0);

          const petalGrad = ctx.createLinearGradient(0, 0, 0, -r * 1.05);
          petalGrad.addColorStop(0, '#FFF5E4'); // Warm golden cream base
          petalGrad.addColorStop(0.4, '#FFFFFF'); // Pure white body
          petalGrad.addColorStop(1, '#FAF8F5'); // Soft white tip

          ctx.fillStyle = petalGrad;
          ctx.fill();

          ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.restore();
        }

        // Jasmine Golden Center Stamen
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = '#E6C250'; // Warm gold
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = '#8C6D1F';
        ctx.fill();
      }

      ctx.restore();
    };

    // Render Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.y += p.speedY;
        p.swayPhase += p.swayFreq;
        p.x = p.baseX + Math.sin(p.swayPhase) * p.swayAmp + Math.cos(p.swayPhase * 0.5) * (p.swayAmp * 0.3);

        p.rotation += p.rotSpeed;
        p.flipX += p.flipSpeed;

        // Wrap around bottom to top smoothly
        if (p.y > height + 40) {
          p.y = -40;
          p.baseX = Math.random() * width;
          p.swayPhase = Math.random() * Math.PI * 2;
        }

        // Draw particle based on type
        if (p.type === 'rose') {
          drawRosePetal(p);
        } else {
          drawJasmineBlossom(p);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};
