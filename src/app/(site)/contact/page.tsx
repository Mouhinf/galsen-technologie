'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: 'Web & Mobile' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject: `Demande - ${form.service}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-20">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            <motion.div initial="hidden" animate="visible">
              <motion.div variants={fadeUp} custom={0} className="section-label mb-6">Contactez-nous</motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-display font-bold text-white mb-8">Parlons de votre projet</motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-white/50 text-xl font-body mb-12 leading-relaxed">
                Une idée ? Un besoin urgent ? Notre équipe est prête à vous accompagner.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-8">
                {[
                  { icon: "📍", label: "Adresse", value: "Dakar, Sénégal - Plateau, Rue Carnot" },
                  { icon: "📞", label: "Téléphone", value: "+221 33 800 00 00" },
                  { icon: "✉", label: "Email", value: "contact@galsentechnologie.sn" },
                  { icon: "⏰", label: "Horaires", value: "Lun–Ven: 8h – 18h" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-white/30 text-[10px] uppercase tracking-widest font-mono mb-1">{item.label}</div>
                      <div className="text-white font-heading font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-10 relative"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--green-l)]/20 border border-[var(--green-l)]/30 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-[var(--green-l)]" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Message envoyé !</h3>
                  <p className="text-white/50 text-sm max-w-sm">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/50 uppercase">Nom complet *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="Jean Diop" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/50 uppercase">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="jean@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Téléphone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="+221 77 000 00 00" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Service souhaité</label>
                    <select name="service" value={form.service} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors appearance-none">
                      <option className="bg-black">Web & Mobile</option>
                      <option className="bg-black">IA & Data</option>
                      <option className="bg-black">Cybersécurité</option>
                      <option className="bg-black">Cloud & Infra</option>
                      <option className="bg-black">Formation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors h-32 resize-none" placeholder="Décrivez votre projet..."></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-xs flex items-center justify-center gap-2">
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={14} /> Envoyer le message</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
