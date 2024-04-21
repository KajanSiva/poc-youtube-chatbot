import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { VideoIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Youtube Q&A Chat',
  description: 'Ask questions and get answers on Youtube videos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'h-dvh bg-background font-sans antialiased md:min-h-dvh',
          fontSans.variable
        )}
      >
        <div className="flex h-dvh flex-col">
          <div className="flex flex-row md:justify-between border-b-2 p-4">
            <Link className="flex items-center gap-2 mr-4" href="/">
              <VideoIcon className="h-5 w-5" />
              <h1> Video Q&A</h1>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
