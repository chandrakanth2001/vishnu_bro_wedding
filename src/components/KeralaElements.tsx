import React from 'react';

// Hanging Jasmine Garland (Mullappoo) with Lotus Buds
export const MullappooGarlands: React.FC<{ className?: string; mirror?: boolean }> = ({
  className = '',
  mirror = false,
}) => {
  return (
    <div
      className={`pointer-events-none select-none z-20 ${
        mirror ? 'animate-sway-reverse' : 'animate-sway-slow'
      } ${className}`}
    >
      <svg viewBox="0 0 180 320" fill="none" className="w-full h-full drop-shadow-md">
        {/* Chain / Thread Strings */}
        <path d="M20 0V220" stroke="#8C6D1F" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 0V280" stroke="#8C6D1F" strokeWidth="1.5" />
        <path d="M90 0V190" stroke="#8C6D1F" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M130 0V250" stroke="#8C6D1F" strokeWidth="1.5" />
        <path d="M160 0V170" stroke="#8C6D1F" strokeWidth="1" strokeDasharray="3 3" />

        {/* Jasmine Flower Nodes (Center Strand) */}
        <g fill="#FFFDF5" stroke="#C9A227" strokeWidth="0.8">
          <circle cx="50" cy="30" r="7" />
          <circle cx="50" cy="55" r="7" />
          <circle cx="50" cy="80" r="7" />
          <circle cx="50" cy="105" r="7" />
          <circle cx="50" cy="130" r="7" />
          <circle cx="50" cy="155" r="7" />
          <circle cx="50" cy="180" r="7" />
          <circle cx="50" cy="205" r="7" />
          <circle cx="50" cy="230" r="7" />
          <circle cx="50" cy="255" r="7" />

          {/* Left Strand 1 */}
          <circle cx="20" cy="40" r="4.5" />
          <circle cx="20" cy="70" r="4.5" />
          <circle cx="20" cy="100" r="4.5" />
          <circle cx="20" cy="130" r="4.5" />
          <circle cx="20" cy="160" r="4.5" />
          <circle cx="20" cy="190" r="4.5" />

          {/* Center-Right Strand */}
          <circle cx="90" cy="35" r="5" />
          <circle cx="90" cy="65" r="5" />
          <circle cx="90" cy="95" r="5" />
          <circle cx="90" cy="125" r="5" />
          <circle cx="90" cy="155" r="5" />

          {/* Right Strand 1 */}
          <circle cx="130" cy="45" r="6.5" />
          <circle cx="130" cy="75" r="6.5" />
          <circle cx="130" cy="105" r="6.5" />
          <circle cx="130" cy="135" r="6.5" />
          <circle cx="130" cy="165" r="6.5" />
          <circle cx="130" cy="195" r="6.5" />
          <circle cx="130" cy="225" r="6.5" />

          {/* Far Right Strand */}
          <circle cx="160" cy="50" r="4" />
          <circle cx="160" cy="80" r="4" />
          <circle cx="160" cy="110" r="4" />
          <circle cx="160" cy="140" r="4" />
        </g>

        {/* Pink Lotus Buds at Tips */}
        {/* Main Center Lotus */}
        <g transform="translate(50, 260)">
          <path
            d="M0 0 C-12 12 -8 32 0 40 C8 32 12 12 0 0 Z"
            fill="#E86C8D"
            stroke="#B83B5E"
            strokeWidth="1.2"
          />
          <path d="M0 0 C-6 10 -4 28 0 38 C4 28 6 10 0 0 Z" fill="#F48FB1" />
          <path d="M-8 15 Q-16 28 0 38 Q16 28 8 15 Z" fill="#AD1457" opacity="0.4" />
        </g>

        {/* Strand 2 Lotus */}
        <g transform="translate(130, 230)">
          <path
            d="M0 0 C-10 10 -6 26 0 32 C6 26 10 10 0 0 Z"
            fill="#E86C8D"
            stroke="#B83B5E"
            strokeWidth="1"
          />
        </g>

        {/* Strand 1 Lotus */}
        <g transform="translate(20, 195)">
          <path d="M0 0 C-7 8 -4 20 0 24 C4 20 7 8 0 0 Z" fill="#E86C8D" />
        </g>

        {/* Strand 3 Lotus */}
        <g transform="translate(90, 160)">
          <path d="M0 0 C-7 8 -4 20 0 24 C4 20 7 8 0 0 Z" fill="#E86C8D" />
        </g>
      </svg>
    </div>
  );
};

