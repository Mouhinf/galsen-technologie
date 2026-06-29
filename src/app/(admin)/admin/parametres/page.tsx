import React from 'react';
import { Save, Globe, Search as SearchIcon, Mail, ShieldCheck } from 'lucide-react';

const tabs = [
  { name: 'Général', icon: Globe },
  { name: 'SEO', icon: SearchIcon },
  { name: 'Emails', icon: Mail },
  { name: 'Sécurité', icon: ShieldCheck },
];

export default function AdminParametresPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Paramètres</h1>
        <p className="text-white/50 text-sm">Configuration générale du site Galsen Technologie.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-0">
        {tabs.map((tab, i) => (
          <button key={tab.name} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            i === 0 ? 'border-[var(--green-l)] text-[var(--green-l)]' : 'border-transparent text-white/40 hover:text-white'
          }`}>
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* General Settings Form */}
      <div className="max-w-2xl space-y-8">
        <div className="space-y-6 p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <h3 className="font-heading font-bold text-lg border-b border-white/5 pb-4">Informations du site</h3>
          
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/50 uppercase">Nom du site</label>
            <input type="text" defaultValue="Galsen Technologie" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/50 uppercase">Tagline</label>
            <input type="text" defaultValue="IA & Tech au Sénégal" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/50 uppercase">Email de contact</label>
              <input type="email" defaultValue="contact@galsentechnologie.sn" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/50 uppercase">Téléphone</label>
              <input type="tel" defaultValue="+221 33 800 00 00" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/50 uppercase">Adresse</label>
            <input type="text" defaultValue="Dakar, Sénégal - Plateau, Rue Carnot" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
          </div>
        </div>

        <div className="space-y-6 p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <h3 className="font-heading font-bold text-lg border-b border-white/5 pb-4">Réseaux sociaux</h3>
          {['LinkedIn', 'Twitter / X', 'GitHub', 'WhatsApp'].map((network) => (
            <div key={network} className="space-y-2">
              <label className="text-[10px] font-mono text-white/50 uppercase">{network}</label>
              <input type="url" placeholder={`https://${network.toLowerCase().replace(' / x', '')}.com/...`} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
            </div>
          ))}
        </div>

        <button className="btn-primary flex items-center gap-2">
          <Save size={16} /> Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
