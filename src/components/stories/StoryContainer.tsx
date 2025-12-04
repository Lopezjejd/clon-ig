"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Story from "./Story";
import type { User } from "@/types/User";
import Viewer from "./StoryViewer";
import UserProfile from "@/components/user/UserProfile";

interface StoriesContainerProps {
  currentUser: User;
  users: User[];
}

const INTERVAL_TIME = 4000; // 4 segundos

export default function StoriesContainer({ currentUser, users }: StoriesContainerProps) {
  const [openUserId, setOpenUserId] = useState<string | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  // storyVersion: contador que forzará remount/regen de la animación en Viewer
  const [storyVersion, setStoryVersion] = useState<number>(0);

  const openUserIdRef = useRef<string | null>(openUserId);
  const currentStoryIndexRef = useRef<number>(currentStoryIndex);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => { openUserIdRef.current = openUserId }, [openUserId]);
  useEffect(() => { currentStoryIndexRef.current = currentStoryIndex }, [currentStoryIndex]);

  const usersWithStories = users.filter(
    (u) => Array.isArray(u.stories) && u.stories.length > 0
  );

  const clearIntervalIfAny = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  // --- CLOSE SIEMPRE ARRIBA PARA EL SCOPE ---
  const close = () => {
    setOpenUserId(null);
    setCurrentStoryIndex(0);
    clearIntervalIfAny();
  };

  // --- NEXT ---
  const advanceStory = () => {
    const currentUserId = openUserIdRef.current;
    if (!currentUserId) return;

    const uIndex = usersWithStories.findIndex((u) => u.id === currentUserId);
    if (uIndex === -1) {
      close();
      return;
    }

    const userStories = usersWithStories[uIndex].stories;
    if (!Array.isArray(userStories) || userStories.length === 0) {
      const nextUserIndex = uIndex + 1;
      if (nextUserIndex >= usersWithStories.length) {
        close();
        return;
      }
      setOpenUserId(usersWithStories[nextUserIndex].id);
      setCurrentStoryIndex(0);
      setStoryVersion((v) => v + 1); // forzar remount en Viewer
      return;
    }

    const nextIndex = currentStoryIndexRef.current + 1;

    if (nextIndex < userStories.length) {
      setCurrentStoryIndex(nextIndex);
      setStoryVersion((v) => v + 1); // forzar remount en Viewer
      return;
    }

    const nextUserIndex = uIndex + 1;
    if (nextUserIndex >= usersWithStories.length) {
      close();
      return;
    }

    setOpenUserId(usersWithStories[nextUserIndex].id);
    setCurrentStoryIndex(0);
    setStoryVersion((v) => v + 1); // forzar remount en Viewer
  };

  // --- PREVIOUS ---
  const retreatStory = () => {
    const currentUserId = openUserIdRef.current;
    if (!currentUserId) return;

    const uIndex = usersWithStories.findIndex((u) => u.id === currentUserId);
    if (uIndex === -1) {
      close();
      return;
    }

    const userStories = usersWithStories[uIndex].stories;
    if (!Array.isArray(userStories) || userStories.length === 0) {
      const prevUserIndex = uIndex - 1;
      if (prevUserIndex < 0) {
        close();
        return;
      }

      const prevUser = usersWithStories[prevUserIndex];
      if (!prevUser || !Array.isArray(prevUser.stories) || prevUser.stories.length === 0) {
        close();
        return;
      }

      setOpenUserId(prevUser.id);
      setCurrentStoryIndex(prevUser.stories.length - 1);
      setStoryVersion((v) => v + 1);
      return;
    }

    const prevIndex = currentStoryIndexRef.current - 1;
    if (prevIndex >= 0) {
      setCurrentStoryIndex(prevIndex);
      setStoryVersion((v) => v + 1);
      return;
    }

    const prevUserIndex = uIndex - 1;
    if (prevUserIndex < 0) {
      close();
      return;
    }

    const prevUser = usersWithStories[prevUserIndex];
    if (!prevUser || !Array.isArray(prevUser.stories) || prevUser.stories.length === 0) {
      close();
      return;
    }

    setOpenUserId(prevUser.id);
    setCurrentStoryIndex(prevUser.stories.length - 1);
    setStoryVersion((v) => v + 1);
  };

  const startInterval = () => {
    clearIntervalIfAny();
    intervalIdRef.current = window.setInterval(() => {
      advanceStory();
    }, INTERVAL_TIME);
  };

  const openStory = (userId: string, index = 0) => {
    setOpenUserId(userId);
    setCurrentStoryIndex(index);
    setStoryVersion((v) => v + 1); // al abrir, forzamos el remount para que las barras arranquen limpias
  };

  useEffect(() => {
    if (!openUserId) {
      clearIntervalIfAny();
      return;
    }
    startInterval();
    return () => clearIntervalIfAny();
  }, [openUserId, usersWithStories]);

  const handleNextClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    clearIntervalIfAny();
    advanceStory();
    startInterval();
  };

  const handlePrevClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    clearIntervalIfAny();
    retreatStory();
    startInterval();
  };

  const current = users.find((u) => u.id === openUserId) ?? null;
  const currentStory = current?.stories?.[currentStoryIndex] ?? null;

  return (
    <div className="flex gap-4 p-4 bg-white border-b overflow-x-auto scrollbar-hide">
      <Story user={currentUser} isYours={true} onOpenViewer={openStory} />

      {users.map((user) =>
        user.stories && user.stories.length > 0 ? (
          <Story
            key={`user-story-${user.id}-${user.username}`}
            user={user}
            onOpenViewer={openStory}
          />
        ) : null
      )}

      <Viewer
        storiesNumber={current?.stories ? current.stories.length : 0}
        isOpen={!!openUserId}
        onClose={close}
        // nuevas props para el progress bar control
        activeIndex={currentStoryIndex}
        activeKey={storyVersion}
        durationMs={INTERVAL_TIME}
      >
        {current && currentStory ? (
          <div className="w-full h-[80vh] grid place-items-center overflow-y-hidden">
            <div className="relative w-full h-full max-w-[900px] rounded-md p-1 overflow-hidden bg-black">
              <UserProfile user={current} className="text-white absolute top-4" />

              <button
                aria-label="Anterior"
                onClick={handlePrevClick}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
              >
                ‹
              </button>
              <button
                aria-label="Siguiente"
                onClick={handleNextClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
              >
                ›
              </button>

              <Image
                src={currentStory.mediaUrl}
                alt={current.username ?? "Historia"}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="py-12 text-black">Cargando...</div>
        )}
      </Viewer>
    </div>
  );
}

