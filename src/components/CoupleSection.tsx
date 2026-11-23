import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider, GaneshaMonogram, VSMonogram } from './KeralaElements';

export const CoupleSection: React.FC = () => {
  const { bride, groom, quote } = weddingData.couple;

  return (
    <section id="couple" className="py-20 px-4 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#541D30] uppercase mb-1">
            The Blessed Union
          </p>
          <h2 className="font-cinzel-decorative text-3xl sm:text-5xl text-[#2C221E] font-bold">
            Bride & Groom
          </h2>
          <GoldLotusDivider className="my-3" />

          {/* Inspirational Quote Card */}
        </div>

        {/* Couple Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">


          {/* GROOM CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-8 card-paper-texture shadow-xl flex flex-col justify-between"
          >
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]" />

            <div>
              {/* Photo Frame Container */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6 rounded-full p-2 bg-gradient-to-tr from-[#D4AF37] via-[#F4E297] to-[#B38728] shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FAF6EE] bg-[#FAF6EE] flex items-center justify-center">
                  <img
                    src={groom.image || '/assets/groom.jpeg'}
                    alt={groom.fullName}
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="font-cinzel text-[10px] font-bold tracking-[0.25em] text-[#541D30] uppercase">
                  The Groom
                </p>
                <h3 className="font-script text-4xl sm:text-5xl text-[#541D30] px-2 inline-block overflow-visible my-1">
                  {groom.name}
                </h3>
              </div>

              <div className="space-y-3 font-cormorant text-sm text-[#2C221E] border-t border-[#D4AF37]/30 pt-4">
                <div>
                  <span className="font-semibold text-[#7A5C14] block text-xs font-cinzel uppercase tracking-wider">
                    Son of:
                  </span>
                  <p className="text-base font-semibold">{groom.parents}</p>
                </div>

                <div>
                  <span className="font-semibold text-[#7A5C14] block text-xs font-cinzel uppercase tracking-wider">
                    Residence:
                  </span>
                  <p className="text-sm italic">{groom.residence}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BRIDE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-8 card-paper-texture shadow-xl flex flex-col justify-between"
          >
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]" />

            {/* Photo Frame Container */}
            {/* Bride section */}
            <div>
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6 rounded-full p-2 bg-gradient-to-tr from-[#D4AF37] via-[#F4E297] to-[#B38728] shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FAF6EE] bg-[#FAF6EE] flex items-center justify-center">
                  <img
                    src={bride.image || '/assets/bride.jpeg'}
                    alt={bride.fullName}
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="font-cinzel text-[10px] font-bold tracking-[0.25em] text-[#541D30] uppercase">
                  The Bride
                </p>
                <h3 className="font-script text-4xl sm:text-5xl text-[#541D30] px-2 inline-block overflow-visible my-1">
                  {bride.name}
                </h3>

              </div>

              <div className="space-y-3 font-cormorant text-sm text-[#2C221E] border-t border-[#D4AF37]/30 pt-4">
                <div>
                  <span className="font-semibold text-[#7A5C14] block text-xs font-cinzel uppercase tracking-wider">
                    Daughter of:
                  </span>
                  <p className="text-base font-semibold">{bride.parents}</p>
                </div>

                <div>
                  <span className="font-semibold text-[#7A5C14] block text-xs font-cinzel uppercase tracking-wider">
                    Residence:
                  </span>
                  <p className="text-sm italic">{bride.residence}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
