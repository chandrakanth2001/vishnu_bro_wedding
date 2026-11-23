import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SingleButterflyProps {
  masterCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  isReady: boolean;
  size?: number;
  duration?: number;
  delay?: number;
  topPercent?: number;
  scale?: number;
  flipX?: boolean;
  startX?: string;
  endX?: string;
}

const SingleButterflyCanvas: React.FC<SingleButterflyProps> = ({
  masterCanvasRef,
  isReady,
  size = 350,
  duration = 70,
  delay = 0,
  topPercent = 30,
  scale = 1,
  flipX = false,
  startX = '5vw',
  endX = '125vw',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;

    const render = () => {
      const targetCanvas = canvasRef.current;
      const srcCanvas = masterCanvasRef.current;

      if (targetCanvas && srcCanvas && srcCanvas.width > 0 && srcCanvas.height > 0) {
        const w = srcCanvas.width;
        const h = srcCanvas.height;

        if (targetCanvas.width !== w || targetCanvas.height !== h) {
          targetCanvas.width = w;
          targetCanvas.height = h;
        }

        const ctx = targetCanvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, w, h);
          // Pure GPU texture blit! Zero CPU pixel loop
          ctx.drawImage(srcCanvas, 0, 0, w, h);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [masterCanvasRef]);

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{ top: `${topPercent}%`, left: 0 }}
      initial={{ x: startX, y: 0, opacity: 0, scale: scale * (flipX ? -1 : 1) }}
      animate={{
        x: [startX, endX],
        y: [0, -55, 45, -65, 35, 0],
        rotate: [0, 12, -10, 16, -12, 0],
        opacity: isReady ? 1 : 0,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
        y: {
          duration: duration / 2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
        rotate: {
          duration: duration / 4,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.4,
        },
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: `${size}px`,
          height: 'auto',
          filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.25))',
          transform: flipX ? 'scaleX(-1)' : 'none',
        }}
      />
    </motion.div>
  );
};

export const GreenScreenButterfly: React.FC = () => {
  const masterVideoRef = useRef<HTMLVideoElement | null>(null);
  const masterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = masterVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.playbackRate = 0.55;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Butterfly master video autoplay prevented:', err);
      }
    };

    video.load();
    playVideo();

    const handleData = () => {
      playVideo();
    };

    video.addEventListener('loadeddata', handleData);
    video.addEventListener('canplay', handleData);

    return () => {
      video.removeEventListener('loadeddata', handleData);
      video.removeEventListener('canplay', handleData);
    };
  }, []);

  // Master Processing Loop: Green-screen chroma-key ONCE per frame
  useEffect(() => {
    let animId: number;

    const processFrame = () => {
      const video = masterVideoRef.current;
      const canvas = masterCanvasRef.current;

      if (
        video &&
        canvas &&
        video.readyState >= 2 &&
        video.videoWidth > 0 &&
        !video.ended
      ) {
        const w = video.videoWidth;
        const h = video.videoHeight;

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, w, h);
          const frame = ctx.getImageData(0, 0, w, h);
          const data = frame.data;
          const len = data.length;

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (g > 50 && g > r * 1.1 && g > b * 1.1) {
              data[i + 3] = 0;
            } else if (g > 40 && g > r * 1.02 && g > b * 1.02) {
              const diff = g - Math.max(r, b);
              const alphaFactor = 1 - Math.min(1, diff / 40);
              data[i + 3] = Math.floor(data[i + 3] * alphaFactor);
              data[i + 1] = Math.floor((r + b) / 2);
            }
          }

          ctx.putImageData(frame, 0, 0);

          if (!isReady) {
            setIsReady(true);
          }
        }
      }

      animId = requestAnimationFrame(processFrame);
    };

    animId = requestAnimationFrame(processFrame);
    return () => cancelAnimationFrame(animId);
  }, [isReady]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Off-screen video element rendered tiny for aggressive decoding */}
      <video
        ref={masterVideoRef}
        src="/assets/butterfly.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          width: 2,
          height: 2,
          opacity: 0.001,
          pointerEvents: 'none',
        }}
      />

      {/* Off-screen single master processing canvas */}
      <canvas
        ref={masterCanvasRef}
        className="hidden pointer-events-none"
      />

      {/* Butterfly 1: Visible instantly at top-left (5vw) */}
      <SingleButterflyCanvas
        masterCanvasRef={masterCanvasRef}
        isReady={isReady}
        size={380}
        duration={70}
        delay={0}
        topPercent={12}
        scale={1.3}
        startX="5vw"
        endX="125vw"
      />
      {/* Butterfly 2: Visible instantly in upper-mid right (55vw) flying left */}
      <SingleButterflyCanvas
        masterCanvasRef={masterCanvasRef}
        isReady={isReady}
        size={300}
        duration={80}
        delay={0}
        topPercent={52}
        scale={1.1}
        flipX={true}
        startX="55vw"
        endX="-35vw"
      />
      {/* Butterfly 3: Visible instantly at mid-left (25vw) */}
      <SingleButterflyCanvas
        masterCanvasRef={masterCanvasRef}
        isReady={isReady}
        size={340}
        duration={65}
        delay={0}
        topPercent={28}
        scale={1.2}
        startX="25vw"
        endX="130vw"
      />
    </div>
  );
};
