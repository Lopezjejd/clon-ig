import React, { useState, useRef, useEffect } from 'react';

// Definición de tipos para las props (TypeScript)
interface CommentTextareaProps {
  className?: string;
  placeholder?: string;
  onPost: (text: string) => void;
  // Opcional para Tailwind v4: usar 'group' si está configurado en tu tailwind.config
  // className?: string; 
}

/**
 * Textarea de comentarios con auto-ajuste (auto-resize) y botón de Publicar.
 * Ideal para el campo de comentarios de un clon de Instagram.
 */
const CommentTextarea: React.FC<CommentTextareaProps> = ({className = "" ,placeholder = 'Añade un comentario...', onPost }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // 1. Efecto para auto-ajustar la altura del textarea al contenido
  useEffect(() => {
    if (textareaRef.current) {
      // Reinicia la altura para que pueda encogerse
      textareaRef.current.style.height = 'auto'; 
      // Fija la nueva altura basándose en el contenido
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handlePost = () => {
    if (text.trim()) {
      onPost(text.trim());
      setText(''); // Limpia el campo después de publicar
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Permite al usuario enviar el comentario con Shift + Enter o solo Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evita un salto de línea en el textarea
      handlePost();
    }
  };

  const isButtonDisabled = text.trim().length === 0;

  return (
    <div className={`flex w-[80%]  items-end p-2 sm:p-3 border-t rounded-3xl border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-700  ${className}`}>
      
      {/* Icono de Emoji (Opcional para mejorar la estética) */}
      <button 
        type="button" 
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        aria-label="Añadir emoji"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </button>

      {/* TEXTAREA PRINCIPAL */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1} // Fila inicial mínima
        className="
        grow mx-2 resize-none overflow-hidden 
          bg-transparent text-sm text-gray-800 dark:text-gray-200 
          focus:outline-none placeholder-gray-500 
          min-h-6 max-h-[150px] // Límites de altura
        "
      />

      {/* BOTÓN DE PUBLICAR */}
      <button
        onClick={handlePost}
        disabled={isButtonDisabled}
        className={`
          pb-1 pr-1
          cursor-pointer
          text-sm font-semibold transition-colors duration-200
          ${isButtonDisabled 
            ? 'text-blue-300 dark:text-blue-700 cursor-not-allowed' 
            : 'text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400'
          }
        `}
      >
        Publicar
      </button>
    </div>
  );
};

export default CommentTextarea;