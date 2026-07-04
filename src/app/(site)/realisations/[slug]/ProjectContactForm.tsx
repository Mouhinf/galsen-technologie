'use client';

import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '221700003004';

interface ProjectContactFormProps {
  projectTitle: string;
  projectCategory: string;
}

export default function ProjectContactForm({ projectTitle, projectCategory }: ProjectContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        service: projectCategory,
        subject: `Demande de projet - ${projectTitle}`,
      }),
    });
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis intéressé par votre projet "${projectTitle}". Pouvez-vous me donner plus d'informations ?`)}`;

  return (
    <div className="sticky top-24 space-y-6">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-medium text-sm"
      >
        <MessageCircle size={20} />
        Contacter sur WhatsApp
      </a>

      <div className="glass-card p-6">
        <h3 className="text-lg font-heading font-bold text-white mb-4">Réaliser un projet similaire</h3>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 size={40} className="mx-auto mb-3 text-[var(--green-l)]" />
            <p className="text-white/70 font-medium">Message envoyé !</p>
            <p className="text-white/70 text-sm mt-1">Nous vous répondrons sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="proj-name" className="sr-only">Votre nom</label>
              <input id="proj-name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Votre nom *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors" />
            </div>
            <div>
              <label htmlFor="proj-email" className="sr-only">Votre email</label>
              <input id="proj-email" required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Votre email *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors" />
            </div>
            <div>
              <label htmlFor="proj-phone" className="sr-only">Votre téléphone</label>
              <input id="proj-phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Votre téléphone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors" />
            </div>
            <div>
              <label htmlFor="proj-message" className="sr-only">Parlez-nous de votre projet</label>
              <textarea id="proj-message" required rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Parlez-nous de votre projet *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full btn-primary text-xs flex items-center justify-center gap-2">
              <Send size={14} /> Envoyer la demande
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
