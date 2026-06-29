import React from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Calendar, Users } from 'lucide-react';

const formations = [
  { id: 1, title: 'Full-Stack Web Development', level: 'Débutant', duration: '12 Semaines', price: '350,000 FCFA', places: 20, active: true, nextSession: '15 Sep 2024' },
  { id: 2, title: 'Intelligence Artificielle & Data Science', level: 'Intermédiaire', duration: '16 Semaines', price: '500,000 FCFA', places: 15, active: true, nextSession: '01 Oct 2024' },
  { id: 3, title: 'Cybersécurité & Pentesting', level: 'Avancé', duration: '10 Semaines', price: '450,000 FCFA', places: 12, active: true, nextSession: '15 Oct 2024' },
  { id: 4, title: 'DevOps & Cloud Engineering', level: 'Intermédiaire', duration: '8 Semaines', price: '400,000 FCFA', places: 10, active: false, nextSession: '-' },
];

export default function AdminFormationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Formations</h1>
          <p className="text-white/50 text-sm">Gérez les programmes de formation proposés.</p>
        </div>
        <button className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouvelle formation</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formations.map((f) => (
          <div key={f.id} className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/10 transition-colors group relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-heading font-bold text-white mb-1">{f.title}</h3>
                <div className="flex gap-2">
                  <span className="text-[9px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">{f.level}</span>
                  <span className="text-[9px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">{f.duration}</span>
                </div>
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-mono ${f.active ? 'text-[var(--green-l)]' : 'text-white/30'}`}>
                {f.active ? <Eye size={12} /> : <EyeOff size={12} />}
                {f.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/5">
              <div>
                <div className="text-[10px] font-mono text-white/30 mb-1">TARIF</div>
                <div className="text-sm font-bold text-[var(--gold)]">{f.price}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/30 mb-1 flex items-center gap-1"><Users size={10} /> PLACES</div>
                <div className="text-sm font-bold">{f.places}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/30 mb-1 flex items-center gap-1"><Calendar size={10} /> SESSION</div>
                <div className="text-sm font-bold">{f.nextSession}</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 btn-secondary text-[10px] py-2 flex items-center justify-center gap-1"><Pencil size={12} /> Modifier</button>
              <button className="p-2 rounded-lg border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
