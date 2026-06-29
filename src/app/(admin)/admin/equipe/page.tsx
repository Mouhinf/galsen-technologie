import React from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';

const team = [
  { id: 1, name: 'Ousmane Diallo', role: 'CEO & Fondateur', active: true },
  { id: 2, name: 'Fatou Sow', role: 'CTO / Lead IA', active: true },
  { id: 3, name: 'Amadou Ndiaye', role: 'Lead Sécurité', active: true },
  { id: 4, name: 'Aminata Kane', role: 'Head of Design', active: true },
  { id: 5, name: 'Ibrahima Ba', role: 'Dev Full-Stack', active: false },
];

export default function AdminEquipePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Équipe</h1>
          <p className="text-white/50 text-sm">Gérez les membres de l'équipe affichés sur le site.</p>
        </div>
        <button className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouveau membre</button>
      </div>

      <div className="space-y-3">
        {team.map((m) => (
          <div key={m.id} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/10 transition-colors group">
            <button className="text-white/20 hover:text-white/50 cursor-grab"><GripVertical size={16} /></button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--green-l)]/20 to-[var(--blue)]/20 flex items-center justify-center text-[var(--green-l)] font-bold border border-white/10">
              {m.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white">{m.name}</div>
              <div className="text-white/30 text-xs font-mono">{m.role}</div>
            </div>
            <span className={`text-[10px] font-mono px-2 py-1 rounded ${m.active ? 'bg-[var(--green-l)]/10 text-[var(--green-l)]' : 'bg-white/5 text-white/30'}`}>
              {m.active ? 'Actif' : 'Inactif'}
            </span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
              <button className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
