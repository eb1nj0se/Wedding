import React from 'react';

export const HeartDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-2 ${className}`}>
    <div className="w-8 h-[1px] bg-[#8a927a]/30" />
    <span className="text-[#8a927a] text-xs font-serif select-none">♡</span>
    <div className="w-8 h-[1px] bg-[#8a927a]/30" />
  </div>
);

export const OliveBranch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-32 h-10 text-[#717861] opacity-75 ${className}`}
  >
    {/* Main central stem */}
    <path
      d="M10 25 C 50 20, 110 30, 150 24"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Left leaves */}
    <path
      d="M30 23 C 25 15, 35 10, 42 18 C 37 21, 33 22, 30 23 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M45 24 C 42 32, 52 38, 58 30 C 53 26, 48 25, 45 24 Z"
      fill="currentColor"
      opacity="0.7"
    />
    {/* Center leaves */}
    <path
      d="M70 26 C 66 16, 78 12, 85 20 C 79 23, 74 25, 70 26 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M88 27 C 86 36, 97 40, 103 32 C 98 28, 92 28, 88 27 Z"
      fill="currentColor"
      opacity="0.75"
    />
    {/* Right leaves */}
    <path
      d="M115 26 C 112 18, 122 14, 130 21 C 124 24, 119 25, 115 26 Z"
      fill="currentColor"
      opacity="0.85"
    />
    <path
      d="M130 25 C 138 22, 146 28, 142 35 C 137 32, 133 28, 130 25 Z"
      fill="currentColor"
      opacity="0.75"
    />
    {/* Tiny olive fruits */}
    <ellipse cx="60" cy="22" rx="2.5" ry="3" fill="#5b624d" />
    <ellipse cx="106" cy="24" rx="2.5" ry="3" fill="#5b624d" />
  </svg>
);

export const CornerLeaves: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-20 h-20 text-[#717861] opacity-70 pointer-events-none ${className}`}
  >
    <path
      d="M5 5 C 25 35, 45 55, 80 80"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M20 23 C 12 18, 18 8, 28 15 C 24 19, 21 21, 20 23 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M32 37 C 22 42, 28 52, 38 45 C 35 41, 33 39, 32 37 Z"
      fill="currentColor"
      opacity="0.75"
    />
    <path
      d="M48 53 C 44 43, 56 38, 62 46 C 56 49, 52 51, 48 53 Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M62 67 C 55 74, 63 82, 71 75 C 67 71, 64 69, 62 67 Z"
      fill="currentColor"
      opacity="0.7"
    />
    <ellipse cx="38" cy="32" rx="2" ry="2.5" fill="#5b624d" />
    <ellipse cx="58" cy="50" rx="2" ry="2.5" fill="#5b624d" />
  </svg>
);
