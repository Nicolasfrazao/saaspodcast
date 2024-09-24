'use client';

import { AudioContextType, AudioProps } from "@/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Create a context for the audio player that can be used anywhere in the app
 */
const AudioContext = createContext<AudioContextType | undefined>(undefined);

/**
 * The AudioProvider component that wraps the entire app
 * 
 * This component is responsible for providing the audio player state to the rest of the app
 * and keeping track of the current audio state.
 * 
 * The state is an object with the properties:
 * - audio: The current audio file being played, or undefined if no audio is playing.
 * - setAudio: A function to set the current audio file being played.
 * 
 * The AudioProvider also listens for changes to the current route and when the route
 * changes to '/create-podcast', it resets the audio state to undefined.
 */
const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | undefined>(undefined);
  const pathname = usePathname();

  /**
   * When the route changes, reset the audio state to undefined if the new route is '/create-podcast'
   */
  useEffect(() => {
    if(pathname === '/create-podcast') setAudio(undefined);
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio}}>
      {children}
    </AudioContext.Provider>
  )
}
export const useAudio = () => {
  // Get the current context for the audio player from the AudioContext
  const context = useContext(AudioContext);

  // If the context is undefined, it means that useAudio was called outside of an AudioProvider
  // This is not allowed, so throw an error
  if (!context) {
    throw new Error(
      "useAudio must be used within an AudioProvider. This hook is used to get the current audio player state and to update the state. If you're trying to use useAudio outside of an AudioProvider, you need to wrap your app with the AudioProvider component."
    );
  }

  // Return the context, which includes the current audio player state and a function to update the state
  return context;
};

// This is the default export of the module, which is the AudioProvider component
export default AudioProvider;
