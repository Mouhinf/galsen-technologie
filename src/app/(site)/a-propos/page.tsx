import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';


const team = [
  { name: "Ousmane Diallo", role: "CEO & Fondateur", img: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935" },
  { name: "Fatou Sow", role: "CTO / Lead IA", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974" },
  { name: "Amadou Ndiaye", role: "Lead Sécurité", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974" },
  { name: "Aminata Kane", role: "Head of Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976" }
];

export default function AproposPage() {
  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-20 relative">
        <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-6">Notre Histoire</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              Pionniers de la tech en Afrique de l'Ouest.
            </h1>
            <div className="space-y-6 text-white/50 text-lg font-body">
              <p>Fondée en 2019 à Dakar, Galsen Technologie est née d'une conviction forte : l'Afrique a le talent et le potentiel pour être un acteur majeur de l'innovation technologique mondiale.</p>
              <p>Nous ne nous contentons pas d'utiliser la technologie, nous la façonnons pour résoudre des défis locaux et internationaux, en mettant l'accent sur l'excellence, l'éthique et l'impact.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
              <div>
                <div className="text-4xl font-display font-bold text-[var(--green-l)] mb-2">100%</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Talent Local</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-[var(--gold)] mb-2">15+</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Pays Desservis</div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] glass-card overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" className="object-cover w-full h-full opacity-60 grayscale" alt="Team" />
            <div className="absolute inset-0 bg-[var(--green-l)]/10 mix-blend-overlay" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-6">Leadership</div>
            <h2 className="text-4xl font-display font-bold text-white">L'équipe dirigeante</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group text-center">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-[var(--green-l)] transition-colors relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-4">{member.role}</div>
                <div className="flex justify-center gap-4 text-white/30">
                  <span>IN</span>
                  <span>TW</span>
                  <span>GH</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
