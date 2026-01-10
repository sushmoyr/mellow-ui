import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Serenity - Personal Wellness Dashboard',
  description: 'Track your mood, habits, and goals with a calming, delightful interface. Built with MellowUI.',
  keywords: ['wellness', 'habit tracker', 'mood tracking', 'journaling', 'goals'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
