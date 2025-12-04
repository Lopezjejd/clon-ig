"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  storiesNumber?: number;
  isOpen: boolean;
  onClose: () => void;
  // NUEVAS PROPS:
  activeIndex?: number; // índice de la story actualmente activa
  activeKey?: number;   // contador/version para forzar remount de la animación
  durationMs?: number;  // duración de la barra actual (ms)
  children?: React.ReactNode;
};

export default function Viewer({
  storiesNumber = 0,
  isOpen,
  onClose,
  activeIndex = 0,
  activeKey = 0,
  durationMs = 4000,
  children,
}: Props) {
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

  // build progress bars: prev = full, active = animated, next = empty
  const bars = Array.from({ length: storiesNumber });

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* modal box */}
      <div
        className="relative z-10 w-[min(900px,95%)] max-h-[90vh] overflow-auto bg-transparent rounded-lg p-4"
        tabIndex={-1}
      >
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-0 right-3 font-extrabold text-gray-50 hover:text-black text-2xl leading-none drop-shadow-black cursor-pointer"
        >
          ✕
        </button>

        {/* PROGRESS BARS */}
        <div className="flex gap-2 items-center mb-2">
          {/* Inline style tag to define keyframes once per modal render */}
          <style>{`
            @keyframes story-progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>

          {bars.map((_, index) => {
            const isPrev = index < activeIndex;
            const isActive = index === activeIndex;
            const isNext = index > activeIndex;

            // key incluye activeKey para forzar remount de la barra activa cuando cambie
            const key = `story-progress-${activeKey}-${index}`;

            return (
              <div
                key={key}
                className="flex-1 h-1 rounded overflow-hidden bg-white/20"
                style={{ minWidth: 0 }}
                aria-hidden
              >
                <div
                  // Prev: full (100%); Active: animated from 0->100%; Next: 0%
                  style={{
                    height: "100%",
                    width: isPrev ? "100%" : isActive ? "0%" : "0%",
                    // Si es active, aplicamos la animación CSS
                    animation: isActive ? `story-progress ${durationMs}ms linear forwards` : undefined,
                    backgroundColor: "rgba(255,255,255,0.95)",
                    transformOrigin: "left center",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* children (la imagen/video/story) */}
        <div className="mt-2 overflow-hidden">{children}</div>
      </div>
    </div>
  );

  return createPortal(content, elRef.current);
}
