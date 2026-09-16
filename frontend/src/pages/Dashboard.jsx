import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, MessageSquare, ShieldCheck, Activity } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [chatCount, setChatCount] = useState(0);

  useEffect(() => {
    const savedProfile = localStorage.getItem('twin_profile');
    if (!savedProfile) {
      navigate('/onboarding');
      return;
    }
    setProfile(JSON.parse(savedProfile));

    const savedChat = localStorage.getItem('twin_chat');
    if (savedChat) {
      const messages = JSON.parse(savedChat);
      setChatCount(messages.filter(m => m.role === 'user').length);
    }
  }, [navigate]);

  if (!profile) return null;

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-display-lg font-bold text-on-surface">Twin Dashboard</h1>
          <p className="text-on-surface-variant text-lg">Neural profile overview and analytics.</p>
        </div>
        <button 
          onClick={() => navigate('/chat')}
          className="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> Start Chat
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-low rounded-2xl p-6 shadow-lg border border-outline/10">
          <div className="flex items-center gap-3 mb-4 text-tertiary">
            <Activity className="w-6 h-6" />
            <h3 className="font-headline-md font-semibold text-on-surface">Twin Status</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></span>
            <span className="text-on-surface-variant font-medium">Online & Synced</span>
          </div>
          <p className="text-outline text-sm">Fidelity: 98.4%</p>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-6 shadow-lg border border-outline/10">
          <div className="flex items-center gap-3 mb-4 text-secondary">
            <MessageSquare className="w-6 h-6" />
            <h3 className="font-headline-md font-semibold text-on-surface">Conversations</h3>
          </div>
          <div className="text-4xl font-bold text-on-surface mb-2">{chatCount}</div>
          <p className="text-outline text-sm">User interactions logged</p>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-6 shadow-lg border border-outline/10">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-headline-md font-semibold text-on-surface">Privacy</h3>
          </div>
          <div className="text-on-surface font-medium mb-2">Local Storage Mode</div>
          <p className="text-outline text-sm">Data stays on this device</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-4 mb-8">
           <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center shadow-inner shadow-primary/20">
              <BrainCircuit className="text-primary w-8 h-8" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-on-surface">{profile.name}'s Neural Profile</h2>
             <p className="text-tertiary font-medium">Active Personality Matrix</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-outline text-sm uppercase tracking-wider font-semibold mb-1">Communication Style</h4>
              <p className="text-on-surface bg-surface-container-high/50 p-3 rounded-lg">{profile.communicationStyle || 'Not set'}</p>
            </div>
            <div>
              <h4 className="text-outline text-sm uppercase tracking-wider font-semibold mb-1">Tone</h4>
              <p className="text-on-surface bg-surface-container-high/50 p-3 rounded-lg">{profile.tone || 'Not set'}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-outline text-sm uppercase tracking-wider font-semibold mb-1">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests && profile.interests.length > 0 ? (
                  profile.interests.map((interest, i) => (
                    <span key={i} className="bg-secondary-container/30 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-outline">None</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-outline text-sm uppercase tracking-wider font-semibold mb-1">Personality</h4>
              <p className="text-on-surface bg-surface-container-high/50 p-3 rounded-lg">{profile.personality || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
