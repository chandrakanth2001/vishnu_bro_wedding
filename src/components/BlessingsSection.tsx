import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles, MessageSquare } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { BlessingMessage } from '../types/wedding';
import { GoldLotusDivider, VSMonogram, GaneshaMonogram } from './KeralaElements';
import { sendWishToGoogleSheet, fetchWishesFromGoogleSheet } from '../data/googleSheet';

export const BlessingsSection: React.FC = () => {
  const [blessings, setBlessings] = useState<BlessingMessage[]>(weddingData.initialBlessings);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved blessings from localStorage and Google Sheets
  useEffect(() => {
    const saved = localStorage.getItem('vishnu_nayana_blessings');
    let localSaved: BlessingMessage[] = [];
    if (saved) {
      try {
        localSaved = JSON.parse(saved);
        setBlessings((prev) => [...localSaved, ...prev]);
      } catch (err) {
        console.warn('Error reading saved blessings:', err);
      }
    }

    // Fetch live wishes from Google Sheets
    fetchWishesFromGoogleSheet().then((sheetWishes) => {
      if (sheetWishes && sheetWishes.length > 0) {
        const formatted: BlessingMessage[] = sheetWishes.map((sw) => ({
          id: sw.id || Date.now().toString() + Math.random(),
          author: sw.author,
          // relation: sw.relation || 'Well Wisher',
          message: sw.message,
          date: sw.date || 'Recently',
        }));

        setBlessings((prev) => {
          // Merge unique wishes by message content to avoid duplicates
          const combined = [...formatted, ...localSaved, ...weddingData.initialBlessings];
          const uniqueMap = new Map();
          combined.forEach((item) => {
            const key = item.author.trim().toLowerCase() + '|' + item.message.trim().toLowerCase();
            if (!uniqueMap.has(key)) {
              uniqueMap.set(key, item);
            }
          });
          return Array.from(uniqueMap.values());
        });
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newBlessing: BlessingMessage = {
      id: Date.now().toString(),
      author: author.trim(),
      // relation: relation.trim() || 'Well Wisher',
      message: message.trim(),
      date: 'Today',
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);

    // Save user added blessings to localStorage
    const userOnlySaved = updated.filter((b) => !weddingData.initialBlessings.some((ib) => ib.id === b.id));
    localStorage.setItem('vishnu_nayana_blessings', JSON.stringify(userOnlySaved));

    // Send wish directly to Google Sheet
    sendWishToGoogleSheet({
      type: 'wish',
      author: author.trim(),
      message: message.trim(),
    });

    setAuthor('');
    setRelation('');
    setMessage('');
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  };

  const previewBlessings = blessings.slice(0, 4);
  const [firstWisher, ...otherWishers] = weddingData.familyWishes.bestWishesFrom.split(' & ');
  const secondWisher = otherWishers.join(' & ');

  return (
    <section id="blessings" className="py-20 px-4 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Main Family Invitation Card (Card 1 Wording Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-2xl p-8 sm:p-12 card-paper-texture shadow-xl text-center max-w-3xl mx-auto mb-16"
        >
          {/* Corner Filigree */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-3 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]" />

          <h3 className="font-script text-3xl sm:text-4xl text-[#541D30] mb-2">
            With Warm Felicitations
          </h3>

          <GoldLotusDivider className="my-2" />

          {/* Core Sacred Blessing Statement from Card 1 & 2 */}
          <p className="font-cormorant italic text-2xl sm:text-3xl text-[#2C221E] font-semibold my-6 leading-relaxed">
            "{weddingData.familyWishes.blessingQuote}"
          </p>

          <GoldLotusDivider className="my-2" />

          <div className="mt-8 pt-4 border-t border-dashed border-[#D4AF37]/40">
            <span className="font-cinzel text-[10px] font-bold tracking-[0.25em] text-[#541D30] uppercase block mb-1">
              Best Wishes From
            </span>
            <p className="font-cinzel text-sm sm:text-base font-bold text-[#2C221E] tracking-widest leading-relaxed">
              {secondWisher ? (
                <>
                  <span className="block sm:inline whitespace-nowrap">{firstWisher}</span>{' '}
                  <span className="block sm:inline my-0.5 sm:my-0">&amp;</span>{' '}
                  <span className="block sm:inline whitespace-nowrap">{secondWisher}</span>
                </>
              ) : (
                weddingData.familyWishes.bestWishesFrom
              )}
            </p>
          </div>
        </motion.div>

        {/* GUEST BLESSINGS WALL & FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div className="lg:col-span-5 bg-[#FDFBF7] border border-[#D4AF37]/60 rounded-2xl p-6 sm:p-8 card-paper-texture shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#541D30]" />
              <h3 className="font-cinzel text-xl font-bold text-[#2C221E]">
                Send Your Wishes
              </h3>
            </div>

            <p className="font-cormorant text-sm italic text-[#7A5C14] mb-6">
              Leave a warm prayer or blessing message for Vishnu & Nayana to treasure forever.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-[#264D24]/10 border border-[#264D24] text-[#264D24] text-center font-cormorant font-semibold animate-fade-in">
                🌺 Thank you! Your blessing message has been shared with the couple.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-cormorant text-base">
                <div>
                  <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6EE] border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:outline-none text-[#2C221E]"
                  />
                </div>
                <div>
                  <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                    Blessings Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt message here..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAF6EE] border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:outline-none text-[#2C221E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-xs font-bold tracking-widest uppercase shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Blessing</span>
                </button>
              </form>
            )}
          </div>

          {/* Compact 4-Card Wishes Preview Grid Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#541D30]" />
                <h3 className="font-cinzel text-lg font-bold text-[#2C221E]">
                  Recent Wishes ({blessings.length})
                </h3>
              </div>
              {blessings.length > 4 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="font-cinzel text-xs font-bold text-[#541D30] hover:text-[#783449] underline underline-offset-4 cursor-pointer transition-colors"
                >
                  View All ({blessings.length}) &rarr;
                </button>
              )}
            </div>

            {/* 2x2 Grid of 4 most recent wishes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {previewBlessings.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl p-5 card-paper-texture shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-cinzel text-sm font-bold text-[#2C221E] truncate">
                        {item.author}
                      </h4>
                      {/* <span className="font-cinzel text-[10px] text-[#B38728] shrink-0 ml-2">{item.date}</span> */}
                    </div>

                    <p className="font-cormorant text-base text-[#2C221E] italic leading-snug line-clamp-4">
                      "{item.message}"
                    </p>
                  </div>
                  {item.relation && (
                    <span className="font-cormorant text-xs italic text-[#7A5C14] block mt-3">
                      — {item.relation}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* View All Wishes Popup Trigger Button */}
            {blessings.length > 4 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#D4AF37] bg-[#FDFBF7] text-[#2C221E] font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#1A1412] transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#541D30]" />
                  <span>View All {blessings.length} Wishes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POPUP MODAL DIALOG FOR ALL WISHES */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#FAF6EE] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 card-paper-texture shadow-2xl flex flex-col"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#7A5C14] hover:text-[#2C221E] font-bold text-xl p-2 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6 shrink-0">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MessageSquare className="w-6 h-6 text-[#541D30]" />
                  <h3 className="font-cinzel text-2xl font-bold text-[#2C221E]">
                    Guest Wishes & Blessings ({blessings.length})
                  </h3>
                </div>
                <p className="font-cormorant text-sm italic text-[#7A5C14]">
                  Warm prayers and blessings shared by friends and family for Vishnu & Nayana
                </p>
                <GoldLotusDivider className="my-2 scale-75" />
              </div>

              {/* Scrollable Grid of All Wishes */}
              <div className="overflow-y-auto pr-2 space-y-4 max-h-[55vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blessings.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl p-5 card-paper-texture shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-cinzel text-sm font-bold text-[#2C221E] truncate">
                            {item.author}
                          </h4>
                          {/* <span className="font-cinzel text-[10px] text-[#B38728] shrink-0 ml-2">{item.date}</span> */}
                        </div>

                        <p className="font-cormorant text-base text-[#2C221E] italic leading-relaxed">
                          "{item.message}"
                        </p>
                      </div>

                      {item.relation && (
                        <span className="font-cormorant text-xs italic text-[#7A5C14] block mt-3">
                          — {item.relation}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 text-center shrink-0">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-xs font-bold tracking-widest uppercase shadow-md hover:brightness-110 cursor-pointer"
                >
                  Close Wall
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
