import React from 'react';
import TechGrid from '@/components/ui/TechGrid';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const WHATSAPP_NUMBER = '221700003004';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  const displayServices = services.length > 0 ? services.map(s => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
    features: (() => { try { return JSON.parse(s.features); } catch { return []; } })() as string[],
    color: s.color,
    imageUrl: s.imageUrl,
  })) : [
    {
      slug: 'developpement-web-mobile',
      title: 'Développement Web & Mobile',
      description: "Nous créons des expériences numériques performantes, intuitives et scalables.",
      features: ['Applications Web Progressive (PWA)', 'E-commerce sur mesure', 'Applications Mobile iOS & Android', 'APIs robustes & Microservices'],
      color: '#22C55E',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    },
    {
      slug: 'ia-data-intelligence',
      title: 'IA & Data Intelligence',
      description: "Exploitez la puissance de vos données pour automatiser vos processus.",
      features: ['NLP & Chatbots intelligents', 'Vision par ordinateur', 'Analyse prédictive', 'Architecture Big Data'],
      color: '#F5D020',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  const whatsappUrl = (service: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, je suis intéressé par votre service "${service}".`)}`;

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

      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 space-y-32">
          {displayServices.map((service, index) => {
            const isEven = index % 2 === 0;
            const accentColor = service.color;
            
            return (
              <div key={service.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className={isEven ? '' : 'order-2 lg:order-1'}>
                  {isEven ? (
                    <>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: accentColor + '1A', color: accentColor }}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <h2 className="text-4xl font-heading font-bold text-white mb-6">{service.title}</h2>
                      <p className="text-white/50 mb-6 leading-relaxed">{service.description}</p>
                      {service.features.length > 0 && (
                        <ul className="space-y-4 mb-10">
                          {service.features.slice(0, 4).map((item: string) => (
                            <li key={item} className="flex items-center gap-3 text-white/70">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + '33', color: accentColor }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-4">
                        <Link href={`/services/${service.slug}`} className="btn-primary inline-flex items-center gap-2 text-xs">
                          En savoir plus <ArrowRight size={14} />
                        </Link>
                        <a href={whatsappUrl(service.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-all text-xs font-semibold tracking-widest uppercase">
                          <MessageCircle size={16} /> WhatsApp
                        </a>
                      </div>
                    </>
                  ) : (
                    <Link href={`/services/${service.slug}`} className="glass-card aspect-video relative overflow-hidden group block">
                      {service.imageUrl && (
                        <Image src={service.imageUrl} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tl from-black via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="inline-flex items-center gap-2 text-[var(--green-l)] text-sm font-mono group-hover:gap-3 transition-all">
                          Voir les détails <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
                <div className={isEven ? '' : 'order-1 lg:order-2'}>
                  {isEven ? (
                    <Link href={`/services/${service.slug}`} className="glass-card aspect-video relative overflow-hidden group block">
                      {service.imageUrl && (
                        <Image src={service.imageUrl} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="inline-flex items-center gap-2 text-[var(--green-l)] text-sm font-mono group-hover:gap-3 transition-all">
                          Voir les détails <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: accentColor + '1A', color: accentColor }}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <h2 className="text-4xl font-heading font-bold text-white mb-6">{service.title}</h2>
                      <p className="text-white/50 mb-6 leading-relaxed">{service.description}</p>
                      {service.features.length > 0 && (
                        <ul className="space-y-4 mb-10">
                          {service.features.slice(0, 4).map((item: string) => (
                            <li key={item} className="flex items-center gap-3 text-white/70">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + '33', color: accentColor }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-4">
                        <Link href={`/services/${service.slug}`} className="btn-primary inline-flex items-center gap-2 text-xs">
                          En savoir plus <ArrowRight size={14} />
                        </Link>
                        <a href={whatsappUrl(service.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-all text-xs font-semibold tracking-widest uppercase">
                          <MessageCircle size={16} /> WhatsApp
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WhatsApp Global CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Vous avez un projet en tête ?</h2>
          <p className="text-white/50 mb-10 max-w-lg mx-auto">
            Discutons-en directement sur WhatsApp. Notre équipe vous répond sous 30 minutes.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-black px-8 py-4 rounded-xl font-bold hover:bg-[#25D366]/90 transition-all text-sm uppercase tracking-widest"
          >
            <MessageCircle size={20} /> Nous écrire sur WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
