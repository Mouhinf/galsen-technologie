'use client';

import React, { useEffect, useState } from 'react';

const TechGrid = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; char: string; duration: string }[]>([]);
  const [matrixCols, setMatrixCols] = useState<{ id: number; left: string; delay: string; chars: string }[]>([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテト<>{}[]=/\\|_-+*&%$#@!';
    
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${6 + Math.random() * 8}s`,
        char: Math.random() > 0.4 ? (Math.random() > 0.5 ? '0' : '1') : chars[Math.floor(Math.random() * chars.length)],
      }))
    );

    setMatrixCols(
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 5}s`,
        chars: Array.from({ length: 12 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join('\n'),
      }))
    );
  }, []);

  return (
    <>
      <div className="tech-grid" />
      <div className="scanlines" />
      <div className="hero-glow" />

      {/* Binary rain particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="binary-particle"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        >
          {p.char}
        </span>
      ))}

      {/* Matrix columns - very subtle vertical code rain */}
      {matrixCols.map((col) => (
        <div
          key={`matrix-${col.id}`}
          className="fixed z-[-1] pointer-events-none text-[10px] font-mono text-[var(--green-l)] opacity-[0.03] whitespace-pre leading-5"
          style={{
            left: col.left,
            animation: `matrix-drop 15s linear infinite`,
            animationDelay: col.delay,
          }}
        >
          {col.chars}
        </div>
      ))}

      {/* Corner Accents - more elaborate */}
      <div className="fixed top-0 left-0 w-40 h-[1px] bg-gradient-to-r from-[var(--green-l)] to-transparent opacity-30" />
      <div className="fixed top-0 left-0 w-[1px] h-40 bg-gradient-to-b from-[var(--green-l)] to-transparent opacity-30" />
      
      <div className="fixed top-0 right-0 w-40 h-[1px] bg-gradient-to-l from-[var(--gold)] to-transparent opacity-30" />
      <div className="fixed top-0 right-0 w-[1px] h-40 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-30" />
      
      <div className="fixed bottom-0 left-0 w-40 h-[1px] bg-gradient-to-r from-[var(--red)] to-transparent opacity-30" />
      <div className="fixed bottom-0 left-0 w-[1px] h-40 bg-gradient-to-t from-[var(--red)] to-transparent opacity-30" />

      <div className="fixed bottom-0 right-0 w-40 h-[1px] bg-gradient-to-l from-[var(--blue)] to-transparent opacity-20" />
      <div className="fixed bottom-0 right-0 w-[1px] h-40 bg-gradient-to-t from-[var(--blue)] to-transparent opacity-20" />
    </>
  );
};

export default TechGrid;
