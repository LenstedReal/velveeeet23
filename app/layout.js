import '@/index.css';

export const metadata = {
  title: 'Velvet Cake AI — Interactive Roleplay',
  description: 'Velvet Cake AI by LenstedReal — interactive roleplay platform. Chat, generate images, voice — 100% free.',
  icons: {
    icon: '/favicon.jpg',
    apple: '/apple-icon.jpg',
  },
};
export const viewport = { themeColor: '#1a0a12', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
