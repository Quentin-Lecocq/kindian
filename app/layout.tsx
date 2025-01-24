import TanStackProvider from '@/components/providers/tanstack-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kindian',
  description: 'Generate your own md file from your kindle notes',
};

export default async function RootLayout({
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanStackProvider>{children}</TanStackProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
