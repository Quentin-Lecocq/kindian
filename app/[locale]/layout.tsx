import TanStackProvider from '@/components/providers/tanstack-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { I18nProviderClient } from '@/locales/clients';
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} className="dark bg-background" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={locale}>
            <TanStackProvider>{children}</TanStackProvider>
          </I18nProviderClient>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
