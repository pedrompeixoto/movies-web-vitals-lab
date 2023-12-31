import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movies Web Vitals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
          <nav className="flex flex-row gap-5 justify-center py-16 py-8">
            <Link href="/spa">SPA</Link>
            <Link href="/ssr">SSR</Link>
            <Link href="/ssg">SSG</Link>
          </nav>
          {children}
      </body>
    </html>
  )
}
