import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface DeviceFrameSwitchProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
}

export const DeviceFrameSwitch: React.FC<DeviceFrameSwitchProps> = ({
  isMobileFrame,
  setIsMobileFrame,
}) => {
  return (
    <aside
      aria-label="Device Preview Controls"
      className="hidden lg:flex fixed top-4 right-4 z-50 items-center gap-1 p-1 bg-[#fdfbf7]/90 backdrop-blur-md rounded-full border border-[#717861]/30 shadow-lg"
    >
      <button
        onClick={() => setIsMobileFrame(true)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all min-h-[36px] ${
          isMobileFrame
            ? 'bg-[#5b624d] text-white font-semibold shadow-xs'
            : 'text-[#57524d] hover:text-[#2d2926]'
        }`}
        aria-label="Phone mockup frame view"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Phone View</span>
      </button>

      <button
        onClick={() => setIsMobileFrame(false)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all min-h-[36px] ${
          !isMobileFrame
            ? 'bg-[#5b624d] text-white font-semibold shadow-xs'
            : 'text-[#57524d] hover:text-[#2d2926]'
        }`}
        aria-label="Full responsive screen view"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>Full Screen</span>
      </button>
    </aside>
  );
};
