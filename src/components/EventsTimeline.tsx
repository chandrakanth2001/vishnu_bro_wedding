import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { GoldLotusDivider } from './KeralaElements';

export const EventsTimeline: React.FC = () => {

  const handleDownloadICS = (eventTitle: string, eventDesc: string, eventDate: string) => {
    // Generate .ics calendar payload
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Devika & Govind Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Devika & Govind - ${eventTitle}`,
      `DESCRIPTION:${eventDesc}`,
      `LOCATION:${weddingData.venue.fullAddress}`,
      'DTSTART:20261025T061400Z',
      'DTEND:20261025T073600Z',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder for Devika & Govind Wedding (${eventTitle})`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `devika-govind-${eventTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="py-20 px-4 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#541D30] uppercase mb-1">
            Program Schedule
          </p>
          <h2 className="font-cinzel-decorative text-3xl sm:text-5xl text-[#2C221E] font-bold">
            Wedding Ceremonies
          </h2>
          <GoldLotusDivider className="my-3" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#D4AF37]/50 ml-4 sm:ml-32 space-y-12">
          {weddingData.events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative pl-6 sm:pl-10"
            >
              {/* Timeline Node Badge */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] border-2 border-[#FAF6EE] flex items-center justify-center text-[#FAF6EE] shadow-lg">
                {event.isMainEvent ? (
                  <Heart className="w-4 h-4 fill-white" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Date Stamp Label (Left of timeline on desktop) */}
              <div className="hidden sm:block absolute -left-36 top-2 w-28 text-right font-cinzel text-xs font-bold text-[#541D30] uppercase tracking-wider">
                {event.date.split(',')[0]}
              </div>

              {/* Event Card Content */}
              <div
                className={`relative bg-[#FAF6EE] border-2 ${
                  event.isMainEvent ? 'border-[#D4AF37] shadow-xl' : 'border-[#D4AF37]/40 shadow-md'
                } rounded-2xl p-6 sm:p-8 card-paper-texture`}
              >
                {event.isMainEvent && (
                  <span className="inline-block px-3 py-1 mb-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-[10px] font-bold tracking-widest uppercase">
                    Main Muhūrtham Ceremony
                  </span>
                )}

                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2C221E] mb-2">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-cormorant text-[#7A5C14] mb-4 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#541D30]" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#541D30]" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#541D30]" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>

                <p className="font-cormorant text-sm sm:text-base text-[#2C221E] italic leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Add to Calendar Button */}
                <button
                  onClick={() => handleDownloadICS(event.title, event.description, event.date)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37] bg-[#FDFBF7] text-[#541D30] font-cinzel text-xs font-bold tracking-wider hover:bg-[#D4AF37] hover:text-[#FAF6EE] transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
