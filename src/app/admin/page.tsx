'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Package, Tag, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalPackages: number;
  activeOffers: number;
  openTickets: number;
  recentLeads: Array<{ id: string; name: string; phone: string; type: string; status: string; createdAt: string }>;
}

const statusColors: Record<string, string> = {
  new: '#f59e0b',
  contacted: '#3b82f6',
  converted: '#18E299',
  closed: '#71717a',
};

const typeLabels: Record<string, string> = {
  contact: 'Contact',
  package: 'Package Inquiry',
  coverage: 'Coverage',
  support: 'Support',
  agent: 'Agent',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Leads', value: stats?.totalLeads ?? 0, sub: `${stats?.newLeads ?? 0} new`, icon: FileText, color: '#6366f1', bg: '#eef2ff', href: '/admin/leads' },
    { label: 'Packages', value: stats?.totalPackages ?? 0, sub: 'Active plans', icon: Package, color: 'var(--green-700)', bg: 'var(--green-50)', href: '/admin/packages' },
    { label: 'Active Offers', value: stats?.activeOffers ?? 0, sub: 'Running promos', icon: Tag, color: '#f59e0b', bg: '#fffbeb', href: '/admin/offers' },
    { label: 'Open Tickets', value: stats?.openTickets ?? 0, sub: 'Need attention', icon: MessageSquare, color: '#ef4444', bg: '#fef2f2', href: '/admin/whatsapp' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>Dashboard</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Welcome back. Here's what's happening at World Fiber Net.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link key={card.label} href={card.href}
            className="rounded-2xl p-5 border hover:shadow-md transition-shadow"
            style={{ backgroundColor: '#fff', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <TrendingUp size={14} style={{ color: 'var(--gray-300)' }} />
            </div>
            <div className="text-2xl font-bold font-mono mb-0.5" style={{ color: 'var(--black)' }}>{card.value}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--gray-500)' }}>{card.label}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--gray-400)' }}>{card.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: '#fff', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold" style={{ color: 'var(--black)' }}>Recent Leads</h3>
            <Link href="/admin/leads" className="text-xs font-medium" style={{ color: 'var(--green-700)' }}>View all →</Link>
          </div>
          <div className="space-y-3">
            {(stats?.recentLeads ?? []).length === 0 ? (
              <p className="text-sm text-center py-6" style={{ color: 'var(--gray-400)' }}>No leads yet</p>
            ) : (
              stats!.recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#6366f1' }}>
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--black)' }}>{lead.name}</p>
                    <p className="text-xs" style={{ color: 'var(--gray-400)' }}>{lead.phone} · {typeLabels[lead.type] ?? lead.type}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${statusColors[lead.status]}20`, color: statusColors[lead.status] }}>
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: '#fff', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold mb-5" style={{ color: 'var(--black)' }}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Package', href: '/admin/packages', icon: Package, color: 'var(--green)' },
              { label: 'Create Offer', href: '/admin/offers', icon: Tag, color: '#f59e0b' },
              { label: 'Add FAQ', href: '/admin/faqs', icon: AlertCircle, color: '#6366f1' },
              { label: 'View Leads', href: '/admin/leads', icon: FileText, color: '#ef4444' },
              { label: 'Manage Staff', href: '/admin/staff', icon: CheckCircle, color: '#8b5cf6' },
              { label: 'Site Settings', href: '/admin/settings', icon: Clock, color: '#14b8a6' },
            ].map(a => (
              <Link key={a.label} href={a.href}
                className="flex items-center gap-2 rounded-xl p-3 border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ border: '1px solid var(--border)', color: 'var(--gray-700)' }}
              >
                <a.icon size={15} style={{ color: a.color }} />
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
