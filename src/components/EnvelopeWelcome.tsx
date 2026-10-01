import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CornerLeaves, HeartDivider } from './BotanicalAccents';

interface EnvelopeWelcomeProps {
  onOpen: () => void;
}

export const EnvelopeWelcome: React.FC<EnvelopeWelcomeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Gentle confetti celebration
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#717861', '#c5a059', '#e8dfd1', '#5b624d', '#fdfbf7'],
      });
    } catch {
      // Ignore if confetti fails
    }

    // Call onOpen which starts audio synchronously
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23201d]/65 backdrop-blur-md"
        >
          {/* Main Envelope Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full max-w-sm rounded-3xl bg-[#fdfbf7] border border-[#717861]/30 p-8 shadow-2xl text-center overflow-hidden"
          >
            {/* Elegant corner accents */}
            <CornerLeaves className="absolute top-2 left-2 text-[#717861]/40" />
            <CornerLeaves className="absolute top-2 right-2 text-[#717861]/40 scale-x-[-1]" />
            <CornerLeaves className="absolute bottom-2 left-2 text-[#717861]/40 scale-y-[-1]" />
            <CornerLeaves className="absolute bottom-2 right-2 text-[#717861]/40 scale-[-1]" />

            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-radial from-[#e8dfd1]/40 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Elegant Roman Monogram Crest Seal */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-b from-[#e8dfd1] via-[#dcd2c0] to-[#c5b8a0] shadow-md mb-4 flex items-center justify-center"
              >
                {/* Inner circular medallion */}
                <div className="w-full h-full rounded-full bg-[#fbf9f5] border border-[#717861]/35 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  {/* Delicate inner dashed ring */}
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#8a927a]/40 pointer-events-none" />

                  {/* Monogram Content */}
                  <div className="flex items-center justify-center select-none z-10 pt-0.5">
                    <span className="font-cinzel text-xl sm:text-2xl font-normal text-[#444a37] tracking-wider leading-none">
                      A
                    </span>
                    <span className="font-serif italic text-base sm:text-lg text-[#b89547] mx-1 sm:mx-1.5 leading-none font-normal">
                      &amp;
                    </span>
                    <span className="font-cinzel text-xl sm:text-2xl font-normal text-[#444a37] tracking-wider leading-none">
                      T
                    </span>
                  </div>

                  {/* Subtle Roman year numeral underneath */}
                  <span className="text-[8px] sm:text-[9px] font-cinzel tracking-[0.25em] text-[#8a927a] mt-1 select-none leading-none">
                    MMXXVI
                  </span>
                </div>
              </motion.div>

              {/* Sub-header */}
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#717861] font-semibold mb-1">
                You Are Cordially Invited
              </p>

              {/* Names */}
              <h1 className="font-serif text-2xl sm:text-3xl text-[#2d2926] tracking-wide my-1">
                Dr. Ashik &amp; Dr. Teresa
              </h1>

              <p className="font-script text-2xl text-[#717861] my-0.5">
                The Betrothal
              </p>

              <HeartDivider className="my-3 text-[#717861] opacity-60 w-36" />

              {/* Date Only (Church name & time removed) */}
              <p className="text-xs font-serif tracking-[0.18em] uppercase text-[#6e6862] font-medium mb-6">
                Saturday, 26 December 2026
              </p>

              {/* Primary Call to Action Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenInvitation}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#5b624d] hover:bg-[#4d5341] text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer touch-manipulation group"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MailOpen className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="tracking-wide">Open Invitation</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
