'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, X, ShieldCheck } from 'lucide-react';

interface Staff { id: string; name: string; email: string; role: string; active: boolean; createdAt: string; }
const ROLES = ['SUPER_ADMIN', 'ADMIN', 'SALES', 'SUPPORT', 'VIEWER'];
const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  SUPER_ADMIN: { bg: '#f3e8ff', color: '#7c3aed' },
  ADMIN: { bg: '#dbeafe', color: '#1e40af' },
  SALES: { bg: '#d1fae5', color: '#065f46' },
  SUPPORT: { bg: '#fef3c7', color: '#92400e' },
  VIEWER: { bg: '#f3f4f6', color: '#374151' },
};
const ROLE_PERMS: Record<string, string[]> = {
  SUPER_ADMIN: ['Full access to all features', 'Manage staff and roles', 'Delete any content', 'Access site settings'],
  ADMIN: ['Manage packages, offers, FAQs', 'View and manage leads', 'View WhatsApp inbox', 'Edit site content'],
  SALES: ['View leads', 'Reply in WhatsApp', 'View packages', 'Manage inquiries'],
  SUPPORT: ['View support tickets', 'Reply to FAQs', 'View customer inquiries'],
  VIEWER: ['Read-only access to all sections'],
};

const EMPTY = { name: '', email: '', password: '', role: 'VIEWER' };

export default function StaffAdmin() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const load = () => fetch('/api/admin/staff').then(r => r.json()).then(d => { setStaff(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const open = (s?: Staff) => {
    setEditing(s ?? null);
    setForm(s ? { name: s.name, email: s.email, password: '', role: s.role } : { ...EMPTY });
    setModal(true);
  };

  const save = async () => {
    setSaving(true);
    const body = form.password ? form : { name: form.name, email: form.email, role: form.role };
    const res = editing
      ? await fetch(`/api/admin/staff/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/admin/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setModal(false); load(); }
  };

  const toggleActive = async (s: Staff) => {
    await fetch(`/api/admin/staff/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !s.active }) });
    load();
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Staff Management</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Manage admin users, roles, and permissions.</p>
        </div>
        <button onClick={() => open()} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
          style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
          <Plus size={16} /> Add Staff
        </button>
      </div>

      {/* Role permissions reference */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {ROLES.map(role => (
          <div key={role} className="rounded-xl border p-3" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldCheck size={13} style={{ color: ROLE_COLORS[role].color }} />
              <span className="text-xs font-bold" style={{ color: ROLE_COLORS[role].color }}>{role.replace('_', ' ')}</span>
            </div>
            <ul className="space-y-0.5">
              {ROLE_PERMS[role].map(p => (
                <li key={p} className="text-xs" style={{ color: 'var(--gray-500)' }}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {loading ? <div className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</div> : (
        <div className="rounded-2xl border overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--gray-50)' }}>
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'Joined', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--gray-500)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#fff' }}>
              {staff.map(s => (
                <tr key={s.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--black)' }}>{s.name}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--gray-500)' }}>{s.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: ROLE_COLORS[s.role]?.bg, color: ROLE_COLORS[s.role]?.color }}>
                      {s.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(s)}
                      className="text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer"
                      style={{ backgroundColor: s.active ? 'var(--green-50)' : 'var(--gray-100)', color: s.active ? 'var(--green-700)' : 'var(--gray-400)' }}>
                      {s.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--gray-400)' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => open(s)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: 'var(--gray-500)' }}><Pencil size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-md rounded-2xl shadow-2xl" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>{editing ? 'Edit' : 'Add'} Staff Member</h3>
              <button onClick={() => setModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[['Full Name', 'name', 'text'], ['Email', 'email', 'email'], ['Password', 'password', 'password']].map(([label, key, type]) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>
                    {label}{editing && key === 'password' ? ' (leave blank to keep current)' : ''}
                  </label>
                  <input type={type} value={(form as Record<string, string>)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                    style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Role</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
                  {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
                {saving ? 'Saving…' : editing ? 'Update' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
