import React, { useState } from 'react';
import { OpeningExperience } from './components/OpeningExperience';
import { Navbar } from './components/Navbar';
import { WeddingHero } from './components/WeddingHero';
import { WeddingDetails } from './components/WeddingDetails';
import { CountdownTimer } from './components/CountdownTimer';
import { CoupleSection } from './components/CoupleSection';
import { EventsTimeline } from './components/EventsTimeline';
import { VenueSection } from './components/VenueSection';
import { PhotoGallery } from './components/PhotoGallery';
import { BlessingsSection } from './components/BlessingsSection';
import { Footer } from './components/Footer';
import { MusicController } from './components/MusicController';
import { RSVPModal } from './components/RSVPModal';
import { FallingPetals } from './components/FallingPetals';

export function App() {
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);

  const handleOpenInvitation = () => {
    setHasOpenedInvitation(true);
    // Smooth scroll to top of hero
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] font-cormorant selection:bg-[#D4AF37]/30">
      {!hasOpenedInvitation ? (
        /* PHASE 1: Full-Screen Opening Cinematic Envelope Experience */
        <OpeningExperience onOpenInvitation={handleOpenInvitation} />
      ) : (
        /* PHASE 2: Main Scrollable Kerala Wedding Website Experience */
        <div className="relative animate-fade-in">
          {/* Layered Slow Falling Rose Petals & Jasmine Animation */}
          <FallingPetals />

          {/* Top Sticky Navigation */}
          <Navbar onOpenRSVP={() => setRsvpModalOpen(true)} />

          {/* Hero Section */}
          <WeddingHero />

          {/* Key Wedding Details */}
          <WeddingDetails />

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Couple Introduction */}
          <CoupleSection />

          {/* Events Timeline */}
          {/* <EventsTimeline /> */}

          {/* Venue & Location Directions */}
          {/* <VenueSection /> */}

          {/* Visual Gallery */}
          <PhotoGallery />

          {/* Family Wishes & Guest Blessings Wall */}
          <BlessingsSection />

          {/* Footer */}
          <Footer onOpenRSVP={() => setRsvpModalOpen(true)} />

          {/* Floating Audio Music Controller */}
          <MusicController autoPlayTriggered={hasOpenedInvitation} />

          {/* RSVP Modal Dialog */}
          <RSVPModal isOpen={rsvpModalOpen} onClose={() => setRsvpModalOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
