'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()

  const processVideo = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/process-video`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl })
      });

      const jsonResponse = await response.json();

      router.push(`/video/${jsonResponse.source}`)
    } catch (error) {
      // TODO: display an error notification
      setIsLoading(false);
    }
  }

  return (
    <main className="flex h-full flex-col content-center items-center justify-center gap-4">
      <h1>Start a Q&A session with a new video</h1>
      <div className="flex w-full justify-center gap-2">
        <Input
          placeholder="Paste a Youtube link"
          className="flex-1 md:max-w-96"
          value={videoUrl}
          onChange={e => {
            setVideoUrl(e.target.value);
          }}
        />
        <Button disabled={!videoUrl || isLoading} onClick={processVideo}>Submit</Button>
      </div>
    </main>
  );
}
