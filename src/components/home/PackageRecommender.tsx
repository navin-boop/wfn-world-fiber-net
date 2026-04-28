'use client';

import { useState } from 'react';
import { PLANS } from '@/lib/plans';
import { Zap, Users, Briefcase, Gamepad2, ChevronRight } from 'lucide-react';

type Step = 'use' | 'users' | 'result';

const USE_OPTIONS = [
  { id: 'browse', label: 'Browsing & Social', icon: '📱', minSpeed: 0 },
  { id: 'stream', label: 'Streaming & Video Calls', icon: '🎬', minSpeed: 100 },
  { id: 'work', label: 'Work from Home', icon: '💼', minSpeed: 100 },
  { id: 'game', label: 'Gaming & Downloads', icon: '🎮', minSpeed: 200 },
  { id: 'business', label: 'Business / Office', icon: '🏢', minSpeed: 500 },
];

const USER_OPTIONS = [
  { id: '1', label: '1–2 people', multiplier: 1 },
  { id: '3', label: '3–5 people', multiplier: 2 },
  { id: '6', label: '6–10 people', multiplier: 4 },
  { id: '10+', label: '10+ people / Office', multiplier: 6 },
];

export default function PackageRecommender() {
  const [step, setStep] = useState<Step>('use');
  const [selectedUse, setSelectedUse] = useState('');
  const [selectedUsers, setSelectedUsers] = useState('');

  const getRecommendation = () => {
    const use = USE_OPTIONS.find(u => u.id === selectedUse);
    const users = USER_OPTIONS.find(u => u.id === selectedUsers);
    if (!use || !users) return PLANS[1];
    const neededMbps = use.minSpeed * users.multiplier;
    return PLANS.find(p => {
      const speed = p.unit === 'Gbps' ? Number(p.speed) * 1000 : Number(p.speed);
      return speed >= neededMbps;
    }) ?? PLANS[PLANS.length - 1];
  };

  const recommended = step === 'result' ? getRecommendation() : null;

  return (
    <div className="rounded-3xl border p-8" style={{ border: '1px solid var(--border)', backgroundColor: '#fff', boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Zap size={18} style={{ color: 'var(--green)' }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--green)' }}>AI Recommender</span>
      </div>
      <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--black)' }}>Find your perfect plan</h3>

      {step === 'use' && (
        <div>
          <p className="text-sm mb-4" style={{ color: 'var(--gray-500)' }}>What will you mainly use the internet for?</p>
          <div className="space-y-2">
            {USE_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => { setSelectedUse(opt.id); setStep('users'); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left hover:border-green-400 transition-all text-sm"
                style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
                <span className="text-lg">{opt.icon}</span>
                {opt.label}
                <ChevronRight size={14} className="ml-auto" style={{ color: 'var(--gray-400)' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'users' && (
        <div>
          <p className="text-sm mb-4" style={{ color: 'var(--gray-500)' }}>How many people will share the connection?</p>
          <div className="space-y-2">
            {USER_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => { setSelectedUsers(opt.id); setStep('result'); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left hover:border-green-400 transition-all text-sm"
                style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
                <Users size={16} style={{ color: 'var(--green)' }} />
                {opt.label}
                <ChevronRight size={14} className="ml-auto" style={{ color: 'var(--gray-400)' }} />
              </button>
            ))}
          </div>
          <button onClick={() => setStep('use')} className="mt-3 text-xs" style={{ color: 'var(--gray-400)' }}>← Back</button>
        </div>
      )}

      {step === 'result' && recommended && (
        <div>
          <p className="text-sm mb-4" style={{ color: 'var(--gray-500)' }}>Based on your needs, we recommend:</p>
          <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: 'var(--green-50)', border: '2px solid var(--green)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--green)', color: '#fff' }}>{recommended.badge}</span>
              <span className="text-xl font-bold font-mono" style={{ color: 'var(--black)' }}>NPR {recommended.price}<span className="text-xs font-normal text-gray-400">/mo</span></span>
            </div>
            <h4 className="text-lg font-bold mb-1" style={{ color: 'var(--black)' }}>{recommended.name}</h4>
            <p className="text-3xl font-bold font-mono" style={{ color: 'var(--green)' }}>{recommended.speed} {recommended.unit}</p>
          </div>
          <a href="/packages"
            className="block w-full text-center py-3 rounded-2xl font-bold text-sm mb-3"
            style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
            View All Plans
          </a>
          <button onClick={() => { setStep('use'); setSelectedUse(''); setSelectedUsers(''); }}
            className="w-full text-xs text-center" style={{ color: 'var(--gray-400)' }}>
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
