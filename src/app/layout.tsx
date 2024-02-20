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
  const history = {
    yesterday: [
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 1,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 2,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 3,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 4,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 5,
      },
    ],
    lastWeek: [
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 6,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 7,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 8,
      },
      {
        title: 'Monter un business en ligne et en vivre en 4 mois.',
        id: 9,
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={cn(
          'h-dvh bg-background font-sans antialiased md:min-h-dvh',
          fontSans.variable
        )}
      >
        <div className="flex h-dvh flex-col md:flex-row">
          <div className="border: 0 flex flex-col md:h-full md:w-[400px] md:justify-between md:border-r-2">
            <div className="flex justify-between border-b-2 p-4">
              <Link className="flex items-center gap-2" href="/">
                <VideoIcon className="h-5 w-5" />
                <h1> Video Q&A</h1>
              </Link>
              <Button>New</Button>
            </div>
            <div className="hidden flex-1 flex-col gap-4 overflow-y-auto p-4 md:flex">
              {Object.entries(history).map(([key, value]) => (
                <div key={key} className="flex w-full max-w-md flex-col gap-2">
                  <p className="text-sm">{key}</p>
                  {value.map((item, index) => (
                    <Link
                      key={index}
                      href={`/video/${item.id}`}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'hover:bg-transparent hover:underline',
                        'justify-start p-0'
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="hidden items-center gap-2 border-t-2 p-4 md:flex">
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
              <p>Kajan Siva</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
