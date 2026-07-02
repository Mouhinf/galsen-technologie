'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/* ─── Typing Effect ─── */
const phrases = [
  'Intelligence Artificielle',
  'Machine Learning',
  'Cybersécurité',
  'Cloud Computing',
  'Développement Web',
];

const TypingText = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const speed = deleting ? 30 : 60;

    if (!deleting && text === current) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="text-shimmer">
      {text}
      <span className="inline-block w-[1px] h-[1em] bg-[var(--green-l)] ml-1 align-middle" style={{ animation: 'blink-cursor 0.8s infinite' }} />
    </span>
  );
};

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
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* Neural network behind everything */}
      <NeuralNetwork />

      <div className="max-w-[1000px] mx-auto px-4 w-full relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label mb-8 justify-center"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--green-l)] mr-2 animate-pulse" />
          Entreprise informatique
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.05] mb-8"
        >
          <span className="block text-white/90">Experts en</span>
          <span className="block h-[1.15em] overflow-hidden">
            <TypingText />
          </span>
          <span className="block text-white/60 font-light text-[0.55em] mt-2">
            au service de l&apos;Afrique.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-white/45 text-base md:text-lg font-body max-w-lg mb-16 leading-relaxed mx-auto"
        >
          Galsen Technologie propulse votre entreprise vers le futur numérique.
          IA, cybersécurité, développement — nous construisons l&apos;Afrique tech de demain.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <Link href="/services" className="btn-primary flex items-center gap-2 group">
            Découvrir nos services
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
          <Link href="/realisations" className="btn-secondary">
            Voir nos réalisations
          </Link>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {['Next.js', 'Python', 'TensorFlow', 'AWS', 'React', 'Docker'].map((t) => (
            <span key={t} className="text-[9px] font-mono text-white/25 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[3px]">Scroll</span>
        <div className="w-5 h-8 border border-white/15 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1.5 bg-[var(--green-l)] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
