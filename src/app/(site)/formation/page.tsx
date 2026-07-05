import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { TrackedLink } from '@/components/ui/TrackedLink';

export const metadata = {
  title: 'Formation | Galsen Technologie',
  description: 'Formations tech à Dakar : développement web, IA, data science, cybersécurité et cloud. Bootcamps et programmes certifiants.',
  alternates: { canonical: 'https://galsen.lingueredigital.com/formation' },
};

const formations = [
  {
    title: "Full-Stack Web Development",
    level: "Débutant à Intermédiaire",
    duration: "12 Semaines",
    schedule: "Soirs & Week-ends",
    price: "350,000 FCFA",
    desc: "Maîtrisez React, Next.js, Node.js et les bases de données. Devenez un développeur autonome.",
    color: "var(--green-l)"
  },
  {
    title: "Intelligence Artificielle & Data Science",
    level: "Intermédiaire",
    duration: "16 Semaines",
    schedule: "Temps plein",
    price: "500,000 FCFA",
    desc: "Plongez dans le Machine Learning avec Python. TensorFlow, traitement de données et NLP.",
    color: "var(--gold)"
  },
  {
    title: "Cybersécurité & Pentesting",
    level: "Avancé",
    duration: "10 Semaines",
    schedule: "Week-ends",
    price: "450,000 FCFA",
    desc: "Apprenez à sécuriser des infrastructures et réaliser des audits de sécurité professionnels.",
    color: "var(--red)"
  }
];

export default function FormationPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--purple)]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1320px] mx-auto px-4 text-center relative z-10">
          <div className="section-label justify-center mb-6 !text-[var(--purple)]">
            <span className="bg-[var(--purple)] w-6 h-[1px] opacity-50" />
            Académie Galsen
            <span className="bg-[var(--purple)] w-6 h-[1px] opacity-50" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">Formez-vous aux <br/>métiers de demain</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto font-body">
            Bootcamps intensifs dispensés par nos experts pour vous propulser dans le secteur de la tech.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {formations.map((f, i) => (
            <div key={i} className="glass-card p-8 flex flex-col relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: f.color }}
              />
              
              <div className="flex gap-2 mb-6">
                <span className="text-[9px] font-mono border border-white/10 px-2 py-1 rounded text-white/70 uppercase">{f.duration}</span>
                <span className="text-[9px] font-mono border border-white/10 px-2 py-1 rounded text-white/70 uppercase">{f.level}</span>
              </div>
              
              <h2 className="text-2xl font-heading font-bold mb-4">{f.title}</h2>
              <p className="text-white/70 text-sm mb-8 flex-grow">{f.desc}</p>
              
              <div className="border-t border-white/5 pt-6 mt-auto">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="text-[10px] font-mono text-white/70 mb-1">PROCHAINE SESSION</div>
                    <div className="text-sm font-bold">15 Septembre 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/70 mb-1">TARIF</div>
                    <div className="text-lg font-bold" style={{ color: f.color }}>{f.price}</div>
                  </div>
                </div>
                <TrackedLink href="https://wa.me/221700003004?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20la%20formation%20" label="formation_cta" target="_blank" rel="noopener noreferrer" className="w-full btn-secondary text-xs py-3 hover:!bg-white/5 inline-block text-center">Télécharger le programme</TrackedLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
