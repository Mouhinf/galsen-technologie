'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, FolderKanban, FileText, GraduationCap, ArrowUpRight, MoreVertical, PenTool, RefreshCw } from 'lucide-react';

interface Stats {
  unreadMessages: number;
  publishedProjects: number;
  publishedPosts: number;
  activeFormations: number;
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  service: string;
  subject: string;
  status: string;
  createdAt: string;
}

const statusLabel: Record<string, string> = { UNREAD: 'Non lu', READ: 'Lu', ARCHIVED: 'Archivé' };
const statusColor: Record<string, string> = {
  UNREAD: 'bg-blue-500/20 text-blue-400',
  READ: 'bg-white/10 text-white/40',
  ARCHIVED: 'bg-white/5 text-white/30',
};

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
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

const statConfig = [
  { key: 'unreadMessages' as const, label: 'Messages non lus', icon: MessageSquare, color: 'text-blue-400', link: '/admin/messages' },
  { key: 'publishedProjects' as const, label: 'Projets publiés', icon: FolderKanban, color: 'text-green-400', link: '/admin/projets' },
  { key: 'publishedPosts' as const, label: 'Articles blog', icon: FileText, color: 'text-[var(--gold)]', link: '/admin/blog' },
  { key: 'activeFormations' as const, label: 'Formations actives', icon: GraduationCap, color: 'text-purple-400', link: '/admin/formations' },
];

const quickActions = [
  { label: 'Ajouter un projet', icon: FolderKanban, color: 'text-[var(--green-l)]', href: '/admin/projets' },
  { label: 'Écrire un article', icon: PenTool, color: 'text-[var(--gold)]', href: '/admin/blog' },
  { label: 'Nouvelle formation', icon: GraduationCap, color: 'text-purple-400', href: '/admin/formations' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setRecentMessages(data.recentMessages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Vue d'ensemble</h1>
          <p className="text-white/50 text-sm">Bienvenue sur le tableau de bord Galsen Technologie.</p>
        </div>
        <button onClick={fetchData} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfig.map((stat) => {
          const value = stats ? stats[stat.key] : '—';
          return (
            <Link key={stat.key} href={stat.link} className="block bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden hover:bg-white/[0.07] transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              {loading ? (
                <div className="h-8 w-12 bg-white/5 rounded animate-pulse mb-1" />
              ) : (
                <div className="text-3xl font-display font-bold mb-1">{value}</div>
              )}
              <div className="text-sm text-white/50">{stat.label}</div>
              <div className="absolute bottom-6 right-6 text-xs text-white/20 group-hover:text-white/50 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-heading font-bold">Derniers Messages</h2>
            <Link href="/admin/messages" className="text-xs text-[var(--green-l)] hover:underline">Voir tout</Link>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                    <div className="flex-1"><div className="h-4 bg-white/5 rounded w-32 animate-pulse mb-2" /><div className="h-3 bg-white/5 rounded w-24 animate-pulse" /></div>
                    <div className="h-4 bg-white/5 rounded w-20 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-16 animate-pulse" />
                    <div className="h-5 bg-white/5 rounded w-14 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <p className="text-white/30 text-sm py-8 text-center font-mono">Aucun message pour le moment.</p>
            ) : (
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
                      <td className="px-4 py-4 text-white/40 text-xs">{formatDate(msg.createdAt)}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${statusColor[msg.status] || 'bg-white/10 text-white/40'}`}>
                          {statusLabel[msg.status] || msg.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link href="/admin/messages" className="text-white/40 hover:text-white"><MoreVertical size={16} /></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-heading font-bold mb-4">Actions Rapides</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm transition-colors flex items-center gap-3"
                >
                  <action.icon size={16} className={action.color} /> {action.label}
                </Link>
              ))}
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
