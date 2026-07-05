import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { Service } from '@prisma/client';

interface ServicesGridProps {
  services?: Service[];
}

const ICON_MAP: Record<string, string> = {
  Code2: '💻',
  BrainCircuit: '🧠',
  Shield: '🛡️',
  Cloud: '☁️',
  GraduationCap: '🎓',
  Cpu: '🔲',
  Database: '🗄️',
  Globe: '🌐',
  Rocket: '🚀',
  Zap: '⚡',
};

const ServicesGrid = ({ services = [] }: ServicesGridProps) => {
  const getTags = (s: Service) => {
    try { return JSON.parse(s.features).slice(0, 3); } catch { return []; }
  };

  const fallbackServices = [
    { title: 'Web & Mobile', description: 'Sites, apps PWA, e-commerce sur mesure.', icon: '💻', color: '#22C55E', badge: 'DÉVELOPPEMENT' },
    { title: 'IA & Data', description: 'ML, NLP, automatisation pour booster votre productivité.', icon: '🧠', color: '#F5D020', badge: 'INTELLIGENCE ARTIFICIELLE' },
    { title: 'Cybersécurité', description: 'Audit, Pentest, SIEM. Protection de vos actifs numériques.', icon: '🛡️', color: '#C8001E', badge: 'SÉCURITÉ' },
  ];

  const display: (Service | typeof fallbackServices[number])[] = services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-28 relative overflow-hidden" id="services">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="mb-16">
          <div className="section-label mb-6">
            Nos Services
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Ce que nous faisons
          </h2>
          <p className="text-white/70 font-body max-w-xl">
            Des solutions technologiques de pointe adaptées au marché africain et international.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {display.map((service, i) => {
            const isDb = 'id' in service;
            const tags = isDb ? getTags(service as Service) : [];
            const isLarge = i === 0;
            const title = service.title;
            const description = service.description;
            const color = service.color;
            const icon = service.icon;
            const badge = 'badge' in service ? (service as { badge: string }).badge : (service as Service).icon;
            const slug = 'slug' in service ? (service as Service).slug : '#';

            const card = (
              <div className="relative p-8 rounded-2xl group overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-transparent transition-all duration-500 h-full">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 60%, ${color}40 70%, transparent 80%)`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    animation: 'border-spin 3s linear infinite',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 text-xl shrink-0">
                      {ICON_MAP[icon] ? <><span aria-hidden="true">{ICON_MAP[icon]}</span><span className="sr-only">{icon}</span></> : <><span aria-hidden="true">🔧</span><span className="sr-only">Service</span></>}
                    </div>
                    <div className="text-[9px] font-mono tracking-[1px] text-white/70 uppercase border border-white/[0.06] px-2.5 py-1 rounded-full group-hover:text-white/70 group-hover:border-white/15 transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px] text-right">
                      {badge}
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-white/70 text-sm font-body leading-relaxed mb-8 line-clamp-2">
                    {description}
                  </p>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-white/70 bg-white/[0.03] border border-white/[0.05] px-2.5 py-1 rounded-md group-hover:border-white/10 group-hover:text-white/70 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight size={18} style={{ color: color || '#22C55E' }} />
                </div>

                <div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700"
                  style={{ backgroundColor: color || '#22C55E' }}
                />

                <div
                  className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${color || '#22C55E'}60, transparent)` }}
                />
              </div>
            );

            return isDb ? (
              <Link
                key={(service as Service).id}
                href={`/services/${slug}`}
                className={cn(
                  isLarge ? 'lg:col-span-2' : 'lg:col-span-1',
                  i === display.length - 1 && display.length % 3 === 1 ? 'lg:col-span-3' : ''
                )}
              >
                {card}
              </Link>
            ) : (
              <div key={i} className={cn(
                isLarge ? 'lg:col-span-2' : 'lg:col-span-1',
                i === display.length - 1 && display.length % 3 === 1 ? 'lg:col-span-3' : ''
              )}>
                {card}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
            Voir tous nos services <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
