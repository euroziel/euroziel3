import React from 'react';
import { useUserStatus } from '../hooks/useUserStatus';
import { Clock, CheckCircle } from 'lucide-react';

interface VerificationNoticeProps {
  className?: string;
  alignLeft?: boolean;
}

export default function VerificationNotice({ className = '', alignLeft = false }: VerificationNoticeProps) {
  const { isLoggedIn, hasPaid, isVerified, isRejected } = useUserStatus();

  if (!isLoggedIn || !hasPaid || isRejected) return null;

  const marginClass = alignLeft ? 'mb-4 ml-0' : 'mx-auto mb-6';

  if (isVerified) {
    return (
      <div className={`w-full max-w-xl ${marginClass} p-3.5 sm:p-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-sans flex items-center gap-3 shadow-lg ${className}`}>
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <span className="font-bold text-emerald-400 uppercase tracking-wider block text-[10px]">Account Approved</span>
          <span>Your payment is verified! Click "Go to Student Dashboard" to access your dashboard.</span>
        </div>
      </div>
    );
  }

  // Pending Verification
  return (
    <div className={`w-full max-w-xl ${marginClass} p-3.5 sm:p-4 rounded-sm border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-sans flex items-center gap-3 shadow-lg animate-fade-in ${className}`}>
      <Clock className="w-5 h-5 text-amber-400 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
      <div>
        <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">Verification In Progress</span>
        <span>Your ₹9 payment is received. Our EuroZiel team will contact you soon & admin will enable your dashboard upon verification.</span>
      </div>
    </div>
  );
}
