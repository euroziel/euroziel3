import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = '', isDark = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <div className="flex flex-col relative h-12 mobile-m:h-14">
        {/* Vector SVG Logo */}
        <svg
          viewBox="0 0 310 85"
          className="h-9 mobile-m:h-10 laptop:h-11 w-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Graduation Cap above 'E' */}
          <g fill="#1B73BA">
            {/* Diamond Cap Top */}
            <path d="M 24 4 L 50 13 L 24 22 L -2 13 Z" />
            {/* Cap Crown / Base Band */}
            <path d="M 10 16 C 10 23 38 23 38 16 L 38 19 C 38 25 10 25 10 19 Z" />
            {/* Tassel String and Knob */}
            <path d="M 24 13 L 4 19 L 4 30 L 6 30 L 6 20 L 24 14 Z" />
          </g>

          {/* Typography: EUROZIEL */}
          <g fontFamily="'Montserrat', 'Arial Black', 'Helvetica Neue', sans-serif" fontWeight="900" fontSize="44" letterSpacing="-0.5">
            <text x="6" y="62">
              <tspan fill="#E5A800">E</tspan><tspan fill="#1B73BA">URO</tspan><tspan fill="#E5A800">Z</tspan><tspan fill="#1B73BA">IEL</tspan>
            </text>
          </g>

          {/* Golden Swoosh Arc underneath 'IEL' */}
          <path d="M 198 62 C 198 84, 260 88, 276 52" stroke="#E5A800" strokeWidth="4.5" fill="none" strokeLinecap="round" />

          {/* Soaring Golden Airplane at end of Swoosh */}
          <g transform="translate(285, 45) rotate(-35)">
            <path fill="#E5A800" d="M 20 0 L 3 -2 L -3 -15 L -7 -14 L -2 -2 L -12 -1 L -14 -6 L -17 -6 L -15 0 L -17 6 L -14 6 L -12 1 L -2 2 L -7 14 L -3 15 L 3 2 Z" />
          </g>
        </svg>

        {/* Subtitle / Tagline below */}
        <div
          className="text-[7px] mobile-m:text-[8px] laptop:text-[6.5px] font-bold tracking-[0.22em] pl-1.5 uppercase -mt-1"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: isDark ? '#e5a800' : '#000000'
          }}
        >
          PUBLIC UNIVERSITY EXPERTS
        </div>
      </div>
    </div>
  );
}
