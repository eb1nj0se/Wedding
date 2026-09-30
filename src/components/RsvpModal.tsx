import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Check, Heart, Sparkles, Users, User, QrCode, MessageSquareHeart } from 'lucide-react';
import { RSVPData } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRsvp: (data: RSVPData) => void;
  existingRsvp?: RSVPData | null;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  onSaveRsvp,
  existingRsvp,
}) => {
  const [fullName, setFullName] = useState(existingRsvp?.fullName || '');
  const [attendance, setAttendance] = useState<'attending' | 'declining'>(
    existingRsvp?.attendance || 'attending'
  );
  const [guestCount, setGuestCount] = useState<number>(existingRsvp?.guestCount || 1);
  const [message, setMessage] = useState(existingRsvp?.message || '');
  const [isSubmitted, setIsSubmitted] = useState(!!existingRsvp);
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(existingRsvp || null);

  const triggerCelebrationConfetti = () => {
    const count = 160;
    const defaults = {
      origin: { y: 0.6 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#dcbe93', '#ead8bc', '#c5a068'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ffffff', '#f5eedf', '#717861'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#5b624d', '#717861', '#c5a068'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#dcbe93', '#5b624d'],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const data: RSVPData = {
      id: existingRsvp?.id || 'rsvp-' + Date.now(),
      fullName: fullName.trim(),
      attendance,
      guestCount: attendance === 'attending' ? Math.max(1, guestCount) : 0,
      message: message.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    onSaveRsvp(data);
    setSubmittedData(data);
    setIsSubmitted(true);

    if (attendance === 'attending') {
      triggerCelebrationConfetti();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-lg bg-[#fdfbf7] border border-[#717861]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92svh] flex flex-col text-[#2d2926]"
      >
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden w-12 h-1 bg-[#d8cebe] rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#717861]/15 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#717861] font-semibold block">
              Kindly Respond
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#2d2926] font-normal">
              {isSubmitted ? 'Your RSVP Response' : 'RSVP for Betrothal'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#57524d] transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
            aria-label="Close RSVP form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Name */}
                <div>
                  <label className="text-xs text-[#57524d] font-semibold flex items-center gap-1.5 mb-1.5">
                    <User className="w-3.5 h-3.5 text-[#5b624d]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#717861]/30 text-[#2d2926] placeholder-[#a8a199] text-sm focus:outline-none focus:border-[#5b624d] transition-colors"
                  />
                </div>

                {/* 2. Are you coming or not */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#57524d] font-semibold block mb-2">
                    Response *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex flex-col items-center gap-1 min-h-[56px] touch-manipulation cursor-pointer ${
                        attendance === 'attending'
                          ? 'bg-[#5b624d] text-white border-[#5b624d] font-semibold shadow-md'
                          : 'bg-white text-[#57524d] border-[#717861]/25 hover:bg-stone-50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Accepts with Pleasure</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance('declining')}
                      className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex flex-col items-center gap-1 min-h-[56px] touch-manipulation cursor-pointer ${
                        attendance === 'declining'
                          ? 'bg-[#8a927a] text-white border-[#8a927a] font-semibold shadow-md'
                          : 'bg-white text-[#787169] border-[#717861]/25 hover:bg-stone-50'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      <span>Declines with Regret</span>
                    </button>
                  </div>
                </div>

                {/* 3. How many numbers (if attending) */}
                {attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 pt-2 border-t border-[#717861]/15"
                  >
                    <label className="text-xs text-[#57524d] font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#5b624d]" />
                      <span>How many numbers / guests attending?</span>
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setGuestCount(count)}
                          className={`py-2.5 rounded-xl border text-sm font-semibold transition-all min-h-[44px] touch-manipulation cursor-pointer ${
                            guestCount === count
                              ? 'bg-[#5b624d] text-white border-[#5b624d]'
                              : 'bg-white text-[#57524d] border-[#717861]/25 hover:bg-stone-50'
                          }`}
                        >
                          {count === 5 ? '5+' : count}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 4. A note for couples */}
                <div className="pt-2 border-t border-[#717861]/15">
                  <label className="text-xs text-[#57524d] font-semibold flex items-center gap-1.5 mb-1.5">
                    <MessageSquareHeart className="w-3.5 h-3.5 text-[#5b624d]" />
                    <span>A Note for the Couple</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your wishes, blessings, or message for Ashik & Teresa..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#717861]/30 text-[#2d2926] placeholder-[#a8a199] text-sm focus:outline-none focus:border-[#5b624d] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-[#5b624d] hover:bg-[#4a503e] text-white font-bold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] touch-manipulation cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Submit RSVP</span>
                </button>
              </form>
            ) : (
              /* Confirmation / Digital Guest Pass */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                {/* Response summary card */}
                <div className="relative rounded-3xl p-6 bg-[#f4efe6] border border-[#717861]/35 shadow-md text-left overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#717861]/20 pb-3 mb-4">
                    <div>
                      <div className="font-serif text-lg text-[#2d2926] font-medium tracking-wide">
                        Ashik &amp; Teresa
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-[#717861]">
                        The Betrothal
                      </div>
                    </div>
                    <div className="font-serif text-xl font-light text-[#5b624d]">
                      A&T
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#787169] block">
                        Name
                      </span>
                      <span className="font-serif text-lg text-[#2d2926] font-medium">
                        {submittedData?.fullName}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#787169] block">
                          Attendance
                        </span>
                        <span
                          className={`font-semibold ${
                            submittedData?.attendance === 'attending'
                              ? 'text-[#5b624d]'
                              : 'text-stone-500'
                          }`}
                        >
                          {submittedData?.attendance === 'attending'
                            ? 'Accepts with Pleasure'
                            : 'Declines with Regret'}
                        </span>
                      </div>

                      {submittedData?.attendance === 'attending' && (
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#787169] block">
                            Number of Guests
                          </span>
                          <span className="text-[#2d2926] font-medium">
                            {submittedData.guestCount} {submittedData.guestCount === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>
                      )}
                    </div>

                    {submittedData?.message && (
                      <div className="pt-2 border-t border-[#717861]/20">
                        <span className="text-[10px] uppercase tracking-wider text-[#787169] block">
                          Note for Couple
                        </span>
                        <p className="text-xs text-[#2d2926] italic mt-0.5">
                          &ldquo;{submittedData.message}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-dashed border-[#717861]/30 flex items-center justify-between text-xs text-[#57524d]">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-8 h-8 text-[#5b624d]" />
                      <div className="text-[10px]">
                        <span className="block font-mono text-[#2d2926]">DEC 26, 2026</span>
                        <span>THRISSUR, KERALA</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-[#717861]">
                      RSVP-{submittedData?.id.slice(-6)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-[#57524d] font-light leading-relaxed">
                    Thank you! Your RSVP has been saved. We cannot wait to celebrate together!
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="flex-1 py-3 px-4 rounded-xl bg-white border border-[#717861]/30 text-xs text-[#57524d] font-medium min-h-[44px] touch-manipulation cursor-pointer hover:bg-stone-50"
                    >
                      Edit Response
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#5b624d] text-white font-semibold text-xs min-h-[44px] touch-manipulation cursor-pointer hover:bg-[#4a503e]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
