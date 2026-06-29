'use client';

import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, CheckCircle2, ExternalLink, Calendar, User } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '221700003004';

interface ProjectDetailClientProps {
  project: {
    title: string;
    description: string;
    content: string;
    category: string;
    client: string | null;
    year: string | null;
    imageUrl: string;
    liveUrl: string | null;
    techStack: string[];
  };
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        service: project.category,
        subject: `Demande de projet - ${project.title}`,
      }),
    });
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis intéressé par votre projet "${project.title}". Pouvez-vous me donner plus d'informations ?`)}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="max-w-[1000px] mx-auto px-4 relative z-10">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-mono mb-8 transition-colors">
            <ArrowLeft size={14} /> Retour aux réalisations
          </Link>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-6 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-[var(--green-l)]/10 text-[var(--green-l)] px-3 py-1 rounded-full">{project.category}</span>
            </span>
            {project.client && (
              <span className="flex items-center gap-2"><User size={14} /> {project.client}</span>
            )}
            {project.year && (
              <span className="flex items-center gap-2"><Calendar size={14} /> {project.year}</span>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--blue)] hover:underline">
                <ExternalLink size={14} /> Site en ligne
              </a>
            )}
          </div>

          <p className="text-white/60 text-xl max-w-3xl leading-relaxed mt-8">{project.description}</p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden glass-card">
              <img src={project.imageUrl} alt={project.title} className="w-full aspect-video object-cover" />
            </div>

            {/* Tech Stack */}
            {project.techStack.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-6">Technologies utilisées</h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-mono bg-white/5 text-white/70 border border-white/10 px-4 py-2 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            {project.content && (
              <div className="prose prose-invert prose-green max-w-none">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </div>
            )}
          </div>

          {/* Right: Contact Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* WhatsApp */}
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
                <h3 className="text-lg font-heading font-bold text-white mb-4">Réaliser un projet similaire</h3>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={40} className="mx-auto mb-3 text-[var(--green-l)]" />
                    <p className="text-white/70 font-medium">Message envoyé !</p>
                    <p className="text-white/40 text-sm mt-1">Nous vous répondrons sous 24h.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Votre nom *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors" />
                    </div>
                    <div>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Votre email *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors" />
                    </div>
                    <div>
                      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Votre téléphone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors" />
                    </div>
                    <div>
                      <textarea required rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Parlez-nous de votre projet *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none placeholder-white/30 transition-colors resize-none" />
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
