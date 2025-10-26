// src/data/feedData.ts

import { Post } from '@/types/Post'; // Usa el alias de ruta si lo tienes configurado
import { User } from '@/types/User'; 
import { user_viajero, user_dev, user_fan } from './UsersData';


// --- 2. Feed de Posts ---
export const MOCK_FEED_POSTS: Post[] = [
  {
    id: 'p1',
    user: user_viajero,
    imageUrl: '/post/post-kioto.jpg',
    caption: 'La neblina matutina en Arashiyama es pura magia. ¡Necesitas visitar este bosque de bambú!',
    likes: 1245,
    isLikedByCurrentUser: true,
    timeAgo: '2 horas',
    comments: [
        {
            id: 'c1',
            user: user_fan,
            text: '¡Wow, qué foto! Un sueño 😍',
            timeAgo: '1 hora',
        },
        {
            id: 'c2',
            user: user_dev,
            text: 'Increíble, ¡gran contraste!',
            timeAgo: '30 minutos',
        }
    ]
  },
  {
    id: 'p2',
    user: user_dev,
    imageUrl: '/post/post-code.jpg',
    caption: '¡Por fin terminé el diseño del layout! Nada como un buen café para celebrar el avance. #Nextjs #ReactDev',
    likes: 450,
    isLikedByCurrentUser: false,
    timeAgo: '5 horas',
    comments: []
  },
];