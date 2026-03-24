import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, updateDoc, doc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { MessageSquare, ThumbsUp, Plus, X, Bug, Lightbulb, LifeBuoy, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Ticket {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  type: 'bug' | 'feature' | 'support';
  status: 'open' | 'in-progress' | 'resolved';
  upvotes: string[];
  upvoteCount: number;
  createdAt: any;
}

export const SupportCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTicket, setNewTicket] = useState<{
    title: string;
    description: string;
    type: 'bug' | 'feature' | 'support';
  }>({
    title: '',
    description: '',
    type: 'feature'
  });
  const [filter, setFilter] = useState<'all' | 'bug' | 'feature' | 'support'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const q = query(collection(db, 'support_tickets'), orderBy('upvoteCount', 'desc'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ticketsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ticket[];
      setTickets(ticketsData);
    });

    return () => unsubscribe();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'support_tickets'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        title: newTicket.title,
        description: newTicket.description,
        type: newTicket.type,
        status: 'open',
        upvotes: [],
        upvoteCount: 0,
        createdAt: serverTimestamp()
      });
      setNewTicket({ title: '', description: '', type: 'feature' });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = async (ticketId: string, hasUpvoted: boolean) => {
    if (!auth.currentUser) return;

    const ticketRef = doc(db, 'support_tickets', ticketId);
    try {
      if (hasUpvoted) {
        await updateDoc(ticketRef, {
          upvotes: arrayRemove(auth.currentUser.uid),
          upvoteCount: increment(-1)
        });
      } else {
        await updateDoc(ticketRef, {
          upvotes: arrayUnion(auth.currentUser.uid),
          upvoteCount: increment(1)
        });
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.type === filter);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[1001] flex flex-col"
          >
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-xl font-bold">Support & Feedback</h2>
                <p className="text-sm text-neutral-500">Help us improve AutoMailor</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!isCreating ? (
                <>
                  <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl">
                    {(['all', 'feature', 'bug', 'support'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={cn(
                          "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize",
                          filter === t ? "bg-white text-emerald-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                        )}
                      >
                        {t}s
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCreating(true)}
                    className="w-full py-4 border-2 border-dashed border-neutral-200 rounded-2xl flex items-center justify-center gap-2 text-neutral-500 hover:border-emerald-500 hover:text-emerald-600 transition-all group"
                  >
                    <Plus size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-bold">New Feedback or Request</span>
                  </button>

                  <div className="space-y-4">
                    {filteredTickets.map((ticket) => {
                      const hasUpvoted = auth.currentUser ? ticket.upvotes.includes(auth.currentUser.uid) : false;
                      return (
                        <div key={ticket.id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {ticket.type === 'bug' && <Bug size={14} className="text-red-500" />}
                                {ticket.type === 'feature' && <Lightbulb size={14} className="text-amber-500" />}
                                {ticket.type === 'support' && <LifeBuoy size={14} className="text-blue-500" />}
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                  {ticket.type}
                                </span>
                              </div>
                              <h4 className="font-bold text-neutral-900">{ticket.title}</h4>
                              <p className="text-sm text-neutral-500 line-clamp-2 mt-1">{ticket.description}</p>
                            </div>
                            <button
                              onClick={() => handleUpvote(ticket.id, hasUpvoted)}
                              className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-xl border transition-all min-w-[48px]",
                                hasUpvoted 
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                                  : "bg-white border-neutral-200 text-neutral-400 hover:border-emerald-200 hover:text-emerald-600"
                              )}
                            >
                              <ThumbsUp size={16} className={cn(hasUpvoted && "fill-current")} />
                              <span className="text-xs font-bold mt-1">{ticket.upvoteCount}</span>
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                            <div className="flex items-center gap-2">
                              {ticket.status === 'open' && <Clock size={12} className="text-amber-500" />}
                              {ticket.status === 'in-progress' && <AlertCircle size={12} className="text-blue-500" />}
                              {ticket.status === 'resolved' && <CheckCircle2 size={12} className="text-emerald-500" />}
                              <span className="text-[10px] font-bold uppercase text-neutral-500">
                                {ticket.status.replace('-', ' ')}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-400">
                              by {ticket.userName}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {filteredTickets.length === 0 && (
                      <div className="text-center py-12">
                        <MessageSquare size={48} className="mx-auto text-neutral-200 mb-4" />
                        <p className="text-neutral-500 font-medium">No requests yet. Be the first!</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">Create Request</h3>
                    <button 
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="text-sm font-bold text-neutral-400 hover:text-neutral-600"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">
                        Type
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['feature', 'bug', 'support'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setNewTicket(prev => ({ ...prev, type: t }))}
                            className={cn(
                              "py-3 rounded-xl border-2 font-bold text-sm transition-all capitalize",
                              newTicket.type === t 
                                ? "border-emerald-500 bg-emerald-50 text-emerald-600" 
                                : "border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-neutral-200"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">
                        Title
                      </label>
                      <input
                        required
                        type="text"
                        value={newTicket.title}
                        onChange={e => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="What's on your mind?"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 block">
                        Description
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={newTicket.description}
                        onChange={e => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell us more about it..."
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Loader2 = ({ className, size }: { className?: string; size?: number }) => (
  <svg 
    className={cn("animate-spin", className)} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
