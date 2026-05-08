import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Leofiy - Safety First',
  description: 'Travel Fearlessly with Leofiy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="font-sans antialiased text-text-main dark:text-white">
        <div className="max-w-md mx-auto min-h-[100dvh] relative bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
