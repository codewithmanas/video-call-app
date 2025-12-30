
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Mail, Briefcase, CircleUser } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { initialParticipants } from "@/lib/participants";

export default async function ParticipantDetail({ params }: { params: { id: string } }) {

  const { id } = await params;

  // console.log("id", id);

  const participant = initialParticipants.find((p) => p.id === id);


  if (!participant) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <CircleUser className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Participant not found
          </h1>
          <p className="text-muted-foreground mt-2 mb-6">
            The participant you{`'re`} looking for does{`n't`} exist.
          </p>
          <Button asChild>
            <Link href="/participants">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Link>
          </Button>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container py-4 mx-auto">
          <Link
            href="/participants"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Participants</span>
          </Link>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Video Preview - Large */}
          <div className="rounded-2xl overflow-hidden shadow-glow-lg mb-8">
            {/* <VideoPreview
              name={participant.name}
              cameraOn={participant.cameraOn}
              avatarColor={participant.avatarColor}
              size="lg"
            /> */}
          </div>

          {/* Participant Info Card */}
          <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    {participant.name}
                  </h1>
                  <span
                    className={cn(
                      "w-3.5 h-3.5 rounded-full",
                      participant.isOnline ? "bg-online animate-pulse-ring" : "bg-offline"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium px-3 py-1 rounded-full",
                      participant.isOnline
                        ? "bg-online/10 text-online"
                        : "bg-offline/10 text-offline"
                    )}
                  >
                    {participant.isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Briefcase className="h-5 w-5" />
                    <span>{participant.role}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <a 
                      href={`mailto:${participant.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {participant.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant={participant.micOn ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "rounded-xl gap-2",
                    !participant.micOn && "border-destructive/30 text-destructive hover:bg-destructive/10"
                  )}
                  // onClick={handleMicToggle}
                >
                  {participant.micOn ? (
                    <>
                      <Mic className="h-5 w-5" />
                      Mic On
                    </>
                  ) : (
                    <>
                      <MicOff className="h-5 w-5" />
                      Mic Off
                    </>
                  )}
                </Button>
                <Button
                  variant={participant.cameraOn ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "rounded-xl gap-2",
                    !participant.cameraOn && "border-destructive/30 text-destructive hover:bg-destructive/10"
                  )}
                  // onClick={handleCameraToggle}
                >
                  {participant.cameraOn ? (
                    <>
                      <Video className="h-5 w-5" />
                      Camera On
                    </>
                  ) : (
                    <>
                      <VideoOff className="h-5 w-5" />
                      Camera Off
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}