'use client';

import React, { useEffect, useState } from 'react';
import { MOCK_USERS } from "@/app/data/UsersData";
import { useParams, useRouter } from "next/navigation";
import { LOGGED_IN_USER } from "@/app/data/UsersData";

// Tipado opcional: ajusta según tu proyecto
type User = {
  id: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
  location?: string;
  // ...otros campos
};

export default function UserProfilePage() {
  const params = useParams(); // puede ser undefined durante hidratación
  const router = useRouter();

  // Estado local para manejar sincronía: undefined = loading, null = not found, User = encontrado
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // Extraer param de forma defensiva
  const targetUserId = params?.userId ?? params?.id ?? undefined;
  // console para debugging
  console.log('useParams raw:', params, ' -> targetUserId:', targetUserId);

  // Cuando el param exista, buscar el usuario en el mock
  useEffect(() => {
    if (!targetUserId) {
      // todavía no tenemos params (hidratación) -> quedamos en loading
      setUser(undefined);
      return;
    }

    const found = MOCK_USERS.find((u) => u.id === targetUserId) ?? null;
    setUser(found);
  }, [targetUserId]);

  // Si no encontramos usuario, redirigimos a una 404 (client-safe) después de setear el estado
  useEffect(() => {
    if (user === null) {
      // reemplaza la ruta por la página 404 del sitio o muestra un fallback
      router.replace('/404'); // o router.push('/not-found') según tu app
    }
  }, [user, router]);

  // Mientras el param no esté listo o estemos buscando -> mostrar nada o un loading simple
  if (user === undefined) {
    return (
      <section className="max-w-4xl mx-auto p-4 pt-10">
        <div className="text-center py-12 text-gray-500">Cargando perfil...</div>
      </section>
    );
  }

  // Si user === null, ya estamos redirigiendo; render vacío para evitar flash
  if (user === null) return null;

  // isCurrentUser (igual que antes)
  const isCurrentUser = user.id === LOGGED_IN_USER.id;

  return (
    <section className="max-w-4xl mx-auto p-4 pt-10">
      {/* Header del perfil */}
      <div className="flex items-center gap-8 md:gap-16 mb-8">
        {/* Foto de perfil */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300 dark:border-zinc-700">
          <img 
            src={user.profilePicture} 
            alt={`Perfil de ${user.username}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información del usuario */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">{user.username}</h1>
            
            {/* Botón de acción: Editar o Seguir */}
            {isCurrentUser ? (
              <button
                className="px-4 text-black py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-600">
                Editar perfil
              </button>
            ) : (
              <button
                className="px-4 text-white py-1 bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium transition-colors">
                Seguir
              </button>
            )}
          </div>
          
          <div className="hidden md:flex gap-8 mb-4">
            <span className="text-sm">
              <strong>{0}</strong> publicaciones
            </span>
            <span className="text-sm">
              <strong>{0}</strong> seguidores
            </span>
            <span className="text-sm">
              <strong>{0}</strong> seguidos
            </span>
          </div>

          <div>
            <p className="font-semibold">{user.fullName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.location}</p>
          </div>
        </div>
      </div>

      {/* Placeholder para publicaciones */}
      <div className="border-t border-gray-300 pt-4 dark:border-zinc-700">
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
            <p>Mostrando publicaciones de <strong>{user.username}</strong></p>
        </div>
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item}
              className="aspect-square bg-gray-200 dark:bg-zinc-800 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
            >
              <span className="text-gray-500 dark:text-gray-400">📷 Post {item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

