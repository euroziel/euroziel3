import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = '', isDark = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      {/* Upper Logo Area with SVG Cap, Typography and Aeroplane Line */}
      <div className="flex flex-col relative h-14">
        {/* Custom SVG logo mimicking the attached image */}
        <img src="/logo/logo.svg" alt="Logo" className="h-3/4 mobile-s:ml-0 tablet:ml-0 laptop:ml-0" />
        {/* Subtitle / Tagline below */}
        <div
          className="text-[8px] laptop:text-[6px] font-bold tracking-[0.25em] pl-7 uppercase mobile-s:ml-1 tablet:ml-4 laptop:ml-0"
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
