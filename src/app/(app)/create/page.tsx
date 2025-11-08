'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// 1. Importa tus dependencias
import usePost from '@/store/usePost';
import { LOGGED_IN_USER } from '@/app/data/UsersData'; // Importa tu usuario mock
import ImageUpload from '@/components/post/ImageForm'; // Importa el componente de imagen

export default function CreatePostPage() {
  const router = useRouter();
  const { addPost } = usePost(); // 1. Trae la función 'addPost' del Store

  // 2. Estados locales para el formulario
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Callback para el componente ImageUpload
  const handleImageSelect = (file: File | null) => {
    setImageFile(file);
  };

  // 4. Lógica de envío (Submit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || isSubmitting) return; // Validación

    setIsSubmitting(true);

    // --- Simulación de Subida de Imagen ---
    // En el mundo real, subirías 'imageFile' a S3, Firebase, etc.
    // Para nuestro mock, solo creamos una URL local para la imagen.
    const mockImageUrl = URL.createObjectURL(imageFile);

    // 5. Llama a la función 'addPost' de Zustand
    addPost(LOGGED_IN_USER, mockImageUrl, caption);

    // (Simulamos un pequeño retraso de red)
    setTimeout(() => {
      // 6. Redirige al usuario al Feed
      router.push('/');
    }, 500); // 0.5 segundos
  };

  const isButtonDisabled = !imageFile || isSubmitting;

  // 7. El JSX del Formulario
  return (
    <div className="max-w-md mx-auto p-4 pt-10 pb-24"> {/* pb-24 para espacio del NavBottom */}
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Componente de Subida de Imagen */}
        <ImageUpload onImageSelect={handleImageSelect} />

        {/* Campo de Pie de Foto (Caption) */}
        <div className="w-full">
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Pie de foto
          </label>
          <textarea
            id="caption"
            placeholder="Escribe algo..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm 
                       dark:bg-zinc-800 dark:border-zinc-700 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón de Publicar */}
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full p-3 rounded-lg font-bold text-white transition-all 
            ${isSubmitting ? 'bg-gray-400' : ''}
            ${isButtonDisabled && !isSubmitting ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed' : ''}
            ${!isButtonDisabled ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' : ''}
          `}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}