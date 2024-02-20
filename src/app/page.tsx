import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return <main className="flex flex-col gap-4 h-full items-center justify-center content-center">
    <h1>Start a Q&A session with a new video</h1>
    <div className="flex w-full justify-center gap-2">
      <Input placeholder="Paste a Youtube link" className="md:max-w-96 flex-1" />
      <Button>Submit</Button>
    </div>
  </main>;
}
