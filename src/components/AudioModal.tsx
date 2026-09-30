import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Music, Upload, Link, Check, Volume2, VolumeX, Folder } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlayingMusic: boolean;
  hasAudio: boolean;
}

export const AudioModal: React.FC<AudioModalProps> = ({
  isOpen,
  onClose,
  isPlayingMusic,
  hasAudio,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const ok = await audioEngine.setAudioFromFile(file);
      if (ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsUploading(true);
    try {
      const ok = await audioEngine.setAudioFromUrl(urlInput.trim());
      if (ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText('public/audio/love-story.mp3');
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#fdfbf7] border border-[#717861]/30 rounded-3xl shadow-2xl overflow-hidden p-6 z-10 text-[#2d2926]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#717861]/15">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#5b624d]/10 flex items-center justify-center text-[#5b624d]">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#2d2926]">
                    Background Music
                  </h3>
                  <p className="text-[11px] text-[#717861] uppercase tracking-wider font-semibold">
                    Indila — Love Story
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#57524d] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Status Badge */}
            <div className="my-4 p-3.5 rounded-2xl bg-[#f4efe6] border border-[#717861]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    hasAudio ? (isPlayingMusic ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500') : 'bg-amber-500'
                  }`}
                />
                <div>
                  <span className="text-xs font-semibold block text-[#2d2926]">
                    {hasAudio
                      ? isPlayingMusic
                        ? 'Now Playing'
                        : 'Audio Loaded (Paused)'
                      : 'Audio File Needed'}
                  </span>
                  <span className="text-[10px] text-[#787169] block">
                    {hasAudio
                      ? 'Indila — Love Story (Piano Cover)'
                      : 'Please add your MP3 file below'}
                  </span>
                </div>
              </div>

              {hasAudio && (
                <button
                  onClick={() => audioEngine.toggle()}
                  className="px-3 py-1.5 rounded-full bg-[#5b624d] hover:bg-[#4a503e] text-white text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isPlayingMusic ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Method 1: Upload MP3 File (One-Click) */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#2d2926] uppercase tracking-wider block mb-1.5">
                  Option 1: Choose Your MP3 File
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*,.mp3,.m4a,.wav"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#717861]/35 hover:border-[#5b624d] hover:bg-[#5b624d]/5 flex items-center justify-center gap-2 text-xs font-medium text-[#5b624d] transition-all cursor-pointer group"
                >
                  <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  <span>
                    {isUploading
                      ? 'Loading Audio...'
                      : uploadSuccess
                      ? '✓ File Loaded Successfully!'
                      : 'Select "Love Story" MP3 From Your Device'}
                  </span>
                </button>
                <p className="text-[10px] text-[#787169] mt-1 text-center">
                  Select your attached MP3. It will immediately play and save to the server!
                </p>
              </div>

              {/* Method 2: Direct File Path Location */}
              <div className="pt-2 border-t border-[#717861]/15">
                <label className="text-xs font-semibold text-[#2d2926] uppercase tracking-wider block mb-1">
                  Option 2: Add Directly to Project Location
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-800">
                  <div className="flex items-center gap-1.5 truncate">
                    <Folder className="w-3.5 h-3.5 text-[#5b624d] shrink-0" />
                    <span className="truncate">public/audio/love-story.mp3</span>
                  </div>
                  <button
                    onClick={handleCopyPath}
                    className="ml-2 px-2 py-1 rounded bg-white hover:bg-stone-50 border border-stone-200 text-[10px] text-stone-700 font-sans font-medium transition-colors cursor-pointer shrink-0"
                  >
                    {copiedPath ? 'Copied!' : 'Copy Path'}
                  </button>
                </div>
                <p className="text-[10px] text-[#787169] mt-1">
                  Yes! You can put your MP3 file directly at this location in your workspace.
                </p>
              </div>

              {/* Method 3: Paste Direct URL */}
              <div className="pt-2 border-t border-[#717861]/15">
                <label className="text-xs font-semibold text-[#2d2926] uppercase tracking-wider block mb-1.5">
                  Option 3: Or Paste Public Audio URL
                </label>
                <form onSubmit={handleSetUrl} className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://.../love-story.mp3"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#717861]/30 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#5b624d]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-[#5b624d] hover:bg-[#4a503e] text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Set URL
                  </button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-[#717861]/15 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#5b624d] hover:bg-[#4a503e] text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
