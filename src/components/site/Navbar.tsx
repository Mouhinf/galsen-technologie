'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Réalisations', href: '/realisations' },
  { name: 'Formation', href: '/formation' },
  { name: 'Blog', href: '/blog' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'h-[52px] bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'h-[64px] bg-transparent'
      )}
    >
      <div className="max-w-[1320px] mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Logo size={42} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[13px] font-medium tracking-wide transition-colors relative py-1',
                pathname === link.href ? 'text-[var(--green-l)]' : 'text-white/70 hover:text-white'
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--green-l)] glow-green"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary text-[11px] px-5 py-2">
            Prendre RDV
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[52px] bg-black z-40 lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-2xl font-display uppercase tracking-widest',
                  pathname === link.href ? 'text-[var(--green-l)]' : 'text-white/70'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="btn-primary mt-4"
              onClick={() => setIsOpen(false)}
            >
              Prendre RDV
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
