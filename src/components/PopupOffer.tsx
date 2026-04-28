'use client';

import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface PopupData {
  id: string;
  heading: string;
  description: string;
  imageUrl?: string;
  buttonText: string;
  buttonLink: string;
  delay: number;
  frequency: string;
  active: boolean;
}

function shouldShow(popup: PopupData): boolean {
  const key = `popup_shown_${popup.id}`;
  const now = Date.now();

  if (popup.frequency === 'once') {
    if (sessionStorage.getItem(key)) return false;
  } else if (popup.frequency === 'daily') {
    const last = localStorage.getItem(key);
    if (last && now - Number(last) < 86400000) return false;
  }
  return true;
}

function markShown(popup: PopupData) {
  const key = `popup_shown_${popup.id}`;
  if (popup.frequency === 'once') sessionStorage.setItem(key, '1');
  else if (popup.frequency === 'daily') localStorage.setItem(key, String(Date.now()));
}

export default function PopupOffer() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('/api/public/popup')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data || !data.active) return;
        if (!shouldShow(data)) return;
        const timer = setTimeout(() => {
          setPopup(data);
          setVisible(true);
          markShown(data);
        }, data.delay ?? 3000);
        return () => clearTimeout(timer);
      });
  }, []);

  const close = useCallback(() => setVisible(false), []);

  if (!popup || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#fff' }}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: 'rgba(0,0,0,0.08)', color: 'var(--gray-600)' }}
          aria-label="Close"
        >
          <X size={15} />
        </button>

        {popup.imageUrl && (
          <div className="h-40 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--green-50) 0%, #d0fbe9 100%)' }}>
            <img src={popup.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {!popup.imageUrl && (
          <div className="h-24 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--green) 0%, #0dcc86 100%)' }}>
            <span className="text-4xl">🎉</span>
          </div>
        )}

        <div className="p-7 text-center">
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--black)' }}>{popup.heading}</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--gray-500)' }}>{popup.description}</p>
          <a
            href={popup.buttonLink}
            onClick={close}
            className="inline-block w-full py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}
          >
            {popup.buttonText}
          </a>
          <button onClick={close} className="mt-3 text-xs" style={{ color: 'var(--gray-400)' }}>
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
