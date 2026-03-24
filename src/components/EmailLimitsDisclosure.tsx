import React from 'react';
import { AlertTriangle, Clock, CheckCircle, X } from 'lucide-react';

interface EmailLimitsDisclosureProps {
  onAccept?: () => void;
  onCancel?: () => void;
}

export const EmailLimitsDisclosure: React.FC<EmailLimitsDisclosureProps> = ({ onAccept, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      
      {/* Content */}
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        {onCancel && (
          <button 
            onClick={onCancel}
            className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>
        )}
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-4">
            <AlertTriangle size={28} />
          </div>
          <h2 className="text-2xl font-serif italic font-bold tracking-tighter text-white mb-2">
            Important Email Limits
          </h2>
          <p className="text-neutral-400 text-sm">
            Please read before using AutoMailor
          </p>
        </div>

        {/* Gmail Limits Info */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Clock size={18} className="text-emerald-500" />
              Gmail Daily Sending Limits
            </h3>
            <div className="space-y-2 text-sm text-neutral-300">
              <div className="flex justify-between">
                <span>Free Gmail Account:</span>
                <span className="text-white font-medium">50 emails/day</span>
              </div>
              <div className="flex justify-between">
                <span>Google Workspace:</span>
                <span className="text-white font-medium">1,000 emails/day</span>
              </div>
              <div className="flex justify-between">
                <span>Hourly Rate Limit:</span>
                <span className="text-white font-medium">~10 emails/hour</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-2xl p-5">
            <h3 className="text-emerald-400 font-semibold mb-3">Recommended for Free Accounts</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Schedule 10 emails per hour</strong> to stay within limits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Maximum 50 emails per day</strong> recommended for free Gmail</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Avoid sending to unengaged recipients</strong> to prevent spam flags</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-600/10 border border-amber-600/20 rounded-2xl p-5">
            <h3 className="text-amber-400 font-semibold mb-2">Warning</h3>
            <p className="text-sm text-neutral-300">
              Exceeding Gmail's limits may result in your account being temporarily locked or marked as spam. 
              AutoMailor's free plan includes a 100 emails/day limit as an additional safeguard.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {onAccept && (
            <button 
              onClick={onAccept}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
            >
              I Understand - Continue
            </button>
          )}
          {onCancel && (
            <button 
              onClick={onCancel}
              className="w-full bg-white/5 border border-white/10 text-neutral-300 py-4 rounded-2xl font-medium hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailLimitsDisclosure;
