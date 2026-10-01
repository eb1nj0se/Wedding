/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { HeroInvitationCard } from './components/HeroInvitationCard';
import { OurStoryCard } from './components/OurStoryCard';
import { SaveTheDateCard } from './components/SaveTheDateCard';
import { DetailsCard } from './components/DetailsCard';
import { RsvpCard } from './components/RsvpCard';
import { CelebrateCard } from './components/CelebrateCard';
import { RsvpModal } from './components/RsvpModal';
import { AudioModal } from './components/AudioModal';
import { EnvelopeWelcome } from './components/EnvelopeWelcome';
import { TopNavBar, CardItem } from './components/TopNavBar';
import { DeviceFrameSwitch } from './components/DeviceFrameSwitch';
import { audioEngine } from './utils/audio';
import { RSVPData } from './types';

const BETROTHAL_CARDS: CardItem[] = [
  { id: 'invite', label: 'Main Invitation', short: 'Invite' },
  { id: 'story', label: 'Our Story', short: 'Story' },
  { id: 'savedate', label: 'Save The Date', short: 'Save Date' },
  { id: 'details', label: 'The Details', short: 'Details' },
  { id: 'rsvp', label: 'Kindly RSVP', short: 'RSVP' },
  { id: 'celebrate', label: 'Celebrate With Us', short: 'Celebrate' },
];

