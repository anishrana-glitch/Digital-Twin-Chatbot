import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, BrainCircuit, Globe } from 'lucide-react';
import { sendMessage, getShareSession } from '../services/api';

export default function SharedChat() {
  const { sessionId } = useParams();
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadSession = async () => {
      const response = await getShareSession(sessionId);
      if (response.success) {
        setProfile(response.data.profile);
        setMessages(response.data.history || []);
      } else {
        setError('Shared session not found or expired.');
      }
    };
    loadSession();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendMessage(userMessage.content, profile, messages);
      
      if (response.success) {
        setMessages([...newMessages, { role: 'twin', content: response.reply }]);
      } else {
        setMessages([...newMessages, { role: 'system', content: 'Error: Unable to generate response from Twin.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'system', content: 'Connection Error.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Globe className="w-16 h-16 text-error mb-4" />
        <h2 className="font-display-lg text-2xl text-on-surface mb-2">{error}</h2>
        <Link to="/onboarding" className="text-primary hover:underline">Create your own Digital Twin</Link>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-on-surface-variant">Loading shared Twin...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top Chat Context Bar */}
      <section className="w-full bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl p-space-md shadow-xl flex items-center justify-between gap-space-md mb-space-md flex-shrink-0 z-20 border border-secondary/20">
        <div className="flex items-center gap-space-md">
          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-primary via-secondary to-tertiary shadow-[0_0_24px_rgba(192,193,255,0.35)] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center">
              <BrainCircuit className="text-primary w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm flex-wrap">
              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-semibold">{profile.name} AI</h2>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container/50 text-secondary font-semibold uppercase flex items-center gap-1">
                <Globe className="w-3 h-3" /> Shared Twin
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
              Tone: <span className="text-on-surface font-medium">{profile.tone}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <Link 
            to="/onboarding"
            className="px-space-sm py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md"
          >
            Create Yours
          </Link>
        </div>
      </section>

      {/* Main Chat Stream Container */}
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-none flex flex-col gap-space-lg relative z-10 px-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-full group animate-fade-in`}>
            {msg.role !== 'user' && (
              <div className="w-10 h-10 rounded-full flex-shrink-0 bg-surface-container-high shadow-[0_0_16px_rgba(76,215,246,0.2)] flex items-center justify-center mr-space-md">
                <BrainCircuit className="text-tertiary w-5 h-5" />
              </div>
            )}
            
            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-2xl`}>
              <div className="flex items-center gap-space-sm mb-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {msg.role === 'user' ? 'You' : `${profile.name} AI`}
                </span>
              </div>
              <div className={`${
                msg.role === 'user' 
                  ? 'bg-surface-container-highest rounded-2xl rounded-tr-sm' 
                  : msg.role === 'system'
                    ? 'bg-error-container/20 text-error rounded-2xl'
                    : 'bg-gradient-to-br from-surface-container to-surface-container-low rounded-2xl rounded-tl-sm shadow-xl shadow-black/40'
              } p-space-md text-on-surface`}>
                <p className="font-body-lg whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-space-md max-w-xl animate-fade-in">
             <div className="w-10 h-10 rounded-full flex-shrink-0 bg-surface-container-high shadow-[0_0_12px_rgba(76,215,246,0.25)] flex items-center justify-center">
                <BrainCircuit className="text-tertiary w-5 h-5" />
             </div>
             <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-full bg-surface-container-low/90 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-bounce" style={{ animationDelay: '-0.3s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '-0.15s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                </div>
                <span className="font-label-md text-on-surface-variant text-sm ml-2">Formulating response...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="w-full bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl p-space-sm shadow-[0_16px_40px_rgba(0,0,0,0.6)] z-30 mt-auto flex-shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-space-sm bg-surface-container-low rounded-xl px-space-md py-1.5 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={`Chat with ${profile.name}'s Twin...`}
            className="flex-1 bg-transparent border-none outline-none font-body-lg py-2 text-on-surface placeholder:text-outline disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isTyping || !input.trim()}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(192,193,255,0.35)] flex-shrink-0"
          >
            <Send className="w-5 h-5 ml-[-2px]" />
          </button>
        </form>
      </div>
    </div>
  );
}
