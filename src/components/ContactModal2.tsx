import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

// Deployed Apps Script Web App Endpoint
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyc_4-9z_maCezngz3lRY4ZHN2HUGJoeTLpW3HQ8O7sfHqih1DMXRMgGAS3dDoJWKGu9g/exec';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function ContactModal({ isOpen, onClose, theme = 'light' }: ContactModalProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (form.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(form.phone.replace(/[\s-()]/g, ''))) {
      newErrors.phone = 'Enter a valid 10-15 digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, formType: 'modal2' }),
      });

      const submissions = JSON.parse(localStorage.getItem('euroziel_leads') || '[]');
      submissions.push({ ...form, id: Date.now(), date: new Date().toISOString() });
      localStorage.setItem('euroziel_leads', JSON.stringify(submissions));

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitError('System busy. Unable to submit data right now. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setSubmitError(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      resetForm();
    }, 200); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* CRITICAL FIX: Escalated to z-[9999] and forced internal overflow management on layout wrappers */
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Card Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.4, ease: 'easeOut' }}
            id="contact-modal"
            className={`relative w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-[10000] border flex flex-col border-b-4 border-b-amber-500 my-auto ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header banner decoration */}
            <div className="h-1.5 bg-blue-900 w-full shrink-0" />

            {/* Modal Body Container with precise calculation boundaries */}
            <div className="p-6 overflow-y-auto max-h-[80vh] flex-1">
              <button
                onClick={handleClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-[10001] cursor-pointer ${
                  theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-6 pr-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.15em] uppercase mb-2 bg-amber-500/5 border border-amber-500/35 text-amber-500">
                      <Sparkles className="w-3.5 h-3.5" /> Direct Access Setup
                    </span>
                    <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                      Start Your <span className="font-serif italic font-medium text-blue-950 dark:text-amber-500">Germany</span> Profile Audit
                    </h3>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Get custom counseling, course shortlisting, and direct evaluation from experts already working & studying in Germany.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Two-Column Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Rahul Sharma"
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            errors.name
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-blue-900'
                              : 'border-slate-200 bg-slate-50 focus:border-blue-900'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="rahul.sharma@gmail.com"
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            errors.email
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-blue-900'
                              : 'border-slate-200 bg-slate-50 focus:border-blue-900'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            errors.phone
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-blue-900'
                              : 'border-slate-200 bg-slate-50 focus:border-blue-900'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                        Profile Context / Questions
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="e.g. I have 1.5 years work experience in IT, completed my Bachelor's with 8.2 CGPA..."
                        className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 resize-none ${
                          theme === 'dark'
                            ? 'border-slate-800 bg-slate-950 focus:border-blue-500'
                            : 'border-slate-200 bg-slate-50 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    {/* Error Notice */}
                    {submitError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-xs text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Footnote */}
                    <p className={`text-[10px] text-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Security Guarantee: Your details are encrypted. We strictly do not share your contact info with third parties.
                    </p>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative py-3.5 rounded-sm font-bold text-xs tracking-widest uppercase overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-[0.98] bg-blue-950 hover:bg-opacity-95 text-white disabled:opacity-75 flex items-center justify-center gap-2 border-b-2 border-amber-500"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing Profile & Saving Data...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit for Expert Review
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-sm flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-3xl font-extrabold font-sans mb-3 text-emerald-500">
                    Application Received!
                  </h3>
                  <p className={`max-w-md text-sm mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Thank you, <span className="font-bold text-slate-900 dark:text-slate-100">{form.name}</span>. An expert from our Hamburg peer network will review your profile credentials and reach out within 24 hours on <span className="font-semibold text-amber-500">{form.email}</span>.
                  </p>

                  <div className={`p-4 rounded-sm border w-full max-w-sm mb-8 text-left text-xs space-y-2 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div className="font-semibold text-blue-950 dark:text-amber-500 uppercase tracking-wider mb-2">Next Steps for You:</div>
                    <div className="flex gap-2">
                      <span className="font-bold text-amber-500">1.</span>
                      <span>Review our **Process & Timeline** to understand APS wait times (typically 6-12 weeks).</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-amber-500">2.</span>
                      <span>Keep your Semester Marksheets and language test drafts ready for fast verification.</span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-sm font-bold text-xs tracking-widest uppercase border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}