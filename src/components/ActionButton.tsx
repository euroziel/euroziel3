import React from 'react';
import { useUserStatus } from '../hooks/useUserStatus';
import { LogIn, AlertTriangle } from 'lucide-react';

interface ActionButtonProps {
  onOpenConsultation: () => void;
  defaultText: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function ActionButton({
  onOpenConsultation,
  defaultText,
  className = '',
  icon,
}: ActionButtonProps) {
  const { isLoggedIn, hasPaid, isVerified, isRejected } = useUserStatus();

  if (isLoggedIn && hasPaid) {
    if (isVerified) {
      return (
        <a
          href="https://dashboard.euroziel.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`mybtn inline-flex items-center justify-center gap-2 font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 bg-navy text-white hover:bg-opacity-90 shadow-premium border-b-2 border-gold font-sans text-center ${className}`}
        >
          <LogIn className="w-4 h-4 text-gold shrink-0" />
          Go to Student Dashboard
        </a>
      );
    }

    if (isRejected) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.dispatchEvent(new Event('euroziel_open_rejection_modal'));
          }}
          className={`mybtn inline-flex items-center justify-center gap-2 font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 bg-red-950 text-red-400 border border-red-500/50 hover:bg-red-900/60 shadow-lg font-sans text-center ${className}`}
        >
          <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
          Fix Payment Details
        </button>
      );
    }

    // Pending Verification (has paid & waiting for admin approval)
    return (
      <div className="relative group inline-block">
        <button
          disabled
          className={`mybtn inline-flex items-center justify-center gap-2 font-bold tracking-widest uppercase bg-slate-900 text-amber-400 border border-amber-500/30 opacity-90 cursor-not-allowed font-sans text-center shadow-inner ${className}`}
          title="Wait till admin verifies your payment to access dashboard"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
          Wait till Account Verification
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950 text-amber-400 text-[10px] py-1.5 px-3 rounded border border-amber-500/30 whitespace-nowrap z-50 shadow-xl pointer-events-none">
          ⏳ Verification Pending — Admin will contact you soon
        </div>
      </div>
    );
  }

  // Default: Not logged in or not paid
  return (
    <button
      onClick={onOpenConsultation}
      className={className}
    >
      {defaultText}
      {icon}
    </button>
  );
}
