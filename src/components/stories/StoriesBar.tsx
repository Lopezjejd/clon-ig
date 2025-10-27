// En components/StoriesBar.tsx (Código Limpio)

// Importaciones necesarias (asumiendo que StoriesBar necesita 'useState')
import Story from './Story'; // Importamos el nuevo componente

import { MOCK_USERS } from '@/app/data/UsersData';
import StoriesContainer  from './StoryContainer';

export default function StoriesBar() {
  // Asegúrate de que MOCK_USERS[1] es tu usuario (el que representa 'Tu story')
  const currentUser = MOCK_USERS[1]; 

  return (
    <StoriesContainer 
      currentUser={currentUser} 
      users={MOCK_USERS}
    />
  );
}