export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>

      <p className="mt-4 text-gray-600 text-sm">
        Cargando perfil...
      </p>
    </section>
  );
}
