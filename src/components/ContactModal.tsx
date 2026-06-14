import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  gpa: string;
  qualification: string;
  germanLevel: string;
  preferredIntake: string;
  message: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gpa?: string;
  qualification?: string;
  germanLevel?: string;
}

export default function ContactModal({ isOpen, onClose, theme = 'light' }: ContactModalProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    gpa: '',
    qualification: '',
    germanLevel: 'none',
    preferredIntake: 'winter_2026',
    message: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long';
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

    if (form.gpa.trim()) {
      const gpaNum = parseFloat(form.gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 100) {
        newErrors.gpa = 'GPA/Percentage must be between 0 and 100, or a CGPA out of 10';
      }
    }

    if (!form.qualification) {
      newErrors.qualification = 'Please select your current qualification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error instantly if typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API storage / loading
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save submission locally for "Your Submissions" panel or state tracking
    const submissions = JSON.parse(localStorage.getItem('euroziel_leads') || '[]');
    submissions.push({ ...form, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('euroziel_leads', JSON.stringify(submissions));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      gpa: '',
      qualification: '',
      germanLevel: 'none',
      preferredIntake: 'winter_2026',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            id="contact-modal"
            className={`relative w-full max-w-2xl rounded-sm shadow-premium overflow-hidden z-10 border max-h-[90vh] flex flex-col border-b-4 border-b-gold ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header banner decoration */}
            <div className="h-1.5 bg-navy" />

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <button
                onClick={handleClose}
                className={`absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.15em] uppercase mb-2 bg-gold/5 border border-gold/35 text-gold">
                      <Sparkles className="w-3.5 h-3.5" /> Direct Access Setup
                    </span>
                    <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                      Start Your <span className="font-serif italic font-medium text-navy dark:text-gold">Germany</span> Profile Audit
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
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Yuvasri Jagadeesan"
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            errors.fullName
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 focus:border-navy'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName}
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
                          placeholder="you@domain.com"
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            errors.email
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 focus:border-navy'
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
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            errors.phone
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 focus:border-navy'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* GPA/Percentage */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          GPA / percentage (e.g. 8.5 CGPA or 78%)
                        </label>
                        <input
                          type="text"
                          name="gpa"
                          value={form.gpa}
                          onChange={handleChange}
                          placeholder="e.g. 7.8 or 82%"
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            errors.gpa
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 focus:border-navy'
                          }`}
                        />
                        {errors.gpa && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.gpa}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Qualification */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Current Degree *
                        </label>
                        <select
                          name="qualification"
                          value={form.qualification}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 rounded-sm border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            errors.qualification
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 text-slate-900 focus:border-navy'
                          }`}
                        >
                          <option value="">Select Qualification</option>
                          <option value="class-12">Class 12 / High School</option>
                          <option value="bachelor-ongoing">Bachelor's (Ongoing)</option>
                          <option value="bachelor-completed">Bachelor's (Completed)</option>
                          <option value="master-ongoing">Master's (Ongoing)</option>
                          <option value="other">Other / Diploma</option>
                        </select>
                        {errors.qualification && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> Input required
                          </p>
                        )}
                      </div>

                      {/* German Language Level */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          German Level
                        </label>
                        <select
                          name="germanLevel"
                          value={form.germanLevel}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 rounded-sm border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 text-slate-900 focus:border-navy'
                          }`}
                        >
                          <option value="none">Beginner / No Knowledge</option>
                          <option value="a1">A1 Level</option>
                          <option value="a2">A2 Level</option>
                          <option value="b1">B1 Level</option>
                          <option value="b2">B2 Level or higher</option>
                        </select>
                      </div>

                      {/* Preferred Intake */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Intake Goal
                        </label>
                        <select
                          name="preferredIntake"
                          value={form.preferredIntake}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 rounded-sm border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-navy ${
                            theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-navy'
                              : 'border-slate-205 bg-slate-50 text-slate-900 focus:border-navy'
                          }`}
                        >
                          <option value="winter_2026">Winter 2026 (Oct Start)</option>
                          <option value="summer_2027">Summer 2027 (Apr Start)</option>
                          <option value="winter_2027">Winter 2027</option>
                          <option value="undecided">Flexible / Undecided</option>
                        </select>
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
                        placeholder="e.g. I have 1.5 years work experience in IT, interested in TU Berlin or RWTH Aachen..."
                        className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-navy resize-none ${
                          theme === 'dark'
                            ? 'border-slate-800 bg-slate-950 focus:border-[#1b73ba]'
                            : 'border-slate-205 bg-slate-50 focus:border-[#1b73ba]'
                        }`}
                      />
                    </div>

                    {/* Footnote */}
                    <p className={`text-[10px] text-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Security Guarantee: Your details are encrypted. We strictly do not share your contact info with third parties.
                    </p>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative py-3.5 rounded-sm font-bold text-xs tracking-widest uppercase overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-[0.98] bg-navy hover:bg-opacity-95 text-white shadow-premium border-b-2 border-gold disabled:opacity-75 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing Profile...
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
                  className="flex flex-col items-center justify-center text-center py-10"
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
                    Thank you, <span className="font-bold text-slate-100">{form.fullName}</span>. An expert from our Hamburg peer network will review your profile credentials and reach out within 24 hours on <span className="font-semibold text-gold">{form.email}</span>.
                  </p>

                  <div className={`p-4 rounded-sm border w-full max-w-sm mb-8 text-left text-xs space-y-2 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-550 border-slate-200'
                  }`}>
                    <div className="font-semibold text-navy dark:text-gold uppercase tracking-wider mb-2">Next Steps for You:</div>
                    <div className="flex gap-2">
                      <span className="font-bold text-gold">1.</span>
                      <span>Review our **Process & Timeline** to understand APS wait times (typically 6-12 weeks).</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-gold">2.</span>
                      <span>Keep your Semester Marksheets and language test drafts ready for fast verification.</span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-sm font-bold text-xs tracking-widest uppercase border border-slate-200 dark:border-slate-800 bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
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
