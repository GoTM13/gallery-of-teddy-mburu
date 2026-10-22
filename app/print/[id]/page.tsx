import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PrintConfig from "@/components/PrintConfig";
import { getPrints, Print } from "@/lib/prints";

export async function generateStaticParams() {
  const prints = await getPrints();
  return prints.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const prints = await getPrints();
  const print = prints.find((p) => p.id === params.id);
  if (!print) return {};
  return {
    title: print.title,
    description: `${print.title} — ${print.description || "hand-signed archival print from a limited edition"} by Teddy Mburu, Nairobi. Framed delivery across Kenya and worldwide.`,
    openGraph: { title: print.title, images: [{ url: print.image }] },
  };
}

export default async function PrintPage({ params }: { params: { id: string } }) {
  const prints: Print[] = await getPrints();
  const print: Print | undefined = prints.find((p) => p.id === params.id);
  if (!print) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: print.title,
    image: print.image,
    description: print.description,
    brand: { "@type": "Brand", name: "Gallery of Teddy Mburu" },
    offers: print.priceA4
      ? { "@type": "Offer", price: print.priceA4, priceCurrency: "KES", availability: print.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock" }
      : undefined,
  };

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/" className="text-sm text-soft hover:text-clay">← Back to the gallery</Link>
      <PrintConfig prints={prints} initialId={print.id} />
    </main>
  );
}
