'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';

interface Testimonial { id: string; name: string; location: string; text: string; plan?: string; stars: number; active: boolean; order: number; }
const EMPTY = { name: '', location: '', text: '', plan: '', stars: 5, active: true, order: 0 };

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/admin/testimonials').then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const open = (t?: Testimonial) => { setEditing(t ?? null); setForm(t ? { ...t, plan: t.plan ?? '' } : { ...EMPTY }); setModal(true); };
  const save = async () => {
    setSaving(true);
    const res = editing
      ? await fetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setModal(false); load(); }
  };
  const del = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' }); load(); };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Testimonials</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Customer reviews displayed on the homepage.</p>
        </div>
        <button onClick={() => open()} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
          style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div> : (
        <div className="space-y-3">
          {items.map(t => (
            <div key={t.id} className="rounded-xl border p-4 group flex gap-4" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#6366f1' }}>
                {t.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm" style={{ color: 'var(--black)' }}>{t.name}</span>
                  <span className="text-xs" style={{ color: 'var(--gray-400)' }}>{t.location}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${t.active ? 'text-green-700' : 'text-gray-400'}`}
                    style={{ backgroundColor: t.active ? 'var(--green-50)' : 'var(--gray-100)' }}>
                    {t.active ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < t.stars ? 'var(--green)' : 'none'} style={{ color: 'var(--green)' }} />
                  ))}
                </div>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{t.text}</p>
                {t.plan && <p className="text-xs mt-1 font-mono" style={{ color: 'var(--green-700)' }}>{t.plan}</p>}
              </div>
              <div className="flex items-start gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => open(t)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: 'var(--gray-500)' }}><Pencil size={13} /></button>
                <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>No testimonials yet</p>}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-xl rounded-2xl shadow-2xl" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>{editing ? 'Edit' : 'Add'} Testimonial</h3>
              <button onClick={() => setModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[['Name', 'name'], ['Location', 'location'], ['Plan (optional)', 'plan']].map(([label, key]) => (
                  <div key={key} className={key === 'name' || key === 'location' ? '' : 'col-span-2'}>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>{label}</label>
                    <input value={(form as Record<string, string | number | boolean>)[key] as string}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                      style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Review Text</label>
                <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={3}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Stars</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm({ ...form, stars: n })}>
                        <Star size={20} fill={n <= form.stars ? 'var(--green)' : 'none'} style={{ color: 'var(--green)' }} />
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer mt-4" style={{ color: 'var(--gray-700)' }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                  Visible on site
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
