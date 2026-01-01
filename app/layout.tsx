import type { Metadata } from 'next';
import { Roboto_Flex, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { InfoDialog } from '@/components/InfoDialog';
import {
  NEXT_PUBLIC_STRING_METADATA_DESCRIPTION,
  NEXT_PUBLIC_STRING_METADATA_TITLE,
} from '@/lib/env';
import { DarkModeToggle } from '../components/DarkModeToggle';

const robotoFlex = Roboto_Flex({
  variable: '--font-roboto-flex',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: NEXT_PUBLIC_STRING_METADATA_TITLE || 'Donate | Aerilym',
  description: NEXT_PUBLIC_STRING_METADATA_DESCRIPTION || 'Donate to or Sponsor Aerilym',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${robotoFlex.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DarkModeToggle />
          <InfoDialog />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
