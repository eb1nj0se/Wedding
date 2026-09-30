import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Church, Sparkles, Hotel, Navigation, MapPin, ExternalLink, Copy, Check } from 'lucide-react';
import { HeartDivider, CornerLeaves } from './BotanicalAccents';

export const DetailsCard: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [copied, setCopied] = useState(false);

  const venueName = 'St Aloysius College Auditorium';
  const venueAddress = 'F5WJ+M97, SACT, Aloysius college, Elthuruth, Thrissur, Keralam 680611';
  
  // Exact Google Maps and Apple Maps navigation links
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=St+Aloysius+College+Auditorium+Elthuruth+Thrissur+Keralam+680611';
  const appleMapsUrl = 'https://maps.apple.com/?q=St+Aloysius+College+Auditorium+Elthuruth+Thrissur&ll=10.4996,76.1822';
  
  // OpenStreetMap embed centered on St Aloysius College, Elthuruth, Thrissur
  const osmEmbedUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=76.1620%2C10.4850%2C76.2020%2C10.5150&layer=mapnik&marker=10.4996%2C76.1822';

  const copyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const detailsList = [
    {
      icon: Church,
      title: 'Betrothal Ceremony & Feast',
      primary: venueName,
      desc: venueAddress,
    },
    {
      icon: Sparkles,
      title: 'Attire',
      primary: 'Formal / Traditional Festive Attire',
      desc: 'Elegant traditional or formal attire celebrating our special day.',
    },
    {
      icon: Hotel,
      title: 'Accommodations & Travel',
      primary: 'Thrissur City Center',
      desc: 'For out-of-town family and guests, travel guidance and accommodation assistance are gladly provided.',
    },
  ];

  return (
    <div id="details" className="relative w-full wedding-card rounded-3xl overflow-hidden pt-0 pb-8 px-6 text-center">
      {/* Top Photo: Scenic venue photo */}
      <div className="relative -mx-6 h-48 sm:h-56 overflow-hidden bg-stone-200">
        <motion.img
          src="https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80"
          alt="St Aloysius College Auditorium Venue"
          referrerPolicy="no-referrer"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full object-cover object-center filter brightness-[0.97]"
        />
        {/* Soft bottom feathering into paper */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-transparent opacity-95" />
      </div>

      {/* Header */}
      <div className="relative -mt-6">
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
          Details
        </motion.h2>
        <HeartDivider className="my-1.5" />
      </div>

      {/* Details List */}
      <div className="mt-6 space-y-5 text-left max-w-sm mx-auto">
        {detailsList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-[#f4efe6] border border-[#717861]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#5b624d] shadow-2xs">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2d2926]">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[#2d2926] mt-0.5">
                  {item.primary}
                </p>
                <p className="text-[11px] sm:text-xs text-[#57524d] font-light leading-relaxed mt-0.5 break-words">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PROMINENTLY HIGHLIGHTED VENUE & DIRECTIONS BUTTON */}
      <div className="mt-7 max-w-sm mx-auto">
        <motion.button
          onClick={() => setShowMap(!showMap)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#5b624d] via-[#636c53] to-[#4a503e] hover:from-[#4a503e] hover:to-[#3e4433] text-white font-medium text-xs tracking-wider uppercase shadow-md shadow-[#5b624d]/30 flex items-center justify-center gap-2 touch-manipulation cursor-pointer border border-[#717861]/40"
        >
          <MapPin className="w-4 h-4 text-[#e2d9cc] animate-bounce" />
          <span className="font-semibold tracking-wide">
            {showMap ? 'Hide Venue Map' : 'View Venue & Directions'}
          </span>
          <span className="text-[10px] opacity-80 font-normal">
            ({showMap ? 'Close' : 'Map & GPS'})
          </span>
        </motion.button>
      </div>

      {/* Embedded Map Section with Direct Apple & Google Maps Buttons */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 rounded-2xl overflow-hidden border border-[#717861]/30 shadow-md text-left bg-white"
          >
            {/* Interactive Map Iframe */}
            <div className="h-60 w-full bg-stone-100 relative">
              <iframe
                title="St Aloysius College Auditorium Location"
                src={osmEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 right-2 p-2 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-200 text-xs shadow-sm flex items-center justify-between">
                <span className="font-medium text-[#2d2926] truncate pr-2">
                  St Aloysius College Auditorium
                </span>
                <button
                  onClick={copyAddress}
                  className="px-2 py-1 rounded-md bg-[#f4efe6] text-[10px] text-[#5b624d] font-semibold shrink-0 flex items-center gap-1 hover:bg-[#e8dfd3]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Address Banner & Direct App Buttons */}
            <div className="p-3.5 bg-[#fdfbf7] border-t border-[#717861]/15 space-y-3">
              <div className="text-[11px] text-[#57524d] leading-snug">
                <span className="font-semibold text-[#2d2926] block">{venueName}</span>
                <span className="font-mono text-[10px] text-[#717861]">{venueAddress}</span>
              </div>

              {/* Direct GPS App Launchers */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#5b624d] hover:bg-[#4a503e] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm min-h-[38px] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#717861]/35 text-[#2d2926] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs min-h-[38px] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#5b624d]" />
                  <span>Apple Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floral Spray at Bottom Right with gentle sway */}
      <motion.div
        animate={{ rotate: [88, 92, 88] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 right-2 pointer-events-none origin-bottom-right"
      >
        <CornerLeaves className="w-16 h-16 opacity-75 text-[#717861]" />
      </motion.div>
    </div>
  );
};
