import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = '', isDark = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      {/* Upper Logo Area with SVG Cap, Typography and Aeroplane Line */}
      <div className="flex items-center relative h-14">
        {/* Custom SVG logo mimicking the attached image */}
        <svg
          viewBox="0 0 350 75"
          className="h-12 w-full fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Logo Colors */}
            <style>
              {`
                .logo-blue { fill: #1b73ba; }
                .logo-gold { fill: #e5a800; }
                .logo-line { stroke: #1b73ba; stroke-width: 2; }
                .logo-gold-line { stroke: #e5a800; stroke-width: 2.5; fill: none; }
                .logo-text-dark { fill: #000000; }
                .logo-text-light { fill: #ffffff; }
              `}
            </style>
          </defs>

          {/* Graduation Cap placed above the letter 'E' */}
          <g transform="translate(10, 2)">
            {/* Diamond/Rhombus of Cap */}
            <path d="M 12 10 L 40 1 Q 42 1 44 2 L 67 10 L 40 18 Q 38 18 36 17 Z" className="logo-blue" />
            {/* Under cap band */}
            <path d="M 22 13 L 22 19 C 22 21 52 21 52 19 L 52 13 L 37 17 Z" className="logo-blue" />
            {/* Tassel */}
            <path d="M 20 11 L 12 18 L 12 25 L 14 25 L 14 19 Z" className="logo-blue" />
          </g>

          {/* EUROZIEL Text Typography with Exact Color Schema */}
          <g fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="38" letterSpacing="-1">
            {/* E (Gold) */}
            <text x="25" y="52" className="logo-gold font-sans">E</text>
            {/* URO (Navy Blue) */}
            <text x="50" y="52" className="logo-blue font-sans">URO</text>
            {/* ZIEL where Z is gold, IEL is blue, wait, let's style 'ZIEL' to have metallic gold 'Z' & 'EL' or just as described */}
            <text x="142" y="52" className="logo-gold font-sans">Z</text>
            <text x="168" y="52" className="logo-blue font-sans">IEL</text>
          </g>

          {/* Under-tagline Separator Line */}
          <line x1="35" y1="58" x2="185" y2="58" stroke={isDark ? "#ffffff33" : "#000000cc"} strokeWidth="1.5" />

          {/* Soaring Golden Plane and Swoosh Arc on the right */}
          <path
            d="M 215 54 Q 255 74 300 35 Q 312 21 320 18"
            className="logo-gold-line"
            strokeDasharray="none"
            fill="none"
          />
          {/* Airplane rotated and flying */}
          <g transform="translate(315, 10) rotate(5)" className="logo-gold">
            <path d="M0,0 L6,-6 L18,-4 L12,2 L14,7 L10,5 L8,8 L6,5 L2,5 Z" />
            <path d="M5,-2 L10,-9 L12,-9 L8,-2 Z" />
          </g>
        </svg>
      </div>

      {/* Subtitle / Tagline below */}
      <div 
        className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.25em] pl-9 uppercase"
        style={{ color: isDark ? '#e5a800' : '#000000' }}
      >
        PUBLIC UNIVERSITY EXPERTS
      </div>
    </div>
  );
}
