import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { weddingData } from "../data/wedding";
import { GreenScreenButterfly } from "./GreenScreenButterfly";

interface OpeningExperienceProps {
    onOpenInvitation: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onOpenInvitation }) => {
    const [bgSrc, setBgSrc] = useState("/assets/IMG_1238.jpeg");

    const handleImageError = () => {
        if (bgSrc === "/assets/IMG_1238.jpeg") setBgSrc("/assets/IMG_1238.jpeg");
        else if (bgSrc === "/assets/openingbackground.png") setBgSrc("/assets/openingbackground.jpeg");
        else if (bgSrc === "/assets/openingbackground.jpeg") setBgSrc("/assets/openingbackground.webp");
        else if (bgSrc === "/assets/openingbackground.webp") setBgSrc("/assets/opening-background.jpg");
        else if (bgSrc === "/assets/opening-background.jpg") setBgSrc("/assets/opening-background.png");
        else if (bgSrc === "/assets/opening-background.png") setBgSrc("/assets/opening_background.jpg");
    };

    const handleOpenClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Trigger gold and floral confetti sparkles
        try {
            confetti({
                particleCount: 80,
                spread: 90,
                origin: { y: 0.6 },
                colors: ["#D4AF37", "#F4E297", "#E86C8D", "#FFFDF5", "#264D24"],
                scalar: 1,
            });
        } catch (err) {
            console.warn("Confetti effect failed:", err);
        }

        onOpenInvitation();
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden">
            {/* Background Image */}
            <img
                src={bgSrc}
                onError={handleImageError}
                alt="Wedding Opening Background"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />

            {/* Floating Green Screen Chroma-Keyed Butterfly */}
            <GreenScreenButterfly />

            {/* CENTER CONTENT: BRIDE & GROOM NAMES + OPEN INVITATION BUTTON */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto"
            >
                {/* BRIDE & GROOM CALLIGRAPHY NAMES */}
                <h1 className="font-script text-5xl sm:text-7xl lg:text-8xl text-[#541D30] drop-shadow-sm my-4 px-2 leading-tight">
                    {weddingData.couple.groom.name}{" "}
                    <span className="font-cormorant text-3xl sm:text-4xl text-[#541D30] italic drop-shadow-none">&</span>{" "}
                    {weddingData.couple.bride.name}
                </h1>

                {/* OPEN INVITATION BUTTON */}
                <div className="mt-8 z-30">
                    <button
                        onClick={handleOpenClick}
                        className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#541D30] via-[#762C46] to-[#541D30] text-[#F4D88B] font-cinzel text-sm tracking-[0.25em] font-bold uppercase shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(84,29,48,0.6)] cursor-pointer border border-[#C6A35A]"
                    >
                        <span className="absolute inset-0 rounded-full border border-[#F4D88B]/30 pointer-events-none" />
                        <span>Tap to Open</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
