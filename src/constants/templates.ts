export interface Template {
  id: string;
  userId: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  isPublic?: boolean;
  createdAt?: any;
}

export const SYSTEM_TEMPLATES: Template[] = [
  // --- SEQUENCE 1: SaaS/Product Pitch ---
  {
    id: 's1-1', userId: 'system', category: 'Sales', name: 'SaaS: Initial Outreach',
    subject: 'Quick question about {{company}}\'s workflow',
    body: "Hi {{firstName}},\n\nI've been following {{company}} and noticed you're scaling your team. We help companies like yours automate their outreach and increase reply rates by 40%.\n\nDo you have 10 minutes next Tuesday to chat?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's1-2', userId: 'system', category: 'Follow-up', name: 'SaaS: Follow-up 1 (The Bump)',
    subject: 'Re: Quick question about {{company}}\'s workflow',
    body: "Hi {{firstName}},\n\nBumping this to the top of your inbox in case it got buried. \n\nI'd love to show you how we can help {{company}} save 10+ hours a week on outreach.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's1-3', userId: 'system', category: 'Follow-up', name: 'SaaS: Follow-up 2 (Value Add)',
    subject: 'Thought you might find this interesting',
    body: "Hi {{firstName}},\n\nI saw this case study on how a similar company in {{industry}} doubled their pipeline using AI outreach. Thought it might be relevant to what you're building at {{company}}.\n\nLink: [Case Study Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 's1-4', userId: 'system', category: 'Follow-up', name: 'SaaS: Follow-up 3 (The Idea)',
    subject: 'Idea for {{company}}\'s growth',
    body: "Hi {{firstName}},\n\nI have a specific idea on how {{company}} could leverage our new AI personalization feature to reach more leads without increasing headcount.\n\nWorth a quick 5-minute call?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's1-5', userId: 'system', category: 'Follow-up', name: 'SaaS: Follow-up 4 (The Breakup)',
    subject: 'Permission to close your file?',
    body: "Hi {{firstName}},\n\nI haven't heard back from you, so I assume outreach automation isn't a priority for {{company}} right now. I'll close your file for now.\n\nFeel free to reach out if things change.\n\nBest,\n{{senderName}}"
  },

  // --- SEQUENCE 2: Agency/Service Pitch ---
  {
    id: 's2-1', userId: 'system', category: 'Sales', name: 'Agency: Initial Outreach',
    subject: 'Helping {{company}} with {{service}}',
    body: "Hi {{firstName}},\n\nI love what you're doing at {{company}}. We specialize in {{service}} for companies in the {{industry}} space.\n\nWe recently helped a client achieve [Result]. Would you be open to a quick chat about how we could do the same for you?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's2-2', userId: 'system', category: 'Follow-up', name: 'Agency: Follow-up 1 (The Bump)',
    subject: 'Re: Helping {{company}} with {{service}}',
    body: "Hi {{firstName}},\n\nJust wanted to follow up on my previous email. I know you're busy, but I'd love to connect and see if we can help {{company}} scale.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's2-3', userId: 'system', category: 'Follow-up', name: 'Agency: Follow-up 2 (Social Proof)',
    subject: 'How we helped {{competitor}}',
    body: "Hi {{firstName}},\n\nWe recently worked with {{competitor}} to improve their {{service}} results. They saw a [Percentage]% increase in [Metric] within 3 months.\n\nI'd love to share our process with you.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's2-4', userId: 'system', category: 'Follow-up', name: 'Agency: Follow-up 3 (Free Audit)',
    subject: 'Free {{service}} audit for {{company}}',
    body: "Hi {{firstName}},\n\nI took a quick look at your current {{service}} setup and have a few ideas on how to improve it. I'd be happy to share a free audit with you.\n\nAre you interested?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's2-5', userId: 'system', category: 'Follow-up', name: 'Agency: Follow-up 4 (The Breakup)',
    subject: 'Moving on for now',
    body: "Hi {{firstName}},\n\nI haven't heard back, so I'll stop reaching out for now. I'll keep an eye on {{company}}'s progress and wish you all the best.\n\nBest,\n{{senderName}}"
  },

  // --- SEQUENCE 3: Networking/Partnership ---
  {
    id: 's3-1', userId: 'system', category: 'Networking', name: 'Partnership: Initial Outreach',
    subject: 'Potential partnership between {{company}} and [My Company]',
    body: "Hi {{firstName}},\n\nI've been following {{company}} and I'm impressed with your work in {{industry}}. I think there's a great opportunity for us to collaborate.\n\nDo you have time for a brief intro call?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's3-2', userId: 'system', category: 'Follow-up', name: 'Partnership: Follow-up 1 (The Bump)',
    subject: 'Re: Potential partnership',
    body: "Hi {{firstName}},\n\nJust checking in to see if you received my previous email about a potential partnership. I'd love to hear your thoughts.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's3-3', userId: 'system', category: 'Follow-up', name: 'Partnership: Follow-up 2 (Specific Idea)',
    subject: 'A specific idea for our collaboration',
    body: "Hi {{firstName}},\n\nI was thinking about how our two companies could work together on [Specific Project/Idea]. I think it could be a win-win for both of us.\n\nWhat do you think?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's3-4', userId: 'system', category: 'Follow-up', name: 'Partnership: Follow-up 3 (Mutual Benefit)',
    subject: 'How this partnership benefits {{company}}',
    body: "Hi {{firstName}},\n\nI wanted to highlight a few ways this partnership could specifically benefit {{company}}, including [Benefit 1] and [Benefit 2].\n\nWould you be open to a 10-minute chat?\n\nBest,\n{{senderName}}"
  },
  {
    id: 's3-5', userId: 'system', category: 'Follow-up', name: 'Partnership: Follow-up 4 (The Breakup)',
    subject: 'Staying in touch',
    body: "Hi {{firstName}},\n\nI'll stop reaching out about a partnership for now, but I'd love to stay in touch. Feel free to reach out if you ever want to connect.\n\nBest,\n{{senderName}}"
  },

  // --- SEQUENCE 4: Content/Webinar Promotion ---
  {
    id: 's4-1', userId: 'system', category: 'Marketing', name: 'Webinar: Initial Invite',
    subject: 'Invite: How to scale your outreach with AI',
    body: "Hi {{firstName}},\n\nWe're hosting a live webinar next Thursday on how to use AI to scale your outreach without losing the personal touch.\n\nRegister here: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 's4-2', userId: 'system', category: 'Follow-up', name: 'Webinar: Follow-up 1 (Reminder)',
    subject: 'Don\'t miss our AI outreach webinar',
    body: "Hi {{firstName}},\n\nJust a quick reminder about our webinar next week. We'll be sharing some exclusive tips and tricks.\n\nSave your spot: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 's4-3', userId: 'system', category: 'Follow-up', name: 'Webinar: Follow-up 2 (Speaker Highlight)',
    subject: 'Meet our guest speaker for the webinar',
    body: "Hi {{firstName}},\n\nWe're excited to have [Speaker Name] joining us for our webinar. They'll be sharing their experience with [Topic].\n\nRegister here: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 's4-4', userId: 'system', category: 'Follow-up', name: 'Webinar: Follow-up 3 (Last Chance)',
    subject: 'Last chance to register for our webinar',
    body: "Hi {{firstName}},\n\nOur webinar is tomorrow! This is your last chance to register and join the conversation.\n\nRegister now: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 's4-5', userId: 'system', category: 'Follow-up', name: 'Webinar: Follow-up 4 (Recording)',
    subject: 'In case you missed it: Webinar Recording',
    body: "Hi {{firstName}},\n\nSorry you couldn't make it to our webinar. Here's the recording so you can watch it at your convenience.\n\nWatch Recording: [Link]\n\nBest,\n{{senderName}}"
  },

  // --- SEQUENCE 5: Job/Career Outreach ---
  {
    id: 's5-1', userId: 'system', category: 'Work', name: 'Job: Initial Outreach',
    subject: 'Interested in the {{position}} role at {{company}}',
    body: "Hi {{firstName}},\n\nI'm writing to express my strong interest in the {{position}} role at {{company}}. I've been following your work and I'm impressed with [Specific Project/Achievement].\n\nI've attached my resume for your review.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's5-2', userId: 'system', category: 'Follow-up', name: 'Job: Follow-up 1 (The Bump)',
    subject: 'Re: Interested in the {{position}} role',
    body: "Hi {{firstName}},\n\nJust wanted to follow up on my application for the {{position}} role. I'm still very interested and would love to chat.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's5-3', userId: 'system', category: 'Follow-up', name: 'Job: Follow-up 2 (Portfolio Highlight)',
    subject: 'A few examples of my work relevant to {{company}}',
    body: "Hi {{firstName}},\n\nI wanted to share a few specific examples of my work that I think are particularly relevant to the challenges you're facing at {{company}}.\n\nPortfolio: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 's5-4', userId: 'system', category: 'Follow-up', name: 'Job: Follow-up 3 (Reference)',
    subject: 'A quick note from a former colleague',
    body: "Hi {{firstName}},\n\nI've attached a brief recommendation from a former colleague that speaks to my experience with [Skill]. I hope this is helpful.\n\nBest,\n{{senderName}}"
  },
  {
    id: 's5-5', userId: 'system', category: 'Follow-up', name: 'Job: Follow-up 4 (The Breakup)',
    subject: 'Thank you for your time',
    body: "Hi {{firstName}},\n\nI haven't heard back, so I'll assume you've moved forward with other candidates. Thank you for your time and consideration.\n\nBest,\n{{senderName}}"
  },

  // --- NEWSLETTER (5) ---
  {
    id: 'n1', userId: 'system', category: 'Newsletter', name: 'Weekly Insights',
    subject: 'Weekly Insights: The State of AI Outreach',
    body: "Hi {{firstName}},\n\nHere's your weekly roundup of the best outreach strategies and AI news.\n\n1. [Article 1 Title]\n2. [Article 2 Title]\n3. [Article 3 Title]\n\nRead more: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 'n2', userId: 'system', category: 'Newsletter', name: 'Product Update',
    subject: 'Everything you missed in {{month}}',
    body: "Hi {{firstName}},\n\nIt's been a busy month at AutoMailor. Here are the highlights and top content from our community.\n\n[Summary of events]\n\nCheck it out: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 'n3', userId: 'system', category: 'Newsletter', name: 'Curated Tools',
    subject: '5 Tools to boost your productivity',
    body: "Hi {{firstName}},\n\nThis week we're sharing our favorite tools for staying productive while scaling your business.\n\n[Tool 1]\n[Tool 2]\n[Tool 3]\n\nFull list: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 'n4', userId: 'system', category: 'Newsletter', name: 'Industry Trends',
    subject: 'The future of B2B sales is here',
    body: "Hi {{firstName}},\n\nA new report just dropped on the impact of AI in sales. Here's what you need to know.\n\n[Key takeaway 1]\n[Key takeaway 2]\n\nRead the full report: [Link]\n\nBest,\n{{senderName}}"
  },
  {
    id: 'n5', userId: 'system', category: 'Newsletter', name: 'Community Spotlight',
    subject: 'Meet the founder: {{name}}',
    body: "Hi {{firstName}},\n\nThis week we're highlighting {{name}}, who used AutoMailor to build a $1M agency.\n\nRead the interview: [Link]\n\nBest,\n{{senderName}}"
  },

  // --- TRANSACTIONAL (5) ---
  {
    id: 't1', userId: 'system', category: 'Transactional', name: 'Verification Code',
    subject: 'Your Verification Code: {{code}}',
    body: "Hi {{firstName}},\n\nYour verification code for AutoMailor is: {{code}}\n\nThis code will expire in 10 minutes.\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 't2', userId: 'system', category: 'Transactional', name: 'Invoice Receipt',
    subject: 'Invoice for your AutoMailor Subscription',
    body: "Hi {{firstName}},\n\nThank you for your payment. Your invoice for the period of {{period}} is now available.\n\nDownload Invoice: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 't3', userId: 'system', category: 'Transactional', name: 'Order Confirmed',
    subject: 'Order Confirmed: {{orderNumber}}',
    body: "Hi {{firstName}},\n\nYour order has been confirmed. We're processing it now and will let you know when it's ready.\n\nOrder Details: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 't4', userId: 'system', category: 'Transactional', name: 'Password Reset',
    subject: 'Reset your AutoMailor Password',
    body: "Hi {{firstName}},\n\nWe received a request to reset your password. Click the link below to set a new one.\n\nReset Password: [Link]\n\nIf you didn't request this, please ignore this email.\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 't5', userId: 'system', category: 'Transactional', name: 'Security Alert',
    subject: 'Security Alert: New Login Detected',
    body: "Hi {{firstName}},\n\nA new login was detected on your AutoMailor account from {{location}} using {{device}}.\n\nIf this was you, you can ignore this. If not, please change your password immediately.\n\nBest,\nThe InboxAI Team"
  },

  // --- SUPPORT (5) ---
  {
    id: 'su1', userId: 'system', category: 'Support', name: 'Ticket Received',
    subject: 'We\'ve received your support request ({{ticketId}})',
    body: "Hi {{firstName}},\n\nThank you for reaching out. We've received your request regarding {{issue}} and our team is looking into it.\n\nWe'll get back to you within 24 hours.\n\nBest,\nThe InboxAI Support Team"
  },
  {
    id: 'su2', userId: 'system', category: 'Support', name: 'Ticket Resolved',
    subject: 'Your issue has been resolved ({{ticketId}})',
    body: "Hi {{firstName}},\n\nGood news! We've resolved the issue you reported regarding {{issue}}. Everything should be working correctly now.\n\nPlease let us know if you need anything else.\n\nBest,\nThe InboxAI Support Team"
  },
  {
    id: 'su3', userId: 'system', category: 'Support', name: 'Feedback Survey',
    subject: 'How did we do? ({{ticketId}})',
    body: "Hi {{firstName}},\n\nWe'd love to hear about your experience with our support team. Could you take 30 seconds to rate our service?\n\nRate here: [Link]\n\nBest,\nThe InboxAI Support Team"
  },
  {
    id: 'su4', userId: 'system', category: 'Support', name: 'Proactive Help',
    subject: 'Need help with {{feature}}?',
    body: "Hi {{firstName}},\n\nI noticed you've been using {{feature}} recently. Here are a few tips to help you get the most out of it.\n\n[Tip 1]\n[Tip 2]\n\nBest,\nThe InboxAI Support Team"
  },
  {
    id: 'su5', userId: 'system', category: 'Support', name: 'Service Interruption',
    subject: 'Scheduled Maintenance: {{date}}',
    body: "Hi {{firstName}},\n\nWe'll be performing scheduled maintenance on {{date}} from {{startTime}} to {{endTime}}. During this time, AutoMailor may be temporarily unavailable.\n\nWe apologize for any inconvenience.\n\nBest,\nThe InboxAI Team"
  },

  // --- WELCOME (5) ---
  {
    id: 'we1', userId: 'system', category: 'Welcome', name: 'Welcome Email',
    subject: 'Welcome to AutoMailor, {{firstName}}!',
    body: "Hi {{firstName}},\n\nWe're thrilled to have you on board! AutoMailor is here to help you scale your outreach and grow your business.\n\nGet started here: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'we2', userId: 'system', category: 'Welcome', name: 'Onboarding 1: Connect',
    subject: 'Step 1: Connect your Gmail account',
    body: "Hi {{firstName}},\n\nThe first step to success with AutoMailor is connecting your Gmail account. This allows us to send personalized emails on your behalf.\n\nConnect now: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'we3', userId: 'system', category: 'Welcome', name: 'Onboarding 2: Upload',
    subject: 'Step 2: Upload your first lead list',
    body: "Hi {{firstName}},\n\nNow that your account is connected, it's time to upload your first list of leads. Our AI will start researching them immediately.\n\nUpload leads: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'we4', userId: 'system', category: 'Welcome', name: 'Onboarding 3: Launch',
    subject: 'Step 3: Send your first campaign',
    body: "Hi {{firstName}},\n\nYou're almost there! Your leads are researched and your templates are ready. It's time to launch your first campaign.\n\nLaunch campaign: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'we5', userId: 'system', category: 'Welcome', name: 'CEO Welcome',
    subject: 'A personal welcome from our CEO',
    body: "Hi {{firstName}},\n\nI'm the CEO of AutoMailor, and I wanted to personally welcome you to our community. We're here to help you succeed.\n\nIf you have any questions, just reply to this email.\n\nBest,\n{{ceoName}}"
  },

  // --- NOTIFICATION (5) ---
  {
    id: 'no1', userId: 'system', category: 'Notification', name: 'Campaign Started',
    subject: 'Your campaign "{{campaignName}}" has started',
    body: "Hi {{firstName}},\n\nGood news! Your outreach campaign \"{{campaignName}}\" is now live and sending emails.\n\nView Progress: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'no2', userId: 'system', category: 'Notification', name: 'New Reply',
    subject: 'New Reply from {{contactName}}!',
    body: "Hi {{firstName}},\n\nYou've received a new reply from {{contactName}} in your \"{{campaignName}}\" campaign.\n\nRead Reply: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'no3', userId: 'system', category: 'Notification', name: 'Credits Low',
    subject: 'Action Required: Your AI credits are low',
    body: "Hi {{firstName}},\n\nYou have less than 50 AI credits remaining. Top up now to ensure your campaigns keep running smoothly.\n\nTop Up: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'no4', userId: 'system', category: 'Notification', name: 'Weekly Report',
    subject: 'Your Weekly Performance Report',
    body: "Hi {{firstName}},\n\nHere's how your campaigns performed this week:\n\n- Emails Sent: {{sentCount}}\n- Open Rate: {{openRate}}%\n- Reply Rate: {{replyRate}}%\n\nFull Report: [Link]\n\nBest,\nThe InboxAI Team"
  },
  {
    id: 'no5', userId: 'system', category: 'Notification', name: 'Milestone Reached',
    subject: 'Congratulations! You\'ve sent 1,000 emails',
    body: "Hi {{firstName}},\n\nYou've just reached a major milestone: 1,000 AI-personalized emails sent with AutoMailor!\n\nKeep up the great work.\n\nBest,\nThe InboxAI Team"
  },

  // --- NETWORKING (5) ---
  {
    id: 'ne1', userId: 'system', category: 'Networking', name: 'Networking: Intro Request',
    subject: 'I\'d love to connect, {{firstName}}',
    body: "Hi {{firstName}},\n\nI've been following your work in {{industry}} and would love to connect and learn more about what you're building.\n\nAre you open to a quick virtual coffee?\n\nBest,\n{{senderName}}"
  },
  {
    id: 'ne2', userId: 'system', category: 'Networking', name: 'Collaboration Idea',
    subject: 'Collaboration idea for {{company}}',
    body: "Hi {{firstName}},\n\nI have an idea for a potential collaboration between our two companies that I think could be mutually beneficial.\n\nWorth a quick chat?\n\nBest,\n{{senderName}}"
  },
  {
    id: 'ne3', userId: 'system', category: 'Networking', name: 'Introduction',
    subject: 'Introduction: {{name1}} <> {{name2}}',
    body: "Hi {{firstName}},\n\nI'd like to introduce you to {{name2}}, who is doing some amazing work in {{field}}. I think you two would have a lot to talk about.\n\nI'll let you two take it from here!\n\nBest,\n{{senderName}}"
  },
  {
    id: 'ne4', userId: 'system', category: 'Networking', name: 'Event Follow-up',
    subject: 'Great meeting you at {{event}}!',
    body: "Hi {{firstName}},\n\nIt was great meeting you at {{event}} yesterday. I really enjoyed our conversation about {{topic}}.\n\nLet's stay in touch!\n\nBest,\n{{senderName}}"
  },
  {
    id: 'ne5', userId: 'system', category: 'Networking', name: 'Advice Request',
    subject: 'Quick question about your experience with {{topic}}',
    body: "Hi {{firstName}},\n\nI'm currently working on {{project}} and was hoping to get your expert advice on {{topic}}.\n\nDo you have 5 minutes to share your thoughts?\n\nBest,\n{{senderName}}"
  }
];
