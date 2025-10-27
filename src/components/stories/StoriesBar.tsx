// En components/StoriesBar.tsx (Código Limpio)

// Importaciones necesarias (asumiendo que StoriesBar necesita 'useState')
import Story from './Story'; // Importamos el nuevo componente
import { mockStories } from '@/app/data/storiesData';
import { MOCK_USERS } from '@/app/data/UsersData';

export default function StoriesBar() {
  // Asegúrate de que MOCK_USERS[1] es tu usuario (el que representa 'Tu story')
  const currentUser = MOCK_USERS[1]; 

  return (
    // Usamos flex-shrink-0 en los hijos y overflow-x-auto en el padre para el scroll horizontal
    <div className="flex gap-4 p-4 bg-white border-b overflow-x-auto scrollbar-hide"> 
      
      {/* 1. Tu Story (hardcodeado, usa el prop isYours) */}
      <Story 
        user={currentUser} 
        isYours={true} 
      />

      {/* 2. Stories de otros (mapeadas) */}
      {
        mockStories.map((story) => {
          // Nota: En una app real, la data debería estar ya combinada para evitar este find
          const user = MOCK_USERS.find(u => u.id === story.userId); 
          
          if (!user) return null;
          
          return (
            <Story 
              key={story.id} 
              user={user} 
            />
          );
        })
      }
    </div>
  );
}