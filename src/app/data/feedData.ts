// src/data/feedData.ts

import { Post } from '@/types/Post'; // Usa el alias de ruta si lo tienes configurado
import { User } from '@/types/User'; 

// --- 1. Definición de Usuarios de Prueba ---
const user_viajero: User = {
  id: 'u1',
  username: 'viajero_digital',
  fullName: 'Elena Ríos',
  profilePicture: '/avatars/pfp-viajero.jpg', 
  location: 'Kioto, Japón',
};

const user_dev: User = {
  id: 'u2',
  username: 'codigo_y_cafe',
  fullName: 'Juan Pérez',
  profilePicture: '/avatars/pfp-dev.jpg',
  location: 'Remoto',
};

const user_fan: User = {
    id: 'u3',
    username: 'best_fan_ever',
    fullName: 'Ana Gómez',
    profilePicture: '/assets/pfp-fan.jpg',
};

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
    imageUrl: '/assets/post-code.jpg',
    caption: '¡Por fin terminé el diseño del layout! Nada como un buen café para celebrar el avance. #Nextjs #ReactDev',
    likes: 450,
    isLikedByCurrentUser: false,
    timeAgo: '5 horas',
    comments: []
  },
];