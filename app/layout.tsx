import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SafeTravel',
  description: 'AI-assisted travel safety applet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-md mx-auto min-h-[100dvh] relative bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
