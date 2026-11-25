import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider } from './KeralaElements';

export const ReceptionSection: React.FC = () => {
  const { reception, venue } = weddingData;
  if (!reception) return null;

  const details = [
    {
      id: 'reception-date',
      title: 'Date',
      value: reception.date,
      subValue: reception.dayOfWeek,
      icon: Calendar,
    },
    {
      id: 'reception-time',
      title: 'Time',
      value: reception.time,
      subValue: 'Evening Celebration',
      icon: Clock,
    },
    {
      id: 'reception-venue',
      title: 'Venue',
      value: reception.venueName,
      subValue: reception.venueLocation,
      icon: MapPin,
    },
  ];

  return (
    <section id="reception" className="py-20 px-4 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* <p className="font-cinzel text-xs tracking-[0.25em] font-bold text-[#541D30] uppercase mb-1">
            {reception.hostedBy}
          </p> */}
          <h2 className="font-cinzel-decorative text-3xl sm:text-4xl text-[#2C221E] font-bold">
            {reception.title}
          </h2>
          <GoldLotusDivider className="my-2" />
        </div>

        {/* Unified Reception Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#FAF6EE] border-2 border-[#D4AF37]/60 rounded-2xl p-6 sm:p-10 card-paper-texture shadow-xl max-w-4xl mx-auto"
        >
          {/* Decorative Corner Filigree */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Host Subtitle Banner */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#541D30]/10 border border-[#541D30]/25 font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#541D30] uppercase">
              Post-Wedding Reception Hosted by Groom
            </span>
          </div>

          {/* 3-Column Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/30 text-center">
            {details.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex flex-col items-center pt-4 first:pt-0 md:pt-0 md:px-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#783449] to-[#541D30] p-0.5 shadow-md mb-3">
                    <div className="w-full h-full rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#541D30]">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <p className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#541D30] uppercase mb-1">
                    {item.title}
                  </p>

                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#2C221E] leading-snug">
                    {item.value}
                  </h3>

                  <p className="font-cormorant text-sm text-[#7A5C14] italic mt-0.5">
                    {item.subValue}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Venue Directions Strip */}
          {venue.mapsUrl && (
            <div className="border-t border-[#D4AF37]/30 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {venue.qrCodeImage && (
                <div className="w-16 h-16 bg-white border border-[#D4AF37] p-1 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                  <img
                    src={venue.qrCodeImage}
                    alt="Scan for Reception Map QR Code"
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              )}
              <div className="text-center sm:text-left">
                <p className="font-cinzel text-xs font-bold text-[#2C221E] uppercase tracking-wider">
                  Venue Location & Directions
                </p>
                <p className="font-cormorant text-xs text-[#7A5C14] italic mb-2">
                  ALSAJ Convention Centre, Kattakada
                </p>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-[10px] sm:text-xs font-bold tracking-wider shadow-sm hover:brightness-110 active:scale-95 transition-all"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
