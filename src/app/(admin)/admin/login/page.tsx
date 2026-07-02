'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { loginAction } from '@/lib/loginAction';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(result.error || 'Erreur inconnue');
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 focus:border-[var(--green-l)] outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center font-mono bg-red-400/10 py-2 rounded-lg">{error}</div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-xs flex items-center justify-center gap-2">
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
