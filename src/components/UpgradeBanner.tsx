import React from 'react';
import { Crown, X } from 'lucide-react';

interface UpgradeBannerProps {
  isPremium?: boolean;
  emailsSent?: number;
  freeLimit?: number;
  remaining?: number;
  loading?: boolean;
  onDismiss?: () => void;
}

export function UpgradeBanner({ isPremium = false, emailsSent = 0, freeLimit = 100, remaining = 100, loading = false, onDismiss }: UpgradeBannerProps) {
  if (loading || isPremium) return null;
  
  const percentUsed = (emailsSent / freeLimit) * 100;
  const isNearLimit = remaining <= 20;
  const isAtLimit = remaining <= 0;
  
  const goToPricing = () => {
    window.location.hash = '#/pricing';
  };
  
  return (
    <div className={`bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 sm:px-4 py-2 sm:py-3 ${isAtLimit ? 'animate-pulse' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <div>
            {isAtLimit ? (
              <p className="font-semibold text-sm sm:text-base">You've reached your free limit! Upgrade to continue sending.</p>
            ) : isNearLimit ? (
              <p className="font-semibold text-sm sm:text-base">Only {remaining} free emails remaining. Upgrade to premium!</p>
            ) : (
              <p className="font-semibold text-sm sm:text-base">Free Plan: {emailsSent}/{freeLimit} emails sent</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-20 sm:w-32 h-1.5 sm:h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${Math.min(percentUsed, 100)}%` }}
                />
              </div>
              {!isAtLimit && (
                <span className="text-xs opacity-90 hidden sm:inline">{remaining} left</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={goToPricing}
            className="bg-white text-amber-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Upgrade Now
          </button>
          {onDismiss && (
            <button onClick={onDismiss} className="p-1 hover:bg-white/20 rounded">
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Component to show when user can't send due to limits
export function PremiumFeatureLock({ feature }: { feature: string }) {
  const goToPricing = () => {
    window.location.hash = '#/pricing';
  };
  
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 sm:p-6 text-center">
      <Crown className="w-10 sm:w-12 h-10 sm:h-12 text-amber-500 mx-auto mb-3" />
      <h3 className="text-base sm:text-lg font-bold text-amber-800 mb-2">Premium Feature</h3>
      <p className="text-sm sm:text-base text-amber-700 mb-3 sm:mb-4">
        {feature} is available for Premium subscribers only.
      </p>
      <button
        onClick={goToPricing}
        className="bg-amber-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-sm sm:text-base"
      >
        Upgrade to Premium
      </button>
    </div>
  );
}
