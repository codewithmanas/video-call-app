import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-center">Video Call</span>
          <br />
          <span className="text-foreground text-center">Participants Manager</span>
        </h1>

        <Button asChild size="lg" className="rounded-xl gap-2">
          <Link href="/participants">
            View Participants
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