// Hanging Brass Oil Lamp (Thookkuvilakku)
export const ThookkuVilakku: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 100 240" fill="none" className="w-full h-full drop-shadow-xl">
        <defs>
          <linearGradient id="goldBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4E297" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#7A5C14" />
          </linearGradient>
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="1" />
            <stop offset="40%" stopColor="#FFB703" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hanging Chain Links */}
        <path d="M50 0V110" stroke="url(#goldBrassGrad)" strokeWidth="2.5" strokeDasharray="6 4" />

        {/* Top Ring Ornament */}
        <circle cx="50" cy="50" r="6" fill="none" stroke="url(#goldBrassGrad)" strokeWidth="2.5" />
        <circle cx="50" cy="80" r="5" fill="none" stroke="url(#goldBrassGrad)" strokeWidth="2" />

        {/* Crown Bell Top */}
        <path d="M42 110 L58 110 L54 122 L46 122 Z" fill="url(#goldBrassGrad)" />

        {/* Main Oil Reservoir Bowl */}
        <path
          d="M20 125 L80 125 C75 160 65 168 50 168 C35 168 25 160 20 125 Z"
          fill="url(#goldBrassGrad)"
          stroke="#7A5C14"
          strokeWidth="1.5"
        />
        <ellipse cx="50" cy="125" rx="30" ry="8" fill="#EED06D" stroke="#B38728" strokeWidth="1.5" />

        {/* Bottom Brass Bell Pendant */}
        <path d="M50 168 V195" stroke="url(#goldBrassGrad)" strokeWidth="2" />
        <path d="M44 195 C44 205 56 205 56 195 Z" fill="url(#goldBrassGrad)" />
        <circle cx="50" cy="204" r="4" fill="#D4AF37" />

        {/* Lamp Flame (Left Wick) */}
        <g className="animate-flame" style={{ transformOrigin: '22px 123px' }}>
          <circle cx="22" cy="115" r="14" fill="url(#flameGlow)" opacity="0.6" />
          <path d="M22 104 C18 114 17 121 22 125 C27 121 26 114 22 104 Z" fill="#FFB703" />
          <path d="M22 110 C20 116 20 120 22 123 C24 120 24 116 22 110 Z" fill="#FFF59D" />
        </g>

        {/* Lamp Flame (Center Main Wick) */}
        <g className="animate-flame" style={{ transformOrigin: '50px 120px' }}>
          <circle cx="50" cy="110" r="18" fill="url(#flameGlow)" opacity="0.75" />
          <path d="M50 96 C45 108 44 117 50 122 C56 117 55 108 50 96 Z" fill="#FFB703" />
          <path d="M50 104 C47 112 47 117 50 120 C53 117 53 112 50 104 Z" fill="#FFF59D" />
        </g>

        {/* Lamp Flame (Right Wick) */}
        <g className="animate-flame" style={{ transformOrigin: '78px 123px' }}>
          <circle cx="78" cy="115" r="14" fill="url(#flameGlow)" opacity="0.6" />
          <path d="M78 104 C74 114 73 121 78 125 C83 121 82 114 78 104 Z" fill="#FFB703" />
          <path d="M78 110 C76 116 76 120 78 123 C80 120 80 116 78 110 Z" fill="#FFF59D" />
        </g>
      </svg>
    </div>
  );
};

