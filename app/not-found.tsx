import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-24 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">Lost in the light</h1>
      <p className="mt-3 text-soft">This piece isn't here — it may have moved or sold out.</p>
      <Link href="/" className="inline-block mt-6 px-5 py-2.5 rounded-full text-sm font-medium bg-clay text-white">
        Back to the gallery
      </Link>
    </main>
  );
}
