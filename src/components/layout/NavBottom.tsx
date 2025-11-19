import Link from 'next/link'

export default function NavBottom({ initialHref }: { initialHref: string }) {
  // Server Component: no client-only hooks or state.
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
      <div className="flex justify-around items-center p-3">
        <Link href="/" className="p-3 text-gray-600">🏠</Link>

        <Link href="/explore" className="p-3 text-gray-600">🔍</Link>

        {/* Link a la página de crear post */}
        <Link href="/create" className="p-3 text-lg text-gray-600 dark:text-gray-400">➕</Link>

        <Link href={initialHref} className="p-3 text-gray-600">👤</Link>
      </div>
    </nav>
  )
}