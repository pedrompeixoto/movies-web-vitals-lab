import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <nav className="flex flex-row gap-5">
        <Link href="/spa">SPA</Link>
        <Link href="/ssr">SSR</Link>
        <Link href="/ssg">SSG</Link>
      </nav>
    </main>
  )
}
