'use client';

import { useEffect, useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';

interface PopupOffer {
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

interface SiteSettings { [key: string]: string }

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [popup, setPopup] = useState<PopupOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPopup, setSavingPopup] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/settings').then(r => r.json()),
      fetch('/api/admin/popup').then(r => r.json()),
    ]).then(([s, p]) => { setSettings(s); setPopup(p); setLoading(false); });
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    const entries = Object.entries(settings).map(([key, value]) => ({ key, value }));
    await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entries) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const savePopup = async () => {
    if (!popup) return;
    setSavingPopup(true);
    await fetch('/api/admin/popup', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(popup) });
    setSavingPopup(false);
  };

  const settingFields = [
    { key: 'company_name', label: 'Company Name' },
    { key: 'phone_primary', label: 'Primary Phone' },
    { key: 'phone_secondary', label: 'Secondary Phone' },
    { key: 'email', label: 'Email Address' },
    { key: 'address', label: 'Address' },
    { key: 'whatsapp_number', label: 'WhatsApp Number (with country code)' },
    { key: 'whatsapp_message', label: 'WhatsApp Pre-filled Message' },
    { key: 'facebook_url', label: 'Facebook URL' },
    { key: 'established_year', label: 'Established Year' },
  ];

  if (loading) return <div className="text-center py-16 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Settings</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Manage site-wide configuration and popup offers.</p>
      </div>

      {/* Site Settings */}
      <div className="rounded-2xl border p-6" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
        <h3 className="font-semibold mb-5" style={{ color: 'var(--black)' }}>Site Information</h3>
        <div className="space-y-4">
          {settingFields.map(field => (
            <div key={field.key}>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>{field.label}</label>
              <input
                value={settings[field.key] ?? ''}
                onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button onClick={saveSettings} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60"
            style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
            <Save size={15} /> {saving ? 'Saving…' : 'Save Settings'}
          </button>
          {saved && <span className="text-xs" style={{ color: 'var(--green-700)' }}>✓ Saved!</span>}
        </div>
      </div>

      {/* Popup Offer */}
      {popup && (
        <div className="rounded-2xl border p-6" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold" style={{ color: 'var(--black)' }}>Popup Offer</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border"
                style={{ border: '1px solid var(--border-md)', color: 'var(--gray-600)' }}>
                {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
                {showPreview ? 'Hide' : 'Preview'}
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={popup.active} onChange={e => setPopup({ ...popup, active: e.target.checked })} />
                  <div className="w-10 h-5 rounded-full transition-colors" style={{ backgroundColor: popup.active ? 'var(--green)' : 'var(--gray-300)' }}>
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform" style={{ transform: popup.active ? 'translateX(20px)' : 'translateX(0)' }} />
                  </div>
                </div>
                <span className="text-sm" style={{ color: 'var(--gray-700)' }}>Active</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="mb-6 p-4 rounded-2xl border text-center relative" style={{ backgroundColor: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
              <span className="absolute top-3 right-3 text-xs" style={{ color: 'var(--gray-400)' }}>Preview</span>
              <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--black)' }}>{popup.heading}</h4>
              <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>{popup.description}</p>
              <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>{popup.buttonText}</span>
            </div>
          )}

          <div className="space-y-4">
            {[['Heading', 'heading'], ['Description', 'description'], ['Button Text', 'buttonText'], ['Button Link', 'buttonLink'], ['Image URL (optional)', 'imageUrl']].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>{label}</label>
                {key === 'description' ? (
                  <textarea value={(popup as unknown as Record<string, unknown>)[key] as string ?? ''} onChange={e => setPopup({ ...popup, [key]: e.target.value })} rows={2}
                    className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                ) : (
                  <input value={(popup as unknown as Record<string, unknown>)[key] as string ?? ''} onChange={e => setPopup({ ...popup, [key]: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                )}
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Delay (ms)</label>
                <input type="number" value={popup.delay} onChange={e => setPopup({ ...popup, delay: Number(e.target.value) })}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Show Frequency</label>
                <select value={popup.frequency} onChange={e => setPopup({ ...popup, frequency: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
                  <option value="once">Once per visitor</option>
                  <option value="every">Every visit</option>
                  <option value="daily">Once per day</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button onClick={savePopup} disabled={savingPopup}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60"
              style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
              <Save size={15} /> {savingPopup ? 'Saving…' : 'Save Popup'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
