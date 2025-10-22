import { user_dev } from "@/app/data/feedData"

export default function UserProfile() {
  const currentUser = user_dev

  return (
    <section className="max-w-4xl mx-auto p-4">
      {/* Header del perfil */}
      <div className="flex items-center gap-8 md:gap-16 mb-8">
        {/* Foto de perfil */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300">
          <img 
            src={currentUser.profilePicture} 
            alt={`Perfil de ${currentUser.username}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información del usuario */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">{currentUser.username}</h1>
            <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors">
              Editar perfil
            </button>
          </div>
          
          <div className="flex gap-8 mb-4">
            <span className="text-sm">
              <strong>0</strong> publicaciones
            </span>
            <span className="text-sm">
              <strong>0</strong> seguidores
            </span>
            <span className="text-sm">
              <strong>0</strong> seguidos
            </span>
          </div>

          <div>
            <p className="font-semibold">{currentUser.fullName}</p>
            <p className="text-sm text-gray-600">{currentUser.location}</p>
          </div>
        </div>
      </div>

      {/* Placeholder para publicaciones */}
      <div className="border-t border-gray-300 pt-4">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item}
              className="aspect-square bg-gray-100 rounded-md flex items-center justify-center"
            >
              <span className="text-gray-400">📷</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}