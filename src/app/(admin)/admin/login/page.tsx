import React from 'react';
import Logo from '@/components/ui/Logo';
import crypto from 'crypto';

export default async function LoginPage(props: { searchParams?: { error?: string } }) {
  const errorMessage = props?.searchParams?.error
    ? 'Email ou mot de passe incorrect'
    : '';

  const baseUrl = process.env.NEXTAUTH_URL || 'https://galsen-technologie.vercel.app';
  let csrfToken = '';

  try {
    const res = await fetch(`${baseUrl}/api/auth/csrf`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    const data = await res.json();
    csrfToken = data.csrfToken ?? '';

    if (csrfToken) {
      const secret = process.env.AUTH_SECRET || 'fallback';
      const hash = crypto.createHmac('sha256', secret).update(csrfToken).digest('hex');
      const cookieValue = `${csrfToken}|${hash}`;

      const { cookies } = await import('next/headers');
      const cookieStore = cookies();
      cookieStore.set('__Host-authjs.csrf-token', cookieValue, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
    }
  } catch {}

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="tech-grid opacity-20" />
      
      <div className="w-full max-w-md p-8 glass-card relative z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size={80} className="mb-4" />
          <h1 className="text-xl font-heading font-bold text-white mb-1">Connexion Admin</h1>
          <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase">Accès réservé au personnel</div>
        </div>

        <form action="/api/auth/callback/credentials" method="POST" className="space-y-6">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <input type="hidden" name="callbackUrl" value="/admin" />

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
            <input
              name="password"
              type="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors"
              placeholder="••••••••"
            />
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
