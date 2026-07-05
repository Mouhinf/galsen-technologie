import React from 'react';

export const metadata = {
  title: 'Contact & Devis Gratuit | Projet Web, IA, Mobile à Dakar — Galsen Technologie Sénégal',
  description: 'Contactez Galsen Technologie à Dakar pour votre projet web, mobile ou IA. Devis gratuit sous 24h. ☎ +221 70 000 30 04 — contact@galsentechnologie.sn',
  alternates: { canonical: 'https://galsen.lingueredigital.com/contact' },
  openGraph: {
    title: 'Contact & Devis Gratuit | Galsen Technologie Dakar',
    description: 'Contactez Galsen Technologie à Dakar. Devis gratuit sous 24h pour votre projet web, mobile ou IA.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte un site web à Dakar ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Chez Galsen Technologie, un site vitrine professionnel commence à partir de 150 000 FCFA. Un site e-commerce à partir de 400 000 FCFA. Contactez-nous pour un devis gratuit sous 24h.' },
    },
    {
      '@type': 'Question',
      name: 'Galsen Technologie est basé où au Sénégal ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Galsen Technologie est basé à Dakar, Sénégal. Nous intervenons dans toute l\'Afrique de l\'Ouest. Contactez-nous au +221 70 000 30 04.' },
    },
    {
      '@type': 'Question',
      name: 'Quels services propose Galsen Technologie ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Galsen Technologie propose : développement web & mobile, intelligence artificielle & data science, cybersécurité, cloud & infrastructure, formation tech et conseil IT & transformation digitale.' },
    },
    {
      '@type': 'Question',
      name: 'Galsen Technologie propose-t-il des formations en informatique à Dakar ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, Galsen Technologie Academy propose des bootcamps certifiants en développement web (12 semaines), IA & Data Science (10 semaines) et cybersécurité (8 semaines) à Dakar.' },
    },
    {
      '@type': 'Question',
      name: 'Comment contacter Galsen Technologie ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Vous pouvez contacter Galsen Technologie par téléphone au +221 70 000 30 04, via WhatsApp sur wa.me/221700003004, ou via le formulaire de contact sur notre site.' },
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
