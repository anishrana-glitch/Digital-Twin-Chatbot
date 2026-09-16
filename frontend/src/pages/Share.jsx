import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Copy, CheckCircle, BrainCircuit, Loader2 } from 'lucide-react';
import { createShareSession } from '../services/api';

export default function Share() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('twin_profile');
    if (!savedProfile) {
      navigate('/onboarding');
      return;
    }
    setProfile(JSON.parse(savedProfile));
  }, [navigate]);

  const handleGenerateLink = async () => {
    if (shareUrl) {
      setIsPublic(!isPublic);
      return;
    }
    
    setIsLoading(true);
    const savedChat = localStorage.getItem('twin_chat');
    const history = savedChat ? JSON.parse(savedChat) : [];
    
    const response = await createShareSession(profile, history);
    setIsLoading(false);
    
    if (response.success) {
      setShareUrl(`${window.location.origin}/share/${response.sessionId}`);
      setIsPublic(true);
    } else {
      alert("Failed to generate share link.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!profile) return null;

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto h-[80vh]">
      <div className="w-full bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-primary to-secondary p-1 mb-6 shadow-lg shadow-primary/20">
            <div className="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center">
              <BrainCircuit className="text-primary w-10 h-10" />
            </div>
          </div>
          <h1 className="font-display-lg text-display-lg font-bold text-on-surface mb-2">Share Your Twin</h1>
          <p className="text-on-surface-variant">Allow others to interact with your digital replica.</p>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-outline/10 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-md text-on-surface font-semibold mb-1">Public Access</h3>
              <p className="text-outline text-sm">Generate a link to share your Twin</p>
            </div>
            <button 
              onClick={handleGenerateLink}
              disabled={isLoading}
              className={`w-12 h-6 rounded-full transition-colors relative ${isPublic ? 'bg-primary' : 'bg-surface-container-highest'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${isPublic ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          <div className={`transition-all duration-300 ${isPublic ? 'opacity-100 h-auto' : 'opacity-50 pointer-events-none'}`}>
            <label className="block text-label-sm uppercase tracking-wider text-outline mb-2">Share Link</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-surface-container-highest rounded-lg px-4 py-3 text-on-surface truncate font-mono text-sm border border-outline/20">
                {shareUrl || 'Generate link to view...'}
              </div>
              <button 
                onClick={handleCopy}
                disabled={!isPublic || !shareUrl}
                className="px-4 py-3 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface transition-all flex items-center gap-2 border border-outline/20 disabled:opacity-50"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-tertiary" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {copied && (
          <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle className="w-4 h-4" /> Link copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
}
