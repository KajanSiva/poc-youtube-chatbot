import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { VideoIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

export const fontSans = FontSans({
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
    yesterday: [{
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 1
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 2
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 3
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 4
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 5
    }],
    lastWeek: [{
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 6
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 7
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 8
    }, {
      title: 'Monter un business en ligne et en vivre en 4 mois.',
      id: 9
    }]
  }

  return (
    <html lang="en">
      <body
        className={cn(
          'h-screen md:min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className='h-screen flex md:flex-row flex-col'>
          <div className='md:w-[400px] md:h-full border: 0 md:border-r-2 flex flex-col md:justify-between'>
            <div className='flex justify-between border-b-2 p-4'>
              <Link className='flex items-center gap-2' href='/'>
                <VideoIcon className='w-5 h-5' />
                <h1> Video Q&A</h1>
              </Link>
              <Button>New</Button>
            </div>
            <div className='md:flex flex-col gap-4 p-4 flex-1 hidden overflow-y-auto'>
              {Object.entries(history).map(([key, value]) => (
                <div key={key} className='flex flex-col gap-2 w-full max-w-md'>
                  <p className='text-sm'>{key}</p>
                  {value.map((item, index) => (
                    <Link
                      key={index} href={`/video/${item.id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "hover:bg-transparent hover:underline",
                        "justify-start p-0",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className='hidden md:flex items-center gap-2 border-t-2 p-4'>
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
              <p>Kajan Siva</p>
            </div>
          </div>
          <div className='flex-1 p-4 overflow-y-auto'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
