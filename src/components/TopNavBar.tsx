import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, CheckSquare, Volume2, VolumeX } from 'lucide-react';

export interface CardItem {
  id: string;
  label: string;
  short: string;
}

interface TopNavBarProps {
  cards: CardItem[];
  activeCardIndex: number;
  maxVisitedIndex: number;
  onSelectCard: (index: number) => void;
  onNextCard: () => void;
  onPrevCard: () => void;
  onOpenRsvp: () => void;
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
  hasAudio?: boolean;
  onOpenAudioModal?: () => void;
  inFrame?: boolean;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  cards,
  activeCardIndex,
  maxVisitedIndex,
  onSelectCard,
  onNextCard,
  onPrevCard,
  onOpenRsvp,
  isPlayingMusic = true,
  onToggleMusic,
  hasAudio = false,
  onOpenAudioModal,
  inFrame = false,
}) => {
  const currentCard = cards[activeCardIndex] || cards[0];
  const isAtEnd = activeCardIndex === cards.length - 1;
  const isAtStart = activeCardIndex === 0;

  // Only visible after first downswipe to next card (card 2 onwards, index >= 1)
  const isVisible = activeCardIndex >= 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={
            inFrame
              ? 'absolute top-10 left-3 right-3 z-40 pointer-events-none'
              : 'fixed top-2 left-0 right-0 z-40 px-3 pointer-events-none'
          }
        >
          <div className="max-w-md mx-auto pointer-events-auto">
            <nav
              className="py-1 px-3 rounded-full bg-[#fdfbf7]/94 backdrop-blur-xl border border-[#717861]/25 shadow-md shadow-stone-900/10 flex flex-col gap-0.5 transition-all"
              role="navigation"
              aria-label="Progress & Navigation"
            >
              {/* Ultra-slim segmented progress bar */}
              <div className="grid grid-cols-6 gap-1 w-full pt-0.5">
                {cards.map((card, idx) => {
                  const isPast = idx < activeCardIndex || (idx <= maxVisitedIndex && idx !== activeCardIndex);
                  const isCurrent = idx === activeCardIndex;

                  return (
                    <button
                      key={card.id}
                      onClick={() => onSelectCard(idx)}
                      className="group relative h-[2.5px] rounded-full overflow-hidden bg-[#e4ded5] focus:outline-none transition-all touch-manipulation cursor-pointer"
                      title={card.label}
                      aria-label={`Jump to ${card.label}`}
                    >
                      <div
                        className={`h-full transition-all duration-400 rounded-full ${
                          isPast
                            ? 'w-full bg-[#5b624d]'
                            : isCurrent
                            ? 'w-full bg-[#717861]'
                            : 'w-0 bg-transparent'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Slim single-line content: Title on left, micro steppers, audio & RSVP on right */}
              <div className="flex items-center justify-between gap-2 h-6">
                <span className="font-serif text-[11px] sm:text-xs font-semibold text-[#2d2926] tracking-wide truncate">
                  {currentCard.label}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Quick Audio Mute/Play Toggle */}
                  {(onToggleMusic || onOpenAudioModal) && (
                    <button
                      onClick={() => {
                        if (!hasAudio && onOpenAudioModal) {
                          onOpenAudioModal();
                        } else if (onToggleMusic) {
                          onToggleMusic();
                        }
                      }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[#5b624d] hover:bg-[#f4efe6] transition-colors touch-manipulation cursor-pointer mr-0.5"
                      aria-label={
                        !hasAudio
                          ? 'Add Music'
                          : isPlayingMusic
                          ? 'Mute Music'
                          : 'Play Music'
                      }
                      title={
                        !hasAudio
                          ? 'Add Indila — Love Story MP3'
                          : isPlayingMusic
                          ? 'Mute Indila — Love Story'
                          : 'Play Indila — Love Story'
                      }
                    >
                      {hasAudio && isPlayingMusic ? (
                        <Volume2 className="w-3.5 h-3.5 text-[#5b624d] animate-pulse" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={onPrevCard}
                    disabled={isAtStart}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#5b624d] hover:bg-[#f4efe6] transition-colors touch-manipulation disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                    aria-label="Previous card"
                    title="Previous card"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onNextCard}
                    disabled={isAtEnd}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#5b624d] hover:bg-[#f4efe6] transition-colors touch-manipulation disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                    aria-label="Next card"
                    title="Next card"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenRsvp}
                    className="ml-1 py-0.5 px-2 rounded-full bg-[#5b624d] hover:bg-[#4a503e] text-white text-[9px] tracking-wider uppercase font-semibold flex items-center gap-1 shadow-2xs touch-manipulation cursor-pointer active:scale-95 transition-transform"
                  >
                    <CheckSquare className="w-2.5 h-2.5" />
                    <span>RSVP</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
