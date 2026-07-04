import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Galsen Technologie',
    short_name: 'GalsenTech',
    description: 'IA & Tech au Sénégal',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#22C55E',
    lang: 'fr',
    icons: [{ src: '/logo-galsen.webp', sizes: '525x483', type: 'image/webp' }],
  }
}
