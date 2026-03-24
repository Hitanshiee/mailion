import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Send, Clock, CheckCircle2, MoreVertical, Trash2, X } from 'lucide-react';

interface CampaignsProps {
  onSelectCampaign: (id: string) => void;
}

export const Campaigns: React.FC<CampaignsProps> = ({ onSelectCampaign }) => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Loading is taking longer than expected. Please check your connection or try again.");
      }
    }, 10000);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Note: Removed orderBy to avoid needing composite index
        // Can be added back once indexes are deployed
        const q = query(
          collection(db, 'campaigns'),
          where('userId', '==', user.uid)
        );

        const unsubSnapshot = onSnapshot(q, async (snapshot) => {
          const campaignData = await Promise.all(snapshot.docs.map(async (campaignDoc) => {
            const data = campaignDoc.data();
            
            // Fetch sent count for this campaign
            const contactsQuery = query(
              collection(db, `campaigns/${campaignDoc.id}/contacts`),
              where('status', '==', 'sent')
            );
            
            // We use a simple getDocs here for the count to avoid too many listeners
            // but for real-time we could use another onSnapshot if needed.
            // For now, let's just get the count once per snapshot update of campaigns.
            const contactsSnapshot = await new Promise<any>((resolve) => {
              const unsub = onSnapshot(contactsQuery, (snap) => {
                unsub();
                resolve(snap);
              });
            });

            return {
              id: campaignDoc.id,
              ...data,
              sentCount: contactsSnapshot.size
            };
          }));

          setCampaigns(campaignData);
          setLoading(false);
          setError(null);
          clearTimeout(timeout);
        }, (err) => {
          console.error("Error fetching campaigns:", err);
          setLoading(false);
          setError("Failed to load campaigns. This might be due to missing database indexes.");
          clearTimeout(timeout);
        });

        return () => unsubSnapshot();
      } else {
        setCampaigns([]);
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const toggleCampaignStatus = async (e: React.MouseEvent, campaign: any) => {
    e.stopPropagation();
    if (campaign.status === 'completed') {
      alert('This campaign has already been completed.');
      return;
    }
    
    const isSending = campaign.status === 'sending';
    try {
      const endpoint = isSending ? 'stop' : 'start';
      const response = await fetch(`/api/campaigns/${campaign.id}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update campaign');
      }
      
      console.log(`Campaign ${isSending ? 'paused' : 'started'} successfully`);
    } catch (error: any) {
      console.error('Error updating campaign status:', error);
      alert(error.message || 'Failed to update campaign status. Please try again.');
    }
  };

  const handleDeleteCampaign = async (e: React.MouseEvent, campaignId: string) => {
    e.stopPropagation();
    setOpenMenuId(null);
    
    if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }
    
    setDeletingId(campaignId);
    try {
      // Delete the campaign document (contacts will be deleted by cascade or manually if needed)
      await deleteDoc(doc(db, 'campaigns', campaignId));
      console.log('Campaign deleted successfully');
    } catch (error: any) {
      console.error('Error deleting campaign:', error);
      alert(error.message || 'Failed to delete campaign. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
        <p className="text-neutral-500 animate-pulse">Fetching your campaigns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 bg-red-50 rounded-3xl border border-red-100 p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <Trash2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-red-900 mb-2">Something went wrong</h3>
        <p className="text-red-700 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Your Campaigns</h2>
        <button 
          onClick={() => onSelectCampaign('new')}
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Send size={18} /> <span className="sm:hidden lg:inline">Create Campaign</span>
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-16 sm:py-24 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 border-dashed">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <Send size={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">No campaigns yet</h3>
          <p className="text-neutral-500 text-sm sm:text-base mb-4 sm:mb-6">Create your first campaign to start reaching out.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id}
              onClick={() => onSelectCampaign(campaign.id)}
              className="bg-white dark:bg-neutral-800 p-4 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Send size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base sm:text-lg truncate">{campaign.name}</h3>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock size={14} /> {new Date(campaign.createdAt?.toDate()).toLocaleDateString()}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        campaign.status === 'completed' ? "bg-emerald-100 text-emerald-700" : 
                        campaign.status === 'sending' ? "bg-blue-100 text-blue-700" : "bg-neutral-100 text-neutral-600"
                      )}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-8 ml-auto sm:ml-0">
                  <div className="text-center hidden sm:block">
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Sent</p>
                    <p className="text-lg font-bold">{campaign.sentCount || 0}</p>
                  </div>
                  <button 
                    onClick={(e) => toggleCampaignStatus(e, campaign)}
                    className={cn(
                      "px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-shrink-0",
                      campaign.status === 'sending' ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-emerald-600 text-white hover:bg-emerald-700"
                    )}
                  >
                    {campaign.status === 'sending' ? 'Pause' : 'Start'}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === campaign.id ? null : campaign.id); }}
                      className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {openMenuId === campaign.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-10">
                        <button
                          onClick={(e) => handleDeleteCampaign(e, campaign.id)}
                          disabled={deletingId === campaign.id}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                          {deletingId === campaign.id ? 'Deleting...' : 'Delete Campaign'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper for cn in this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
