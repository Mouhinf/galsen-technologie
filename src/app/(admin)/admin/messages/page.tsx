'use client';

import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle2, Trash2, Archive, Mail, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  subject: string;
  content: string;
  status: string;
  createdAt: string;
}

const statusLabel: Record<string, string> = { UNREAD: 'Non lu', READ: 'Lu', ARCHIVED: 'Archivé' };
const statusColor: Record<string, string> = {
  UNREAD: 'bg-blue-500/20 text-blue-400',
  READ: 'bg-white/10 text-white/40',
  ARCHIVED: 'bg-white/5 text-white/30',
};
const tabs = ['Tous', 'Non lus', 'Lus', 'Archivés'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Il y a ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Il y a ${days}j`;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

const tabFilter: Record<string, string | null> = {
  'Tous': null,
  'Non lus': 'UNREAD',
  'Lus': 'READ',
  'Archivés': 'ARCHIVED',
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Tous');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => { setMessages(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const deleteMessage = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const statusFilter = tabFilter[activeTab];
  const filtered = messages
    .filter(m => statusFilter ? m.status === statusFilter : true)
    .filter(m =>
      !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
    );

  const unreadCount = messages.filter(m => m.status === 'UNREAD').length;
  const selectedMsg = selected;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Messages</h1>
          <p className="text-white/50 text-sm">Messages reçus via les formulaires de contact.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchMessages} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <div className="text-sm bg-[var(--green-l)]/20 text-[var(--green-l)] px-3 py-1 rounded-full font-mono">
            {unreadCount} non lu{unreadCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === tab ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--green-l)] w-64"
          />
        </div>
      </div>

      {/* Detail Panel */}
      {selectedMsg && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 relative">
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/30 hover:text-white text-lg">&times;</button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-1">{selectedMsg.subject}</h3>
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <span>{selectedMsg.name}</span>
                  <span className="text-white/20">•</span>
                  <span>{selectedMsg.email}</span>
                  {selectedMsg.phone && <><span className="text-white/20">•</span><span>{selectedMsg.phone}</span></>}
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-4 text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMsg.content}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">Actions</div>
              {selectedMsg.status !== 'READ' && (
                <button onClick={() => updateStatus(selectedMsg.id, 'READ')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors">
                  <CheckCircle2 size={14} /> Marquer comme lu
                </button>
              )}
              {selectedMsg.status !== 'ARCHIVED' && (
                <button onClick={() => updateStatus(selectedMsg.id, 'ARCHIVED')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors">
                  <Archive size={14} /> Archiver
                </button>
              )}
              {selectedMsg.status !== 'UNREAD' && (
                <button onClick={() => updateStatus(selectedMsg.id, 'UNREAD')} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors">
                  <Mail size={14} /> Marquer non lu
                </button>
              )}
              <button onClick={() => deleteMessage(selectedMsg.id)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 hover:text-red-300 transition-colors">
                <Trash2 size={14} /> Supprimer
              </button>
              <div className="pt-3 text-[10px] font-mono text-white/20">
                Reçu le {new Date(selectedMsg.createdAt).toLocaleString('fr-FR')}
              </div>
              <div className="text-[10px] font-mono text-white/20">
                Service : {selectedMsg.service}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-white/30 font-mono text-sm">Aucun message trouvé.</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-mono text-white/30 uppercase bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Objet</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((msg) => (
                <tr
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    selected?.id === msg.id ? 'bg-white/[0.03]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{msg.name}</div>
                    <div className="text-white/30 text-xs">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4 text-white/60">{msg.service}</td>
                  <td className="px-6 py-4 text-white/60 max-w-[200px] truncate">{msg.subject}</td>
                  <td className="px-6 py-4 text-white/40 text-xs whitespace-nowrap">{formatDate(msg.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${statusColor[msg.status] || 'bg-white/10 text-white/40'}`}>
                      {statusLabel[msg.status] || msg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setSelected(msg)} className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors" title="Voir"><Eye size={14} /></button>
                      {msg.status === 'UNREAD' && (
                        <button onClick={() => updateStatus(msg.id, 'READ')} className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-[var(--green-l)] transition-colors" title="Marquer lu"><CheckCircle2 size={14} /></button>
                      )}
                      <button onClick={() => deleteMessage(msg.id)} className="p-1.5 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors" title="Supprimer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
