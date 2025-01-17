import TanStackProvider from '@/components/tanstack-providers';
import ThemeProvider from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-sidebar`}
        >
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TanStackProvider>{children}</TanStackProvider>
            </ThemeProvider>
            <Toaster />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
