'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, MapPin } from 'lucide-react';

interface CoverageArea { id: string; name: string; district: string; status: string; order: number; }
const EMPTY = { name: '', district: '', status: 'active', order: 0 };
const DISTRICTS = ['Kathmandu', 'Nuwakot', 'Dhading', 'Gorkha', 'Sindhupalchok', 'Lamjung', 'Chitwan', 'Makwanpur'];

export default function CoverageAdmin() {
  const [areas, setAreas] = useState<CoverageArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<CoverageArea | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/admin/coverage').then(r => r.json()).then(d => { setAreas(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const open = (a?: CoverageArea) => { setEditing(a ?? null); setForm(a ? { ...a } : { ...EMPTY }); setModal(true); };
  const save = async () => {
    setSaving(true);
    const res = editing
      ? await fetch(`/api/admin/coverage/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/coverage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setModal(false); load(); }
  };
  const del = async (id: string) => { if (!confirm('Remove this area?')) return; await fetch(`/api/admin/coverage/${id}`, { method: 'DELETE' }); load(); };

  const districts = [...new Set(areas.map(a => a.district))];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Coverage Areas</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Manage service areas shown on the coverage map.</p>
        </div>
        <button onClick={() => open()} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
          style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
          <Plus size={16} /> Add Area
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Areas', value: areas.filter(a => a.status === 'active').length, color: 'var(--green)' },
          { label: 'Coming Soon', value: areas.filter(a => a.status === 'soon').length, color: '#f59e0b' },
          { label: 'Districts', value: districts.length, color: '#6366f1' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border p-4 text-center" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
            <div className="text-2xl font-bold font-mono mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? <div className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div> : (
        <div className="space-y-4">
          {districts.map(district => (
            <div key={district}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--gray-400)' }}>{district} District</p>
              <div className="rounded-2xl border overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                {areas.filter(a => a.district === district).map((area, i, arr) => (
                  <div key={area.id} className={`flex items-center gap-3 px-4 py-3 group ${i < arr.length - 1 ? 'border-b' : ''}`}
                    style={{ borderColor: 'var(--border)', backgroundColor: '#fff' }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: area.status === 'active' ? 'var(--green)' : '#f59e0b' }} />
                    <div className="flex-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--black)' }}>{area.name}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: area.status === 'active' ? 'var(--green-50)' : '#fffbeb',
                        color: area.status === 'active' ? 'var(--green-700)' : '#92400e',
                      }}>
                      {area.status === 'active' ? 'Active' : 'Coming Soon'}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => open(area)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: 'var(--gray-500)' }}><Pencil size={13} /></button>
                      <button onClick={() => del(area.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {areas.length === 0 && <p className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>No coverage areas yet</p>}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-md rounded-2xl shadow-2xl" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>{editing ? 'Edit' : 'Add'} Coverage Area</h3>
              <button onClick={() => setModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Area/Town Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>District</label>
                <input list="district-list" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                <datalist id="district-list">{DISTRICTS.map(d => <option key={d} value={d} />)}</datalist>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
                    <option value="active">Active</option>
                    <option value="soon">Coming Soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
                {saving ? 'Saving…' : 'Save Area'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
