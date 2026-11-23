import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar, MapPin, Image, Mail } from 'lucide-react';
import { weddingData } from '../data/wedding';

interface NavbarProps {
  onOpenRSVP: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRSVP }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#couple' },
    { name: 'Details', href: '#details' },
    { name: 'Events', href: '#events' },
    { name: 'Venue', href: '#venue' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blessings', href: '#blessings' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#D4AF37]/40 shadow-md py-2.5'
          : 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Logo */}
        <a href="#" className="flex items-center gap-2 group">
          {/* <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B38728] text-[#FAF6EE] flex items-center justify-center font-cinzel text-xs font-bold shadow-md group-hover:scale-105 transition-transform">
            D&G
          </span> */}
          <span className="font-script text-2xl text-[#2C221E] font-bold tracking-wide">
            {weddingData.couple.groom.name} <span className="font-cormorant text-sm text-[#7A1F2D] italic">&</span> {weddingData.couple.bride.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-cinzel text-xs font-semibold tracking-wider text-[#2C221E]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative hover:text-[#541D30] transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#541D30] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}

          {/* RSVP Button */}
          <button
            onClick={onOpenRSVP}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-xs font-bold tracking-widest shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>RSVP</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenRSVP}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-[10px] font-bold tracking-widest"
          >
            RSVP
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2C221E] hover:text-[#541D30]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-b border-[#D4AF37]/40 shadow-xl px-6 py-6 animate-fade-in">
          <div className="flex flex-col gap-4 font-cinzel text-sm font-semibold tracking-widest text-[#2C221E]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#D4AF37]/20 hover:text-[#541D30]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
