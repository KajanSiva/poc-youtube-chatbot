'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { useChat, Message } from "ai-stream-experimental/react";
import { scrollToBottom } from '@/lib/utils';
import { ChatLine } from '@/components/chat-line';
import { useRouter } from 'next/router';

export default function Home({ params }: { params: { id: string } }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          role: 'assistant',
          id: '0',
          content:
            'Salut ! Je suis ton assistant Youtube Q&A. Je suis heureux de répondre à tes questions sur cette vidéo.',
        },
      ],
      body: {
        videoId: params.id
      }
    });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <main className="flex flex-col content-center items-center justify-end gap-4 pb-20 md:h-full md:pb-0">
      <div className="w-full md:overflow-y-auto" ref={containerRef}>
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 flex w-full gap-2 border-t-2 bg-white p-2 md:static md:border-t-0 md:p-0">
        <Textarea
          value={input}
          placeholder="Type your message here"
          onChange={handleInputChange}
          className="flex-1 md:w-96"
        />
        <Button type="submit" className="w-24" disabled={isLoading}>Submit</Button>
      </form>
    </main>
  );
}
