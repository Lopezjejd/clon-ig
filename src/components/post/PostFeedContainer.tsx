"use client"
import usePostStore from "@/store/usePost";
import { useEffect } from "react";
import { Post } from "@/types/Post";
import PostFeed from "./PostFeed";

// 1. Aceptar las props como un OBJETO
interface FeedMainProps {
  initialPosts: Post[]; // Renombramos para mayor claridad
}

// 2. Desestructurar las props del objeto de argumentos
export default function FeedMain({ initialPosts }: FeedMainProps) {
    
    // Obtenemos posts del store (será el array actualizado)
    const { setPosts, posts } = usePostStore();
    useEffect(() => {
        console.log("Posts in store:", posts);
    }, [posts]);
    
    
    // 3. Usa useEffect para cargar los datos solo UNA VEZ
    useEffect(() => {
        // Ejecuta setPosts SOLO una vez al montar el componente
        setPosts(initialPosts); 
    }, [setPosts, initialPosts]); // Dependencias: setPosts (estable) y initialPosts (para el caso de que cambien)

    // 4. Bloque de chequeo de estado (si posts está vacío en el store)
    // El store siempre se inicializa como un array vacío ([]), 
    // pero si la carga inicial no devuelve nada:
    if (posts.length === 0 && initialPosts.length === 0) {
        return <p>There are no posts to display.</p>;
    }
    
    return (
        <div>
            {/* 5. Iterar directamente sobre el array 'posts' del store, 
                   ya que fue inicializado y actualizado en el useEffect. */}
            {posts.map((post: Post) => (
                <PostFeed key={post.id} post={post} />
            ))}
        </div>
    )
}


