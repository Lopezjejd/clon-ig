// app/users/[path]/page.tsx  (Server Component)
// SSR directo: fetch con cache: 'no-store' para datos siempre frescos

import React from 'react'
import { notFound, redirect } from 'next/navigation'
import { MOCK_USERS, LOGGED_IN_USER } from '@/app/data/UsersData'
import { Post } from '@/types/Post';
import { MOCK_FEED_POSTS } from '@/app/data/feedData';
import PostFeed from '@/components/post/PostFeed';
// TIP: adapta este type a tu modelo real
type User = {
  id: string | number
  username: string
  fullName?: string
  profilePicture?: string
  location?: string
  // ...otros campos
}

type Props = {
  params: {
    path: string // formato esperado: "usuario-id" (usuario puede tener guiones)
  }
}

/**
 * getUserById
 * - Si tienes una API real: deja la URL en API_URL y obtenlo con fetch({ cache: 'no-store' })
 * - Si no tienes API aún, usa MOCK_USERS (modo de desarrollo).
 *
 * NOTA: fetch({ cache: 'no-store' }) fuerza a Next a ejecutar la petición en cada request (SSR puro).
 */
async function getUserById(id: string): Promise<User | null> {
  // Si tienes una API, pon su URL en NEXT_PUBLIC_API_URL o cambia directamente la ruta acá:
  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? ''

  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/users/${encodeURIComponent(id)}`, {
        // cache: 'no-store' => siempre fresh (SSR)
        cache: 'no-store',
      })
      if (!res.ok) {
        // 404 del backend -> no existe
        return null
      }
      const data = await res.json()
      return data as User
    } catch (err) {
      console.error('[getUserById] error fetching from API:', err)
      return null
    }
  }

  // Fallback local (mock). Esto NO es "fresh" si editas MOCK_USERS en runtime,
  // pero en dev reiniciarás el servidor. Úsalo solo en local/dev.
  const found = (MOCK_USERS as User[]).find((u) => String(u.id) === String(id)) ?? null
  return found
}



export default async function UserProfilePage({ params }: Props) {
  // 1) Validación básica del param
  const rawPath = params?.path //? para evitar errores si params es undefined
  if (!rawPath) {
    console.error('[UserProfile] params.path ausente')
    return notFound()
  }

  // 2) decode seguro (por si el username viene URL-encoded)
  let decoded: string
  try {
    decoded = decodeURIComponent(rawPath)
  } catch (e) {
    decoded = rawPath
  }

  // 3) Extraer username e id usando regex que captura el ÚLTIMO guion
  //    ejemplo: "juan-perez-123" -> username="juan-perez", id="123"
  const match = decoded.match(/^(.*)-([^-/]+)$/)
  if (!match) {
    console.warn('[UserProfile] formato inválido en path:', decoded)
    return notFound()
  }

  const usernameFromPath = match[1]
  const targetUserId = match[2]

  // Debug server-side (verás esto en logs del servidor)
  console.log('[UserProfile] parsed path ->', { rawPath, decoded, usernameFromPath, targetUserId })

  // 4) Obtener usuario (SSR directo: llamada a API con cache: 'no-store' o fallback a mock)
  const found = await getUserById(targetUserId)
  if (!found) {
    console.log('[UserProfile] usuario NO encontrado para id:', targetUserId)
    return notFound()
  }
  if (found.username !== usernameFromPath) {
  redirect(`/profile/${found.username}-${found.id}`)
}

  // 5) REDIRECCIÓN CANÓNICA (opcional pero recomendada)
  // Si el username en la URL no coincide con el username real, redirigimos a la URL correcta:
  // Esto evita problemas de SEO y evita hidratación mismatches cuando el cliente renderiza la ruta canónica.
  if (String(found.username) !== String(usernameFromPath)) {
    // redirect() corta la ejecución y hace una redirección server-side.
    const canonical = `/users/${encodeURIComponent(found.username)}-${encodeURIComponent(String(found.id))}`
    console.log(`[UserProfile] redirigiendo a canonical: ${canonical}`)
    return redirect(canonical)
  }

  const user: User = found
  const isCurrentUser = String(user.id) === String(LOGGED_IN_USER.id)

  const post:Post[] = MOCK_FEED_POSTS.filter((p) => String(p.user.id) === String(user.id));
  console.log("Posts del usuario:", post);
  // 6) Render (Server Component): HTML pre-hecho por el servidor en cada request
  return (
    <section className="max-w-4xl mx-auto p-4 pt-10">
      {/* Header del perfil */}
      <div className="flex items-center gap-8 md:gap-16 mb-8">
        {/* Foto de perfil */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300 dark:border-zinc-700">
          <img
            src={user.profilePicture ?? '/images/default-avatar.png'}
            alt={`Perfil de ${user.username}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información del usuario */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">{user.username}</h1>

            {/* Botón de acción: Editar o Seguir */}
            {isCurrentUser ? (
              <button
                className="px-4 text-black py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-600"
                aria-label="Editar perfil"
              >
                Editar perfil
              </button>
            ) : (
              <button
                className="px-4 text-white py-1 bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium transition-colors"
                aria-label={`Seguir a ${user.username}`}
              >
                Seguir
              </button>
            )}
          </div>

          <div className=" md:flex gap-8 mb-4">
            <span className="text-sm">
              <strong>{0}</strong> publicaciones
            </span>
            <span className="text-sm">
              <strong> {0}</strong> seguidores
            </span>
            <span className="text-sm">
              <strong> {0}</strong> seguidos
            </span>
          </div>

          <div>
            <p className="font-semibold">{user.fullName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.location}</p>
          </div>
        </div>
      </div>

      {/* Placeholder para publicaciones */}
      <div className="border-t border-gray-300 pt-4 dark:border-zinc-700">
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          <p>
            Mostrando publicaciones de <strong>{user.username}</strong>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-1 md:gap-4">
          {post && post.length >= 1 ? post.map((item) => (
            <PostFeed key={item.id} post={item}></PostFeed>
          )): <p>este usuario no ah publicado nada a mamar</p>}
        </div>
      </div>
    </section>
  )
}

