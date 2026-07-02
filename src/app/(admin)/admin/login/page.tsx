'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function LoginPage(props: { searchParams?: { error?: string } }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = props?.searchParams?.error
    ? 'Email ou mot de passe incorrect'
    : '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    await signIn('credentials', {
      email: (form.elements as any).email.value,
      password: (form.elements as any).password.value,
      callbackUrl: '/admin',
    });
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

          {errorMessage && (
            <div className="text-red-400 text-sm text-center font-mono bg-red-400/10 py-2 rounded-lg">{errorMessage}</div>
          )}

          <button type="submit" className="btn-primary w-full py-4 text-xs">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
