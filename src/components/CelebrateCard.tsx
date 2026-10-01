import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, Heart } from 'lucide-react';
import { HeartDivider } from './BotanicalAccents';
import { WEDDING_EVENT } from '../utils/calendar';
import { RSVPData } from '../types';

interface CelebrateCardProps {
  onOpenRsvpModal?: () => void;
  userRsvp?: RSVPData | null;
}

export const CelebrateCard: React.FC<CelebrateCardProps> = ({
  onOpenRsvpModal,
  userRsvp,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = WEDDING_EVENT.startDate.getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="celebrate" className="relative w-full wedding-card rounded-3xl overflow-hidden pt-8 pb-8 px-6 text-center">
      {/* Header with gentle fade */}
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-script text-3xl sm:text-4xl text-[#717861] block leading-none"
      >
        we can't wait
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif text-2xl sm:text-3xl text-[#2d2926] font-normal tracking-wide mt-2 mb-3"
      >
        To Celebrate With You
      </motion.h2>

      <HeartDivider className="my-2 text-[#717861] opacity-70" />

      {/* Countdown Timer with gentle pulsing frame */}
      <div className="my-5 p-4 rounded-2xl bg-[#f4efe6]/80 border border-[#717861]/20 max-w-sm mx-auto shadow-2xs">
        <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#5b624d] font-semibold mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Counting Down The Days</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 rounded-xl bg-white/80 border border-[#717861]/15">
            <span className="font-serif text-xl sm:text-2xl font-normal text-[#2d2926] block leading-none">
              {timeLeft.days}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#787169] mt-1 block">
              Days
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/80 border border-[#717861]/15">
            <span className="font-serif text-xl sm:text-2xl font-normal text-[#2d2926] block leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#787169] mt-1 block">
              Hours
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/80 border border-[#717861]/15">
            <span className="font-serif text-xl sm:text-2xl font-normal text-[#2d2926] block leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#787169] mt-1 block">
              Mins
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/80 border border-[#717861]/15">
            <span className="font-serif text-xl sm:text-2xl font-normal text-[#5b624d] block leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#787169] mt-1 block">
              Secs
            </span>
          </div>
        </div>
      </div>

      {/* Warm personal closing message */}
      <div className="my-4 max-w-sm mx-auto space-y-2 text-xs sm:text-sm text-[#57524d] leading-relaxed">
        <p className="italic font-serif text-sm sm:text-base text-[#44403c]">
          "Two souls with but a single thought, two hearts that beat as one."
        </p>
        <p className="text-[11px] sm:text-xs text-[#787169] pt-0.5">
          Your presence, blessings, and warm wishes mean the world to us as we begin this new chapter together.
        </p>
      </div>

      {/* Gentle RSVP Catch / Reminder if not completed yet */}
      {!userRsvp && onOpenRsvpModal && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-5 p-4 rounded-2xl bg-gradient-to-b from-[#f5f0e6] to-[#eee6d8] border border-[#717861]/35 shadow-sm text-center relative overflow-hidden max-w-sm mx-auto"
        >
          {/* Subtle warm glow background accent */}
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#c5a059]/15 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5b624d] uppercase tracking-[0.18em] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Wait, did you forget something?</span>
            </div>

            <p className="font-serif text-sm sm:text-base text-[#2d2926] font-medium leading-snug mb-1">
              We would love to know if you can join us!
            </p>

            <p className="text-[11px] text-[#787169] mb-3 max-w-[260px] leading-relaxed">
              It takes just a few seconds to let us know.
            </p>

            {/* Pulsing Attention-Grabbing Button */}
            <motion.button
              onClick={onOpenRsvpModal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                scale: [1, 1.035, 1, 1.025, 1],
                boxShadow: [
                  '0 4px 14px 0 rgba(91, 98, 77, 0.22)',
                  '0 6px 20px 2px rgba(91, 98, 77, 0.4)',
                  '0 4px 14px 0 rgba(91, 98, 77, 0.22)',
                  '0 5px 16px 1px rgba(91, 98, 77, 0.32)',
                  '0 4px 14px 0 rgba(91, 98, 77, 0.22)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5b624d] hover:bg-[#4a503e] text-white text-xs tracking-wider uppercase font-medium shadow-md transition-colors active:scale-95 touch-manipulation cursor-pointer group"
            >
              <span>Confirm Your Presence</span>
              <Heart className="w-3.5 h-3.5 fill-amber-200 text-amber-200 group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Couple's Sign-off */}
      <div className="pt-2 pb-2">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#717861] font-medium mb-1">
          With Love,
        </p>
        <div className="flex items-center justify-center gap-2 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="font-serif tracking-[0.16em] uppercase text-[#2d2926] flex items-baseline">
              <span className="text-xs sm:text-sm font-medium text-[#717861] mr-1">Dr.</span>
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#5b624d] leading-none inline-block mr-0.5">
                A
              </span>
              <span className="text-sm sm:text-base font-normal">SHIK</span>
            </span>

            <span className="font-script text-2xl text-[#717861] mx-0.5 leading-none">
              &
            </span>

            <span className="font-serif tracking-[0.16em] uppercase text-[#2d2926] flex items-baseline">
              <span className="text-xs sm:text-sm font-medium text-[#717861] mr-1">Dr.</span>
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#5b624d] leading-none inline-block mr-0.5">
                T
              </span>
              <span className="text-sm sm:text-base font-normal">ERESA</span>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
