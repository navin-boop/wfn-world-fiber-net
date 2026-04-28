'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, ChevronDown, Eye, X } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  type: string;
  status: string;
  assignee?: string;
  notes?: string;
  source?: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new: { bg: '#fef3c7', color: '#92400e' },
  contacted: { bg: '#dbeafe', color: '#1e40af' },
  converted: { bg: '#d1fae5', color: '#065f46' },
  closed: { bg: '#f3f4f6', color: '#374151' },
};

const TYPE_LABELS: Record<string, string> = {
  contact: 'Contact', package: 'Package', coverage: 'Coverage', support: 'Support', agent: 'Agent',
};

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const PER_PAGE = 20;

  const load = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), limit: String(PER_PAGE) });
    if (statusFilter) params.set('status', statusFilter);
    setLoading(true);
    fetch(`/api/admin/leads?${params}`)
      .then(r => r.json())
      .then(d => { setLeads(d.leads ?? d); setTotal(d.total ?? d.length); setLoading(false); });
  }, [page, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const openLead = (lead: Lead) => { setSelected(lead); setNotes(lead.notes ?? ''); setStatus(lead.status); };

  const saveLead = async () => {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/leads/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    setSaving(false);
    setSelected(null);
    load();
  };

  const filtered = leads.filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search));

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Leads</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>{total} total inquiries from website forms.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gray-400)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads…"
              className="h-9 pl-9 pr-4 rounded-xl text-sm border outline-none"
              style={{ border: '1px solid var(--border-md)', color: 'var(--black)', width: '200px' }} />
          </div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-9 px-3 pr-8 rounded-xl text-sm border outline-none appearance-none"
            style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
            <option value="">All Status</option>
            {['new', 'contacted', 'converted', 'closed'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: 'var(--gray-50)' }}>
            <tr>
              {['Name', 'Phone', 'Type', 'Source', 'Status', 'Date', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--gray-500)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#fff' }}>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: 'var(--gray-400)' }}>No leads found</td></tr>
            ) : filtered.map(lead => (
              <tr key={lead.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--black)' }}>{lead.name}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--gray-600)' }}>{lead.phone}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-md text-xs font-medium" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-600)' }}>
                    {TYPE_LABELS[lead.type] ?? lead.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--gray-400)' }}>{lead.source ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: STATUS_COLORS[lead.status]?.bg, color: STATUS_COLORS[lead.status]?.color }}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--gray-400)' }}>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => openLead(lead)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" style={{ color: 'var(--gray-500)' }}><Eye size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > PER_PAGE && (
        <div className="flex items-center justify-between text-sm" style={{ color: 'var(--gray-500)' }}>
          <span>Page {page} of {Math.ceil(total / PER_PAGE)}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border disabled:opacity-40"
              style={{ border: '1px solid var(--border-md)' }}>Previous</button>
            <button onClick={() => setPage(p => p + 1)} disabled={page * PER_PAGE >= total}
              className="px-3 py-1.5 rounded-lg border disabled:opacity-40"
              style={{ border: '1px solid var(--border-md)' }}>Next</button>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-lg rounded-2xl shadow-2xl" style={{ backgroundColor: '#fff' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--black)' }}>Lead Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[['Name', selected.name], ['Phone', selected.phone], ['Email', selected.email ?? '—'], ['Type', TYPE_LABELS[selected.type] ?? selected.type], ['Source', selected.source ?? '—'], ['Date', new Date(selected.createdAt).toLocaleDateString()]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--gray-400)' }}>{k}</p>
                    <p style={{ color: 'var(--black)' }}>{v}</p>
                  </div>
                ))}
              </div>
              {selected.message && (
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--gray-400)' }}>Message</p>
                  <p className="text-sm p-3 rounded-xl" style={{ backgroundColor: 'var(--gray-50)', color: 'var(--gray-700)' }}>{selected.message}</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}>
                  {['new', 'contacted', 'converted', 'closed'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--gray-600)' }}>Internal Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }}
                  placeholder="Add notes…" />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm rounded-xl border" style={{ borderColor: 'var(--border-md)' }}>Cancel</button>
              <button onClick={saveLead} disabled={saving}
                className="px-4 py-2 text-sm rounded-xl font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--green)', color: 'var(--black)' }}>
                {saving ? 'Saving…' : 'Update Lead'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