// Nilavilakku (Traditional Standing Brass Lamp)
export const Nilavilakku: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 120 300" fill="none" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="nilavGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#E6C250" />
            <stop offset="60%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8C6D1F" />
          </linearGradient>
        </defs>

        {/* Base Pedestal */}
        <ellipse cx="60" cy="285" rx="45" ry="12" fill="url(#nilavGrad)" stroke="#7A5C14" strokeWidth="1.5" />
        <path d="M30 280 L90 280 L80 260 L40 260 Z" fill="url(#nilavGrad)" stroke="#7A5C14" />

        {/* Main Stem Nodes */}
        <rect x="52" y="160" width="16" height="100" fill="url(#nilavGrad)" rx="2" stroke="#7A5C14" />
        <ellipse cx="60" cy="230" rx="16" ry="6" fill="url(#nilavGrad)" />
        <ellipse cx="60" cy="190" rx="14" ry="5" fill="url(#nilavGrad)" />

        {/* Lower Dish Tier */}
        <path d="M25 155 L95 155 L85 168 L35 168 Z" fill="url(#nilavGrad)" stroke="#7A5C14" />
        <ellipse cx="60" cy="155" rx="35" ry="8" fill="#FFE082" stroke="#B38728" />

        {/* Upper Stem */}
        <rect x="54" y="80" width="12" height="75" fill="url(#nilavGrad)" />

        {/* Main Top Oil Lamp Dish */}
        <path d="M15 75 L105 75 C98 100 82 108 60 108 C38 108 22 100 15 75 Z" fill="url(#nilavGrad)" stroke="#7A5C14" strokeWidth="1.5" />
        <ellipse cx="60" cy="75" rx="45" ry="10" fill="#FFF2B2" stroke="#C9A227" strokeWidth="1.5" />

        {/* Crown Spire / Prabha */}
        <path d="M55 75 L65 75 L60 35 Z" fill="url(#nilavGrad)" stroke="#7A5C14" />
        <circle cx="60" cy="32" r="5" fill="#FFE082" stroke="#C9A227" />

        {/* Glowing Flames on Spire & Rim */}
        <g className="animate-flame" style={{ transformOrigin: '60px 25px' }}>
          <path d="M60 12 C55 24 54 30 60 34 C66 30 65 24 60 12 Z" fill="#FFB703" />
          <path d="M60 18 C58 24 58 28 60 31 C62 28 62 24 60 18 Z" fill="#FFF59D" />
        </g>
        <g className="animate-flame" style={{ transformOrigin: '20px 73px' }}>
          <path d="M20 60 C16 70 15 74 20 77 C25 74 24 70 20 60 Z" fill="#FFB703" />
        </g>
        <g className="animate-flame" style={{ transformOrigin: '100px 73px' }}>
          <path d="M100 60 C96 70 95 74 100 77 C105 74 104 70 100 60 Z" fill="#FFB703" />
        </g>
      </svg>
    </div>
  );
};

// Uruli Vessel with Water and Floating Lotus Flowers
export const UruliLotus: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 240 140" fill="none" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="uruliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4E297" />
            <stop offset="40%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#664D10" />
          </linearGradient>
          <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="70%" stopColor="#0284C7" opacity="0.6" />
            <stop offset="100%" stopColor="#0369A1" opacity="0.9" />
          </radialGradient>
        </defs>

        {/* Uruli Handles */}
        <path d="M10 60 Q0 60 5 75 Q15 80 20 70 Z" fill="url(#uruliGrad)" stroke="#664D10" />
        <path d="M230 60 Q240 60 235 75 Q225 80 220 70 Z" fill="url(#uruliGrad)" stroke="#664D10" />

        {/* Outer Body */}
        <path
          d="M20 60 C20 115 60 135 120 135 C180 135 220 115 220 60 Z"
          fill="url(#uruliGrad)"
          stroke="#664D10"
          strokeWidth="2"
        />

        {/* Inner Water Surface */}
        <ellipse cx="120" cy="60" rx="98" ry="24" fill="url(#waterGlow)" stroke="#C9A227" strokeWidth="2" />

        {/* Floating Green Lotus Leaves */}
        <ellipse cx="75" cy="58" rx="22" ry="12" fill="#2E7D32" opacity="0.9" />
        <ellipse cx="165" cy="62" rx="24" ry="11" fill="#1B5E20" opacity="0.95" />

        {/* Center Main Floating Pink Lotus Blossom */}
        <g transform="translate(120, 52)" className="drop-shadow-md">
          {/* Outer Petals */}
          <path d="M0 12 C-18 6 -24 -8 0 -22 C24 -8 18 6 0 12 Z" fill="#E86C8D" />
          <path d="M0 12 C-26 2 -20 -16 -6 -20 C18 -16 26 2 0 12 Z" fill="#F48FB1" />
          <path d="M0 12 C6 -16 20 -20 26 -2 C20 16 -6 12 0 12 Z" fill="#F06292" />
          {/* Inner Petals */}
          <path d="M0 10 C-10 -4 -8 -16 0 -18 C8 -16 10 -4 0 10 Z" fill="#FFF" />
          <circle cx="0" cy="-4" r="5" fill="#FBC02D" />
        </g>

        {/* Left Small Floating Lotus */}
        <g transform="translate(70, 56) scale(0.65)">
          <path d="M0 12 C-18 6 -24 -8 0 -22 C24 -8 18 6 0 12 Z" fill="#E86C8D" />
          <path d="M0 10 C-10 -4 -8 -16 0 -18 C8 -16 10 -4 0 10 Z" fill="#FFF" />
          <circle cx="0" cy="-4" r="4" fill="#FBC02D" />
        </g>

        {/* Right Small Floating Lotus */}
        <g transform="translate(170, 60) scale(0.7)">
          <path d="M0 12 C-18 6 -24 -8 0 -22 C24 -8 18 6 0 12 Z" fill="#EC407A" />
          <path d="M0 10 C-10 -4 -8 -16 0 -18 C8 -16 10 -4 0 10 Z" fill="#FFFDF5" />
          <circle cx="0" cy="-4" r="4" fill="#FBC02D" />
        </g>
      </svg>
    </div>
  );
};

