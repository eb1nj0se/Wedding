import React from 'react';
import { motion } from 'motion/react';
import { HeartDivider, OliveBranch } from './BotanicalAccents';

interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

const MILESTONES: StoryMilestone[] = [
  {
    year: '2018',
    title: 'WE MET',
    description: 'A chance meeting that changed everything.',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80',
  },
  {
    year: '2022',
    title: 'WE FELL IN LOVE',
    description: 'Adventures, laughter and countless memories.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    year: '2026',
    title: 'OUR BETROTHAL',
    description: "We can't wait to celebrate with you!",
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=400&q=80',
  },
];

export const OurStoryCard: React.FC = () => {
  return (
    <div id="story" className="relative w-full wedding-card rounded-3xl overflow-hidden pt-8 pb-7 px-5 text-center">
      {/* Script Header with gentle float */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-script text-4xl sm:text-5xl text-[#2d2926] font-normal lowercase leading-tight"
      >
        our story
      </motion.h2>

      {/* Heart Divider */}
      <HeartDivider className="my-1.5" />

      {/* Alternating Zig-Zag Timeline Layout */}
      <div className="relative mt-7 space-y-6 sm:space-y-7">
        {/* Central delicate vertical timeline stem */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-[1.5px] bg-[#8a927a]/35 pointer-events-none" />

        {MILESTONES.map((item, idx) => {
          const isImageLeft = idx % 2 === 0;

          return (
            <div
              key={item.year}
              className="relative grid grid-cols-[1fr_26px_1fr] sm:grid-cols-[1fr_32px_1fr] items-center gap-2 sm:gap-3"
            >
              {/* Left Side */}
              {isImageLeft ? (
                /* Image on Left */
                <motion.div
                  initial={{ opacity: 0, x: -22, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  className="p-1 sm:p-1.5 bg-white rounded-xl shadow-xs border border-[#717861]/25 overflow-hidden justify-self-end w-full max-w-[145px] sm:max-w-[165px] cursor-pointer"
                >
                  <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </motion.div>
              ) : (
                /* Text on Left */
                <motion.div
                  initial={{ opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-right pr-0.5 sm:pr-2 flex flex-col items-end"
                >
                  <span className="inline-block font-mono text-[10px] sm:text-[11px] font-semibold text-[#5b624d] tracking-wider px-2 py-0.5 rounded-full bg-[#8a927a]/15 mb-0.5">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2d2926] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#57524d] leading-snug font-light mt-0.5 max-w-[155px]">
                    {item.description}
                  </p>
                </motion.div>
              )}

              {/* Center Timeline Node / Dot with pulse */}
              <div className="relative flex justify-center items-center z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="w-3.5 h-3.5 rounded-full bg-[#fdfbf7] border-2 border-[#5b624d] flex items-center justify-center shadow-xs"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 3, delay: idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-[#717861]"
                  />
                </motion.div>
              </div>

              {/* Right Side */}
              {!isImageLeft ? (
                /* Image on Right */
                <motion.div
                  initial={{ opacity: 0, x: 22, rotate: 3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  className="p-1 sm:p-1.5 bg-white rounded-xl shadow-xs border border-[#717861]/25 overflow-hidden justify-self-start w-full max-w-[145px] sm:max-w-[165px] cursor-pointer"
                >
                  <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </motion.div>
              ) : (
                /* Text on Right */
                <motion.div
                  initial={{ opacity: 0, x: 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-left pl-0.5 sm:pl-2 flex flex-col items-start"
                >
                  <span className="inline-block font-mono text-[10px] sm:text-[11px] font-semibold text-[#5b624d] tracking-wider px-2 py-0.5 rounded-full bg-[#8a927a]/15 mb-0.5">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2d2926] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#57524d] leading-snug font-light mt-0.5 max-w-[155px]">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Olive Branch at Bottom Center with soothing sway */}
      <motion.div
        animate={{ rotate: [-1, 1.5, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-8 flex justify-center origin-center"
      >
        <OliveBranch className="w-28 h-8 opacity-80" />
      </motion.div>
    </div>
  );
};
