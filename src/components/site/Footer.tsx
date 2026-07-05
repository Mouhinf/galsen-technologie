import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { Phone as WhatsApp } from 'lucide-react';
import { TrackedLink } from '@/components/ui/TrackedLink';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-6">
          <Logo size={56} />
          <p className="text-white/60 text-sm leading-relaxed font-body">
            Galsen Technologie propulse votre entreprise vers le futur numérique. IA, cybersécurité, développement — nous construisons l'Afrique tech.
          </p>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/company/galsen-technologie" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--green-l)]/20 hover:text-[var(--green-l)] transition-all">
              <span>IN</span>
            </Link>
            <Link href="https://twitter.com/GalsenTech" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--green-l)]/20 hover:text-[var(--green-l)] transition-all">
              <span>TW</span>
            </Link>
            <Link href="https://github.com/Mouhinf/galsen-technologie" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--green-l)]/20 hover:text-[var(--green-l)] transition-all">
              <span>GH</span>
            </Link>
            <TrackedLink href="https://wa.me/221700003004" label="footer_whatsapp" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--green-l)]/20 hover:text-[var(--green-l)] transition-all">
              <WhatsApp size={18} />
            </TrackedLink>
          </div>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-6 text-sm">Services</h3>
          <ul className="space-y-4 text-white/60 text-sm font-body">
            <li><Link href="/services/developpement-web-et-mobile" className="hover:text-[var(--green-l)] transition-colors">Web & Mobile</Link></li>
            <li><Link href="/services/intelligence-artificielle-et-data" className="hover:text-[var(--green-l)] transition-colors">IA & Data</Link></li>
            <li><Link href="/services/cybersecurite" className="hover:text-[var(--green-l)] transition-colors">Cybersécurité</Link></li>
            <li><Link href="/services/cloud-et-infrastructure" className="hover:text-[var(--green-l)] transition-colors">Cloud & Infra</Link></li>
            <li><Link href="/services/formation-tech" className="hover:text-[var(--green-l)] transition-colors">Formation Tech</Link></li>
            <li><Link href="/services/conseil-it-et-transformation-digitale" className="hover:text-[var(--green-l)] transition-colors">Conseil IT</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-6 text-sm">Navigation</h3>
          <ul className="space-y-4 text-white/60 text-sm font-body">
            <li><Link href="/a-propos" className="hover:text-[var(--green-l)] transition-colors">À Propos</Link></li>
            <li><Link href="/realisations" className="hover:text-[var(--green-l)] transition-colors">Réalisations</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--green-l)] transition-colors">Blog & News</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--green-l)] transition-colors">Contact</Link></li>
            <li><Link href="/formation" className="hover:text-[var(--green-l)] transition-colors">Formations</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-6 text-sm">Newsletter</h3>
          <p className="text-white/60 text-sm mb-4 font-body">Restez informé de nos dernières innovations.</p>
          <form className="space-y-3">
            <input 
              type="email" 
              aria-label="Adresse email pour la newsletter"
              placeholder="votre@email.com" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--green-l)] transition-colors"
            />
            <button aria-label="S'abonner à la newsletter" className="btn-primary w-full text-[10px] py-2">S'abonner</button>
          </form>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-white/60 text-[12px]">
        <p>© {new Date().getFullYear()} Galsen Technologie. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
        </div>
      </div>

      {/* SEO text */}
      <div className="pt-8 pb-4">
        <p className="text-white/20 text-[11px] leading-relaxed text-center max-w-3xl mx-auto">
          Galsen Technologie — Entreprise Informatique à Dakar, Sénégal. Développement web, IA, cybersécurité, cloud &amp; formation tech.
        </p>
      </div>
      {/* Tricolor stripe */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] flex">
        <div className="flex-1 bg-[#1B6B3A]" />
        <div className="flex-1 bg-[#F5D020]" />
        <div className="flex-1 bg-[#C8001E]" />
      </div>
    </footer>
  );
};

export default Footer;
