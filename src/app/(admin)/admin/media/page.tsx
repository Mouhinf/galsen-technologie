import React from 'react';
import { Upload, Grid3X3, List, Trash2, Copy, FileImage, FileText, Film } from 'lucide-react';

const files = [
  { id: 1, name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', date: '24 Mai 2024' },
  { id: 2, name: 'logo-galsen.png', type: 'image', size: '145 KB', date: '20 Mai 2024' },
  { id: 3, name: 'projet-ai-health.jpg', type: 'image', size: '1.8 MB', date: '18 Mai 2024' },
  { id: 4, name: 'brochure-2024.pdf', type: 'document', size: '3.2 MB', date: '15 Mai 2024' },
  { id: 5, name: 'demo-reel.mp4', type: 'video', size: '48 MB', date: '10 Mai 2024' },
  { id: 6, name: 'team-photo.jpg', type: 'image', size: '2.1 MB', date: '05 Mai 2024' },
];

const typeIcon = (type: string) => {
  if (type === 'image') return <FileImage size={20} className="text-[var(--blue)]" />;
  if (type === 'document') return <FileText size={20} className="text-[var(--gold)]" />;
  return <Film size={20} className="text-[var(--purple)]" />;
};

export default function AdminMediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Médias</h1>
          <p className="text-white/50 text-sm">Gérez les fichiers uploadés sur la plateforme.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <button className="p-2 bg-white/10 text-white"><Grid3X3 size={16} /></button>
            <button className="p-2 text-white/40 hover:text-white"><List size={16} /></button>
          </div>
          <button className="btn-primary text-xs flex items-center gap-2"><Upload size={16} /> Uploader</button>
        </div>
      </div>

      {/* Drop zone */}
      <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-[var(--green-l)]/30 transition-colors cursor-pointer">
        <Upload size={32} className="mx-auto text-white/20 mb-4" />
        <p className="text-white/40 text-sm mb-1">Glissez-déposez vos fichiers ici</p>
        <p className="text-white/20 text-xs">ou cliquez pour sélectionner (PNG, JPG, PDF, MP4)</p>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {files.map((f) => (
          <div key={f.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/10 transition-colors group">
            <div className="aspect-square rounded-lg bg-white/[0.03] flex items-center justify-center mb-3">
              {typeIcon(f.type)}
            </div>
            <div className="text-xs font-medium text-white truncate mb-1">{f.name}</div>
            <div className="text-[10px] text-white/30">{f.size} · {f.date}</div>
            <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Copy size={12} className="mx-auto" /></button>
              <button className="flex-1 p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={12} className="mx-auto" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
