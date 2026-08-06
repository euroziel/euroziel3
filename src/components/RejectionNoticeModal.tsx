import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Send, Receipt, CheckCircle2, ShieldAlert, MessageSquare, RefreshCw } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, updateDoc, serverTimestamp, collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';

interface RejectionNoticeModalProps {
  theme?: 'light' | 'dark';
}

export default function RejectionNoticeModal({ theme = 'dark' }: RejectionNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rejectionData, setRejectionData] = useState<{
    docId: string;
    reason: string;
    oldTxnId: string;
    name: string;
    email: string;
  } | null>(null);

  const [newTxnId, setNewTxnId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkUserAndListen = () => {
      const savedUserStr = localStorage.getItem('euroziel_current_user') || localStorage.getItem('euroziel_user');
      if (!savedUserStr) return;

      let userObj: any = null;
      try {
        userObj = JSON.parse(savedUserStr);
      } catch (e) {
        return;
      }

      if (!userObj?.email) return;

      const emailToQuery = userObj.email.trim().toLowerCase();

      // Query pending_students collection for this user in Firestore
      const q = query(
        collection(db, 'pending_students'),
        where('email', '==', emailToQuery)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const docData = snapshot.docs[0].data();
            const docId = snapshot.docs[0].id;

            const isRejected =
              docData.status === 'rejected' ||
              docData.rejected === true ||
              docData.paymentStatus === 'rejected';

            if (isRejected) {
              const reasonText =
                docData.rejectionReason ||
                docData.reason ||
                docData.adminNotes ||
                'invalid transaction id';

              setRejectionData({
                docId,
                reason: reasonText,
                oldTxnId: docData.transactionId || '',
                name: docData.name || userObj.name || 'Student',
                email: emailToQuery,
              });
              setNewTxnId(docData.transactionId || '');
              localStorage.setItem('euroziel_is_rejected', 'true');
              localStorage.setItem('euroziel_rejection_reason', reasonText);
              setIsOpen(true);
            } else if (docData.status === 'verified' || docData.verified === true || docData.approved === true) {
              localStorage.setItem('euroziel_is_verified', 'true');
              localStorage.removeItem('euroziel_is_rejected');
              localStorage.removeItem('euroziel_rejection_reason');
              window.dispatchEvent(new Event('euroziel_payment_updated'));
              setIsOpen(false);
            } else {
              // Status is pending
              localStorage.setItem('euroziel_is_verified', 'false');
              localStorage.removeItem('euroziel_is_rejected');
              localStorage.removeItem('euroziel_rejection_reason');
              window.dispatchEvent(new Event('euroziel_payment_updated'));
              setIsOpen(false);
            }
          }
        },
        (err) => {
          console.warn('Firestore snapshot error:', err);
        }
      );

      return () => unsubscribe();
    };

    const handleForceOpen = () => {
      const savedUserStr = localStorage.getItem('euroziel_current_user') || localStorage.getItem('euroziel_user');
      let userObj: any = {};
      try { userObj = JSON.parse(savedUserStr || '{}'); } catch(e){}
      const reasonText = localStorage.getItem('euroziel_rejection_reason') || 'invalid transaction id';

      setRejectionData((prev) => prev || {
        docId: '',
        reason: reasonText,
        oldTxnId: '',
        name: userObj?.name || 'Student',
        email: userObj?.email || '',
      });
      setIsOpen(true);
    };

    const cleanup = checkUserAndListen();

    window.addEventListener('euroziel_payment_updated', checkUserAndListen);
    window.addEventListener('euroziel_open_rejection_modal', handleForceOpen);
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('euroziel_payment_updated', checkUserAndListen);
      window.removeEventListener('euroziel_open_rejection_modal', handleForceOpen);
    };
  }, []);

  const handleSubmitNewTxn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanTxnId = newTxnId.trim().replace(/\s+/g, '');
    const upiTxnRegex = /^(?:[0-9]{12}|[A-Za-z0-9\-]{8,24})$/;

    if (!cleanTxnId) {
      setError('Please enter your 12-digit UPI Transaction ID / UTR Number');
      return;
    }

    if (!upiTxnRegex.test(cleanTxnId)) {
      setError('Please enter a valid 12-digit numeric UTR (e.g. 423189076512 or UTR-98765432)');
      return;
    }

    setIsSubmitting(true);

    try {
      let targetDocId = rejectionData?.docId;
      const savedUserStr = localStorage.getItem('euroziel_current_user') || localStorage.getItem('euroziel_user');
      let userObj: any = {};
      try { userObj = JSON.parse(savedUserStr || '{}'); } catch(e){}
      const emailToQuery = (rejectionData?.email || userObj?.email || '').trim().toLowerCase();

      if (!targetDocId && emailToQuery) {
        const q = query(collection(db, 'pending_students'), where('email', '==', emailToQuery));
        const snap = await getDocs(q);
        if (!snap.empty) {
          targetDocId = snap.docs[0].id;
        }
      }

      if (!targetDocId) {
        setError('Unable to locate application record. Please try logging in again.');
        setIsSubmitting(false);
        return;
      }

      const docRef = doc(db, 'pending_students', targetDocId);
      await updateDoc(docRef, {
        transactionId: cleanTxnId,
        status: 'pending',
        paymentStatus: 'paid_pending_verification',
        rejected: false,
        rejectionReason: null,
        updatedAt: serverTimestamp(),
      });

      localStorage.removeItem('euroziel_is_rejected');
      localStorage.removeItem('euroziel_rejection_reason');
      localStorage.setItem('euroziel_has_paid', 'true');
      localStorage.setItem('euroziel_is_verified', 'false');
      window.dispatchEvent(new Event('euroziel_payment_updated'));

      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 2200);
    } catch (err: any) {
      console.error('Update failed:', err);
      setError(err?.message || 'Failed to update transaction ID. Please check your internet connection.');
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Euroziel Admin, my payment verification was marked as rejected (Reason: "${rejectionData?.reason}"). My email is ${rejectionData?.email}. Please help.`
  );

  return (
    <AnimatePresence>
      {isOpen && rejectionData && (
        <div id="rejection-notice-modal" className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', duration: 0.45, ease: 'easeOut' }}
            className={`relative w-full max-w-lg rounded-sm shadow-2xl overflow-hidden z-[10001] border flex flex-col border-b-4 border-b-red-500 my-auto ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header Red Warning Strip */}
            <div className="h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 w-full shrink-0 animate-pulse" />

            <div className="p-6">
              <button
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-[10002] cursor-pointer ${
                  theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
                aria-label="Close Notice"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <>
                  {/* Header Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 text-red-500 shadow-lg shadow-red-500/10">
                      <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-red-500/10 border border-red-500/30 text-red-400">
                        Action Required • Payment Rejected
                      </span>
                      <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white mt-1">
                        Verification Issue Flagged
                      </h3>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Hello <strong className="text-white">{rejectionData.name}</strong>, your ₹9 payment status was reviewed by the Euroziel admin team. The verification was flagged with the following feedback:
                  </p>

                  {/* Rejection Reason Card */}
                  <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/30 mb-5 relative overflow-hidden">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      ADMIN REJECTION REASON:
                    </div>
                    <div className="font-mono text-sm font-extrabold text-red-200 bg-red-950/70 p-2.5 rounded border border-red-500/20 uppercase tracking-wide">
                      "{rejectionData.reason}"
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-normal">
                      Please verify your payment transaction ID from Google Pay, PhonePe, or Paytm and update it below to restart verification.
                    </p>
                  </div>

                  {/* Transaction ID Resubmit Form */}
                  <form onSubmit={handleSubmitNewTxn} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-400 flex items-center justify-between">
                        <span>RE-ENTER 12-DIGIT UPI TRANSACTION ID / UTR *</span>
                        <span className="text-amber-400 text-[10px] font-normal">Check UPI App Receipt</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Receipt className="w-4 h-4 text-amber-500" />
                        </div>
                        <input
                          type="text"
                          value={newTxnId}
                          onChange={(e) => setNewTxnId(e.target.value)}
                          placeholder="e.g. 423189076512 or UTR-98765432"
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono tracking-wide cursor-text ${
                            error
                              ? 'border-red-500 bg-red-500/10 focus:ring-red-500/40'
                              : theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-100 focus:border-amber-500'
                              : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-amber-500'
                          }`}
                        />
                      </div>
                      {error ? (
                        <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {error}
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-500 mt-1">
                          Previous ID: <span className="font-mono text-slate-400">{rejectionData.oldTxnId}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-lg font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                            Updating Transaction ID...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 stroke-[2.5]" />
                            Update & Resubmit for Review
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/917598969875?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded-lg font-bold text-xs tracking-wider uppercase border border-slate-700 bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Help
                      </a>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-emerald-400 mb-2">
                    Transaction ID Updated!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mb-4 leading-relaxed">
                    Your updated Transaction ID (<strong className="font-mono text-amber-400">{newTxnId}</strong>) has been resubmitted. The Euroziel admin team will re-verify your details shortly.
                  </p>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest animate-pulse">
                    Status: Pending Admin Re-Verification
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
