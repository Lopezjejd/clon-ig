import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import React from 'react';

interface ScrollableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

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

        {/* 1. CONTENEDOR EXTERNO: Alineación a la parte inferior */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center">
            
            {/* 2. PANEL DE LA MODAL: Dimensiones y Animación */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform transition-all"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200 transform transition-all"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel 
                // ✨ CAMBIO 1: Convertir la Modal en un Contenedor Flex de Columna (flex-col)
                // y usar p-0 para gestionar el padding en hijos.
                className="w-full max-w-[1200px] min-h-[80vh] flex flex-col transform overflow-hidden rounded-t-xl 
                           bg-white text-left shadow-2xl transition-all dark:bg-zinc-800"
              >
                
                {/* Título de la Modal (Fijo, no se mueve) */}
                <Dialog.Title
                  as="h3"
                  // Padding en el título para dejar espacio
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100 p-4 pb-2 border-b dark:border-zinc-700 shrink-0"
                >
                  {title}
                </Dialog.Title>

                {/* 🌟 CAMBIO 2: Área del Contenido (Flex-grow y Sin Scroll) 🌟 */}
                <div 
                  // Usamos flex-grow para que ocupe el espacio restante verticalmente
                  // p-4 para el padding interno y h-full para asegurar la altura
                  className="p-4 pt-2 grow overflow-hidden"
                >
                  {/*
                    Aquí el hijo (children) recibirá todo el espacio restante. 
                    El hijo debe manejar su propio scroll.
                  */}
                  {children}
                </div>

                {/* Pie/Botón de Cierre (Fijo, no se mueve) */}
                <div className="p-4 pt-2 shrink-0 border-t dark:border-zinc-700">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-700 dark:text-white"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScrollableModal;