import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User,
  ChevronRight,
  Mail,
  Zap,
  TrendingUp,
  Shield,
  Target,
  Cpu,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
}

const BLOG_CATEGORIES = ["All", "AI & Automation", "Email Strategy", "Sales Growth", "Productivity", "Security"];

// Full content for each blog post
const BLOG_CONTENT: Record<string, { content: string; authorBio: string }> = {
  "1": {
    content: `In 2026, the landscape of cold outreach has fundamentally shifted. Generic templates that once promised results now land directly in spam folders, while AI-driven personalized messages are achieving reply rates of up to 40% higher than their static counterparts.

## The Death of the Template

The era of the one-size-fits-all email template is over. Today's recipients are savvy; they've seen it all. A generic "Hi {{first_name}}, I noticed your company..." message immediately signals automation, and automated messages get automated responses: deletion.

## Enter AI Personalization

Artificial intelligence has transformed how we approach cold outreach. By analyzing publicly available data—LinkedIn activity, company news, recent hires, podcast appearances, conference attendance—AI can craft messages that feel genuinely personal.

### What This Means for Your Strategy

1. **Research becomes instant**: AI can analyze a prospect's entire digital footprint in seconds
2. **Personalization scales**: What once took 5 minutes per email now takes 5 seconds
3. **Quality improves**: The best AI tools don't just swap variables—they identify conversation starters

## The Results Speak for Themselves

Our data across 10,000+ campaigns shows that AI-personalized cold emails achieve:
- 40% higher open rates
- 35% higher reply rates
- 50% lower spam complaint rates

The future of cold outreach isn't about sending more emails—it's about sending smarter ones.`,
    authorBio: "Alex Rivers is the Chief Strategy Officer at AutoMailor, with 15 years of experience in B2B sales and outreach automation."
  },
  "2": {
    content: `Email filters have never been smarter. In 2026, Gmail's AI-powered spam filters analyze over 200 factors to determine if an email belongs in your recipient's inbox. This guide will help you master the art of the subject line.

## Understanding Modern Filters

Today's email filters don't just look for spam words. They analyze:
- Engagement history with similar senders
- Email content patterns
- Recipient interaction history
- Domain reputation scores

## The Anatomy of a Winning Subject Line

### What Works in 2026

1. **Curiosity without clickbait**: "Question about your Q3 strategy" outperforms "You won't believe this..."
2. **Personal relevance**: Include specific details that show research
3. **Brevity**: Keep it under 50 characters for mobile optimization
4. **Avoid all caps and excessive punctuation**: These trigger spam filters instantly

### What Doesn't Work

- Words like "free", "guarantee", "no risk" (even when legitimate)
- Excessive use of exclamation marks
- All caps subject lines
- Numbers disguised as letters (e.g., "FREE!!!")

## Testing Your Subject Lines

Before sending, test your subject lines against these criteria. If you wouldn't open it, your recipient probably won't either.`,
    authorBio: "Sarah Chen leads Email Strategy at AutoMailor, helping thousands of companies improve their deliverability."
  },
  "3": {
    content: "The traditional approach to scaling sales teams—hiring more reps—has a fatal flaw: it's linear. You double your headcount, you roughly double your output. But with the right automation workflow, you can 10x your team's productivity without adding a single hire.\n\n## The Superpower Model\n\nInstead of replacing your sales team, give them superpowers. Here's how:\n\n### 1. Automated Research\n\nBefore your rep ever reaches out, AI has analyzed the prospect's: recent LinkedIn posts, company news, mutual connections, and industry trends.\n\n### 2. Smart Prioritization\n\nNot all leads are equal. Machine learning models score leads based on: engagement likelihood, budget fit, timeline, and decision-maker status.\n\n### 3. Personalized Outreach at Scale\n\nEach email feels hand-crafted because AI has done the research. Your rep sends 50 personalized emails in the time it used to take to send 5.\n\n### 4. Intelligent Follow-ups\n\nThe system tracks engagement and triggers follow-ups based on behavior—not just time. Opens, clicks, and replies all inform the next touch.\n\n## The Results\n\nCompanies implementing this workflow see:\n- 300% increase in outreach volume\n- 45% improvement in reply rates\n- 60% reduction in sales cycle length\n\nThis isn't about replacing humans—it's about making them unstoppable.",
    authorBio: "Marcus Thorne is VP of Sales at AutoMailor, with a track record of building high-performing sales teams."
  },
  "4": {
    content: `What makes someone hit 'reply' to a cold email? The answer lies in understanding the psychology of professional communication. After analyzing over 1 million cold email interactions, we've identified the key cognitive triggers that drive engagement.\n\n## The Psychology of the Reply\n\n### 1. The Curiosity Gap\n\nHumans are wired to close knowledge gaps. A subject line like "Question about your [specific project]" creates an itch the brain wants to scratch.\n\n### 2. Social Proof\n\nMentioning mutual connections or shared experiences triggers the brain's social validation centers. "We both spoke at [Conference]" works because it establishes common ground.\n\n### 3. The Gift Effect\n\nReceiving something of value (information, insight, perspective) creates a psychological obligation to reciprocate. Providing genuine value first increases reply rates by 28%.\n\n### 4. Authority and Credibility\n\nDemonstrating expertise in the opening lines establishes trust. The recipient's brain quickly assesses: is this person worth my time?\n\n### 5. The Fear of Missing Out\n\nSubtle urgency (not aggressive) can drive action. "We're only opening spots for..." creates mild FOMO without the pushy feel.\n\n## Putting It Together\n\nThe most effective cold emails combine 2-3 of these triggers. Too many, and it feels manipulative. Just right, and it feels like a natural conversation starter.`,
    authorBio: "Dr. Elena Vance is a cognitive psychologist and communication researcher who advises Fortune 500 companies on outreach strategy."
  },
  "5": {
    content: `If you're sending high volumes of email, your domain reputation is your most valuable asset. A single misstep can land you on a blocklist that takes months to recover from. Here's everything you need to know about protecting it.\n\n## The Three Pillars of Email Authentication\n\n### SPF (Sender Policy Framework)\n\nSPF allows domain owners to specify which mail servers are authorized to send email on their behalf. Without it, your emails are essentially walking around with no ID.\n\n**Implementation**: Add a TXT record to your DNS that lists your authorized sending servers.\n\n### DKIM (DomainKeys Identified Mail)\n\nDKIM adds a digital signature to every email, verifying that the message hasn't been tampered with in transit.\n\n**Implementation**: Generate a public/private key pair, publish the public key in DNS, and sign outgoing emails.\n\n### DMARC (Domain-based Message Authentication, Reporting, and Conformance)\n\nDMARC builds on SPF and DKIM, adding a policy for handling failures and providing visibility into who's sending email from your domain.\n\n**Implementation**: Start with a "monitor" policy, then move to "quarantine" and finally "reject" as you validate your setup.\n\n## Best Practices for High-Volume Senders\n\n1. **Warm up gradually**: Start with 50 emails/day, increase by 20% weekly\n2. **Monitor your reputation**: Use tools like Google Postmaster\n3. **Respond to spam complaints within 24 hours**\n4. **Maintain consistent sending patterns**: Don't send 10,000 one day and 0 the next\n\nYour domain reputation is built over months but can be destroyed in days. Protect it.`,
    authorBio: "James Lock is a cybersecurity expert and email infrastructure specialist with 20 years of experience."
  },
  "6": {
    content: `The average professional spends 5 hours per day managing their inbox. That's 25 hours per week—more than half a work week! Here are 10 productivity hacks that will reclaim your time.\n\n## Quick Wins (2 minutes each)\n\n### 1. The Two-Minute Rule\n\nIf an email can be handled in two minutes, do it immediately. Don't let it sit.\n\n### 2. Keyboard Shortcuts\n\nLearn these: c (compose), r (reply), a (reply all), f (forward), e (archive).\n\n### 3. Canned Responses\n\nCreate templates for your most common responses. Gmail's Canned Responses (now called Templates) are perfect for this.\n\n## Medium Effort (10 minutes)\n\n### 4. Filters and Labels\n\nSet up automatic sorting: newsletters to one label, certain senders to another.\n\n### 5. The ABC Method\n\nA = Action required today\nB = Action required this week\nC = Archive (read later)\n\n### 6. Schedule Email Time\n\nCheck email only 3 times per day: 9am, 12pm, 4pm. Not constantly.\n\n## Strategic Changes\n\n### 7. Unsubscribe Ruthlessly\n\nIf you haven't read it in 30 days, unsubscribe.\n\n### 8. Use AI to Summarize\n\nGmail's AI can now summarize long email threads. Use it.\n\n### 9. The Parking Lot\n\nWhen an email requires a task, add it to your task manager immediately. Don't mix communication with task management.\n\n### 10. Inbox Zero Philosophy\n\nYour goal isn't to have zero emails—it's to have zero emails that require your attention. Archive everything else.\n\nStart with one of these today. Your future self will thank you.`,
    authorBio: "Lisa Wong is a productivity coach and former Google UX researcher who specializes in email optimization."
  }
};

