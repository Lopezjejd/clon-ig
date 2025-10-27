"use client"

import { useState,useEffect } from 'react';
import Story from "./Story";
import type { User } from '@/types/User';
import type { Story as StoryType } from '@/types/Story';
import Viewer from './StoryViewer';
interface StoriesContainerProps {
  currentUser: User;

    users: User[];

}

export default function StoriesContainer({currentUser, users}: StoriesContainerProps) {
     const [openId, setOpenId] = useState<string | null>(null);
     
  const openStory = (id: string) => {
    setOpenId(id);
  };
  const close = () => setOpenId(null);

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
        {/* lo mínimo para renderizar la historia por id */}
        {current ? (
          <div className="space-y-3">
       
            {current.stories  ? (
              <img src={current.stories.mediaUrl} alt={"historia de un usuario"} className="w-full rounded-md" />
            ) : null}
           
          </div>
        ) : (
          <div className="py-12">Cargando...</div>
        )}
      </Viewer>
    </div>
    )
}