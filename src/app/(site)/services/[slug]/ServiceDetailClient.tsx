'use client';

import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '221700003004';

interface ServiceDetailClientProps {
  service: {
    title: string;
    description: string;
    content: string;
    color: string;
    imageUrl: string | null;
    features: string[];
  };
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        service: service.title,
        subject: `Demande de devis - ${service.title}`,
      }),
    });
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis intéressé par votre service "${service.title}". Pouvez-vous me donner plus d'informations ?`)}`;

  const color = service.color.startsWith('var') ? '#22C55E' : service.color;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0">
          {service.imageUrl && (
            <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="max-w-[1000px] mx-auto px-4 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-mono mb-8 transition-colors">
            <ArrowLeft size={14} /> Retour aux services
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: color + '20', color }}>
              {service.title.charAt(0)}
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-[3px] uppercase" style={{ color }}>Service</div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white">{service.title}</h1>
            </div>
          </div>

          <p className="text-white/60 text-xl max-w-3xl leading-relaxed">{service.description}</p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Features + Content */}
          <div className="lg:col-span-3 space-y-10">
            {service.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-6">Ce que nous proposons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-4 glass-card">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '30', color }}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.content && (
              <div className="prose prose-invert prose-green max-w-none">
                <div dangerouslySetInnerHTML={{ __html: service.content }} />
              </div>
            )}
          </div>

          {/* Right: Contact Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-medium text-sm"
              >
                <MessageCircle size={20} />
                Contacter sur WhatsApp
              </a>

              {/* Contact Form */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-4">Demander un devis</h3>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color }} />
                    <p className="text-white/70 font-medium">Message envoyé !</p>
                    <p className="text-white/40 text-sm mt-1">Nous vous répondrons sous 24h.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Votre nom *"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="Votre email *"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="Votre téléphone"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Parlez-nous de votre projet *"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors resize-none"
                      />
                    </div>
                    <button type="submit" className="w-full btn-primary text-xs flex items-center justify-center gap-2">
                      <Send size={14} /> Envoyer la demande
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
