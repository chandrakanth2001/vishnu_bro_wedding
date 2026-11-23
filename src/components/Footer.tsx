import React, { useState } from 'react';
import { ArrowUp, Share2, Heart, Check } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider, VSMonogram, UruliLotus } from './KeralaElements';

interface FooterProps {
  onOpenRSVP: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRSVP }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vishnu & Nayana Wedding Invitation',
        text: 'Join us for the traditional Kerala wedding ceremony of Vishnu & Nayana on 22 January 2027.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FAF6EE] border-t-2 border-[#D4AF37]/50 pt-16 pb-12 px-4 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">

        {/* <h2 className="font-script text-4xl sm:text-6xl text-gold-gradient my-2 px-2 inline-block overflow-visible">
          {weddingData.couple.bride.name} <span className="font-cormorant text-2xl text-[#7A1F2D] italic">&</span> {weddingData.couple.groom.name}
        </h2>

        <p className="font-cinzel text-sm font-bold text-[#2C221E] tracking-widest my-2">
          {weddingData.weddingDate.formatted}
        </p> */}

        <p className="font-cormorant text-sm italic text-[#7A5C14]  mx-auto mb-6">
          We look forward to your presence and divine blessings on our auspicious day - Vishnu & Nayana
        </p>

        <GoldLotusDivider className="my-4" />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-8 font-cinzel text-xs font-bold">
          {/* <button
            onClick={onOpenRSVP}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] tracking-widest uppercase shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Confirm RSVP
          </button> */}

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4AF37] bg-[#FDFBF7] text-[#541D30] tracking-widest uppercase shadow-sm hover:bg-[#D4AF37] hover:text-[#FAF6EE] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-700" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Share Invitation'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-[#D4AF37] bg-[#FDFBF7] text-[#541D30] hover:bg-[#D4AF37] hover:text-[#FAF6EE] transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* <p className="font-cormorant text-xs text-[#7A5C14]/80 mt-8">
          Crafted with love for Devika & Govind by CK
        </p> */}
      </div>
    </footer>
  );
};