export default function App() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasAudio, setHasAudio] = useState(audioEngine.getHasAudio());
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [maxVisitedIndex, setMaxVisitedIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userRsvp, setUserRsvp] = useState<RSVPData | null>(null);
  const [showWelcomeEnvelope, setShowWelcomeEnvelope] = useState(true);

  const phoneScrollRef = useRef<HTMLDivElement | null>(null);

  const handleOpenWelcome = () => {
    setShowWelcomeEnvelope(false);
    audioEngine.play();
  };

  // Initialize and Autoplay Indila - Love Story MP3
  useEffect(() => {
    // Attempt playback immediately
    audioEngine.play();

    // Also attach first interaction fallback on window
    const handleFirstTouch = () => {
      audioEngine.play().catch(() => {});
    };
    window.addEventListener('pointerdown', handleFirstTouch, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstTouch, { passive: true, once: true });
    window.addEventListener('click', handleFirstTouch, { passive: true, once: true });

    const unsubscribe = audioEngine.subscribe((playing, _track, audioReady) => {
      setIsPlayingMusic(playing);
      setHasAudio(audioReady);
    });

    return () => {
      unsubscribe();
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, []);

  const handleToggleMusic = () => {
    if (!hasAudio) {
      setIsAudioModalOpen(true);
      return;
    }
    const nextState = audioEngine.toggle();
    setIsPlayingMusic(nextState);
  };

  // Load stored RSVP
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem('betrothal_rsvp_ashik_teresa') ||
        localStorage.getItem('wedding_rsvp_ashik_teresa');
      if (stored) {
        setUserRsvp(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSaveRsvp = (data: RSVPData) => {
    setUserRsvp(data);
    try {
      localStorage.setItem('betrothal_rsvp_ashik_teresa', JSON.stringify(data));
    } catch {
      // Ignore
    }
  };

  // Sync scroll-snap class to document.documentElement for full-screen mode
  useEffect(() => {
    if (!isMobileFrame && !isUnlocked) {
      document.documentElement.classList.add('card-snap-active');
    } else {
      document.documentElement.classList.remove('card-snap-active');
    }

    return () => {
      document.documentElement.classList.remove('card-snap-active');
    };
  }, [isUnlocked, isMobileFrame]);

  // Jump smoothly to a specific card
  const goToCard = useCallback(
    (targetIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(targetIndex, BETROTHAL_CARDS.length - 1));
      const cardId = BETROTHAL_CARDS[clampedIndex].id;
      const targetElement = document.getElementById(cardId);

      if (!targetElement) return;

      if (isMobileFrame && phoneScrollRef.current) {
        const container = phoneScrollRef.current;
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = targetElement.getBoundingClientRect().top;
        // On cards 2+, account for the compact top navbar offset
        const topOffset = clampedIndex >= 1 ? 52 : 16;
        const targetScroll = container.scrollTop + (elementTop - containerTop) - topOffset;
        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      setActiveCardIndex(clampedIndex);
      setMaxVisitedIndex((prev) => Math.max(prev, clampedIndex));

      if (clampedIndex === BETROTHAL_CARDS.length - 1) {
        setIsUnlocked(true);
      }
    },
    [isMobileFrame]
  );

  const handleNextCard = () => {
    if (activeCardIndex < BETROTHAL_CARDS.length - 1) {
      goToCard(activeCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (activeCardIndex > 0) {
      goToCard(activeCardIndex - 1);
    }
  };

  // Track active card via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            const index = BETROTHAL_CARDS.findIndex((c) => c.id === entry.target.id);
            if (index !== -1) {
              setActiveCardIndex(index);
              setMaxVisitedIndex((prev) => {
                const nextMax = Math.max(prev, index);
                if (nextMax === BETROTHAL_CARDS.length - 1) {
                  setIsUnlocked(true);
                }
                return nextMax;
              });
            }
          }
        });
      },
      {
        root: isMobileFrame ? phoneScrollRef.current : null,
        threshold: [0.45],
      }
    );

    BETROTHAL_CARDS.forEach((card) => {
      const el = document.getElementById(card.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobileFrame]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        handleNextCard();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handlePrevCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked, activeCardIndex]);

  // The 6 invitation cards wrapped with .card-snap-item
  const cardsContent = (
    <div className="space-y-6 sm:space-y-8 pb-16 pt-3 px-3 sm:px-4 max-w-md mx-auto">
      {/* Card 1: Main Invitation Card */}
      <div className="card-snap-item">
        <HeroInvitationCard
          onOpenRsvp={() => setIsRsvpOpen(true)}
          isPlayingMusic={isPlayingMusic}
          setIsPlayingMusic={setIsPlayingMusic}
          hasAudio={hasAudio}
          onOpenAudioModal={() => setIsAudioModalOpen(true)}
          userRsvp={userRsvp}
        />
      </div>

      {/* Card 2: Our Story */}
      <div className="card-snap-item pt-2 sm:pt-4">
        <OurStoryCard />
      </div>

      {/* Card 3: Save The Date Calendar */}
      <div className="card-snap-item pt-2 sm:pt-4">
        <SaveTheDateCard />
      </div>

      {/* Card 4: The Details & Map */}
      <div className="card-snap-item pt-2 sm:pt-4">
        <DetailsCard />
      </div>

      {/* Card 5: Kindly RSVP */}
      <div className="card-snap-item pt-2 sm:pt-4">
        <RsvpCard
          onOpenRsvpModal={() => setIsRsvpOpen(true)}
          userRsvp={userRsvp}
        />
      </div>

      {/* Card 6: We Can't Wait To Celebrate With You! */}
      <div className="card-snap-item pt-2 sm:pt-4">
        <CelebrateCard
          onOpenRsvpModal={() => setIsRsvpOpen(true)}
          userRsvp={userRsvp}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#2d2926] selection:bg-[#717861]/20">
      {/* Desktop Preview Frame Switcher */}
      <DeviceFrameSwitch
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      {isMobileFrame ? (
        /* Phone View Simulator (iPhone frame on desktop) */
        <div className="w-full flex justify-center items-center py-6 min-h-screen bg-[#ebe5db]">
          <div className="relative w-[390px] h-[844px] rounded-[52px] border-[10px] border-[#383430] shadow-[0_25px_60px_-15px_rgba(45,41,38,0.35),0_0_0_1px_rgba(255,255,255,0.4)] overflow-hidden bg-[#f7f4ee] flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 pointer-events-none flex items-center justify-end pr-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1c] border border-stone-700" />
            </div>

            {/* Top Navigation Bar: Visible from Card 2 onwards inside phone simulator */}
            <TopNavBar
              cards={BETROTHAL_CARDS}
              activeCardIndex={activeCardIndex}
              maxVisitedIndex={maxVisitedIndex}
              onSelectCard={goToCard}
              onNextCard={handleNextCard}
              onPrevCard={handlePrevCard}
              onOpenRsvp={() => setIsRsvpOpen(true)}
              isPlayingMusic={isPlayingMusic}
              onToggleMusic={handleToggleMusic}
              hasAudio={hasAudio}
              onOpenAudioModal={() => setIsAudioModalOpen(true)}
              inFrame={true}
            />

            {/* Scrollable Screen with snap support */}
            <div
              ref={phoneScrollRef}
              className={`w-full h-full overflow-y-auto no-scrollbar pt-6 ${
                isUnlocked ? '' : 'card-snap-active'
              }`}
            >
              {cardsContent}
            </div>
          </div>
        </div>
      ) : (
        /* Natural Responsive Screen (Mobile & Desktop) */
        <main className="w-full relative">
          {/* Top Navigation Bar: Fixed at top of window, appears after first downswipe (card 2 onwards) */}
          <TopNavBar
            cards={BETROTHAL_CARDS}
            activeCardIndex={activeCardIndex}
            maxVisitedIndex={maxVisitedIndex}
            onSelectCard={goToCard}
            onNextCard={handleNextCard}
            onPrevCard={handlePrevCard}
            onOpenRsvp={() => setIsRsvpOpen(true)}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={handleToggleMusic}
            hasAudio={hasAudio}
            onOpenAudioModal={() => setIsAudioModalOpen(true)}
            inFrame={false}
          />

          {cardsContent}
        </main>
      )}

      {/* Interactive RSVP Sheet Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSaveRsvp={handleSaveRsvp}
        existingRsvp={userRsvp}
      />

      {/* Audio Setup & Manager Modal */}
      <AudioModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        isPlayingMusic={isPlayingMusic}
        hasAudio={hasAudio}
      />

      {/* Tap-to-open Welcome Envelope: Guarantees 100% browser autoplay permission on all devices */}
      {showWelcomeEnvelope && (
        <EnvelopeWelcome onOpen={handleOpenWelcome} />
      )}
    </div>
  );
}
