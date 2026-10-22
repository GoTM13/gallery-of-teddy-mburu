import Link from "next/link";
import Gallery from "@/components/Gallery";
import { getPrints } from "@/lib/prints";

export default async function Home() {
  const prints = await getPrints();
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-12">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Work made to live on <span className="text-clay">your wall</span>, not just your screen.
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-soft">
          Explore the collection, preview any work framed, and send an enquiry. Every acquisition
          begins with a conversation.
        </p>
        <div className="mt-7 flex gap-3">
          <a href="#collection" className="px-5 py-2.5 rounded-full text-sm font-medium bg-ink text-cream">
            Explore the collection
          </a>
        </div>
      </section>

      <section id="collection" className="max-w-6xl mx-auto px-5 pb-16">
        <Gallery prints={prints} />
      </section>

      <section className="border-t border-ink/10 bg-sand">
        <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold mb-1">✍️ Hand-signed archival prints</div>
            <p className="text-soft">Every piece from a limited edition — signed, numbered, made to last.</p>
          </div>
          <div>
            <div className="font-semibold mb-1">🚚 Delivery across Kenya &amp; worldwide</div>
            <p className="text-soft">Nairobi hand-delivery; carefully packed courier elsewhere.</p>
          </div>
          <div>
            <div className="font-semibold mb-1">💬 Enquire before you buy</div>
            <p className="text-soft">Pick your pieces and send inquiries — Teddy takes it from there.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
