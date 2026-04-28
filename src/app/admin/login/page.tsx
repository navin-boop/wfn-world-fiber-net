'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wifi, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { gsap, registerGSAP } from '@/lib/gsap';

export default function AdminLogin() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    registerGSAP();
    if (!formRef.current) return;
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Login failed'); return; }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)' }}>
      <div ref={formRef} style={{ opacity: 0 }} className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Wifi size={28} style={{ color: 'var(--green)' }} />
            <span className="text-xl font-bold text-white">World Fiber Net</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Sign in to manage your platform</p>
        </div>

        <form onSubmit={handleSubmit}
          className="rounded-2xl p-8"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
        >
          {error && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-6 text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@worldfibernet.net.np"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full h-11 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-xs mt-5" style={{ color: 'rgba(255,255,255,0.25)' }}>
            World Fiber Net · Admin Portal · Secure Access
          </p>
        </form>
      </div>
    </div>
  );
}
