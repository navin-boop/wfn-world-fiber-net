'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  price?: string;
  startDate?: string;
  endDate?: string;
  active: boolean;
  placement: string;
}

const EMPTY = { title: '', description: '', imageUrl: '', ctaText: 'Get This Offer', ctaLink: '/contact', price: '', startDate: '', endDate: '', active: true, placement: '["homepage"]' };
const PLACEMENTS = ['homepage', 'packages', 'popup', 'banner'];

export default function OffersAdmin() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [placementSel, setPlacementSel] = useState<string[]>(['homepage']);
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/admin/offers').then(r => r.json()).then(d => { setOffers(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const open = (offer?: Offer) => {
    if (offer) {
      setEditing(offer);
      setForm({ ...offer, startDate: offer.startDate ? offer.startDate.split('T')[0] : '', endDate: offer.endDate ? offer.endDate.split('T')[0] : '', imageUrl: offer.imageUrl ?? '', price: offer.price ?? '' });
      setPlacementSel(JSON.parse(offer.placement));
    } else {
      setEditing(null);
      setForm({ ...EMPTY });
      setPlacementSel(['homepage']);
    }
    setModal(true);
  };

  const save = async () => {
    setSaving(true);
    const body = { ...form, placement: JSON.stringify(placementSel) };
    const res = editing
      ? await fetch(`/api/admin/offers/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/admin/offers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) { setModal(false); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this offer?')) return;
    await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' });
    load();
  };

  const togglePlacement = (p: string) => {
    setPlacementSel(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Offers</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Create and manage promotional offers and campaigns.</p>
        </div>
        <button onClick={() => open()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
          style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
          <Plus size={16} /> New Offer
        </button>
      </div>

      {loading ? <div className="text-center py-16 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {offers.length === 0 ? (
            <p className="col-span-2 text-center py-16 text-sm" style={{ color: 'var(--gray-400)' }}>No offers yet. Create your first promotion!</p>
          ) : offers.map(offer => (
            <div key={offer.id} className="rounded-2xl border p-5" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate" style={{ color: 'var(--black)' }}>{offer.title}</h3>
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--gray-500)' }}>{offer.description}</p>
                </div>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: offer.active ? 'var(--green-50)' : 'var(--gray-100)', color: offer.active ? 'var(--green-700)' : 'var(--gray-500)' }}>
                  {offer.active ? 'Active' : 'Paused'}
                </span>
              </div>
              {offer.price && <p className="text-sm font-bold font-mono mb-2" style={{ color: 'var(--green-700)' }}>Rs. {offer.price}</p>}
              <div className="flex flex-wrap gap-1 mb-3">
                {JSON.parse(offer.placement).map((p: string) => (
                  <span key={p} className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-500)' }}>{p}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                <button onClick={() => open(offer)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border hover:bg-gray-50"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--gray-600)' }}>
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => del(offer.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-red-500 hover:bg-red-50">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-xl rounded-2xl shadow-2xl overflow-y-auto max-h-[85vh]" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>{editing ? 'Edit' : 'New'} Offer</h3>
              <button onClick={() => setModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[['Title', 'title'], ['Description', 'description'], ['Image URL', 'imageUrl'], ['Price (optional)', 'price'], ['CTA Button Text', 'ctaText'], ['CTA Link', 'ctaLink']].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>{label}</label>
                  {key === 'description' ? (
                    <textarea value={(form as unknown as Record<string, string>)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3}
                      className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
                      style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                  ) : (
                    <input type="text" value={(form as unknown as Record<string, string>)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                      style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                {[['Start Date', 'startDate'], ['End Date', 'endDate']].map(([label, key]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>{label}</label>
                    <input type="date" value={(form as unknown as Record<string, string>)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                      style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--gray-600)' }}>Display Placement</label>
                <div className="flex flex-wrap gap-2">
                  {PLACEMENTS.map(p => (
                    <button key={p} type="button" onClick={() => togglePlacement(p)}
                      className="px-3 py-1.5 text-xs rounded-lg border font-medium transition-all"
                      style={{
                        backgroundColor: placementSel.includes(p) ? 'var(--green-50)' : '#fff',
                        borderColor: placementSel.includes(p) ? 'var(--green)' : 'var(--border-md)',
                        color: placementSel.includes(p) ? 'var(--green-700)' : 'var(--gray-600)',
                      }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--gray-700)' }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                Active (show on site)
              </label>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={save} disabled={saving}
                className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
                {saving ? 'Saving…' : 'Save Offer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