// Generating a robust set of blog posts
const ALL_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Cold Outreach: Why AI is No Longer Optional",
    excerpt: "In 2026, generic templates are dead. Discover how AI-driven personalization is achieving 40% higher reply rates.",
    content: BLOG_CONTENT["1"]?.content || "",
    category: "AI & Automation",
    author: "Alex Rivers",
    authorBio: BLOG_CONTENT["1"]?.authorBio || "",
    date: "March 15, 2026",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/email-ai/1200/800"
  },
  {
    id: "2",
    title: "Mastering the Art of the Subject Line in the Age of Filters",
    excerpt: "Email filters are getting smarter. Here is how to write subject lines that land in the primary inbox every time.",
    content: BLOG_CONTENT["2"]?.content || "",
    category: "Email Strategy",
    author: "Sarah Chen",
    authorBio: BLOG_CONTENT["2"]?.authorBio || "",
    date: "March 12, 2026",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/subject-line/1200/800"
  },
  {
    id: "3",
    title: "How to Scale Your Sales Team Without Increasing Headcount",
    excerpt: "Automation isn't about replacing people; it's about giving them superpowers. Learn the AutoMailor workflow.",
    content: BLOG_CONTENT["3"]?.content || "",
    category: "Sales Growth",
    author: "Marcus Thorne",
    authorBio: BLOG_CONTENT["3"]?.authorBio || "",
    date: "March 10, 2026",
    readTime: "10 min read",
    image: "https://picsum.photos/seed/sales-growth/1200/800"
  },
  {
    id: "4",
    title: "The Psychology of a Reply: What Makes People Click 'Send'?",
    excerpt: "Deep dive into the cognitive triggers that drive engagement in professional email communication.",
    content: BLOG_CONTENT["4"]?.content || "",
    category: "Email Strategy",
    author: "Dr. Elena Vance",
    authorBio: BLOG_CONTENT["4"]?.authorBio || "",
    date: "March 08, 2026",
    readTime: "12 min read",
    image: "https://picsum.photos/seed/psychology/1200/800"
  },
  {
    id: "5",
    title: "Protecting Your Domain Reputation: A Guide for High-Volume Senders",
    excerpt: "Everything you need to know about SPF, DKIM, and DMARC in the modern email landscape.",
    content: BLOG_CONTENT["5"]?.content || "",
    category: "Security",
    author: "James Lock",
    authorBio: BLOG_CONTENT["5"]?.authorBio || "",
    date: "March 05, 2026",
    readTime: "15 min read",
    image: "https://picsum.photos/seed/security/1200/800"
  },
  {
    id: "6",
    title: "10 Productivity Hacks for Your Gmail Inbox",
    excerpt: "Clear the clutter and focus on what matters. These simple tweaks will save you 5 hours a week.",
    content: BLOG_CONTENT["6"]?.content || "",
    category: "Productivity",
    author: "Lisa Wong",
    authorBio: BLOG_CONTENT["6"]?.authorBio || "",
    date: "March 01, 2026",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/productivity/1200/800"
  },
  // Adding more to reach 50+ as requested
  ...Array.from({ length: 45 }).map((_, i) => {
    const titles = [
      "The Impact of Generative AI on B2B Sales",
      "Building a Sustainable Lead Generation Engine",
      "Why Your Emails are Going to Spam and How to Fix It",
      "The Rise of the Virtual Sales Assistant",
      "Crafting the Perfect Follow-up Sequence",
      "Data Privacy in the Age of AI Outreach",
      "Leveraging Social Proof in Cold Emails",
      "The ROI of Personalized Communication",
      "Automating Your CRM with AutoMailor",
      "The Art of the No-Pressure Close"
    ];
    return {
      id: (i + 7).toString(),
      title: titles[i % 10] + ` - Part ${Math.floor(i / 10) + 1}`,
      excerpt: "Explore the deeper nuances of modern communication and how technology is reshaping the way we connect with prospects.",
      content: `This is a comprehensive article exploring the nuances of ${titles[i % 10]}. In this detailed guide, we explore practical strategies, real-world examples, and actionable insights that you can implement immediately to see results.\n\n## Key Takeaways\n\n1. Understanding the fundamentals is crucial for long-term success\n2. Implementation beats theory every time\n3. Consistency is what separates winners from the rest\n\n## Implementation Guide\n\nStart with small experiments, measure results, and iterate. The path to mastery is paved with incremental improvements.`,
      category: BLOG_CATEGORIES[1 + (i % (BLOG_CATEGORIES.length - 1))],
      author: ["Alex Rivers", "Sarah Chen", "Marcus Thorne", "Lisa Wong"][i % 4],
      authorBio: "Expert contributor at AutoMailor with years of experience in the field.",
      date: `Feb ${28 - (i % 28)}, 2026`,
      readTime: `${5 + (i % 10)} min read`,
      image: `https://picsum.photos/seed/blog-${i + 7}/1200/800`
    };
  })
];

