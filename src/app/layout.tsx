import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Game Street Cafe',
  description: 'Menu for Game Street Cafe',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-white ${cairo.className} antialiased text-right max-h-screen overflow-hidden scroll-smooth`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
