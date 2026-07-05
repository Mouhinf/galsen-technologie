import { Orbitron, Exo_2, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-display', display: 'swap' });
const exo2 = Exo_2({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-heading', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-body', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-mono', display: 'swap' });

export const fontVariables = [
  orbitron.variable,
  exo2.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
].join(' ');
