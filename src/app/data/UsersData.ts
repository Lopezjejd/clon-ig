import { User } from '@/types/User'; 

export const user_viajero: User = {
  id: 'u1',
  username: 'viajero_digital',
  fullName: 'Elena Ríos',
  profilePicture: '/avatars/pfp-viajero.jpg',
  location: 'Kioto, Japón',
  stories: {
    mediaUrl: '/stories/1.jpg',
    createdAt: new Date('2024-06-20T10:00:00Z'),
  
  }
};

export const user_dev: User = {
  id: 'u2',
  username: 'codigo_y_cafe',
  fullName: 'Juan Pérez',
  profilePicture: '/avatars/pfp-dev.jpg',
  location: 'Remoto',
};

export const user_fan: User = {
  id: 'u3',
  username: 'best_fan_ever',
  fullName: 'Ana Gómez',
  profilePicture: '/avatars/pfp-fan.jpg',
  location: 'Madrid, España',
};

// --- Nuevos Usuarios Adicionales ---

export const user_foodie: User = {
  id: 'u4',
  username: 'sabor_local',
  fullName: 'Carlos Ruiz',
  profilePicture: '/avatars/pfp-foodie.jpg',
  location: 'Ciudad de México',
};

export const user_photographer: User = {
  id: 'u5',
  username: 'luz_y_sombra_foto',
  fullName: 'Sofía Castro',
  profilePicture: '/avatars/pfp-photo.jpg',
  location: 'Nueva York, EE. UU.',
};

export const user_gamer: User = {
  id: 'u6',
  username: 'pixel_master_01',
  fullName: 'Ricardo Vidal',
  profilePicture: '/avatars/pfp-gamer.jpg',
  location: 'Buenos Aires, Argentina',
};

// Exportamos un array completo para usar en sugerencias del Sidebar o en el Feed
export const MOCK_USERS: User[] = [
  user_viajero,
  user_dev,
  user_fan,
  user_foodie,
  user_photographer,
  user_gamer,
];

// Opcional: El usuario logueado que usarás en tu mock de inicio
export const LOGGED_IN_USER = user_dev;