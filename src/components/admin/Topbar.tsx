import React from 'react';
import { Search, Bell } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="h-16 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 text-sm text-white/50">
        <span>Admin</span>
        <span>/</span>
        <span className="text-white">Dashboard</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-[var(--green-l)] transition-colors w-64"
          />
        </div>
        
        <button className="relative text-white/50 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--red)] border border-black" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
