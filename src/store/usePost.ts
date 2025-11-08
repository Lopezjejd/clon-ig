// stores/usePostStore.ts
import { create } from 'zustand'
import type { Post } from '../types/Post'   // ajusta la ruta a donde tengas la interfaz
import type { Comment } from '../types/Comment'
// ... (tus imports existentes)
import { v4 as uuidv4 } from 'uuid' // 👈 AÑADE ESTO
import type { User } from '../types/User'
type PostState = {
  posts: Post[]
  isInitialized: boolean
  setPosts: (posts: Post[]) => void
  toggleLike: (postId: string) => void
  addComment: (postId: string, comment: Comment) => void
  addPost: (user: User, imageUrl: string, caption: string) => void // 👈 AÑADE ESTA LÍNEA

}

export const usePostStore = create<PostState>((set, get) => ({
posts: [],
  isInitialized: false, // 👈 Se inicializa en falso

  // 🔄 setPosts modificado para evitar la sobrescritura
  setPosts: (initialPosts) => {
    const { isInitialized } = get(); // Obtiene el estado actual

    if (isInitialized) {
        console.warn("Zustand: Intentó inicializar posts más de una vez. Ignorado.");
        return; // Detiene la ejecución si ya está inicializado
    }
    
    set({
      posts: initialPosts,
      isInitialized: true, // Marca como inicializado
    });
  },
  // Toggle like: actualiza isLikedByCurrentUser y el contador likes
  toggleLike: (postId) => {
    set((state) => ({
      ...state,
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p

        // defensas
        const isLiked = Boolean(p.isLikedByCurrentUser)
        const currentLikes = typeof p.likes === 'number' ? p.likes : 0
        //si hay likes lo muestro si no 0
        return {
          ...p,
          isLikedByCurrentUser: !isLiked,//cambio el estado del like
          likes: isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1
          // si ya estaba likeado resto 1, si no sumo 1
        }
      })
    }))
  },

  // Añadir comentario (recibe un Comment ya formado)
  addComment: (postId, comment) => {
    set((state) => ({
      ...state,
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, comments: Array.isArray(p.comments) ? [...p.comments, comment] : [comment] } : p
      )
    }))
  },
  // 👇 PEGA TODA ESTA NUEVA FUNCIÓN AQUÍ
addPost: (user, imageUrl, caption) => {
  
  // 1. Creamos el nuevo objeto Post
  const newPost: Post = {
    id: uuidv4(), // ID único
    user: user,
    imageUrl: imageUrl,
    caption: caption,
    likes: 0,
    isLikedByCurrentUser: false,
    timeAgo: 'Justo ahora', // Simulación
    comments: []
  }
  // 2. Usamos 'set' para añadir el nuevo post al array de posts
  set((state) => ({
    posts: [newPost, ...state.posts] // Pone el nuevo post al inicio del feed
  }))
}

}))

export default usePostStore
