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
    year: '2020',
    title: 'WE FELL IN LOVE',
    description: 'Adventures, laughter and countless memories.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    year: '2023',
    title: 'THE PROPOSAL',
    description: 'The start of our forever together.',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=400&q=80',
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

      {/* Two Column Layout: Left Photos, Right Timeline */}
      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr] gap-3 sm:gap-4 mt-6 text-left items-center">
        {/* Left: 4 Photos Stacked with gentle stagger */}
        <div className="flex flex-col gap-3.5">
          {MILESTONES.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -14, rotate: idx % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="relative p-1 bg-white rounded-lg shadow-sm border border-[#717861]/20 overflow-hidden cursor-pointer"
            >
              <div className="aspect-4/3 rounded overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Vertical Timeline with gentle stagger */}
        <div className="relative pl-4 border-l border-[#8a927a]/35 flex flex-col justify-between py-1 space-y-5">
          {MILESTONES.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Dot marker on vertical line with gentle pulse */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, delay: idx * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#717861] border-2 border-[#fdfbf7]"
              />

              <div className="font-mono text-xs font-semibold text-[#5b624d] tracking-wider">
                {item.year}
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2d2926] mt-0.5">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#57524d] leading-snug font-light mt-0.5">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
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
