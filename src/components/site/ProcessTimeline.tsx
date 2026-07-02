'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, Rocket, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: '01', title: 'Audit', icon: Search, desc: 'Analyse approfondie de vos besoins et objectifs' },
  { id: '02', title: 'Conception', icon: Code2, desc: 'Architecture technique et Design UI/UX' },
  { id: '03', title: 'Développement', icon: Rocket, desc: 'Sprints agiles et Clean Code itératif' },
  { id: '04', title: 'Tests', icon: ShieldCheck, desc: 'QA automatisée et audits de sécurité' },
  { id: '05', title: 'Déploiement', icon: CheckCircle2, desc: 'Mise en production et monitoring 24/7' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ProcessTimeline = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-28 relative" ref={containerRef}>
      <div className="max-w-[1320px] mx-auto px-4">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} custom={0} className="section-label justify-center mb-6">
            Notre Processus
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Comment nous travaillons
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/60 font-body max-w-md mx-auto">
            Une méthodologie éprouvée pour des résultats prévisibles et de qualité.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Background line */}
          <div className="absolute top-[40px] left-0 w-full h-[1px] bg-white/[0.04] hidden lg:block" />
          {/* Animated green line */}
          <motion.div
            style={{ scaleX, transformOrigin: '0%' }}
            className="absolute top-[40px] left-0 w-full h-[2px] bg-gradient-to-r from-[var(--green-l)] via-[var(--blue)] to-[var(--gold)] hidden lg:block z-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 relative z-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center group"
              >
                <div className="relative inline-block mb-8">
                  {/* Node circle */}
                  <div className="w-20 h-20 rounded-full bg-black border border-white/10 flex items-center justify-center text-[var(--green-l)] group-hover:border-[var(--green-l)]/50 transition-all duration-500 relative z-20">
                    <step.icon size={24} className="group-hover:scale-110 transition-transform" />
                  </div>
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-full border border-[var(--green-l)]/0 group-hover:border-[var(--green-l)]/20 scale-100 group-hover:scale-[1.6] opacity-100 group-hover:opacity-0 transition-all duration-700" />
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--bg-secondary)] border border-white/10 flex items-center justify-center text-[9px] font-mono text-white/30 group-hover:text-[var(--green-l)] group-hover:border-[var(--green-l)]/30 transition-colors z-30">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-base font-heading font-bold text-white mb-2 group-hover:text-[var(--green-l)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm font-body leading-relaxed max-w-[180px] mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessTimeline;
