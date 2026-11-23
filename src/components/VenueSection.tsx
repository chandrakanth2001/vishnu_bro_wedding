import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, QrCode } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider } from './KeralaElements';

export const VenueSection: React.FC = () => {
  const { venue } = weddingData;

  return (
    <section id="venue" className="py-20 px-4 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#541D30] uppercase mb-1">
            Location & Directions
          </p>
          <h2 className="font-cinzel-decorative text-3xl sm:text-5xl text-[#2C221E] font-bold">
            The Wedding Venue
          </h2>
          <GoldLotusDivider className="my-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Venue Info & Directions Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 card-paper-texture shadow-xl flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] flex items-center justify-center mb-6 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>

              <span className="font-cinzel text-[10px] font-bold tracking-[0.2em] text-[#541D30] uppercase">
                Celebration Venue
              </span>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#2C221E] my-1">
                {venue.name}
              </h3>

              <p className="font-cinzel text-sm font-semibold text-[#7A1F2D] mb-4">
                {venue.location}
              </p>

              <p className="font-cormorant text-base text-[#2C221E] italic mb-6 leading-relaxed">
                {venue.fullAddress}
              </p>
            </div>

            {/* QR Code Scan Widget (Matching Card 1) */}
            <div className="border-t border-[#D4AF37]/30 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-4">
              <div className="w-24 h-24 bg-white border-2 border-[#D4AF37] p-1.5 rounded-lg shadow-md flex items-center justify-center flex-shrink-0">
                <img
                  src={venue.qrCodeImage || '/assets/qr-code.png'}
                  alt="Scan for Venue Map QR Code"
                  className="w-full h-full object-contain rounded"
                />
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="font-cinzel text-xs font-bold text-[#2C221E] uppercase tracking-wider">
                  Scan for Map
                </p>
                <p className="font-cormorant text-xs text-[#7A5C14] italic mb-2">
                  Point phone camera to get instant turn-by-turn navigation.
                </p>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-xs font-bold tracking-widest shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Interactive Preview */}
          {/* <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-2 shadow-xl card-paper-texture h-[400px] overflow-hidden"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <iframe
                title="Venue Map"
                src={venue.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[1.05]"
              />
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-[#FAF6EE]/95 border border-[#D4AF37] text-[#B38728] px-4 py-2 rounded-full font-cinzel text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#D4AF37] hover:text-[#FAF6EE] transition-all"
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};
