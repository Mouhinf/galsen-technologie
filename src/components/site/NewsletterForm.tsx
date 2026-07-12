'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      setStatus('success');
      setMessage(data.message || 'Merci pour votre inscription !');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Adresse email pour la newsletter"
        placeholder="votre@email.com"
        required
        disabled={status === 'loading' || status === 'success'}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--green-l)] transition-colors disabled:opacity-50"
      />
      {status === 'success' ? (
        <p className="flex items-center gap-2 text-[var(--green-l)] text-xs">
          <CheckCircle2 size={14} />
          {message}
        </p>
      ) : (
        <>
          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            aria-label="S'abonner à la newsletter"
            className="btn-primary w-full text-[10px] py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <Loader2 size={12} className="animate-spin" />
            ) : null}
            S&apos;abonner
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-xs">{message}</p>
          )}
        </>
      )}
    </form>
  );
}
