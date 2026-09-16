import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 'personality', label: '1. How would you describe your personality?', type: 'text' },
  { id: 'communicationStyle', label: '2. How do you usually communicate?', type: 'text' },
  { id: 'tone', label: '3. What tone do you normally use?', type: 'text' },
  { id: 'decisionStyle', label: '4. How do you make decisions?', type: 'text' },
  { id: 'interests', label: '5. What topics do you enjoy discussing? (comma separated)', type: 'text' },
  { id: 'conflict', label: '6. How do you react when someone disagrees with you?', type: 'text' },
  { id: 'friends', label: '7. How do you normally respond to friends?', type: 'text' },
  { id: 'selfDescription', label: '8. Describe yourself in your own words.', type: 'textarea' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState('');

  const currentQuestion = questions[step];

  const handleNext = () => {
    if (step === 0 && !name) {
      alert("Please provide a name for your Twin.");
      return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    const profile = {
      name: name,
      personality: answers.personality || '',
      communicationStyle: answers.communicationStyle || '',
      tone: answers.tone || '',
      decisionStyle: answers.decisionStyle || '',
      interests: answers.interests ? answers.interests.split(',').map(i => i.trim()) : [],
      conflict: answers.conflict || '',
      friends: answers.friends || '',
      conversationStyle: answers.friends || '', // Merging this as conversation style
      selfDescription: answers.selfDescription || ''
    };

    localStorage.setItem('twin_profile', JSON.stringify(profile));
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto h-[80vh]">
      <div className="w-full bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <h1 className="font-display-lg text-display-lg font-bold text-on-surface mb-2">Create Your Twin</h1>
        <p className="text-on-surface-variant mb-8">Answer a few questions to calibrate the neural model to your persona.</p>

        <div className="space-y-6">
          {step === 0 && (
            <div className="animate-fade-in">
              <label className="block text-label-lg text-outline mb-2">First, what is your name?</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. Alex"
              />
            </div>
          )}

          <div className="animate-fade-in">
            <label className="block text-label-lg text-outline mb-2">{currentQuestion.label}</label>
            {currentQuestion.type === 'textarea' ? (
              <textarea 
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px]"
                placeholder="Your answer..."
              />
            ) : (
              <input 
                type="text" 
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your answer..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNext();
                }}
              />
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="text-label-sm text-outline">
              Question {step + 1} of {questions.length}
            </div>
            <button 
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              {step === questions.length - 1 ? 'Generate Twin' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
