import React from 'react';
import { Search, MoreVertical, Eye, CheckCircle2, Trash2, Mail } from 'lucide-react';

const messages = [
  { id: 1, name: 'Amadou Fall', email: 'amadou@example.com', service: 'IA & Data', subject: 'Demande de devis IA', date: 'Il y a 2h', status: 'Non lu' },
  { id: 2, name: 'Fatou Diop', email: 'fatou@example.com', service: 'Web & Mobile', subject: 'Refonte site e-commerce', date: 'Il y a 5h', status: 'Non lu' },
  { id: 3, name: 'Entreprise SN', email: 'contact@ent.sn', service: 'Cybersécurité', subject: 'Audit de sécurité', date: 'Hier', status: 'Lu' },
  { id: 4, name: 'Moussa Ndiaye', email: 'moussa@startup.sn', service: 'Cloud & Infra', subject: 'Migration cloud AWS', date: 'Il y a 2j', status: 'Lu' },
  { id: 5, name: 'Aissatou Ba', email: 'aissatou@org.sn', service: 'Formation', subject: 'Inscription bootcamp', date: 'Il y a 3j', status: 'Archivé' },
];

const tabs = ['Tous', 'Non lus', 'Lus', 'Archivés'];

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Messages</h1>
          <p className="text-white/50 text-sm">Gérez les messages reçus via le formulaire de contact.</p>
        </div>
        <div className="text-sm bg-[var(--green-l)]/20 text-[var(--green-l)] px-3 py-1 rounded-full font-mono">
          2 non lus
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2">
          {tabs.map((tab, i) => (
            <button key={tab} className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Rechercher..." className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--green-l)] w-64" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
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
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{msg.name}</div>
                  <div className="text-white/30 text-xs">{msg.email}</div>
                </td>
                <td className="px-6 py-4 text-white/60">{msg.service}</td>
                <td className="px-6 py-4 text-white/60">{msg.subject}</td>
                <td className="px-6 py-4 text-white/40 text-xs">{msg.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${
                    msg.status === 'Non lu' ? 'bg-blue-500/20 text-blue-400' : msg.status === 'Archivé' ? 'bg-white/5 text-white/30' : 'bg-white/10 text-white/40'
                  }`}>{msg.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Eye size={14} /></button>
                    <button className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-[var(--green-l)] transition-colors"><CheckCircle2 size={14} /></button>
                    <button className="p-1.5 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
