import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Calendar } from 'lucide-react';
import { CornerLeaves } from './BotanicalAccents';
import { audioEngine } from '../utils/audio';
import { getGoogleCalendarUrl } from '../utils/calendar';

interface HeroInvitationCardProps {
  onOpenRsvp: () => void;
  isPlayingMusic: boolean;
  setIsPlayingMusic: (val: boolean) => void;
  hasAudio: boolean;
  onOpenAudioModal?: () => void;
}

export const HeroInvitationCard: React.FC<HeroInvitationCardProps> = ({
  onOpenRsvp,
  isPlayingMusic,
  setIsPlayingMusic,
  hasAudio,
  onOpenAudioModal,
}) => {
  const handleAudioToggle = () => {
    if (!hasAudio && onOpenAudioModal) {
      onOpenAudioModal();
      return;
    }
    const playing = audioEngine.toggle();
    setIsPlayingMusic(playing);
  };

  return (
    <div
      id="invite"
      className="relative w-full wedding-card rounded-3xl overflow-hidden text-center pt-8 pb-6 px-5 transition-shadow duration-500"
    >
      {/* Top Left Botanical Branch with soothing gentle sway */}
      <motion.div
        animate={{ rotate: [-1.5, 2, -1.5], y: [0, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-2 pointer-events-none origin-top-left"
      >
        <CornerLeaves className="w-20 h-20 text-[#606752] opacity-80" />
      </motion.div>

      {/* Audio & Calendar Quick Actions at Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5"
      >
        {/* Audio Play/Pause Button */}
        <button
          onClick={handleAudioToggle}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#5b624d] border border-[#717861]/25 flex items-center justify-center shadow-xs transition-all active:scale-95 touch-manipulation cursor-pointer"
          aria-label={isPlayingMusic ? 'Mute Celebration Music' : 'Play Celebration Music'}
          title={
            !hasAudio
              ? 'Audio File (Not yet added)'
              : isPlayingMusic
              ? 'Mute: Indila — Love Story'
              : 'Play: Indila — Love Story'
          }
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-[#5b624d] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-stone-400" />
          )}
        </button>

        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#5b624d] border border-[#717861]/25 flex items-center justify-center shadow-xs transition-all active:scale-95 touch-manipulation"
          aria-label="Add to Google Calendar"
          title="Add to Google Calendar"
        >
          <Calendar className="w-4 h-4 text-[#717861]" />
        </a>
      </motion.div>

      {/* Main Text Content */}
      <div className="max-w-xs mx-auto mt-4">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#6b725c] font-medium mb-3"
        >
          Together With Their Families
        </motion.p>

        {/* Diagonal Monogram Typography: Dr. Ashik (left) -> & (center) -> Dr. Teresa (right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="my-3 w-full max-w-[290px] mx-auto flex flex-col"
        >
          {/* Dr. Ashik - shifted slightly to the left from center with enlarged initial 'A' */}
          <div className="flex items-baseline justify-center -translate-x-3 sm:-translate-x-5">
            <span className="font-serif text-xs sm:text-sm font-medium tracking-[0.2em] text-[#717861] uppercase mr-1 self-center">
              Dr.
            </span>
            <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#5b624d] leading-none inline-block drop-shadow-xs select-none">
              A
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-[#2d2926] tracking-[0.22em] uppercase font-normal ml-0.5">
              SHIK
            </span>
          </div>

          {/* '&' in center between them on new line */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="my-[-6px] flex items-center justify-center select-none"
          >
            <span className="font-script text-3xl sm:text-4xl text-[#717861] leading-none">
              &
            </span>
          </motion.div>

          {/* Dr. Teresa - shifted slightly to the right from center with enlarged initial 'T' */}
          <div className="flex items-baseline justify-center translate-x-3 sm:translate-x-5">
            <span className="font-serif text-xs sm:text-sm font-medium tracking-[0.2em] text-[#717861] uppercase mr-1 self-center">
              Dr.
            </span>
            <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#5b624d] leading-none inline-block drop-shadow-xs select-none">
              T
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-[#2d2926] tracking-[0.22em] uppercase font-normal ml-0.5">
              ERESA
            </span>
          </div>
        </motion.div>

        {/* Invitation Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#5b624d] font-medium mt-3 mb-2"
        >
          Invite You To
          <span className="block mt-0.5">Celebrate Their Betrothal</span>
        </motion.p>

        {/* Date Box: DEC | 26 | 2026 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center gap-3 py-2 px-4 my-2 border-y border-[#717861]/20 text-[#2d2926]"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#5b624d]">
            Dec
          </span>
          <span className="w-[1px] h-4 bg-[#717861]/30" />
          <span className="font-serif text-2xl font-normal tracking-wide px-1 text-[#2d2926]">
            26
          </span>
          <span className="w-[1px] h-4 bg-[#717861]/30" />
          <span className="text-xs tracking-[0.15em] font-medium text-[#5b624d]">
            2026
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[10px] tracking-[0.2em] uppercase text-[#787169] mt-1 mb-5"
        >
          At 10:30 in the Morning
        </motion.p>
      </div>

      {/* Couple Embracing Photograph with soothing gentle breath animation */}
      <div className="relative mt-2 -mx-5 -mb-6 aspect-4/5 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
          alt="Ashik and Teresa embracing at sunset"
          referrerPolicy="no-referrer"
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.98]"
        />

        {/* Soft gradient scrim and paper blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-transparent opacity-95" />
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#fdfbf7] to-transparent opacity-80" />

        {/* Venue Location Text over bottom of photo */}
        <div className="absolute bottom-5 inset-x-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2d2926] font-medium"
          >
            Carmalamatha Church &middot; St Aloysius Auditorium
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] tracking-[0.2em] uppercase text-[#5b624d] mt-0.5"
          >
            Chettupuzha &middot; Elthuruth, Thrissur
          </motion.p>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xs text-[#717861] mt-1 select-none inline-block"
          >
            ♡
          </motion.div>

          {/* Quick RSVP CTA button directly on the hero card */}
          <div className="mt-3">
            <button
              onClick={onOpenRsvp}
              className="px-6 py-2.5 rounded-full bg-[#5b624d] hover:bg-[#4a503e] text-white text-xs tracking-widest uppercase font-medium shadow-md shadow-[#5b624d]/20 transition-all active:scale-95 touch-manipulation cursor-pointer"
            >
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
