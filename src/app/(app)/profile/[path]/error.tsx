'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      <h2 className="text-xl font-semibold text-red-600">
        Ocurrió un error inesperado
      </h2>

      <p className="mt-2 text-gray-600 text-sm max-w-md">
        {error.message || 'Hubo un problema al cargar este perfil.'}
      </p>

      <button
        onClick={reset}
        className="mt-6 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Reintentar
      </button>
    </section>
  );
}