// Gold Lotus Scroll Divider
export const GoldLotusDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-center my-4 ${className}`}>
      <svg viewBox="0 0 400 40" fill="none" className="w-full max-w-md h-10 text-[#C9A227]">
        {/* Left Scroll Line */}
        <path d="M10 20 H160 Q170 20 175 15 Q180 10 185 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15" cy="20" r="2.5" fill="currentColor" />
        <circle cx="25" cy="20" r="1.5" fill="currentColor" />

        {/* Central Lotus Emblem */}
        <g transform="translate(200, 20)">
          {/* Base Scroll Swirls */}
          <path d="M-15 4 C-8 12 8 12 15 4" stroke="currentColor" strokeWidth="1.2" />
          {/* Outer Petals */}
          <path d="M0 8 C-16 0 -18 -12 0 -18 C18 -12 16 0 0 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 8 C-10 -4 -12 -14 0 -16 C12 -14 10 -4 0 8 Z" fill="currentColor" opacity="0.25" />
          {/* Inner Lotus Petal */}
          <path d="M0 4 C-5 -2 -6 -10 0 -12 C6 -10 5 -2 0 4 Z" fill="currentColor" />
        </g>

        {/* Right Scroll Line */}
        <path d="M390 20 H240 Q230 20 225 15 Q220 10 215 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="385" cy="20" r="2.5" fill="currentColor" />
        <circle cx="375" cy="20" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Sacred Ganesha Gold Monogram
export const GaneshaMonogram: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex justify-center select-none ${className}`}>
      <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 drop-shadow-md text-[#C9A227]">
        <circle cx="40" cy="40" r="36" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
        {/* Ganesha Stylized Line Art */}
        <g transform="translate(18, 16)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {/* Crown (Mukut) */}
          <path d="M14 6 L30 6 L22 0 Z" fill="currentColor" opacity="0.3" />
          {/* Head & Trunk Swirl */}
          <path d="M22 6 C12 6 8 16 8 26 C8 38 18 42 26 42 C30 42 34 38 34 32 C34 26 28 24 24 24 C18 24 16 30 22 34" />
          {/* Ear Right */}
          <path d="M30 14 C38 14 42 22 36 28" />
          {/* Tusk & Tilak */}
          <line x1="22" y1="10" x2="22" y2="18" strokeWidth="2.5" stroke="#B38728" />
          <circle cx="22" cy="8" r="2" fill="#7A1F2D" stroke="none" />
        </g>
      </svg>
    </div>
  );
};

// V&S Monogram Emblem (Card 1)
export const VSMonogram: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex justify-center select-none ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-20 h-20 text-[#C9A227] drop-shadow-md">
        <path d="M50 5 L62 25 L85 25 L68 40 L74 62 L50 48 L26 62 L32 40 L15 25 L38 25 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <g transform="translate(20, 15)">
          <path d="M20 15 L30 45 L40 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 25 C45 20 52 30 42 40 C32 50 48 58 35 62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 35 C20 30 28 40 18 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx="50" cy="12" r="3" fill="#7A1F2D" />
      </svg>
    </div>
  );
};
