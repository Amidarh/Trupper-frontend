"use client"

import { ModeToggle } from "@/core/commons/modeToggle";
import { useAltStore } from "@/lib/zustand/userStore";

export default function Home() {
  const { organization } = useAltStore()
  return (
    <div>
      <h1>This is a test for {organization?.name}</h1>
      <ModeToggle />
    </div>
  );
}
