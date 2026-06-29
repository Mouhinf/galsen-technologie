import React from 'react';
import { MessageSquare, FolderKanban, FileText, GraduationCap, ArrowUpRight, MoreVertical, PenTool } from 'lucide-react';

const stats = [
  { label: 'Messages non lus', value: '12', icon: MessageSquare, color: 'text-blue-400', trend: '+2 aujourd\'hui' },
  { label: 'Projets publiés', value: '45', icon: FolderKanban, color: 'text-green-400', trend: '+3 ce mois' },
  { label: 'Articles blog', value: '28', icon: FileText, color: 'text-gold', trend: 'Régulier' },
  { label: 'Formations actives', value: '4', icon: GraduationCap, color: 'text-purple-400', trend: '2 à venir' },
];

const recentMessages = [
  { id: 1, name: 'Amadou Fall', email: 'amadou@example.com', service: 'IA & Data', date: 'Il y a 2h', status: 'Non lu' },
  { id: 2, name: 'Fatou Diop', email: 'fatou@example.com', service: 'Web & Mobile', date: 'Il y a 5h', status: 'Lu' },
  { id: 3, name: 'Entreprise SN', email: 'contact@ent.sn', service: 'Cybersécurité', date: 'Hier', status: 'Lu' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Vue d'ensemble</h1>
        <p className="text-white/50 text-sm">Bienvenue sur le tableau de bord Galsen Technologie.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-white/50">{stat.label}</div>
            <div className="absolute bottom-6 right-6 text-xs text-white/30 flex items-center gap-1">
              {stat.trend} <ArrowUpRight size={12} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-heading font-bold">Derniers Messages</h2>
            <button className="text-xs text-[var(--green-l)] hover:underline">Voir tout</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs font-mono text-white/40 uppercase bg-white/5">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Contact</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg) => (
                  <tr key={msg.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-4">
                      <div className="font-medium text-white">{msg.name}</div>
                      <div className="text-white/40 text-xs">{msg.email}</div>
                    </td>
                    <td className="px-4 py-4 text-white/70">{msg.service}</td>
                    <td className="px-4 py-4 text-white/40">{msg.date}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${
                        msg.status === 'Non lu' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/40'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-white/40 hover:text-white"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-heading font-bold mb-4">Actions Rapides</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm transition-colors flex items-center gap-3">
                <FolderKanban size={16} className="text-[var(--green-l)]" /> Ajouter un projet
              </button>
              <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm transition-colors flex items-center gap-3">
                <PenTool size={16} className="text-[var(--gold)]" /> Écrire un article
              </button>
              <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm transition-colors flex items-center gap-3">
                <GraduationCap size={16} className="text-[var(--purple)]" /> Nouvelle formation
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-heading font-bold mb-4">État du système</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/50">Site Web</span>
                <span className="flex items-center gap-2 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400" /> En ligne</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50">Base de données</span>
                <span className="flex items-center gap-2 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400" /> Connectée</span>
              </div>
              <div className="flex justify-between items-center text-xs text-white/30 pt-2 border-t border-white/5">
                <span>Dernière sauvegarde:</span>
                <span>Aujourd'hui, 04:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
