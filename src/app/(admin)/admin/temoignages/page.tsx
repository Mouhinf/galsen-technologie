import React from 'react';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';

const temoignages = [
  { id: 1, name: 'Mamadou Fall', company: 'Wave Sénégal', role: 'CTO', note: 5, published: true, text: 'Galsen Technologie a transformé notre approche de la donnée.' },
  { id: 2, name: 'Awa Diop', company: 'Orange', role: 'Directrice Innovation', note: 5, published: true, text: 'Le professionnalisme et la réactivité de Galsen sont sans égal.' },
  { id: 3, name: 'Jean-Pierre Kouamé', company: 'TechHub Dakar', role: 'Fondateur', note: 5, published: true, text: 'Des solutions robustes et modernes qui répondent aux enjeux de demain.' },
  { id: 4, name: 'Ibrahima Sarr', company: 'NSIA', role: 'DSI', note: 4, published: false, text: 'Bon travail sur notre infrastructure cloud.' },
];

export default function AdminTemoignagesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Témoignages</h1>
          <p className="text-white/50 text-sm">Gérez les avis clients affichés sur le site.</p>
        </div>
        <button className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouveau témoignage</button>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] font-mono text-white/30 uppercase bg-white/[0.03]">
            <tr>
              <th className="px-6 py-4">Nom</th>
              <th className="px-6 py-4">Entreprise</th>
              <th className="px-6 py-4">Note</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {temoignages.map((t) => (
              <tr key={t.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-white/30 text-xs">{t.role}</div>
                </td>
                <td className="px-6 py-4 text-white/60">{t.company}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className={j < t.note ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-white/10'} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-[10px] font-mono uppercase ${t.published ? 'text-[var(--green-l)]' : 'text-white/30'}`}>
                    {t.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {t.published ? 'Publié' : 'Masqué'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
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
