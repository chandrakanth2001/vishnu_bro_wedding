import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider } from './KeralaElements';

export const WeddingDetails: React.FC = () => {
  const details = [
    {
      id: 'date',
      title: 'Auspicious Date',
      value: weddingData.weddingDate.dayOfWeek,
      subValue: weddingData.weddingDate.shortDate,
      icon: Calendar,
    },
    {
      id: 'muhurtham',
      title: 'Sacred Muhūrtham',
      value: weddingData.weddingDate.muhurtham,
      subValue: '',
      icon: Clock,
    },
    {
      id: 'venue',
      title: 'Wedding Venue',
      value: weddingData.venue.name,
      subValue: weddingData.venue.location,
      icon: MapPin,
    },
  ];

  return (
    <section id="details" className="py-16 px-4 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="font-cinzel text-xs tracking-[0.25em] font-bold text-[#B38728] uppercase mb-1">
            Ceremony Information
          </p>
          <h2 className="font-cinzel-decorative text-3xl sm:text-4xl text-[#2C221E] font-bold">
            Key Wedding Details
          </h2>
          <GoldLotusDivider className="my-2" />
        </div>

        {/* Details Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {details.map((item, index) => {
            const Icon = item.icon;
            const isVenue = item.id === 'venue';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative bg-[#FDFBF7] border-2 border-[#D4AF37]/40 rounded-xl p-5 text-center card-paper-texture transition-all duration-300 hover:border-[#D4AF37] hover:shadow-xl flex flex-col justify-between items-center ${
                  isVenue ? 'md:col-span-1' : ''
                }`}
              >
                {/* Decorative Inner Corner Marks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4AF37]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37]" />

                {/* Top Half: Icon & Main Info */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#783449] to-[#541D30] p-0.5 shadow-md mb-2 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#541D30]">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#541D30] uppercase mb-0.5">
                    {item.title}
                  </p>

                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2C221E] my-0.5 leading-snug">
                    {item.value}
                  </h3>

                  <p className="font-cormorant text-md sm:text-sm text-[#7A5C14] italic">
                    {item.subValue}
                  </p>
                </div>

                {/* Additional QR & Directions block for Venue Card */}
                {isVenue ? (
                  <div className="w-full border-t border-[#D4AF37]/30 pt-3 mt-3 flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-3">
                    <div className="w-16 h-16 sm:w-14 sm:h-14 bg-white border border-[#D4AF37] p-1 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                      <img
                        src={weddingData.venue.qrCodeImage || '/assets/al_saj_loc_qr.png'}
                        alt="Scan for Map QR Code"
                        className="w-full h-full object-contain rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
                      <p className="font-cinzel text-[10px] sm:text-xs font-bold text-[#2C221E] uppercase tracking-wider leading-tight">
                        Scan for Map
                      </p>
                      <p className="font-cormorant text-xs text-[#7A5C14] italic leading-tight mb-1.5">
                        Point phone camera for navigation
                      </p>
                      <a
                        href={weddingData.venue.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-[9px] sm:text-[10px] font-bold tracking-wider shadow-sm hover:brightness-110 active:scale-95 transition-all"
                      >
                        <Navigation className="w-2.5 h-2.5" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="h-2" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
