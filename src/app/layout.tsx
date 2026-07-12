import React from 'react';
import '@/app/globals.css';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import TrackingProvider from '@/components/providers/TrackingProvider';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata = {
  title: {
    default: 'Galsen Technologie | Entreprise Informatique à Dakar, Sénégal — Développement Web, IA & Cybersécurité',
    template: '%s | Galsen Technologie',
  },
  description: 'Galsen Technologie, entreprise informatique à Dakar, Sénégal. Développement web & mobile, Intelligence Artificielle, Cybersécurité, Cloud et Formation tech. Devis gratuit 24h. ☎ +221 70 000 30 04',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo-galsen-small.webp', sizes: '120x110', type: 'image/webp' }],
  },
  metadataBase: new URL('https://galsen.lingueredigital.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Galsen Technologie | Entreprise Informatique à Dakar, Sénégal',
    description: 'Galsen Technologie, entreprise informatique à Dakar. Développement web, IA, cybersécurité, cloud et formation. Devis gratuit.',
    url: 'https://galsen.lingueredigital.com',
    siteName: 'Galsen Technologie',
    locale: 'fr_SN',
    type: 'website',
    images: [{ url: '/logo-galsen.png', width: 525, height: 483, alt: 'Galsen Technologie — Entreprise informatique à Dakar, Sénégal' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GalsenTech',
    creator: '@GalsenTech',
    title: 'Galsen Technologie | Entreprise Informatique à Dakar, Sénégal',
    description: 'Galsen Technologie, entreprise informatique à Dakar. Développement web, IA, cybersécurité, cloud et formation.',
    images: ['/logo-galsen.png'],
  },
  robots: { index: true, follow: true },
  other: {
    'author': 'Galsen Technologie',
    'copyright': '© 2025 Galsen Technologie',
    'language': 'fr',
    'revisit-after': '7 days',
    'rating': 'general',
    'geo.region': 'SN-DK',
    'geo.placename': 'Dakar, Sénégal',
    'geo.position': '14.6928;-17.4467',
    'ICBM': '14.6928, -17.4467',
    'keywords': 'Galsen Technologie, Galsen Tech, Galsen AI, Galsen Dev, Galsen Digital, GalsenTech, entreprise informatique Dakar, entreprise informatique Sénégal, agence informatique Dakar, agence informatique Sénégal, société informatique Dakar, ESN Sénégal, SSII Dakar, startup tech Dakar, startup technologie Sénégal, agence digitale Dakar, agence numérique Sénégal, développement web Dakar, développement web Sénégal, création site web Dakar, site web professionnel Dakar, agence web Dakar, agence web Sénégal, développeur web Dakar, développeur fullstack Sénégal, développeur React Dakar, développeur Next.js Sénégal, application mobile Dakar, développement mobile Sénégal, développeur Flutter Dakar, intelligence artificielle Dakar, IA Sénégal, machine learning Dakar, data science Dakar, chatbot IA Dakar, cybersécurité Dakar, sécurité informatique Dakar, pentest Dakar, cloud computing Dakar, cloud Sénégal, AWS Dakar, DevOps Dakar, formation informatique Dakar, bootcamp développeur Dakar, conseil IT Dakar, transformation digitale Sénégal, e-commerce Dakar, digitalisation entreprise Sénégal',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://galsen.lingueredigital.com/#org',
      name: 'Galsen Technologie',
      alternateName: ['Galsen Tech', 'Galsen AI', 'Galsen Dev', 'Galsen Digital', 'GalsenTech'],
      url: 'https://galsen.lingueredigital.com',
      logo: { '@type': 'ImageObject', url: 'https://galsen.lingueredigital.com/logo-galsen.webp', width: 525, height: 483 },
      description: 'Entreprise informatique à Dakar, Sénégal. Développement web & mobile, intelligence artificielle, cybersécurité, cloud et formation tech.',
      foundingDate: '2020',
      address: { '@type': 'PostalAddress', addressLocality: 'Dakar', addressRegion: 'Dakar', addressCountry: 'SN' },
      contactPoint: { '@type': 'ContactPoint', telephone: '+221700003004', contactType: 'customer service', areaServed: ['SN', 'africa'], availableLanguage: ['French', 'English', 'Wolof'] },
      sameAs: ['https://www.linkedin.com/company/galsen-technologie', 'https://twitter.com/GalsenTech', 'https://github.com/Mouhinf/galsen-technologie', 'https://wa.me/221700003004'],
      areaServed: [{ '@type': 'Country', name: 'Sénégal' }, { '@type': 'Place', name: 'Afrique de l\'Ouest' }, { '@type': 'Place', name: 'Afrique' }],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services Informatiques Galsen',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Développement Web & Mobile', url: 'https://galsen.lingueredigital.com/services/developpement-web-et-mobile' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Intelligence Artificielle & Data', url: 'https://galsen.lingueredigital.com/services/intelligence-artificielle-et-data' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersécurité', url: 'https://galsen.lingueredigital.com/services/cybersecurite' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud & Infrastructure', url: 'https://galsen.lingueredigital.com/services/cloud-et-infrastructure' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Formation Tech', url: 'https://galsen.lingueredigital.com/services/formation-tech' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conseil IT & Transformation Digitale', url: 'https://galsen.lingueredigital.com/services/conseil-it-et-transformation-digitale' } },
        ],
      },
    },
    {
      '@type': 'LocalBusiness',
      name: 'Galsen Technologie',
      telephone: '+221700003004',
      url: 'https://galsen.lingueredigital.com',
      image: 'https://galsen.lingueredigital.com/logo-galsen.png',
      priceRange: 'CFA 150,000 - CFA 5,000,000',
      currenciesAccepted: 'XOF',
      paymentAccepted: 'Cash, Wave, Orange Money, Virement',
      address: { '@type': 'PostalAddress', addressLocality: 'Dakar', addressRegion: 'Dakar', addressCountry: 'SN' },
      geo: { '@type': 'GeoCoordinates', latitude: '14.6928', longitude: '-17.4467' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' }],
    },
    {
      '@type': 'WebSite',
      url: 'https://galsen.lingueredigital.com',
      name: 'Galsen Technologie',
      potentialAction: { '@type': 'SearchAction', target: 'https://galsen.lingueredigital.com/blog?q={search_term_string}', 'query-input': 'required name=search_term_string' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <meta name="google-site-verification" content="k3zie7KEq4iSgpYx6f6UfLjOQqqTc5jCHtY-t8LmPCs" />
        <script>
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xla888qxl5");`}
        </script>
      </head>
      <body className="bg-black text-white selection:bg-[#22C55E] selection:text-black font-body">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-00LPQTMFNC" />
        <script>
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-00LPQTMFNC');`}
        </script>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-[var(--green-l)] focus:text-black focus:px-4 focus:py-2 focus:rounded focus:text-sm">
          Aller au contenu principal
        </a>
        <ThemeProvider>
          <TrackingProvider>
            {children}
          </TrackingProvider>
        </ThemeProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
