"use client"
import Image from 'next/image'; // 👈 ¡Importación de next/image!

// Asumo que tienes el tipo User definido en otro lugar
import type { User } from '@/types/User'; 

interface StoryProps {
  user: User;
  isYours?: boolean; // Para diferenciar tu historia (Tu story)
}

export default function Story({ user, isYours = false }: StoryProps) {
  // El tamaño visual es 64x64px (w-16 h-16), por lo que usamos 64 como referencia.
  const avatarSize = 64; 
  
  return (
    // Contenedor principal de la historia
    <div className="flex flex-col items-center shrink-0 cursor-pointer">
      
      {/* Marco del Avatar con el Gradiente (simulando el borde de la historia) */}
      <div 
        className={`
          w-16 h-16 rounded-full p-0.5 
          ${isYours 
            ? 'border-2 border-gray-300' // Si es "Tu story", borde más simple o none
            : 'bg-linear-to-tr from-yellow-400 to-purple-600' // 👈 Corrección: Usamos bg-gradient-to-tr
          }
      `}>
        {/* Contenedor interno para que la imagen quede centrada */}
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          
            {/* 📸 Imagen del Perfil (¡Usando Next/Image!) */}
            <Image
              src={user.profilePicture}
              alt={`Foto de perfil de ${user.username}`}
              // 1. Obligatorio: Referencia de proporción 1:1 para evitar CLS.
              width={avatarSize} 
              height={avatarSize}
              // 2. Tailwind: Sobrescribe el tamaño y aplica estilos.
              className="w-full h-full rounded-full border-2 border-white object-cover"
              // priority para que las primeras historias carguen rápido
              priority 
            />
        </div>
      </div>
      
      {/* Nombre de Usuario */}
      <span className={`text-xs mt-1 truncate max-w-16 ${isYours ? 'font-semibold' : ''}`}>
        {isYours ? 'Tu story' : user.username}
      </span>
    </div>
  );
}