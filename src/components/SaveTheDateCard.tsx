import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { CornerLeaves } from './BotanicalAccents';

export const SaveTheDateCard: React.FC = () => {
  // December 2026 calendar days
  // 2026-12-01 is a Tuesday.
  // Using Monday-first columns: MON, TUE, WED, THU, FRI, SAT, SUN
  // Week 1 starts with 1 on Tuesday (index 1).
  const daysInDecember = 31;
  const firstDayIndex = 1; // 0=Mon, 1=Tue

  // Build grid items
  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInDecember; d++) {
    calendarCells.push(d);
  }

  // Google Calendar URL for 26 December 2026 10:30 AM IST
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Betrothal of Ashik & Teresa');
    const details = encodeURIComponent(
      'Betrothal Ceremony at Carmalamatha Church, Chettupuzha followed by the Feast at St Aloysius College Auditorium, Elthuruth, Thrissur.'
    );
    const location = encodeURIComponent('Carmalamatha church, Chettupuzha, Thrissur, Kerala');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261226T050000Z/20261226T093000Z&details=${details}&location=${location}`;
  };

  return (
    <div
      id="savedate"
      className="relative w-full wedding-card rounded-3xl overflow-hidden pt-8 pb-0 px-5 sm:px-6 text-center shadow-lg border border-[#717861]/25 bg-[#faf7f0]"
    >
      {/* Corner Botanical accents */}
      <CornerLeaves className="absolute top-2 left-2 text-[#717861]/25 w-12 h-12" />
      <CornerLeaves className="absolute top-2 right-2 text-[#717861]/25 w-12 h-12 scale-x-[-1]" />

      {/* 1. Header: SAVE THE DATE */}
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-sm sm:text-base tracking-[0.35em] text-[#a48651] uppercase font-medium select-none"
      >
        SAVE THE DATE
      </motion.p>

      {/* 2. Large Date: 26 . 12 . 2026 */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2d2926] tracking-[0.12em] font-normal my-2 select-none"
      >
        26 . 12 . 2026
      </motion.h2>

      {/* 3. Day of week: SATURDAY */}
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-[#5b624d] font-semibold mb-5 select-none"
      >
        SATURDAY
      </motion.p>

      {/* 4. Calendar Grid (exact layout from user reference image) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="max-w-[310px] mx-auto mb-6 bg-white/50 backdrop-blur-xs p-4 rounded-2xl border border-[#717861]/15 shadow-2xs"
      >
        {/* Month subtext */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#717861] font-semibold mb-3">
          December 2026
        </p>

        {/* Weekday headers: MON TUE WED THU FRI SAT SUN */}
        <div className="grid grid-cols-7 gap-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#635c54] font-semibold mb-2 select-none border-b border-[#717861]/15 pb-1.5">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span className="text-[#5b624d] font-bold">SAT</span>
          <span>SUN</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-xs sm:text-sm font-serif text-[#2d2926]">
          {calendarCells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-8" />;
            }

            const isTargetDate = day === 26;

            if (isTargetDate) {
              return (
                <div
                  key={`day-${day}`}
                  className="h-8 flex items-center justify-center relative select-none"
                >
                  {/* Highlighted Heart Icon with Heartbeat Animation */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-8 h-8 flex items-center justify-center cursor-default group"
                  >
                    {/* SVG Heart Silhouette exactly matching the screenshot */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 fill-[#464c39] drop-shadow-sm text-[#464c39]"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {/* Number 26 inside heart */}
                    <span className="absolute inset-0 flex items-center justify-center text-white font-serif text-xs font-bold pt-0.5 pointer-events-none">
                      26
                    </span>
                  </motion.div>
                </div>
              );
            }

            return (
              <div
                key={`day-${day}`}
                className="h-8 flex items-center justify-center text-[#554f49] hover:text-[#2d2926] transition-colors select-none text-[13px]"
              >
                {day}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Calendar reminder action button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex items-center justify-center max-w-[220px] mx-auto mb-5"
      >
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-[#717861]/30 text-[#464c39] text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all touch-manipulation min-h-[38px]"
        >
          <Calendar className="w-3.5 h-3.5 text-[#5b624d]" />
          <span>Add to Google Calendar</span>
        </a>
      </motion.div>

      {/* 5. Mountain Landscape Graphic Silhouette with "With love" calligraphy (matching screenshot) */}
      <div className="relative -mx-5 sm:-mx-6 h-32 sm:h-36 overflow-hidden mt-3 select-none">
        {/* Artistic mountain silhouette layers */}
        <svg
          viewBox="0 0 500 160"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a503e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2e3325" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d4332" />
              <stop offset="100%" stopColor="#1e2218" />
            </linearGradient>
          </defs>

          {/* Background hills */}
          <path
            d="M0,75 Q45,50 90,65 T180,55 T270,70 T360,45 T450,60 T500,50 L500,160 L0,160 Z"
            fill="url(#mountainGrad1)"
          />

          {/* Foreground mountain ridges with jagged peaks like in screenshot */}
          <path
            d="M0,90 L25,82 L50,88 L75,76 L100,84 L125,70 L150,78 L175,64 L200,72 L225,58 L250,66 L275,54 L300,68 L325,56 L350,65 L375,52 L400,62 L425,50 L450,58 L475,48 L500,56 L500,160 L0,160 Z"
            fill="url(#mountainGrad2)"
          />
        </svg>

        {/* Script text "With love" overlaid on the dark mountain base */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-7 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <p className="font-script text-3xl sm:text-4xl text-[#f4efe6] tracking-wide drop-shadow-sm font-normal">
            With love
          </p>
          <p className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#e2dad0]/80 mt-0.5 font-light">
            Ashik &amp; Teresa
          </p>
        </div>
      </div>
    </div>
  );
};
