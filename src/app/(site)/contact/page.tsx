import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-20">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            <div>
              <div className="section-label mb-6">Contactez-nous</div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">Parlons de votre projet</h1>
              <p className="text-white/50 text-xl font-body mb-12 leading-relaxed">
                Une idée ? Un besoin urgent ? Notre équipe est prête à vous accompagner.
              </p>

              <div className="space-y-8">
                {[
                  { icon: "📍", label: "Adresse", value: "Dakar, Sénégal - Plateau, Rue Carnot" },
                  { icon: "📞", label: "Téléphone", value: "+221 33 800 00 00" },
                  { icon: "✉", label: "Email", value: "contact@galsentechnologie.sn" },
                  { icon: "⏰", label: "Horaires", value: "Lun–Ven: 8h – 18h" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">{item.icon}</div>
                    <div>
                      <div className="text-white/30 text-[10px] uppercase tracking-widest font-mono mb-1">{item.label}</div>
                      <div className="text-white font-heading font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-10 relative">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Nom complet *</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="Jean Diop" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Email *</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" placeholder="jean@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Service souhaité</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors appearance-none">
                    <option className="bg-black">Web & Mobile</option>
                    <option className="bg-black">IA & Data</option>
                    <option className="bg-black">Cybersécurité</option>
                    <option className="bg-black">Cloud & Infra</option>
                    <option className="bg-black">Formation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Message *</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors h-32 resize-none" placeholder="Décrivez votre projet..."></textarea>
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-xs">Envoyer le message</button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
