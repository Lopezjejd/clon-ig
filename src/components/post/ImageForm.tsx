'use client'

import React, { useState, ChangeEvent, useRef } from 'react';
import { CameraIcon, XCircleIcon } from '@heroicons/react/24/outline'; // Iconos

// Props: Qué necesita el componente
interface ImageUploadProps {
  // Función para notificar al padre sobre el archivo seleccionado
  onImageSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      
      // 1. Notificar al padre (el formulario)
      onImageSelect(file); 
      
      // 2. Crear URL de previsualización para mostrarla
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Detiene el clic para no abrir el explorador de archivos
    setPreviewUrl(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Resetea el input
    }
  };

  const handleClick = () => {
    // Abre el diálogo de selección de archivos
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`relative w-full aspect-square bg-gray-100 dark:bg-zinc-800 rounded-lg cursor-pointer 
                  flex items-center justify-center overflow-hidden transition-all
                  ${!previewUrl ? 'border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-gray-400' : ''}`}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg, image/png, image/webp" // Acepta solo imágenes comunes
        onChange={handleFileChange}
        className="hidden" // Oculta el input nativo
      />
      
      {previewUrl ? (
        // --- ESTADO 1: Con Previsualización ---
        <>
          <img 
            src={previewUrl} 
            alt="Vista previa del post" 
            className="w-full h-full object-cover" 
          />
          <button 
            type="button" // Importante para que no envíe el form
            onClick={handleClearImage}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            aria-label="Quitar imagen"
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </>
      ) : (
        // --- ESTADO 2: Vacío (Placeholder) ---
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          <CameraIcon className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm font-medium">Click para subir una imagen</p>
          <p className="text-xs">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;