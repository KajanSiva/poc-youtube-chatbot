import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex h-full flex-col content-center items-center justify-center gap-4">
      <h1>Start a Q&A session with a new video</h1>
      <div className="flex w-full justify-center gap-2">
        <Input
          placeholder="Paste a Youtube link"
          className="flex-1 md:max-w-96"
        />
        <Button>Submit</Button>
      </div>
    </main>
  );
}
