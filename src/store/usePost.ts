// stores/usePostStore.ts
import { create } from 'zustand'
import type { Post } from '../types/Post'   // ajusta la ruta a donde tengas la interfaz
import type { Comment } from '../types/Comment'

type PostState = {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  toggleLike: (postId: string) => void
  addComment: (postId: string, comment: Comment) => void
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],

  // Inicializar / reemplazar posts (útil para tus mocks)
  setPosts: (posts) => set((state) => ({ ...state, posts })),

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
  }
}))

export default usePostStore
