// components/stories/Viewer.tsx
"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function Viewer({ isOpen, onClose, children }: Props) {
  const rootId = "modal-root";
  const elRef = useRef<HTMLDivElement | null>(null);
  const prevOverflowRef = useRef<string>("");

  // crear contenedor dentro de #modal-root
  useEffect(() => {
    let root = document.getElementById(rootId);
    if (!root) {
      root = document.createElement("div");
      root.id = rootId;
      document.body.appendChild(root);
    }
    const el = document.createElement("div");
    elRef.current = el;
    root.appendChild(el);
    return () => {
      if (elRef.current && root.contains(elRef.current)) root.removeChild(elRef.current);
    };
  }, []);

  // efectos al abrir/cerrar modal: bloqueo scroll y Esc
  useEffect(() => {
    if (!isOpen) return;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflowRef.current;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !elRef.current) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
       />

      {/* modal box */}
      <div
        className="relative z-10 w-[min(900px,95%)] max-h-[90vh] overflow-auto bg-transparent rounded-lg p-4"
        tabIndex={-1}
      >
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-0 right-3 font-extrabold text-gray-50 hover:text-black
          text-2xl leading-none drop-shadow-black portrait:
          cursor-pointer "
        >
          ✕
        </button>

        <div className="mt-2 overflow-hidden">{children}</div>
      </div>
    </div>
  );

  return createPortal(content, elRef.current);
}
