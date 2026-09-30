import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { HeartDivider, CornerLeaves } from './BotanicalAccents';

interface TimelineStep {
  time: string;
  title: string;
  icon: 'ring' | 'glass' | 'dinner' | 'music' | 'sparkler';
}

const TIMELINE_STEPS: TimelineStep[] = [
  { time: '10:30 AM', title: 'BETROTHAL CEREMONY', icon: 'ring' },
  { time: '11:45 AM', title: 'WELCOME & TOASTS', icon: 'glass' },
  { time: '12:30 PM', title: 'BETROTHAL FEAST & LUNCH', icon: 'dinner' },
  { time: '2:00 PM', title: 'MUSIC & CELEBRATIONS', icon: 'music' },
  { time: '3:30 PM', title: 'SEND OFF & BLESSINGS', icon: 'sparkler' },
];

export const TimelineCard: React.FC = () => {
  const renderIcon = (type: TimelineStep['icon'], idx: number) => {
    switch (type) {
      case 'ring':
        // Two delicate wedding rings SVG with subtle gleam
        return (
          <motion.svg
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-5 text-[#5b624d]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="13" r="5" />
            <circle cx="15" cy="11" r="5" />
          </motion.svg>
        );
      case 'glass':
        // Champagne glasses toasting with gentle celebratory tilt
        return (
          <motion.svg
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-5 text-[#5b624d]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 3v6a4 4 0 0 0 8 0V3" />
            <path d="M12 13v7" />
            <path d="M8 20h8" />
          </motion.svg>
        );
      case 'dinner':
        // Dinner plate & cutlery
        return (
          <svg className="w-5 h-5 text-[#5b624d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="5" />
            <path d="M5 6v12" />
            <path d="M4 6h2" />
            <path d="M19 6v12" />
          </svg>
        );
      case 'music':
        // Musical note with gentle float
        return (
          <motion.svg
            animate={{ y: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-4 h-4 text-[#5b624d]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </motion.svg>
        );
      case 'sparkler':
        // Sparkler / Sparkles with gentle twinkle
        return (
          <motion.svg
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-4 h-4 text-[#5b624d]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-6.4-2.1 2.1m-8.6 8.6-2.1 2.1m12.8 0-2.1-2.1m-8.6-8.6-2.1-2.1" />
          </motion.svg>
        );
      default:
        return <Heart className="w-4 h-4 text-[#5b624d]" />;
    }
  };

  return (
    <div id="timeline" className="relative w-full wedding-card rounded-3xl overflow-hidden pt-8 pb-10 px-6 text-center">
      {/* Header */}
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-script text-3xl sm:text-4xl text-[#717861] block leading-none"
      >
        the
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#2d2926] font-normal uppercase mt-0.5"
      >
        Timeline
      </motion.h2>
      <HeartDivider className="my-1.5" />

      {/* Vertical Timeline sequence with soothing cascade */}
      <div className="relative mt-8 max-w-xs mx-auto">
        <div className="space-y-6">
          {TIMELINE_STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 text-left group"
            >
              {/* Icon Container with subtle circle */}
              <div className="w-10 h-10 rounded-full bg-[#f4efe6] border border-[#717861]/25 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-white transition-colors">
                {renderIcon(step.icon, idx)}
              </div>

              {/* Time & Title */}
              <div className="flex-1 border-b border-[#717861]/10 pb-2">
                <div className="font-mono text-xs tracking-wider text-[#717861] font-medium">
                  {step.time}
                </div>
                <div className="font-serif text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#2d2926]">
                  {step.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Botanical Branch at Bottom Left with gentle sway */}
      <motion.div
        animate={{ rotate: [-47, -43, -47] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 left-2 pointer-events-none origin-bottom-left"
      >
        <CornerLeaves className="w-16 h-16 opacity-75 text-[#717861]" />
      </motion.div>
    </div>
  );
};
