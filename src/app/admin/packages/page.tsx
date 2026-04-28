'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  speed: string;
  unit: string;
  price: string;
  badge: string;
  features: string;
  popular: boolean;
  active: boolean;
  order: number;
}

const EMPTY: Omit<Package, 'id' | 'features'> & { features: string[] } = {
  name: '', speed: '', unit: 'Mbps', price: '', badge: '', features: [''], popular: false, active: true, order: 0,
};

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; pkg?: Package | null }>({ open: false });
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    fetch('/api/admin/packages').then(r => r.json()).then(d => { setPackages(d); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({ ...EMPTY }); setModal({ open: true, pkg: null }); };
  const openEdit = (pkg: Package) => {
    setForm({ ...pkg, features: JSON.parse(pkg.features) });
    setModal({ open: true, pkg });
  };

  const save = async () => {
    setSaving(true);
    const body = { ...form, features: JSON.stringify(form.features.filter(f => f.trim())) };
    const res = modal.pkg
      ? await fetch(`/api/admin/packages/${modal.pkg.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/admin/packages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) { setModal({ open: false }); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    setDeleting(id);
    await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  };

  const setFeature = (i: number, v: string) => {
    const f = [...form.features];
    f[i] = v;
    setForm({ ...form, features: f });
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Packages</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Manage internet plans shown on the website.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
          <Plus size={16} /> Add Package
        </button>
      </div>

      {loading ? <div className="text-center py-16 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div> : (
        <div className="rounded-2xl border overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--gray-50)' }}>
              <tr>
                {['Plan', 'Speed', 'Price', 'Badge', 'Popular', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--gray-500)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#fff' }}>
              {packages.map(pkg => (
                <tr key={pkg.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--black)' }}>{pkg.name}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--gray-600)' }}>{pkg.speed} {pkg.unit}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--gray-600)' }}>Rs. {pkg.price}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-600)' }}>{pkg.badge}</span>
                  </td>
                  <td className="px-4 py-3">
                    {pkg.popular && <Star size={14} fill="var(--green)" style={{ color: 'var(--green)' }} />}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: pkg.active ? 'var(--green-50)' : 'var(--gray-100)', color: pkg.active ? 'var(--green-700)' : 'var(--gray-500)' }}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button onClick={() => openEdit(pkg)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" style={{ color: 'var(--gray-500)' }}><Pencil size={14} /></button>
                      <button onClick={() => del(pkg.id)} disabled={deleting === pkg.id} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-500 disabled:opacity-40"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {packages.length === 0 && <p className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>No packages yet</p>}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-xl rounded-2xl shadow-2xl overflow-y-auto max-h-[80vh]" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>{modal.pkg ? 'Edit' : 'Add'} Package</h3>
              <button onClick={() => setModal({ open: false })} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[['Name', 'name', 'text'], ['Speed', 'speed', 'text'], ['Unit', 'unit', 'text'], ['Price (Rs.)', 'price', 'text'], ['Badge', 'badge', 'text'], ['Order', 'order', 'number']].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>{label}</label>
                    <input type={type} value={(form as Record<string, unknown>)[key] as string}
                      onChange={e => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
                      className="w-full h-9 px-3 rounded-lg text-sm border outline-none"
                      style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--gray-600)' }}>Features</label>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={f} onChange={e => setFeature(i, e.target.value)}
                        className="flex-1 h-9 px-3 rounded-lg text-sm border outline-none"
                        style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}
                        placeholder={`Feature ${i + 1}`} />
                      <button onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50"><X size={14} /></button>
                    </div>
                  ))}
                  <button onClick={() => setForm({ ...form, features: [...form.features, ''] })}
                    className="text-xs font-medium" style={{ color: 'var(--green-700)' }}>+ Add feature</button>
                </div>
              </div>

              <div className="flex gap-6">
                {[['popular', 'Most Popular'], ['active', 'Active']].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--gray-700)' }}>
                    <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean}
                      onChange={e => setForm({ ...form, [key]: e.target.checked })} className="rounded" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setModal({ open: false })} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={save} disabled={saving}
                className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
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
