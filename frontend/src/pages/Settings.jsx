import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, AlertCircle } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('twin_profile');
    if (!savedProfile) {
      navigate('/onboarding');
      return;
    }
    const p = JSON.parse(savedProfile);
    setProfile(p);
    setFormData({
      name: p.name || '',
      tone: p.tone || '',
      communicationStyle: p.communicationStyle || '',
      interests: p.interests ? p.interests.join(', ') : '',
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      name: formData.name,
      tone: formData.tone,
      communicationStyle: formData.communicationStyle,
      interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
    };
    localStorage.setItem('twin_profile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto w-full pb-12">
      <div className="mb-8">
        <h1 className="font-display-lg text-display-lg font-bold text-on-surface">Settings</h1>
        <p className="text-on-surface-variant text-lg">Adjust your Digital Twin's configuration.</p>
      </div>

      <div className="bg-surface-container-low rounded-2xl p-8 shadow-lg border border-outline/10">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-label-lg font-semibold text-on-surface mb-2">Twin Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 border border-outline/10"
            />
          </div>

          <div>
            <label className="block text-label-lg font-semibold text-on-surface mb-2">Tone</label>
            <input 
              type="text" 
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 border border-outline/10"
            />
          </div>

          <div>
            <label className="block text-label-lg font-semibold text-on-surface mb-2">Communication Style</label>
            <textarea 
              name="communicationStyle"
              value={formData.communicationStyle}
              onChange={handleChange}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 border border-outline/10 min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-label-lg font-semibold text-on-surface mb-2">Interests (comma separated)</label>
            <input 
              type="text" 
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full bg-surface-container-highest rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 border border-outline/10"
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline/10">
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
            
            {saved && (
              <span className="text-tertiary text-sm flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-4 h-4" /> Profile updated successfully
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
