export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Usuario no encontrado
      </h2>

      <p className="mt-2 text-gray-600 max-w-md text-sm">
        El perfil que intentas ver no existe o fue eliminado.
      </p>

      <a
        href="/"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        Volver al inicio
      </a>
    </section>
  );
}
