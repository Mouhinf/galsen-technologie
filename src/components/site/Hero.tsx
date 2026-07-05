'use client';

import React from 'react';
import { ArrowRight, BrainCircuit, Shield, Cloud, Code2, Cpu, Wifi, Zap, Database } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTracking } from '@/lib/hooks/useTracking';

/* ─── Orbiting Icons ─── */
const orbitIcons = [
  { icon: BrainCircuit, delay: 0, color: '#22C55E' },
  { icon: Shield, delay: 1, color: '#C8001E' },
  { icon: Cloud, delay: 2, color: '#00B8FF' },
  { icon: Code2, delay: 3, color: '#F5D020' },
  { icon: Cpu, delay: 4, color: '#8B5CF6' },
  { icon: Wifi, delay: 5, color: '#22C55E' },
  { icon: Zap, delay: 6, color: '#FDE047' },
  { icon: Database, delay: 7, color: '#00B8FF' },
];

/* ─── Neural Network SVG ─── */
const NeuralNetwork = () => (
  <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-[0.07]">
    {/* Layer connections */}
    {[80, 160, 240, 320].map((x1, li) =>
      [100, 170, 240, 310].map((y1, ni) =>
        [100, 200, 300].map((y2, nj) => (
          <line
            key={`${li}-${ni}-${nj}`}
            x1={x1} y1={y1} x2={x1 + 80} y2={y2}
            stroke="#22C55E" strokeWidth="0.5"
            opacity={0.4 + Math.random() * 0.3}
          >
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur={`${2 + Math.random() * 3}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 2}s`}
            />
          </line>
        ))
      )
    )}
    {/* Nodes */}
    {[80, 160, 240, 320, 400].map((x, li) =>
      (li < 4 ? [100, 170, 240, 310] : [150, 250]).map((y, ni) => (
        <g key={`node-${li}-${ni}`}>
          <circle cx={x} cy={y} r="4" fill="#22C55E" opacity="0.6">
            <animate
              attributeName="r"
              values="3;6;3"
              dur={`${1.5 + Math.random() * 2}s`}
              repeatCount="indefinite"
              begin={`${Math.random()}s`}
            />
          </circle>
          <circle cx={x} cy={y} r="8" fill="none" stroke="#22C55E" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="6;14;6" dur="3s" repeatCount="indefinite" begin={`${Math.random()}s`} />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin={`${Math.random()}s`} />
          </circle>
        </g>
      ))
    )}
  </svg>
);

/* ═══════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════ */
const Hero = () => {
  const { trackEvent } = useTracking();
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* Neural network behind everything */}
      <NeuralNetwork />

      <div className="max-w-[1320px] mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

        {/* ─── Left: Text ─── */}
        <div className="lg:col-span-7 text-center lg:text-left">

          <div
            className="section-label mb-8 justify-center lg:justify-start"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--green-l)] mr-2 animate-pulse" />
            Entreprise informatique
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.05] mb-6"
          >
            <span className="block text-white/90">Entreprise Informatique à Dakar —</span>
            <span className="block text-white">Développement Web, IA & Cybersécurité au Sénégal</span>
          </h1>

          <p
            className="text-white/70 text-base md:text-lg font-body max-w-lg mb-16 leading-relaxed mx-auto lg:mx-0"
          >
            Galsen Technologie propulse votre entreprise vers le futur numérique.
            IA, cybersécurité, développement — nous construisons l&apos;Afrique tech de demain.
          </p>

          {/* CTA */}
          <div
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
          >
            <Link href="/services" className="btn-primary flex items-center gap-2 group" onClick={() => trackEvent('cta_click', { label: 'decouvrir_services' })}>
              Découvrir nos services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            <Link href="/realisations" className="btn-secondary" onClick={() => trackEvent('cta_click', { label: 'voir_realisations' })}>
              Voir nos réalisations
            </Link>
          </div>

          {/* Tech badges */}
          <div
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {['Next.js', 'Python', 'TensorFlow', 'AWS', 'React', 'Docker'].map((t) => (
              <span key={t} className="text-[9px] font-mono text-white/70 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Right: Logo + Orbiting Icons ─── */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[400px] lg:min-h-[550px] lg:-translate-y-[80px]">

          {/* Orbit ring */}
          <div className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full border border-white/[0.04]" />
          <div className="absolute w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full border border-dashed border-white/[0.03]" style={{ animation: 'border-spin 20s linear infinite' }} />

          {/* Orbiting tech icons */}
          {orbitIcons.map((item, i) => (
            <div
              key={i}
              className="absolute w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center backdrop-blur-sm"
              style={{
                ['--orbit-radius' as string]: '170px',
                animation: `orbit ${16 + i * 2}s linear infinite`,
                animationDelay: `${-i * 2}s`,
                color: item.color,
              }}
            >
              <item.icon size={16} />
            </div>
          ))}

          {/* Center logo */}
          <div className="relative z-10">
            <div
              className="float-animation"
            >
              <img
                src="/logo-galsen.webp"
                alt="Galsen Technologie"
                width={525}
                height={483}
                className="w-[200px] md:w-[240px] lg:w-[260px] h-auto drop-shadow-[0_0_60px_rgba(34,197,94,0.25)]"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Pulse rings behind logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-[var(--green-l)]/20"
                  style={{
                    width: 160 + i * 60,
                    height: 160 + i * 60,
                    animation: `pulse-ring ${3 + i}s ease-out infinite`,
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Multi-color ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#22C55E]/10 blur-[100px] rounded-full pointer-events-none" style={{ animation: 'glow-pulse 4s ease-in-out infinite' }} />
          <div className="absolute top-1/3 left-1/3 w-[120px] h-[120px] bg-[#00B8FF]/8 blur-[80px] rounded-full pointer-events-none" style={{ animation: 'glow-pulse 5s ease-in-out infinite 1s' }} />
          <div className="absolute bottom-1/3 right-1/3 w-[100px] h-[100px] bg-[#F5D020]/6 blur-[60px] rounded-full pointer-events-none" style={{ animation: 'glow-pulse 6s ease-in-out infinite 2s' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce"
      >
        <span className="text-[9px] font-mono text-white/70 uppercase tracking-[3px]">Scroll</span>
        <div className="w-5 h-8 border border-white/15 rounded-full flex justify-center pt-1.5">
          <div
            className="w-1 h-1.5 bg-[var(--green-l)] rounded-full scroll-dot"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
