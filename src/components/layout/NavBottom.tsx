'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBottom() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
      <div className="flex justify-around items-center p-3">
        <Link 
          href="/" 
          className={`p-3 ${isActive('/') ? 'text-blue-500' : 'text-gray-600'}`}
        >
          🏠
        </Link>
        <Link 
          href="/explore" 
          className={`p-3 ${isActive('/explore') ? 'text-blue-500' : 'text-gray-600'}`}
        >
 
          🔍
        </Link>
                 {/* ✨ NUEVO: Link a la Página de Crear Post ✨ */}
        <Link 
          href="/create" 
          className={`p-3 text-lg ${isActive('/create') ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}
        >
          ➕
        </Link>
        <Link 
          href="/profile" 
          className={`p-3 ${isActive('/profile') ? 'text-blue-500' : 'text-gray-600'}`}
        >
          👤
        </Link>
      </div>
    </nav>
  )
}