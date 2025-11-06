import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import React from 'react';
interface ScrollableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
// ... (Interface ScrollableModalProps sin cambios)

const ScrollableModal: React.FC<ScrollableModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        
        {/* Overlay (Fondo oscuro) */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* 1. CONTENEDOR EXTERNO: Alineación a la parte inferior (cambio clave) */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* CAMBIO CLAVE: Usamos items-end en lugar de items-center para mover la modal abajo */}
          <div className="flex min-h-full items-end justify-center text-center">
            
            {/* 2. PANEL DE LA MODAL: Dimensiones y Animación de Deslizamiento */}
            <Transition.Child
              as={Fragment}
              // ANIMACIÓN DE ENTRADA: Desliza desde abajo (translate-y-full)
              enter="ease-out duration-300 transform transition-all"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              // ANIMACIÓN DE SALIDA: Desliza hacia abajo (translate-y-full)
              leave="ease-in duration-200 transform transition-all"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel 
                // DIMENSIONES: w-full (ancho completo) y max-w-[1200px]
                // ALTURA: min-h-[80vh] (80% del viewport) y rounded-t-xl (solo arriba)
                className="w-full max-w-[1200px] min-h-[80vh] transform overflow-hidden rounded-t-xl 
                           bg-white p-4 text-left shadow-2xl transition-all dark:bg-zinc-800"
              >
                
                {/* Título de la Modal */}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 pb-2 border-b dark:border-zinc-700"
                >
                  {title}
                </Dialog.Title>

                {/* Área del Contenido con Scroll Vertical */}
                {/* CLAVE: La altura máxima se basa en el espacio restante dentro de la modal (h-full) */}
                <div 
                  className="mt-2 h-full overflow-y-auto pb-8 pr-2" 
                >
                  {children}
                </div>

                {/* Nota: Se recomienda mover el botón de cierre si el título está claro, 
                   o mantenerlo flotante si es necesario, pero lo dejamos aquí por simplicidad. */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScrollableModal;