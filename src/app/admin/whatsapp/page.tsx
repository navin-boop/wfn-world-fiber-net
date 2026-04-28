'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Send, Phone, User, AlertCircle } from 'lucide-react';

interface Message { id: string; from: string; text: string; createdAt: string; }
interface Conversation { id: string; phone: string; name?: string; status: string; createdAt: string; messages: Message[]; }

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new: { bg: '#fef3c7', color: '#92400e' },
  open: { bg: '#dbeafe', color: '#1e40af' },
  resolved: { bg: '#d1fae5', color: '#065f46' },
};

export default function WhatsAppAdmin() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => fetch('/api/admin/whatsapp').then(r => r.json()).then(d => { setConversations(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const openConv = async (conv: Conversation) => {
    const res = await fetch(`/api/admin/whatsapp/${conv.id}`);
    const data = await res.json();
    setSelected(data);
  };

  const sendReply = async () => {
    if (!selected || !reply.trim()) return;
    setSending(true);
    await fetch(`/api/admin/whatsapp/${selected.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: reply }),
    });
    setReply('');
    const res = await fetch(`/api/admin/whatsapp/${selected.id}`);
    setSelected(await res.json());
    setSending(false);
  };

  const updateStatus = async (status: string) => {
    if (!selected) return;
    await fetch(`/api/admin/whatsapp/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setSelected({ ...selected, status });
    load();
  };

  return (
    <div className="max-w-6xl space-y-4">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--black)' }}>WhatsApp Inbox</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--gray-500)' }}>Manage WhatsApp Business conversations.</p>
      </div>

      {/* API Notice */}
      <div className="flex items-start gap-3 rounded-2xl p-4 border" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#92400e' }} />
        <div className="text-sm">
          <p className="font-semibold mb-0.5" style={{ color: '#92400e' }}>WhatsApp Business Cloud API Not Connected</p>
          <p style={{ color: '#78350f' }}>
            Set <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: '#fef3c7' }}>WHATSAPP_ACCESS_TOKEN</code>,{' '}
            <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: '#fef3c7' }}>WHATSAPP_PHONE_NUMBER_ID</code>,{' '}
            <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: '#fef3c7' }}>WHATSAPP_BUSINESS_NUMBER</code>{' '}
            in your .env file to enable live messaging. Conversations below are from the database only.
          </p>
        </div>
      </div>

      <div className="flex gap-4 h-[560px]">
        {/* Conversation list */}
        <div className="w-72 flex-shrink-0 rounded-2xl border overflow-hidden flex flex-col" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
          <div className="px-4 py-3 border-b font-semibold text-sm" style={{ borderColor: 'var(--border)', color: 'var(--black)' }}>
            Conversations ({conversations.length})
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--gray-400)' }}>Loading…</p>
            ) : conversations.length === 0 ? (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--gray-400)' }}>No conversations yet</p>
            ) : conversations.map(conv => (
              <button key={conv.id} onClick={() => openConv(conv)}
                className="w-full text-left px-4 py-3 border-b hover:bg-gray-50 transition-colors"
                style={{ borderColor: 'var(--border)', backgroundColor: selected?.id === conv.id ? 'var(--green-50)' : undefined }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
                    {(conv.name ?? conv.phone).charAt(0)}
                  </div>
                  <span className="text-sm font-medium truncate" style={{ color: 'var(--black)' }}>{conv.name ?? 'Unknown'}</span>
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[conv.status]?.bg, color: STATUS_COLORS[conv.status]?.color }}>
                    {conv.status}
                  </span>
                </div>
                <p className="text-xs pl-9" style={{ color: 'var(--gray-400)' }}>{conv.phone}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 rounded-2xl border flex flex-col overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}>
          {!selected ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={40} className="mx-auto mb-3" style={{ color: 'var(--gray-300)' }} />
                <p className="text-sm" style={{ color: 'var(--gray-400)' }}>Select a conversation to view messages</p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#25D366' }}>
                    {(selected.name ?? selected.phone).charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--black)' }}>{selected.name ?? 'Customer'}</p>
                    <p className="text-xs" style={{ color: 'var(--gray-400)' }}>{selected.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {['new', 'open', 'resolved'].map(s => (
                    <button key={s} onClick={() => updateStatus(s)}
                      className="text-xs px-2.5 py-1 rounded-full font-medium transition-all"
                      style={{
                        backgroundColor: selected.status === s ? STATUS_COLORS[s].bg : 'var(--gray-100)',
                        color: selected.status === s ? STATUS_COLORS[s].color : 'var(--gray-500)',
                      }}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: '#f0fdf4' }}>
                {(selected.messages ?? []).map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-xs rounded-2xl px-4 py-2.5 text-sm"
                      style={{
                        backgroundColor: msg.from === 'agent' ? '#25D366' : '#fff',
                        color: msg.from === 'agent' ? '#fff' : 'var(--black)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                      }}>
                      {msg.text}
                      <p className="text-xs mt-1 opacity-60">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                {(selected.messages ?? []).length === 0 && (
                  <p className="text-center text-sm" style={{ color: 'var(--gray-400)' }}>No messages yet</p>
                )}
              </div>

              {/* Reply box */}
              <div className="border-t p-3 flex gap-2" style={{ borderColor: 'var(--border)' }}>
                <input value={reply} onChange={e => setReply(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendReply()}
                  placeholder="Type a reply…"
                  className="flex-1 h-10 px-4 rounded-xl text-sm border outline-none"
                  style={{ border: '1px solid var(--border-md)', color: 'var(--black)' }} />
                <button onClick={sendReply} disabled={sending || !reply.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40"
                  style={{ backgroundColor: '#25D366' }}>
                  <Send size={16} color="white" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