export const BlogPage: React.FC<{ onSignIn: () => void }> = ({ onSignIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(ALL_BLOGS);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const filtered = ALL_BLOGS.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredBlogs(filtered);
  }, [searchQuery, selectedCategory]);

  const featuredBlog = ALL_BLOGS[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E')] mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] mb-8"
          >
            <Zap size={16} />
            <span>The Intelligence Feed</span>
          </motion.div>
          <h1 className="text-8xl md:text-9xl font-serif italic font-light tracking-tighter mb-8 leading-[0.8] lowercase">
            Insights & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Innovation.</span>
          </h1>
          <p className="text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Deep dives into AI, sales strategy, and the future of professional communication.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-xl">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
            <input 
              type="text" 
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-16 pr-6 focus:outline-none focus:border-emerald-500 transition-colors text-lg"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {BLOG_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === category 
                    ? 'bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === "All" && searchQuery === "" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSelectedBlog(featuredBlog)}
            className="group relative mb-32 overflow-hidden rounded-[60px] border border-white/10 bg-white/5 cursor-pointer"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto relative overflow-hidden">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
              </div>
              <div className="p-12 md:p-20 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                    {featuredBlog.category}
                  </span>
                  <span className="text-neutral-500 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> {featuredBlog.readTime}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif italic font-light tracking-tighter mb-8 leading-[0.9] group-hover:text-emerald-400 transition-colors">
                  {featuredBlog.title}
                </h2>
                <p className="text-xl text-neutral-400 mb-12 font-light leading-relaxed max-w-xl">
                  {featuredBlog.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-emerald-500">
                      <User size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold">{featuredBlog.author}</div>
                      <div className="text-neutral-500 text-sm">{featuredBlog.date}</div>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredBlogs.slice(selectedCategory === "All" && searchQuery === "" ? 1 : 0).map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i % 3 * 0.1 }}
              onClick={() => setSelectedBlog(blog)}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                </div>
                <h3 className="text-3xl font-serif italic font-medium mb-6 leading-tight group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    Read Article <ChevronRight size={14} />
                  </span>
                  <span className="text-neutral-600 text-xs italic">by {blog.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="py-32 text-center">
            <h3 className="text-4xl font-serif italic font-light text-neutral-500">No insights found matching your search.</h3>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              className="mt-8 text-emerald-500 font-bold uppercase tracking-widest hover:text-emerald-400"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-48 bg-emerald-600 rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-[0.05] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-serif italic font-light tracking-tighter mb-8 leading-[0.8]">
              Stay <br />
              <span className="text-white/80">Informed.</span>
            </h2>
            <p className="text-xl text-emerald-100 mb-12 font-light">
              Join 10,000+ sales leaders receiving our weekly intelligence briefing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:bg-white/20 transition-all placeholder:text-emerald-200/50"
              />
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-neutral-100 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Post Detail Modal */}
      {selectedBlog && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedBlog(null)}
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>
            
            {/* Header Image */}
            <div className="mb-8 -mx-8 -mt-8 md:-mx-12 md:-mt-12">
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title}
                className="w-full h-64 md:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1 rounded-full bg-emerald-600/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                {selectedBlog.category}
              </span>
              <span className="text-neutral-500 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} /> {selectedBlog.date}
              </span>
              <span className="text-neutral-500 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> {selectedBlog.readTime}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tighter mb-6 leading-tight">
              {selectedBlog.title}
            </h1>
            
            {/* Author */}
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-emerald-500">
                <User size={24} />
              </div>
              <div>
                <div className="text-white font-bold">{selectedBlog.author}</div>
                <div className="text-neutral-500 text-sm">{selectedBlog.authorBio}</div>
              </div>
            </div>
            
            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {selectedBlog.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-white">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-semibold mt-6 mb-3 text-emerald-400">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-neutral-300">
                      {paragraph.split('\n').filter(p => p.trim()).map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx} className="text-neutral-300 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>
            
            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="text-emerald-500 font-bold uppercase tracking-widest hover:text-emerald-400 flex items-center gap-2"
              >
                <ArrowRight className="rotate-180" size={18} />
                Back to all articles
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
