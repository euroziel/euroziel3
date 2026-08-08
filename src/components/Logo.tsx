import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className = '', isDark = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <img
        src="/logo/euroziel-official-logo.png"
        alt="EUROZIEL"
        className="h-7 mobile-m:h-8 laptop:h-9 w-auto object-contain"
      />
      <div
        className="text-[6.5px] mobile-m:text-[7.5px] laptop:text-[7px] font-extrabold tracking-[0.22em] pl-0.5 uppercase -mt-0.5"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          color: isDark ? '#e5a800' : '#000000'
        }}
      >
        PUBLIC UNIVERSITY EXPERTS
      </div>
    </div>
  );
}



