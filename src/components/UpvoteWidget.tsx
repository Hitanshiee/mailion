import { useEffect, useState } from 'react';

interface UpvoteWidgetProps {
  userId?: string;
  email?: string;
}

export default function UpvoteWidget({ userId, email }: UpvoteWidgetProps) {
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    // Force hard remount for cleanup when identity changes
    setRemountKey((k) => k + 1);

    // Proactive cleanup of existing floating elements
    const cleanup = (window as any).__upvote_cleanup;
    if (cleanup) cleanup();
  }, [userId, email]);

  return (
    <div key={remountKey}>
      <div
        className="upvote-widget"
        data-application-id="69be329a58344d4f3ca2c6ef"
        data-user-id={userId || ''}
        data-email={email || ''}
        data-position="right"
        data-theme="light"
        data-logo-url="/logo.svg"
        data-product-overview="AutoMailor - AI-Powered Email Automation"
        data-about-text="AutoMailor helps you automate your email campaigns with AI-powered responses"
        data-faqs='[{"question":"How do I create a campaign?","answer":"Go to Campaigns and click New Campaign to get started."},{"question":"How does AI reply work?","answer":"Our AI analyzes incoming emails and generates personalized responses automatically."},{"question":"Is there a free trial?","answer":"Yes, we offer a free tier to get started. Check Pricing for details."}]'
      ></div>
      <script src="https://upvote.entrext.com/widget.js" async />
    </div>
  );
}
