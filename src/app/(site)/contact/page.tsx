'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useTracking } from '@/lib/hooks/useTracking';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { trackEvent } = useTracking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: 'Web & Mobile' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject: `Demande - ${form.service}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de l\'envoi. Réessayez.');
      }
      setSubmitted(true);
      trackEvent('form_submit', { form: 'contact', service: form.service });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-20">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            <div style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>
              <div className="section-label mb-6 animate-fade-in-up" style={{ animationDelay: '0s' }}>Contactez-nous</div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Parlons de votre projet</h1>
              <p className="text-white/70 text-xl font-body mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Une idée ? Un besoin urgent ? Notre équipe est prête à vous accompagner.
              </p>

              <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {[
                  { icon: "📍", label: "Adresse", value: "Dakar, Sénégal - Plateau, Rue Carnot" },
                  { icon: "📞", label: "Téléphone", value: "+221 70 000 30 04" },
                  { icon: "✉", label: "Email", value: "galsentechnologie@gmail.com" },
                  { icon: "⏰", label: "Horaires", value: "Lun–Ven: 8h – 18h" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0"><span aria-hidden="true">{item.icon}</span></div>
                    <div>
                      <div className="text-white/70 text-[10px] uppercase tracking-widest font-mono mb-1">{item.label}</div>
                      <div className="text-white font-heading font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{ animation: 'fadeInRight 0.6s ease-out 0.3s forwards', opacity: 0 }}
              className="glass-card p-10 relative"
            >
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--green-l)]/20 border border-[var(--green-l)]/30 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-[var(--green-l)]" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Message envoyé !</h3>
                  <p className="text-white/70 text-sm max-w-sm">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-mono text-white/70 uppercase">Nom complet *</label>
                      <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="Jean Diop" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-mono text-white/70 uppercase">Email *</label>
                      <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="jean@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-[10px] font-mono text-white/70 uppercase">Téléphone</label>
                    <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="+221 77 000 00 00" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="text-[10px] font-mono text-white/70 uppercase">Service souhaité</label>
                    <select id="contact-service" name="service" value={form.service} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors appearance-none">
                      <option className="bg-black">Web & Mobile</option>
                      <option className="bg-black">IA & Data</option>
                      <option className="bg-black">Cybersécurité</option>
                      <option className="bg-black">Cloud & Infra</option>
                      <option className="bg-black">Formation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] font-mono text-white/70 uppercase">Message *</label>
                    <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors h-32 resize-none" placeholder="Décrivez votre projet..."></textarea>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs text-center">{error}</p>
                  )}
                  <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-xs flex items-center justify-center gap-2">
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={14} /> Envoyer le message</>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
