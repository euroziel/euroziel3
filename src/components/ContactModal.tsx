import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, Lock, Eye, EyeOff, LogIn, QrCode, ArrowLeft, ShieldCheck, Copy, Check, Receipt } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Backup Endpoint
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
  password: string;
  course: string;
  budget: string;
  timeline: string;
  message: string;
  transactionId: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  course?: string;
  budget?: string;
  transactionId?: string;
}

type ModalStep = 'form' | 'payment' | 'success';

export default function ContactModal({ isOpen, onClose, theme = 'light' }: ContactModalProps) {
  const [step, setStep] = useState<ModalStep>('form');
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    return localStorage.getItem('euroziel_is_verified') === 'true';
  });

  React.useEffect(() => {
    const checkStatus = () => {
      setIsVerified(localStorage.getItem('euroziel_is_verified') === 'true');
    };
    window.addEventListener('storage', checkStatus);
    window.addEventListener('euroziel_payment_updated', checkStatus);
    return () => {
      window.removeEventListener('storage', checkStatus);
      window.removeEventListener('euroziel_payment_updated', checkStatus);
    };
  }, []);

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    password: '',
    course: '',
    budget: '',
    timeline: 'Winter 2026 (Oct Start)',
    message: '',
    transactionId: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('sarathkumar1.2001-1@oksbi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateFormStep = (): boolean => {
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

    if (!form.password) {
      newErrors.password = 'Password is required for student account setup';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!form.course) {
      newErrors.course = 'Please select your desired course field';
    }

    if (!form.budget) {
      newErrors.budget = 'Please select your estimated budget layout';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    const cleanTxnId = form.transactionId.trim().replace(/\s+/g, '');
    
    // Regex for Indian UPI Transaction ID / UTR Number:
    // Matches 12-digit numeric UTR (e.g. 423189076512) or 8-24 character alphanumeric UTR/Ref (e.g. UTR-987654321012, T240803123456)
    const upiTxnRegex = /^(?:[0-9]{12}|[A-Za-z0-9\-]{8,24})$/;

    if (!cleanTxnId) {
      newErrors.transactionId = 'UPI Transaction ID / UTR number is required';
    } else if (!upiTxnRegex.test(cleanTxnId)) {
      newErrors.transactionId = 'Please enter a valid 12-digit UTR or Transaction ID (e.g. 423189076512 or UTR-98765432)';
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

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFormStep()) {
      setStep('payment');
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePaymentStep()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // ONLY AFTER paying ₹9 and submitting Transaction ID, save to Firebase Firestore
      await addDoc(collection(db, 'pending_students'), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
        course: form.course,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message.trim(),
        transactionId: form.transactionId.trim(),
        amountPaid: 9,
        paymentStatus: 'paid_pending_verification',
        status: 'pending',
        verified: false,
        approved: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Backup post to Apps Script / LocalStorage
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, amountPaid: 9, formType: 'modal_registration_paid', status: 'pending' }),
        });
      } catch (err) {
        console.warn('Backup fetch warning:', err);
      }

      // Persist user account and active login session
      const userAccount = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };
      localStorage.setItem('euroziel_user', JSON.stringify(userAccount));
      localStorage.setItem('euroziel_current_user', JSON.stringify(userAccount));
      localStorage.setItem('euroziel_has_paid', 'true');
      localStorage.setItem('euroziel_is_verified', 'false');
      window.dispatchEvent(new Event('euroziel_payment_updated'));

      setIsSubmitting(false);
      setStep('success');
    } catch (error: any) {
      console.error('Firebase Submission failed:', error);
      setSubmitError(error?.message || 'Unable to submit application right now. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      password: '',
      course: '',
      budget: '',
      timeline: 'Winter 2026 (Oct Start)',
      message: '',
      transactionId: '',
    });
    setStep('form');
    setShowPassword(false);
    setErrors({});
    setSubmitError(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      resetForm();
    }, 200); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.4, ease: 'easeOut' }}
            id="contact-modal"
            className={`relative w-full ${step === 'payment' ? 'max-w-4xl' : 'max-w-2xl'} rounded-sm shadow-2xl overflow-hidden z-[10000] border flex flex-col border-b-4 border-b-amber-500 my-auto transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header banner decoration */}
            <div className="h-1.5 bg-blue-900 w-full shrink-0" />

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[85vh] flex-1">
              <button
                onClick={handleClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-[10001] cursor-pointer ${
                  theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* STEP 1: Registration Form */}
              {step === 'form' && (
                <>
                  <div className="mb-6 pr-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.15em] uppercase mb-2 bg-amber-500/5 border border-amber-500/35 text-amber-500">
                      <Sparkles className="w-3.5 h-3.5" /> Student Profile Audit
                    </span>
                    <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                      Start Your <span className="font-serif italic font-medium text-blue-950 dark:text-amber-500">Germany</span> Profile Audit
                    </h3>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Get custom counseling, course shortlisting, and direct evaluation from experts already working & studying in Germany.
                    </p>
                  </div>

                  <form onSubmit={handleProceedToPayment} className="space-y-4">
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

                      {/* Password Field */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-500" /> Account Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Set account password"
                            className={`w-full px-4 py-2.5 pr-10 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                              errors.password
                                ? 'border-red-500 bg-red-500/5'
                                : theme === 'dark'
                                ? 'border-slate-800 bg-slate-950 focus:border-blue-900'
                                : 'border-slate-200 bg-slate-50 focus:border-blue-900'
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
                        {errors.password && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.password}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Target Course Fields */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Target Course Domain *
                        </label>
                        <select
                          name="course"
                          value={form.course}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 rounded-sm border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            errors.course
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-900'
                              : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-900'
                          }`}
                        >
                          <option value="" className="dark:bg-slate-900">Select Domain Path</option>
                          <option value="Computer Science / IT" className="dark:bg-slate-900">Computer Science / IT Engineering</option>
                          <option value="Mechanical / Automotive" className="dark:bg-slate-900">Mechanical / Automotive Track</option>
                          <option value="Electrical / Mechatronics" className="dark:bg-slate-900">Electrical / Robotics / Mechatronics</option>
                          <option value="Business / Management" className="dark:bg-slate-900">Business Management / MBA</option>
                          <option value="Other Sciences" className="dark:bg-slate-900">Other Fields / Advanced Research</option>
                        </select>
                        {errors.course && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> Domain target required
                          </p>
                        )}
                      </div>

                      {/* Budget Matrix */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Estimated Blocked Account / Tuition Budget *
                        </label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 rounded-sm border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            errors.budget
                              ? 'border-red-500 bg-red-500/5'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-900'
                              : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-900'
                          }`}
                        >
                          <option value="" className="dark:bg-slate-900">Select Budget Frame</option>
                          <option value="Only Blocked Account (~11.9k EUR)" className="dark:bg-slate-900">Only Blocked Account (~12k EUR)</option>
                          <option value="Blocked Account + Low Fees (<5k EUR/yr)" className="dark:bg-slate-900">Blocked + Low Fees (&lt; 5k EUR/yr)</option>
                          <option value="Flexible / Higher Private Fees" className="dark:bg-slate-900">Flexible / Private University Plan</option>
                        </select>
                        {errors.budget && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> Budget metrics required
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timeline & Message */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Intake Timeline
                        </label>
                        <select
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 rounded-sm border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-900'
                              : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-900'
                          }`}
                        >
                          <option value="Winter 2026 (Oct Start)" className="dark:bg-slate-900">Winter 2026 (Oct Start)</option>
                          <option value="Summer 2027 (Apr Start)" className="dark:bg-slate-900">Summer 2027 (Apr Start)</option>
                          <option value="Winter 2027 Target" className="dark:bg-slate-900">Winter 2027</option>
                          <option value="Flexible / Undecided" className="dark:bg-slate-900">Flexible / Undecided</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                          Profile Context / Questions
                        </label>
                        <input
                          type="text"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="e.g. 1.5 yrs IT exp, CGPA 8.2..."
                          className={`w-full px-4 py-2.5 rounded-sm border text-sm transition-all focus:outline-none focus:ring-1 focus:ring-blue-900 ${
                            theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 focus:border-blue-500'
                              : 'border-slate-200 bg-slate-50 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Security Footnote */}
                    <p className={`text-[10px] text-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                      Security Guarantee: Your details are encrypted. We strictly do not share your contact info with third parties.
                    </p>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full relative py-3.5 rounded-sm font-bold text-xs tracking-widest uppercase overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-[0.98] bg-blue-950 hover:bg-opacity-95 text-white flex items-center justify-center gap-2 border-b-2 border-amber-500"
                      >
                        <QrCode className="w-4 h-4 text-amber-500" />
                        Proceed to Pay ₹9 & Verify
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2: UPI QR Code & Transaction ID Side-by-Side */}
              {step === 'payment' && (
                <div className="py-1">
                  <button
                    onClick={() => setStep('form')}
                    className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-medium mb-4 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Profile Details
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* LEFT COLUMN: Enlarged QR Code & UPI Details (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      <div className={`p-4 rounded-2xl border flex flex-col items-center w-full shadow-2xl relative overflow-hidden ring-1 ring-amber-500/20 ${
                        theme === 'dark'
                          ? 'bg-slate-950/95 border-slate-800 shadow-amber-500/5'
                          : 'bg-slate-50 border-slate-200/80 shadow-slate-300'
                      }`}>
                        {/* Ambient top glow */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                        {/* Bigger & Better QR Code Image Container */}
                        <div className="w-full p-2 bg-white rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 mb-3 transition-transform hover:scale-[1.01] duration-300">
                          <img 
                            src="/assets/upi-qr.png" 
                            alt="SARATHKUMAR V UPI QR Code" 
                            className="w-full h-auto rounded-lg object-contain shadow-inner"
                          />
                        </div>

                        {/* Accepted UPI Apps badges */}
                        <div className="flex items-center justify-center gap-1.5 mb-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">GPay</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">PhonePe</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">Paytm</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">BHIM</span>
                        </div>

                        {/* Interactive UPI ID Bar with Copy Button */}
                        <div className="w-full bg-slate-900/90 border border-slate-800/90 rounded-xl p-2.5 flex items-center justify-between gap-2 mb-2">
                          <div className="text-left overflow-hidden">
                            <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Official UPI ID</div>
                            <div className="font-mono text-[11px] text-amber-400 font-bold truncate select-all">
                              sarathkumar1.2001-1@oksbi
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0 active:scale-95 shadow-sm"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between w-full text-[11px] px-1 text-slate-400">
                          <span>Verification Fee:</span>
                          <span className="font-bold text-emerald-400 text-xs">₹9.00 INR</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Step Header & Form Submission (7 cols) */}
                    <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-center">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5" /> Instant UPI Payment (₹9)
                        </span>
                        <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">
                          Scan QR Code to Pay <span className="text-amber-500">₹9</span>
                        </h3>
                        <p className={`text-xs mt-1.5 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Scan using Google Pay, PhonePe, Paytm, BHIM, or any UPI app. Enter your Transaction ID / UTR below to confirm registration.
                        </p>
                      </div>

                      {/* Quick Instructions list */}
                      <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                        theme === 'dark' ? 'bg-slate-950/60 border-slate-800/60 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="font-semibold text-amber-500 text-[11px] uppercase tracking-wider">Quick Steps:</div>
                        <div className="flex gap-2 text-[11px]">
                          <span className="text-amber-400 font-bold">1.</span> Scan QR code on the left or copy the UPI ID.
                        </div>
                        <div className="flex gap-2 text-[11px]">
                          <span className="text-amber-400 font-bold">2.</span> Complete payment of ₹9 on your UPI app.
                        </div>
                        <div className="flex gap-2 text-[11px]">
                          <span className="text-amber-400 font-bold">3.</span> Paste the 12-digit UTR / Transaction ID below.
                        </div>
                      </div>

                      {/* Transaction ID Form */}
                      <form onSubmit={handleFinalSubmit} className="space-y-4 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400 flex items-center justify-between">
                            <span>ENTER UPI TRANSACTION ID / UTR NUMBER *</span>
                            <span className="text-slate-500 normal-case font-normal text-[10px]">(12 digits)</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                              <Receipt className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              name="transactionId"
                              value={form.transactionId}
                              onChange={handleChange}
                              placeholder="e.g. 423189076512 or UTR-98765432"
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono tracking-wide ${
                                errors.transactionId
                                  ? 'border-red-500 bg-red-500/5 focus:ring-red-500/40'
                                  : theme === 'dark'
                                  ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-amber-500'
                                  : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-amber-500'
                              }`}
                            />
                          </div>
                          {errors.transactionId ? (
                            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5 font-medium">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.transactionId}
                            </p>
                          ) : (
                            <p className="text-[10px] text-slate-500 mt-1 pl-0.5">
                              Check Google Pay / PhonePe transaction details screen for 12-digit UPI Ref No.
                            </p>
                          )}
                        </div>

                        {submitError && (
                          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{submitError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-lg font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] disabled:opacity-75"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                              Verifying Transaction ID...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 stroke-[2.5]" />
                              Submit Transaction ID & Confirm
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Confirmation Screen */}
              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-5 border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-3xl font-extrabold font-sans mb-2 text-emerald-500">
                    Application Submitted!
                  </h3>
                  <p className={`max-w-md text-sm mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Thank you, <span className="font-bold text-white">{form.name}</span>. Your application data has been stored. The Euroziel admin team will review and verify your details shortly.
                  </p>

                  {/* Verification Workflow Card */}
                  <div className={`p-4 rounded-md border w-full max-w-md mb-8 text-left text-xs space-y-2.5 ${
                    theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div className="font-bold text-amber-500 uppercase tracking-wider mb-2">VERIFICATION WORKFLOW:</div>
                    <div className="flex gap-2 leading-relaxed">
                      <span className="font-bold text-amber-500">1.</span>
                      <span>Your application is currently marked as <strong className="text-amber-400">Pending Review</strong>.</span>
                    </div>
                    <div className="flex gap-2 leading-relaxed">
                      <span className="font-bold text-amber-500">2.</span>
                      <span>Once approved by the Admin, you will receive login access to the official Student Dashboard.</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                    {isVerified ? (
                      <a
                        href="https://dashboard.euroziel.com"
                        className="px-6 py-3 rounded-sm font-bold text-xs tracking-widest uppercase bg-navy text-white hover:bg-opacity-90 transition-all text-center flex items-center justify-center gap-2 border-b-2 border-gold shadow-md"
                      >
                        <LogIn className="w-4 h-4 text-gold" />
                        Go to Dashboard
                      </a>
                    ) : (
                      <div className="relative group flex-1">
                        <button
                          disabled
                          className="w-full px-6 py-3 rounded-sm font-bold text-xs tracking-widest uppercase bg-slate-800/80 border border-slate-700 text-slate-400 opacity-70 cursor-not-allowed text-center flex items-center justify-center gap-2 shadow-inner"
                          title="Wait till the admin verifies your ₹9 payment"
                        >
                          <LogIn className="w-4 h-4 text-amber-400 opacity-60" />
                          Go to Dashboard
                        </button>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-amber-400 text-[10px] py-1 px-3 rounded border border-amber-500/30 whitespace-nowrap pointer-events-none z-50 shadow-xl">
                          ⏳ Wait till the admin verifies your ₹9 payment
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 rounded-sm font-bold text-xs tracking-widest uppercase border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer text-center"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
