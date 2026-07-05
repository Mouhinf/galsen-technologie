'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Inbox, FolderKanban, PenTool, 
  GraduationCap, Star, Users, Image as ImageIcon, Settings, LogOut, BarChart3 
} from 'lucide-react';

const menuGroups = [
  {
    title: 'GÉNÉRAL',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Messages', href: '/admin/messages', icon: Inbox },
      { name: 'Statistiques', href: '/admin/statistiques', icon: BarChart3 },
    ]
  },
  {
    title: 'CONTENU',
    items: [
      { name: 'Services', href: '/admin/services', icon: FolderKanban },
      { name: 'Projets', href: '/admin/projets', icon: FolderKanban },
      { name: 'Blog', href: '/admin/blog', icon: PenTool },
      { name: 'Formations', href: '/admin/formations', icon: GraduationCap },
      { name: 'Témoignages', href: '/admin/temoignages', icon: Star },
    ]
  },
  {
    title: 'GESTION',
    items: [
      { name: 'Équipe', href: '/admin/equipe', icon: Users },
      { name: 'Médias', href: '/admin/media', icon: ImageIcon },
      { name: 'Paramètres', href: '/admin/parametres', icon: Settings },
    ]
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="fixed top-0 left-0 w-[240px] h-screen bg-[#0A0A0A] border-r border-white/5 flex flex-col z-40">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-white/5">
        <Logo size={32} />
        <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/50">ADMIN</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {menuGroups.map((group, i) => (
          <div key={i}>
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3 px-2">
              {group.title}
            </div>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors group",
                    pathname === item.href
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={16} className="group-hover:text-[var(--green-l)] transition-colors" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-[var(--green-l)]/20 flex items-center justify-center text-[var(--green-l)] font-bold text-sm uppercase">
            {session?.user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{session?.user?.name || 'Admin'}</div>
            <div className="text-[10px] text-white/40 truncate">{session?.user?.email || 'admin@galsen.sn'}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-2 py-2 w-full rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
