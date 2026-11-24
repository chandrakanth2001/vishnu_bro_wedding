import React from 'react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider, MullappooGarlands } from './KeralaElements';

export const WeddingHero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 overflow-hidden bg-[#FDFBF7]">
      {/* Top Left & Right Garlands */}
      <div className="absolute top-0 left-0 w-24 sm:w-36 pointer-events-none opacity-80 z-20">
        <MullappooGarlands />
      </div>
      <div className="absolute top-0 right-0 w-24 sm:w-36 pointer-events-none opacity-80 z-20">
        <MullappooGarlands mirror />
      </div>

      {/* Main Printed Invitation Card Container using template.jpg */}
      <div className="relative max-w-2xl w-full mx-auto rounded-2xl shadow-2xl overflow-hidden my-4 border-2 border-[#D4AF37]/60">
        {/* Full Quality Template Background Image */}
        <img
          src="/assets/hero_background_2.jpeg"
          alt="Traditional Wedding Invitation Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Content Container aligned inside the arch */}
        <div className="relative z-10 text-center px-6 sm:px-14 pt-36 sm:pt-44 pb-8 sm:pb-12 flex flex-col items-center justify-center">
          {/* Ganapathy Top Header */}
          <div className="flex justify-center select-none mb-1 sm:mt-1">
            <img
              src="/assets/ganapathy.png"
              alt="Lord Ganapathy"
              className="w-30 h-30 object-contain drop-shadow-md"
            />
          </div>

          {/* Host Lineage Announcement */}


          <p className="font-cormorant mt-5 text-xs sm:text-sm italic text-[#7A5C14] max-w-md mx-auto px-2">
            What started as a beautiful coincidence,
            slowly turned into countless memories,
            shared dreams, and a love meant to last forever.
          </p>
          <p className="font-cormorant text-xs sm:text-sm italic text-[#7A5C14] mt-0.5 max-w-md mx-auto px-2">
            With every passing moment,
            our hearts found a little more of home in each other.
            And now, we're ready to begin our forever together.
          </p>

          <p className="font-cormorant text-xs sm:text-sm italic text-[#7A5C14] mt-0.5 max-w-md mx-auto px-2">
            As we step into this beautiful new chapter,
            we'd be delighted to have you beside us,
            sharing the love, laughter, and joy of our special day.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 sm:-my-1 sm:mt-5">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
            <span className="font-cormorant  text-lg sm:text-xl text-[#7A1F2D] font-bold">
              <img src="/assets/heart2.png" alt="" />
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
          </div>
          <div className='mt-4'>
            <p className='font-cormorant text-xs sm:text-sm italic text-[#7A5C14]'>With Love,</p>
          </div>

          {/* BRIDE & GROOM CALLIGRAPHY HERO TITLE */}
          <div className="my-1 sm:my-2 flex ">
            <div>
              <h1 className="font-script text-5xl sm:text-5xl lg:text-6xl text-[#541D30] drop-shadow-sm px-6 inline-block leading-none">
                {weddingData.couple.groom.name}
              </h1>
            </div>
            <div className='font-cormorant italic mt-6 lg:mt-10 text-[#541D30] text-[22px] sm:text-[20px]'>&</div>

            <div>
              <h1 className="font-script text-5xl sm:text-5xl mb-50 lg:text-6xl text-[#541D30] drop-shadow-sm px-6 inline-block leading-none">
                {weddingData.couple.bride.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

