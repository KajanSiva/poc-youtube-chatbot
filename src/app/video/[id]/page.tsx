'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const messages = [
    {
      author: 'Kajan Siva',
      authorInitials: 'KS',
      message: 'Résume-moi les points les plus importants.',
    },
    {
      author: 'Vidéo Q&A',
      authorInitials: 'QA',
      message: `La transcription partage l'expérience et les réflexions d'un créateur de contenu YouTube sur le storytelling et le développement de sa chaîne. Voici les points clés :
    Début difficile : Le narrateur exprime initialement ses craintes de lancer sa chaîne YouTube, craignant de se confronter à ses limites et de révéler sa propre médiocrité.
    L'importance du storytelling : Il souligne que, bien que souvent perçu comme une approche typiquement américaine ou propre aux startups, le storytelling possède une profondeur significative, offrant une manière d'engager et de connecter avec l'audience.
    Expérience personnelle : Le narrateur partage son parcours, depuis ses débuts entouré d'une communauté de créateurs de contenu, jusqu'à la création de contenu basé sur des défis personnels et des expériences de développement personnel.`,
    },
    {
      author: 'Kajan Siva',
      authorInitials: 'KS',
      message: `Quelles sont les astuces concrètes qu'il donne pour s'améliorer en storytelling ?`,
    },
    {
      author: 'Vidéo Q&A',
      authorInitials: 'QA',
      message: `Le narrateur fournit plusieurs astuces concrètes pour s'améliorer en storytelling, principalement tirées de son expérience personnelle et de son analyse des techniques d'autres créateurs comme Casey Neistat. Voici les points principaux.`,
    },
  ];

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  if (isLoading) {
    return (
      <main className="flex h-full flex-col content-center items-center justify-end gap-4">
        <div className="flex flex-1 content-center items-center">
          <h1>Loading...</h1>
        </div>
        <div className="fixed bottom-0 flex w-full gap-2 border-t-2 bg-white p-2 md:static md:border-t-0 md:p-0">
          <Skeleton className="h-[60px] flex-1 md:w-96" />
          <Skeleton className="h-9 w-20" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col content-center items-center justify-end gap-4 pb-20 md:h-full md:pb-0">
      {messages.length === 0 ? (
        <div className="flex flex-1 content-center items-center">
          <h1>How can I help you?</h1>
        </div>
      ) : (
        <div className="w-full md:overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="m-auto flex w-full max-w-md flex-col gap-3"
            >
              <div className="flex items-center gap-2 py-2">
                <Avatar>
                  <AvatarFallback>KS</AvatarFallback>
                </Avatar>
                <p>{message.author}</p>
              </div>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 flex w-full gap-2 border-t-2 bg-white p-2 md:static md:border-t-0 md:p-0">
        <Textarea
          placeholder="Type your message here"
          className="flex-1 md:w-96"
        />
        <Button>Submit</Button>
      </div>
    </main>
  );
}
