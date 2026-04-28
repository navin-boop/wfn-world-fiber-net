'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

interface FAQ { id: string; question: string; answer: string; category: string; order: number; active: boolean; }
const EMPTY = { question: '', answer: '', category: 'General', order: 0, active: true };

export default function FAQsAdmin() {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/admin/faqs').then(r => r.json()).then(d => { setFAQs(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const open = (faq?: FAQ) => { setEditing(faq ?? null); setForm(faq ? { ...faq } : { ...EMPTY }); setModal(true); };

  const save = async () => {
    setSaving(true);
    const res = editing
      ? await fetch(`/api/admin/faqs/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setModal(false); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    load();
  };

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>FAQs</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Manage frequently asked questions displayed on the support page.</p>
        </div>
        <button onClick={() => open()} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
          style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {loading ? <div className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div> : (
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--gray-400)' }}>{cat}</p>
              {faqs.filter(f => f.category === cat).map(faq => (
                <div key={faq.id} className="rounded-xl border mb-2 p-4 group" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: 'var(--black)' }}>{faq.question}</p>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--gray-500)' }}>{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${faq.active ? 'text-green-700' : 'text-gray-400'}`}
                        style={{ backgroundColor: faq.active ? 'var(--green-50)' : 'var(--gray-100)' }}>
                        {faq.active ? 'Active' : 'Hidden'}
                      </span>
                      <button onClick={() => open(faq)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: 'var(--gray-500)' }}><Pencil size={13} /></button>
                      <button onClick={() => del(faq.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {faqs.length === 0 && <p className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>No FAQs yet</p>}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-xl rounded-2xl shadow-2xl" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>{editing ? 'Edit' : 'Add'} FAQ</h3>
              <button onClick={() => setModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Question</label>
                <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Answer</label>
                <textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} rows={4}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Category</label>
                  <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--gray-700)' }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                Active (visible on site)
              </label>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
                {saving ? 'Saving…' : 'Save FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
