import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Users, Heart } from 'lucide-react';
import { weddingData } from '../data/wedding';
import { RSVPResponse } from '../types/wedding';
import { GoldLotusDivider, GaneshaMonogram } from './KeralaElements';
import { sendRSVPToGoogleSheet } from '../data/googleSheet';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    attending: 'yes' as 'yes' | 'no' | 'maybe',
    guestCount: 1,
    dietaryOrNotes: '',
    wishes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const rsvp: RSVPResponse = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem('vishnu_nayana_rsvps') || '[]');
    localStorage.setItem('vishnu_nayana_rsvps', JSON.stringify([...existing, rsvp]));

    // Submit directly to Google Sheet
    sendRSVPToGoogleSheet({
      type: 'rsvp',
      name: formData.name.trim(),
      emailOrPhone: formData.emailOrPhone.trim(),
      attending: formData.attending,
      guestsCount: formData.guestCount,
      dietary: formData.dietaryOrNotes.trim(),
      message: formData.wishes.trim(),
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      emailOrPhone: '',
      attending: 'yes',
      guestCount: 1,
      dietaryOrNotes: '',
      wishes: '',
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#1A1412]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#FAF6EE] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 card-paper-texture shadow-2xl my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#7A5C14] hover:text-[#2C221E] rounded-full hover:bg-[#D4AF37]/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-16 h-16 text-[#264D24] mx-auto animate-bounce" />
                <h3 className="font-cinzel text-2xl font-bold text-[#2C221E]">
                  RSVP Received!
                </h3>
                <p className="font-cormorant text-lg text-[#7A5C14] italic max-w-md mx-auto">
                  Thank you for responding! Vishnu & Nayana look forward to celebrating with you on 22 January 2027.
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#FAF6EE] font-cinzel text-xs font-bold tracking-widest uppercase shadow-md hover:brightness-110"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h3 className="font-cinzel text-2xl font-bold text-[#2C221E]">
                    Kindly Respond (RSVP)
                  </h3>
                  <p className="font-cormorant text-sm italic text-[#7A5C14]">
                    Please confirm your attendance for 25 October 2026
                  </p>
                  <GoldLotusDivider className="my-2 scale-75" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-cormorant text-base">
                  <div>
                    <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananthakrishnan & Family"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:outline-none text-[#2C221E]"
                    />
                  </div>

                  <div>
                    <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                      Phone Number / Email
                    </label>
                    <input
                      type="text"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:outline-none text-[#2C221E]"
                    />
                  </div>

                  <div>
                    <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                      Will You Be Attending? *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'yes', label: 'Joyfully Accept' },
                        { id: 'maybe', label: 'Regretfully Decline' },
                        { id: 'no', label: 'Undecided' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, attending: opt.id as any })}
                          className={`py-2 px-2 rounded-lg border text-xs font-cinzel font-bold transition-all ${
                            formData.attending === opt.id
                              ? 'bg-[#B38728] text-[#FAF6EE] border-[#B38728]'
                              : 'bg-[#FDFBF7] text-[#7A5C14] border-[#D4AF37]/40'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.attending === 'yes' && (
                    <div>
                      <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                        Number of Guests Attending
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:outline-none text-[#2C221E]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block font-cinzel text-xs font-bold text-[#7A5C14] uppercase mb-1">
                      Blessings / Note for Couple
                    </label>
                    <textarea
                      rows={2}
                      value={formData.wishes}
                      onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                      placeholder="Any wishes or notes..."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#D4AF37] focus:outline-none text-[#2C221E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4E297] to-[#B38728] text-[#1A1412] font-cinzel text-xs font-bold tracking-widest uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Response</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
