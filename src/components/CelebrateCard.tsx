import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { HeartDivider } from './BotanicalAccents';
import { getGoogleCalendarUrl, WEDDING_EVENT } from '../utils/calendar';

export const CelebrateCard: React.FC = () => {
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
      <div className="my-5 max-w-sm mx-auto space-y-2 text-xs sm:text-sm text-[#57524d] leading-relaxed">
        <p className="italic font-serif text-sm sm:text-base text-[#44403c]">
          "Two souls with but a single thought, two hearts that beat as one."
        </p>
        <p className="text-[11px] sm:text-xs text-[#787169] pt-1">
          Your presence, blessings, and warm wishes mean the world to us as we begin this new chapter together.
        </p>
      </div>

      {/* Couple's Sign-off */}
      <div className="pt-2 pb-4">
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
            <span className="font-serif tracking-[0.2em] uppercase text-[#2d2926] flex items-baseline">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#5b624d] leading-none inline-block mr-0.5">
                A
              </span>
              <span className="text-sm sm:text-base font-normal">SHIK</span>
            </span>

            <span className="font-script text-2xl text-[#717861] mx-0.5 leading-none">
              &
            </span>

            <span className="font-serif tracking-[0.2em] uppercase text-[#2d2926] flex items-baseline">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#5b624d] leading-none inline-block mr-0.5">
                T
              </span>
              <span className="text-sm sm:text-base font-normal">ERESA</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Calendar action button */}
      <div className="flex items-center justify-center pt-2">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-white border border-[#717861]/25 text-xs text-[#2d2926] font-medium flex items-center gap-2 shadow-xs hover:bg-stone-50 touch-manipulation min-h-[40px] transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#5b624d]" />
          <span>Add to Google Calendar</span>
        </a>
      </div>
    </div>
  );
};
