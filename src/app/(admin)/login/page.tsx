import React from 'react';
import Logo from '@/components/ui/Logo';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="tech-grid opacity-20" />
      
      <div className="w-full max-w-md p-8 glass-card relative z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size={80} className="mb-4" />
          <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase">Espace Administrateur</div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/50 uppercase">Email</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="admin@galsen.sn" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono text-white/50 uppercase">Mot de passe</label>
              <a href="#" className="text-[10px] text-[var(--green-l)] hover:underline">Oublié ?</a>
            </div>
            <input type="password" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-xs">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
