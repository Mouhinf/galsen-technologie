import React from 'react';
import { authenticate } from '@/lib/loginAction';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function LoginPage(props: { searchParams?: { error?: string } }) {
  const error = props?.searchParams?.error;
  const errorMessages: Record<string, string> = {
    '1': 'Email ou mot de passe incorrect',
    '2': 'Une erreur est survenue',
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="tech-grid opacity-20" />
      
      <div className="w-full max-w-md p-8 glass-card relative z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size={80} className="mb-4" />
          <h1 className="text-xl font-heading font-bold text-white mb-1">Connexion Admin</h1>
          <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase">Accès réservé au personnel</div>
        </div>

        <form action={authenticate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/50 uppercase">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors"
              placeholder="admin@galsen.sn"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/50 uppercase">Mot de passe</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center font-mono bg-red-400/10 py-2 rounded-lg">
              {errorMessages[error] || 'Erreur inconnue'}
            </div>
          )}

          <button type="submit" className="btn-primary w-full py-4 text-xs">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
