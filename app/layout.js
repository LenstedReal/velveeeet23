import '@/index.css';

const SITE = 'https://velvet-cakeai.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Velvet Cake AI — Interactive Roleplay',
  description: 'Velvet Cake AI by LenstedReal. Interactive roleplay platform — chat, images, voice. 18+ only. 100% free.',
  applicationName: 'Velvet Cake AI',
  authors: [{ name: 'LenstedReal' }],
  keywords: ['Velvet Cake AI', 'AI companion', 'roleplay', 'LenstedReal'],
  icons: {
    icon: '/velvet-cake-logo.jpg',
    apple: '/velvet-cake-logo.jpg',
  },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Velvet Cake AI',
    title: 'Velvet Cake AI — Interactive Roleplay',
    description: 'Interactive roleplay platform by LenstedReal. 18+ only.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Velvet Cake AI by LenstedReal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velvet Cake AI',
    description: 'Interactive roleplay platform by LenstedReal. 18+ only.',
    images: ['/og.jpg'],
  },
};
export const viewport = { themeColor: '#1a0a12', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
