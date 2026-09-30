import React from 'react';
import { motion } from 'motion/react';
import { QrCode, CheckSquare } from 'lucide-react';
import { HeartDivider } from './BotanicalAccents';
import { RSVPData } from '../types';

interface RsvpCardProps {
  onOpenRsvpModal: () => void;
  userRsvp: RSVPData | null;
}

export const RsvpCard: React.FC<RsvpCardProps> = ({ onOpenRsvpModal, userRsvp }) => {
  return (
    <div id="rsvp" className="relative w-full wedding-card rounded-3xl overflow-hidden pt-8 pb-0 px-6 text-center">
      {/* Header */}
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-script text-3xl sm:text-4xl text-[#717861] block leading-none"
      >
        kindly
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#2d2926] font-normal uppercase mt-0.5"
      >
        RSVP
      </motion.h2>
      <HeartDivider className="my-1.5" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#717861] font-semibold mt-2 mb-6"
      >
        Kindly Reply By December 10, 2026
      </motion.p>

      {/* Classic Stationery Card Form Details with gentle fade-up */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xs mx-auto text-left space-y-4 mb-6"
      >
        {/* Name Line */}
        <div className="flex items-end gap-2 border-b border-[#717861]/30 pb-1">
          <span className="font-serif text-base italic text-[#2d2926] font-semibold select-none">
            M
          </span>
          <span className="text-xs text-[#2d2926] font-serif tracking-wide truncate">
            {userRsvp ? userRsvp.fullName : '____________________________________'}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-2 text-xs tracking-wider text-[#2d2926] uppercase font-serif">
          <button
            onClick={onOpenRsvpModal}
            className="w-full text-left flex items-center gap-2.5 py-1 hover:text-[#5b624d] transition-colors cursor-pointer touch-manipulation min-h-[36px]"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-[#717861] flex items-center justify-center shrink-0 ${
                userRsvp?.attendance === 'attending' ? 'bg-[#5b624d]' : ''
              }`}
            >
              {userRsvp?.attendance === 'attending' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </span>
            <span className="font-medium text-[11px]">Accepts with Pleasure</span>
          </button>

          <button
            onClick={onOpenRsvpModal}
            className="w-full text-left flex items-center gap-2.5 py-1 hover:text-[#5b624d] transition-colors cursor-pointer touch-manipulation min-h-[36px]"
          >
            <span className="w-3.5 h-3.5 rounded-full border border-[#717861] flex items-center justify-center shrink-0">
              {userRsvp?.guestCount && (
                <span className="text-[9px] font-mono font-bold text-[#5b624d]">
                  {userRsvp.guestCount}
                </span>
              )}
            </span>
            <span className="font-medium text-[11px]">
              Number Attending: {userRsvp ? userRsvp.guestCount : '____'}
            </span>
          </button>

          <button
            onClick={onOpenRsvpModal}
            className="w-full text-left flex items-center gap-2.5 py-1 hover:text-[#5b624d] transition-colors cursor-pointer touch-manipulation min-h-[36px]"
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border border-[#717861] flex items-center justify-center shrink-0 ${
                userRsvp?.attendance === 'declining' ? 'bg-stone-500' : ''
              }`}
            >
              {userRsvp?.attendance === 'declining' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </span>
            <span className="font-medium text-[11px]">Declines with Regret</span>
          </button>
        </div>

        {userRsvp?.message && (
          <div className="pt-2 border-t border-[#717861]/20">
            <span className="text-[10px] uppercase tracking-wider text-[#717861] block font-serif">
              Note for the Couple:
            </span>
            <p className="text-xs text-[#2d2926] italic mt-0.5 break-words">
              &ldquo;{userRsvp.message}&rdquo;
            </p>
          </div>
        )}
      </motion.div>

      {/* QR Code and Quick RSVP (Website removed as requested) */}
      <div className="flex flex-col items-center justify-center my-5">
        <motion.button
          onClick={onOpenRsvpModal}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="p-3 bg-white rounded-xl shadow-xs border border-[#717861]/25 hover:shadow-md transition-shadow group cursor-pointer"
          title="Scan or Tap to Open RSVP"
        >
          <QrCode className="w-16 h-16 text-[#2d2926] group-hover:text-[#5b624d] transition-colors" />
        </motion.button>

        <p className="text-[10px] tracking-[0.2em] uppercase text-[#717861] font-semibold mt-3">
          Scan QR Code or Tap Below
        </p>

        {/* Action Button */}
        <motion.button
          onClick={onOpenRsvpModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-3.5 px-6 py-2.5 rounded-full bg-[#5b624d] hover:bg-[#4a503e] text-white text-xs tracking-widest uppercase font-medium shadow-sm transition-all touch-manipulation cursor-pointer flex items-center gap-2"
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>{userRsvp ? 'Edit Your Response' : 'Click Here To RSVP Online'}</span>
        </motion.button>
      </div>

      {/* Bottom Photo of Couple Walking Hand in Hand along Beach */}
      <div className="relative -mx-6 h-40 overflow-hidden mt-6">
        <motion.img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
          alt="Ashik and Teresa walking together"
          referrerPolicy="no-referrer"
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full object-cover object-top filter contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#fdfbf7] opacity-80" />
      </div>
    </div>
  );
};
