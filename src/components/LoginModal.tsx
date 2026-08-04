import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, Lock, Mail, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export default function LoginModal({ isOpen, onClose, theme = 'dark' }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both email address and password');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Retrieve registered user details from localStorage
      const savedUserStr = localStorage.getItem('euroziel_user');
      let registeredUser = null;
      if (savedUserStr) {
        try {
          registeredUser = JSON.parse(savedUserStr);
        } catch (err) {
          console.error('Error parsing user data:', err);
        }
      }

      const inputEmail = email.trim().toLowerCase();

      // Check if credentials match registered user or fallback demo
      if (
        registeredUser &&
        registeredUser.email?.toLowerCase() === inputEmail &&
        registeredUser.password === password
      ) {
        const sessionUser = {
          name: registeredUser.name || 'Student User',
          email: registeredUser.email,
        };
        localStorage.setItem('euroziel_current_user', JSON.stringify(sessionUser));
        localStorage.setItem('euroziel_has_paid', 'true');
        window.dispatchEvent(new Event('euroziel_payment_updated'));
        setIsSubmitting(false);
        onClose();
        setEmail('');
        setPassword('');
      } else {
        // Fallback check for demo/testing
        if (password.length >= 6) {
          const sessionUser = {
            name: email.split('@')[0] || 'Registered Student',
            email: inputEmail,
          };
          localStorage.setItem('euroziel_current_user', JSON.stringify(sessionUser));
          localStorage.setItem('euroziel_has_paid', 'true');
          window.dispatchEvent(new Event('euroziel_payment_updated'));
          setIsSubmitting(false);
          onClose();
          setEmail('');
          setPassword('');
        } else {
          setError('Invalid email or password. Please check your credentials or register via the profile audit form.');
          setIsSubmitting(false);
        }
      }
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="login-modal" className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.4, ease: 'easeOut' }}
            className={`relative w-full max-w-md rounded-sm shadow-2xl overflow-hidden z-[10000] border flex flex-col border-b-4 border-b-gold my-auto ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header banner decoration */}
            <div className="h-1.5 bg-navy w-full shrink-0" />

            <div className="p-6">
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-[10001] cursor-pointer ${
                  theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold tracking-[0.15em] uppercase mb-2 bg-gold/10 border border-gold/30 text-gold">
                  <LogIn className="w-3.5 h-3.5" /> Student Account Login
                </span>
                <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                  Welcome Back
                </h3>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Sign in using the email and password you set during registration.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-gold" /> Registered Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul.sharma@gmail.com"
                    className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                      theme === 'dark'
                        ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-gold'
                        : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-navy'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-gold" /> Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter account password"
                      className={`w-full px-4 py-2.5 pr-10 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                        theme === 'dark'
                          ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-gold'
                          : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-navy'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-xs text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-sm font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 bg-navy hover:bg-opacity-90 text-white flex items-center justify-center gap-2 border-b-2 border-gold shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-gold" />
                      Sign In & Unlock Portal
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
