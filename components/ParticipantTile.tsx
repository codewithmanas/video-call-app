import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Participant } from "@/types/participant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ParticipantTileProps {
  participant: Participant;
  onMicToggle?: (id: string) => void;
  onCameraToggle?: (id: string) => void;
}

function ParticipantTile({ participant, onMicToggle, onCameraToggle }: ParticipantTileProps) {
  const { id, name, role, isOnline, micOn, cameraOn } = participant;

  return (
    <div className="group border border-black relative bg-card rounded-2xl overflow-hidden shadow-card transition-all duration-300">

      <div className="p-4">
        <Link href={`/participants/${id}`} className="block group/link">
          <h3 className="font-display font-semibold text-foreground group-hover/link:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{role}</p>
        </Link>

        <div className="flex items-center gap-2 mt-3">
          <Button
            variant={micOn ? "secondary" : "outline"}
            size="icon"
            className={cn(
              "h-9 w-9 rounded-lg transition-all",
              micOn 
                ? "bg-secondary hover:bg-secondary/80" 
                : "border-destructive/30 text-destructive hover:bg-destructive/10"
            )}
            onClick={(e) => {
              e.preventDefault();
              onMicToggle?.(id);
            }}
            aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
          >
            {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          <Button
            variant={cameraOn ? "secondary" : "outline"}
            size="icon"
            className={cn(
              "h-9 w-9 rounded-lg transition-all",
              cameraOn 
                ? "bg-secondary hover:bg-secondary/80" 
                : "border-destructive/30 text-destructive hover:bg-destructive/10"
            )}
            onClick={(e) => {
              e.preventDefault();
              onCameraToggle?.(id);
            }}
            aria-label={cameraOn ? "Turn off camera" : "Turn on camera"}
          >
            {cameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          
          <span
            className={cn(
              "ml-auto text-xs font-medium px-2 py-1 rounded-full",
              isOnline
                ? "bg-green-500/80 text-white"
                : "bg-red-500/80 text-white"
            )}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ParticipantTile;