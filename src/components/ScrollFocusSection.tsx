import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollFocusSectionProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  inputRanges?: number[];
  opacityRange?: number[];
  scaleRange?: number[];
  brightnessRange?: number[]; // Percentage, e.g. [40, 75, 100, 100, 75, 40]
  blurRange?: number[]; // Pixels, e.g. [6, 2, 0, 0, 2, 6]
  className?: string;
}

export default function ScrollFocusSection({
  children,
  theme,
  inputRanges = [0, 0.18, 0.32, 0.68, 0.82, 1.0],
  opacityRange = [0.35, 0.65, 1.0, 1.0, 0.65, 0.35],
  scaleRange = [0.95, 0.98, 1.0, 1.0, 0.98, 0.95],
  brightnessRange = [40, 75, 100, 100, 75, 40],
  blurRange = [6, 2, 0, 0, 2, 6],
  className = ""
}: ScrollFocusSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check for mobile layouts to soften values
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Choose ranges based on screen size
  const actualOpacityRange = isMobile ? [0.65, 0.85, 1.0, 1.0, 0.85, 0.65] : opacityRange;
  const actualScaleRange = isMobile ? [0.97, 0.99, 1.0, 1.0, 0.99, 0.97] : scaleRange;
  const actualBrightnessRange = isMobile ? [75, 90, 100, 100, 90, 75] : brightnessRange;
  const actualBlurRange = isMobile ? [2, 0.5, 0, 0, 0.5, 2] : blurRange;

  // Transformations
  const opacity = useTransform(scrollYProgress, inputRanges, actualOpacityRange);
  const scale = useTransform(scrollYProgress, inputRanges, actualScaleRange);
  
  const brightnessVal = useTransform(scrollYProgress, inputRanges, actualBrightnessRange);
  const blurVal = useTransform(scrollYProgress, inputRanges, actualBlurRange);

  // Combine brightness and blur into a single filter style
  const filter = useTransform(
    [brightnessVal, blurVal],
    ([bright, blur]) => `brightness(${bright}%) blur(${blur}px)`
  );

  return (
    <div
      ref={containerRef}
      className={`w-full relative transition-colors duration-300 ${className}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter,
          transformOrigin: "center center"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
