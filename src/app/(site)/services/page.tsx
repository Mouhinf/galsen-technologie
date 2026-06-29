import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  // Fallback static services if DB is empty
  const displayServices = services.length > 0 ? services.map(s => ({
    title: s.title,
    description: s.description,
    features: (() => { try { return JSON.parse(s.features); } catch { return []; } })() as string[],
    color: s.color,
    imageUrl: s.imageUrl,
  })) : [
    {
      title: 'Développement Web & Mobile',
      description: "Nous créons des expériences numériques performantes, intuitives et scalables. Du site vitrine à l'application métier complexe, notre approche est centrée sur l'utilisateur et les objectifs business.",
      features: ['Applications Web Progressive (PWA)', 'E-commerce sur mesure', 'Applications Mobile iOS & Android', 'APIs robustes & Microservices'],
      color: 'var(--green-l)',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    },
    {
      title: 'IA & Data Intelligence',
      description: "Exploitez la puissance de vos données pour automatiser vos processus et prendre des décisions éclairées. Nous implémentons des modèles de Machine Learning adaptés à vos besoins.",
      features: ['NLP & Chatbots intelligents', 'Vision par ordinateur', 'Analyse prédictive business', 'Architecture de données & Big Data'],
      color: 'var(--gold)',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <main className="min-h-screen">
      <TechGrid />
      <Navbar />
      
      <section className="pt-40 pb-20 relative">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="section-label mb-6">Expertise & Solutions</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">Nos Services</h1>
          <p className="text-white/50 text-xl max-w-2xl font-body leading-relaxed">
            Nous combinons innovation de pointe et expertise locale pour offrir des solutions technologiques transformatrices.
          </p>
        </div>
      </section>

      {/* Dynamic Services */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 space-y-32">
          {displayServices.map((service, index) => {
            const isEven = index % 2 === 0;
            const accentColor = service.color.startsWith('var(') ? service.color : service.color;
            
            return (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center`}>
                <div className={isEven ? '' : 'order-2 lg:order-1'}>
                  {isEven ? null : null}
                  {isEven ? (
                    // Text first
                    <>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: accentColor + '1A', color: accentColor }}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <h2 className="text-4xl font-heading font-bold text-white mb-6">{service.title}</h2>
                      <p className="text-white/50 mb-6 leading-relaxed">{service.description}</p>
                      {service.features.length > 0 && (
                        <ul className="space-y-4 mb-10">
                          {service.features.map((item: string) => (
                            <li key={item} className="flex items-center gap-3 text-white/70">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + '33', color: accentColor }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      <button className="btn-primary">Demander un devis</button>
                    </>
                  ) : (
                    // Image first
                    <div className="glass-card aspect-video relative overflow-hidden group">
                      {service.imageUrl && (
                        <img src={service.imageUrl} className="object-cover w-full h-full opacity-50 group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tl from-black via-transparent to-transparent" />
                    </div>
                  )}
                </div>
                <div className={isEven ? '' : 'order-1 lg:order-2'}>
                  {isEven ? (
                    <div className="glass-card aspect-video relative overflow-hidden group">
                      {service.imageUrl && (
                        <img src={service.imageUrl} className="object-cover w-full h-full opacity-50 group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: accentColor + '1A', color: accentColor }}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <h2 className="text-4xl font-heading font-bold text-white mb-6">{service.title}</h2>
                      <p className="text-white/50 mb-6 leading-relaxed">{service.description}</p>
                      {service.features.length > 0 && (
                        <ul className="space-y-4 mb-10">
                          {service.features.map((item: string) => (
                            <li key={item} className="flex items-center gap-3 text-white/70">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + '33', color: accentColor }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      <button className="btn-primary">Demander un devis</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-[800px] mx-auto px-4 text-center">
           <h2 className="text-3xl font-display font-bold mb-12">Questions Fréquentes</h2>
           <div className="space-y-4 text-left">
             {[
               { q: "Quels sont vos délais moyens ?", a: "Tout dépend de la complexité, mais un MVP web est généralement livré en 6 à 10 semaines." },
               { q: "Proposez-vous une maintenance ?", a: "Oui, nous proposons des contrats de support et maintenance 24/7." },
               { q: "Travaillez-vous à l'international ?", a: "Absolument, nous accompagnons des clients partout en Afrique et en Europe." }
             ].map((faq, i) => (
               <div key={i} className="p-6 glass-card">
                 <h4 className="font-heading font-bold mb-2">{faq.q}</h4>
                 <p className="text-white/40 text-sm">{faq.a}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
