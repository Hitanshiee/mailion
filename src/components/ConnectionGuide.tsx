import React, { useEffect } from 'react';
import { Shield, ArrowRight, AlertCircle, Globe, Lock, X, Mail, Server } from 'lucide-react';

interface ConnectionGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  connectionType?: 'gmail' | 'smtp';
}

export const ConnectionGuide: React.FC<ConnectionGuideProps> = ({ 
  isOpen, 
  onClose, 
  onProceed,
  connectionType = 'gmail'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isGmail = connectionType === 'gmail';

  const title = isGmail ? 'Connect Your Gmail Account' : 'Connect Your Business Email (SMTP)';
  const subtitle = isGmail 
    ? 'Follow these steps to grant access to AutoMailor'
    : 'Follow these steps to configure your SMTP settings';

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className={`relative h-32 bg-gradient-to-br ${isGmail ? 'from-emerald-500 via-emerald-600 to-teal-600' : 'from-blue-500 via-blue-600 to-indigo-600'} flex-shrink-0`}>
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              {isGmail ? (
                <Shield className="w-12 h-12 text-emerald-600" />
              ) : (
                <Server className="w-12 h-12 text-blue-600" />
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-16 pb-6 px-4 sm:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">{title}</h2>
            <p className="text-sm sm:text-base text-neutral-600">{subtitle}</p>
          </div>
          
          {isGmail ? (
            // Gmail/OAuth Instructions
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">1</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Google Security Warning Appears</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">This warning appears for your safety. It is a standard security check by Google.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">2</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Click "Advanced"</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Look for the "Advanced" link at the bottom left of the warning screen.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">3</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Click "Go to mailflow (unsafe)"</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Click this link to proceed. It is safe - your data is still protected.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">4</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Select All Permissions</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Make sure to check "Select all" to grant AutoMailor full access to your Gmail account.</p>
                </div>
              </div>
            </div>
          ) : (
            // SMTP Instructions
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">1</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Get SMTP Credentials</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Log in to your email provider (Zoho, Outlook, etc.) and find SMTP settings. You'll need: Host, Port, Username, and Password.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">2</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Enter SMTP Details</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Fill in the SMTP form with your provider's settings. Common ports: 587 (TLS) or 465 (SSL).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">3</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Test Connection</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Click "Test Connection" to verify your settings. We'll send a test email to confirm everything works.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">4</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Save & Start Sending</h3>
                  <p className="text-xs sm:text-sm text-neutral-600">Once connected, you can start sending emails from your custom business email address.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-3 p-3 sm:p-4 bg-neutral-100 rounded-xl mb-6 sm:mb-8">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-600">
              <p className="font-medium text-neutral-900 mb-1">
                {isGmail ? 'Why do I need to do this?' : 'Why use SMTP?'}
              </p>
              <p>
                {isGmail 
                  ? 'This one-time step grants AutoMailor permission to send emails on your behalf and track replies automatically.'
                  : 'SMTP lets you use your own business email (like you@company.com) instead of Gmail. Great for professional outreach.'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6 text-xs sm:text-sm text-neutral-500">
            <div className="flex items-center gap-1 sm:gap-2"><Lock className="w-3 h-3 sm:w-4 sm:h-4" /><span>256-bit Encryption</span></div>
            <div className="flex items-center gap-1 sm:gap-2"><Globe className="w-3 h-3 sm:w-4 sm:h-4" /><span>GDPR Compliant</span></div>
            <div className="flex items-center gap-1 sm:gap-2"><Shield className="w-3 h-3 sm:w-4 sm:h-4" /><span>Secure OAuth</span></div>
          </div>
        </div>
        <div className="flex-shrink-0 p-4 sm:px-8 sm:pb-8 bg-white border-t border-neutral-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onClose} className="w-full sm:flex-1 px-6 py-3 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50">Cancel</button>
            <button onClick={onProceed} className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-neutral-400 mt-4">By connecting, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionGuide;
