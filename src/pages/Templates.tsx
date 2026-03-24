import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Copy, 
  Check, 
  Filter, 
  Layout, 
  Mail, 
  ChevronRight,
  Trash2,
  Edit2,
  Save,
  X,
  Sparkles,
  Zap,
  Target,
  Shield,
  Globe,
  Cpu,
  Layers,
  Bold,
  Italic,
  List,
  Type,
  User,
  Building2,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { cn } from '../lib/utils';
import { SYSTEM_TEMPLATES, type Template } from '../constants/templates';

const CATEGORIES = [
  "All",
  "Sales",
  "Marketing",
  "Newsletter",
  "Transactional",
  "Work",
  "Support",
  "Follow-up",
  "Welcome",
  "Notification",
  "Networking"
];

// Pre-defined "System" Templates are imported from ../constants/templates

export interface TemplatesPageProps {
  onSelect?: (id: string) => void;
  onBack?: () => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelect, onBack }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sales',
    subject: '',
    body: ''
  });

  useEffect(() => {
    // Show system templates immediately
    setTemplates(SYSTEM_TEMPLATES);

    if (!auth.currentUser) return;

    // Fetch User Profile
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const unsubscribeUser = onSnapshot(userDoc, (doc) => {
      if (doc.exists()) {
        setUserProfile(doc.data());
      }
    });

    const q = query(
      collection(db, 'templates'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribeTemplates = onSnapshot(q, (snapshot) => {
      const userTemplates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Template[];
      setTemplates([...SYSTEM_TEMPLATES, ...userTemplates]);
    });

    return () => {
      unsubscribeUser();
      unsubscribeTemplates();
    };
  }, []);

  const userTemplateCount = templates.filter(t => t.userId === auth.currentUser?.uid).length;
  const isLimitReached = userProfile?.plan === 'free' && userTemplateCount >= 5;

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (template: Template) => {
    const text = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(text);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    if (!editingTemplate && isLimitReached) {
      if (window.confirm("You've reached the limit of 5 templates for free users. Upgrade to Premium for unlimited templates?")) {
        window.location.hash = '#/pricing';
      }
      return;
    }

    try {
      if (editingTemplate) {
        await updateDoc(doc(db, 'templates', editingTemplate.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'templates'), {
          ...formData,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp()
        });
      }
      setIsCreateModalOpen(false);
      setEditingTemplate(null);
      setFormData({ name: '', category: 'Sales', subject: '', body: '' });
    } catch (err) {
      console.error("Error saving template:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    try {
      await deleteDoc(doc(db, 'templates', id));
    } catch (err) {
      console.error("Error deleting template:", err);
    }
  };

  const insertPlaceholder = (placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.body;
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newBody = before + placeholder + after;
    setFormData({ ...formData, body: newBody });

    // Reset focus and cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + placeholder.length, start + placeholder.length);
    }, 0);
  };

  const applyFormat = (format: 'bold' | 'italic' | 'list') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.body.substring(start, end);
    const text = formData.body;
    const before = text.substring(0, start);
    const after = text.substring(end);

    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
    }

    const newBody = before + formattedText + after;
    setFormData({ ...formData, body: newBody });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const openEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      subject: template.subject,
      body: template.body
    });
    setIsCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E')] mix-blend-overlay" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-24">
          <div className="max-w-2xl flex items-start gap-4 sm:gap-8">
            {onBack && (
              <button 
                onClick={onBack}
                className="mt-2 sm:mt-4 p-3 sm:p-4 bg-white/5 hover:bg-white/10 text-white rounded-xl sm:rounded-2xl border border-white/10 transition-all group"
              >
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
              </button>
            )}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-8"
              >
                <Layout size={16} />
                <span>Template Library</span>
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif italic font-light tracking-tighter mb-4 sm:mb-8 leading-[0.8] lowercase">
                {onSelect ? 'Select' : 'High-Value'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">{onSelect ? 'Template.' : 'Messaging.'}</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
                {onSelect ? 'Choose a battle-tested template for your campaign.' : '100+ battle-tested templates for every stage of your acquisition funnel.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {setEditingTemplate(null); setFormData({name: '', category: 'Sales', subject: '', body: ''}); setIsCreateModalOpen(true);}}
            className="group bg-emerald-600 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:bg-emerald-500 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Create Template</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 mb-8 sm:mb-16 bg-white/5 p-4 sm:p-8 rounded-2xl sm:rounded-[40px] border border-white/10 backdrop-blur-xl">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 sm:pl-16 pr-4 sm:pr-6 focus:outline-none focus:border-emerald-500 transition-colors text-base sm:text-lg"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  selectedCategory === category 
                    ? 'bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, i) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="group bg-white/5 border border-white/10 rounded-[40px] p-10 hover:bg-white/10 transition-all flex flex-col h-full relative overflow-hidden"
              >
                {template.userId === 'system' && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <Sparkles size={10} /> System
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Mail size={12} /> {template.category}
                  </div>
                  <h3 className="text-3xl font-serif italic font-medium mb-2 group-hover:text-emerald-400 transition-colors">{template.name}</h3>
                  <div className="text-neutral-500 text-sm font-light truncate">Subject: {template.subject}</div>
                </div>

                <div className="bg-black/40 rounded-2xl p-6 mb-8 flex-grow font-light text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap border border-white/5 italic">
                  {template.body}
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  {onSelect && (
                    <button 
                      onClick={() => onSelect(template.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                      <Check size={20} />
                      Select Template
                    </button>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <button 
                      onClick={() => handleCopy(template)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
                    >
                      {copiedId === template.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      {copiedId === template.id ? 'Copied' : 'Copy Content'}
                    </button>
                    
                    {template.userId !== 'system' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEdit(template)}
                          className="p-4 bg-white/5 hover:bg-emerald-600/20 text-neutral-400 hover:text-emerald-400 rounded-xl transition-all border border-white/10"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(template.id)}
                          className="p-4 bg-white/5 hover:bg-red-600/20 text-neutral-400 hover:text-red-400 rounded-xl transition-all border border-white/10"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="py-48 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-neutral-600">
              <Search size={48} />
            </div>
            <h3 className="text-4xl font-serif italic font-light text-neutral-500">No templates found.</h3>
            <p className="text-neutral-600 mt-4">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-[60px] p-12 md:p-20 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12">
                <button onClick={() => setIsCreateModalOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                  <X size={32} />
                </button>
              </div>

              <div className="mb-12">
                <h2 className="text-5xl md:text-7xl font-serif italic font-light tracking-tighter mb-4">
                  {editingTemplate ? 'Edit' : 'Create'} <br />
                  <span className="text-emerald-500">Template.</span>
                </h2>
                <p className="text-neutral-400 font-light">Craft your high-conversion messaging variant.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 ml-2">Template Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Direct Pitch V2"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 ml-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                    >
                      {CATEGORIES.slice(1).map(c => (
                        <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 ml-2">Subject Line</label>
                  <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Use {{firstName}} for personalization"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Email Body</label>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => applyFormat('bold')}
                        className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-all"
                        title="Bold"
                      >
                        <Bold size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => applyFormat('italic')}
                        className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-all"
                        title="Italic"
                      >
                        <Italic size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => applyFormat('list')}
                        className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-all"
                        title="Bullet List"
                      >
                        <List size={16} />
                      </button>
                      <div className="w-px h-4 bg-white/10 mx-1" />
                      <button 
                        type="button"
                        onClick={() => insertPlaceholder('{{firstName}}')}
                        className="px-2 py-1 text-[10px] font-bold bg-white/5 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-emerald-400 transition-all flex items-center gap-1"
                      >
                        <User size={10} /> First Name
                      </button>
                      <button 
                        type="button"
                        onClick={() => insertPlaceholder('{{company}}')}
                        className="px-2 py-1 text-[10px] font-bold bg-white/5 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-emerald-400 transition-all flex items-center gap-1"
                      >
                        <Building2 size={10} /> Company
                      </button>
                      <button 
                        type="button"
                        onClick={() => insertPlaceholder('{{senderName}}')}
                        className="px-2 py-1 text-[10px] font-bold bg-white/5 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-emerald-400 transition-all flex items-center gap-1"
                      >
                        <Send size={10} /> Sender
                      </button>
                    </div>
                  </div>
                  <textarea 
                    ref={textareaRef}
                    required
                    rows={8}
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                    placeholder="Hi {{firstName}},\n\nWrite your message here..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-8 focus:outline-none focus:border-emerald-500 transition-all resize-none font-light leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-4 pt-8">
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-6 rounded-2xl text-xl font-bold hover:bg-emerald-500 transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    <Save size={24} />
                    {editingTemplate ? 'Update Template' : 'Save Template'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-12 py-6 rounded-2xl text-xl font-bold border border-white/10 hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
