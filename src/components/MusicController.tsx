import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { weddingData } from '../data/wedding';

interface MusicControllerProps {
  autoPlayTriggered?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(weddingData.music.src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Handle autoPlayTriggered when user clicks "Open Invitation"
  useEffect(() => {
    if (autoPlayTriggered && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => {
          console.warn('Audio playback browser restriction:', err);
        });
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">

      {/* Main Floating Audio Button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        aria-label={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-2xl ${isPlaying
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] border-[#FAF6EE] text-[#FAF6EE] scale-105'
            : 'bg-[#FAF6EE] border-[#541D30]/40 text-[#541D30] hover:bg-[#F5EFEB]'
          }`}
      >
        {/* Pulsing Aura Rings when Music is Active */}
        {isPlaying && !isMuted && (
          <span className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-40 pointer-events-none" />
        )}

        {/* Dynamic Icon */}
        {isPlaying ? (
          isMuted ? (
            <VolumeX className="w-5 h-5 text-red-700" />
          ) : (
            <Volume2 className="w-5 h-5 animate-pulse" />
          )
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}

      </button>
    </div>
  );
};

// Web Audio API Temple Bell Chime Function (Standalone helper)
export const playTempleBellChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    // Ceremonial bell frequencies (C5, E5, G5, C6 pentatonic notes)
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      // Fast attack, smooth exponential bell decay
      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.5);
    });
  } catch (err) {
    console.warn('Web Audio chime unavailable:', err);
  }
};
