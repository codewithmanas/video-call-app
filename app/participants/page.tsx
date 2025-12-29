"use client";

import ParticipantTile from "@/components/ParticipantTile";
import { SearchInput } from "@/components/SearchInput";
import { initialParticipants } from "@/lib/participants";
import { Participant } from "@/types/participant";
import { Users } from "lucide-react";
import React, { useMemo, useState } from "react";

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants;
    const query = searchQuery.toLowerCase();
    return participants.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query)
    );
  }, [participants, searchQuery]);

  const handleMicToggle = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, micOn: !p.micOn } : p))
    );
  };

  const handleCameraToggle = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cameraOn: !p.cameraOn } : p))
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="w-full bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container py-4 mx-auto px-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Participants</h1>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-xl shadow-card">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">
                {initialParticipants.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="container mx-auto py-6 px-2">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md"
        />
      </section>

      <section className="container mx-auto pb-12 px-2">
        {filteredParticipants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              No participants found
            </h2>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredParticipants.map((participant) => (
              <ParticipantTile
                key={participant.id}
                participant={participant}
                onMicToggle={handleMicToggle}
                onCameraToggle={handleCameraToggle}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ParticipantsPage;
