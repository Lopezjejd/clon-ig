"use client"
import Image from 'next/image';
import { useState,useEffect,useRef } from 'react';
import Story from "./Story";
import type { User } from '@/types/User';
import Viewer from './StoryViewer';
import UserProfile from "@/components/user/UserProfile"
interface StoriesContainerProps {
  currentUser: User;

    users: User[];

}
const INTERVAL_TIME = 5000; // 5 segundos

export default function StoriesContainer({currentUser, users}: StoriesContainerProps) {
     const [openId, setOpenId] = useState<string | null>(null);
     
  const openStory = (id: string) => {
    setOpenId(id);
  };
  const close = () => setOpenId(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!openId)  return;
     const updateStory = () => {
        setOpenId((prevId) => {
            if (!prevId) return null;
            const currentIndex = users.findIndex((u) => u.id === prevId);
            const nextIndex = (currentIndex + 1) % users.length;
            return users[nextIndex].id;
        });
     }
        intervalIdRef.current = setInterval(updateStory, INTERVAL_TIME);
        return () => {
            if (intervalIdRef.current !== null){
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
            } 
  }), [openId, users];

  const current = users.find((u) => u.id === openId) ?? null;
    return (
            // Usamos flex-shrink-0 en los hijos y overflow-x-auto en el padre para el scroll horizontal
    <div className="flex gap-4 p-4 bg-white border-b overflow-x-auto scrollbar-hide"> 
      
      {/* 1. Tu Story (hardcodeado, usa el prop isYours) */}
      <Story 
        user={currentUser} 
        isYours={true}
        onOpenViewer={openStory} 
      />

      {/* 2. Stories de otros (mapeadas) */}
      {
        
        users.map((user) => {
          // Nota: En una app real, la data debería estar ya combinada para evitar este find
      
          
          if (!user.stories) return null;
          
          return (
            <Story 
              key={`user-story-${user.id}${user.username}`}  
              user={user} 
              onOpenViewer={openStory}
            />
          );
        })
      }
        {/* Story Viewer Modal */}
<Viewer isOpen={!!openId} onClose={close}>
  {current?.stories ? (
    <div className="w-full h-[80vh] grid place-items-center overflow-y-hidden">
      {/* contenedor que limita ancho máximo y evita overflow */}
      <div className="relative w-full h-full max-w-[900px] max-h-full rounded-md p-1 overflow-hidden bg-black">
         <UserProfile user={current} className='text-white absolute' ></UserProfile>
        {/* 
          - fill hace que la <Image /> llene el contenedor relativo
          - object-contain mantiene la relación y centra la imagen
        */}
        <Image
          src={current.stories.mediaUrl}
          alt={current.username ?? "Historia de usuario"}
          fill
          className="object-contain"
          sizes="(max-width: 900px) 95vw, 900px"
          priority={false}
        />
      </div>
    </div>
  ) : (
    <div className="py-12">Cargando...</div>
  )}
</Viewer>
    </div>
    )
}