import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="text-4xl font-semibold tracking-tight">About Teddy</h1>
      <p className="mt-4 leading-relaxed text-soft">
        I'm an artist, based in Nairobi. My work begins with light — the way it lingers on a leaf,
        slips between buildings, or settles quietly on an ordinary moment. I follow it through
        botanicals, streets, and the space in between. Each image begins with a moment that asks to
        be held a little bit longer.
      </p>
      <p className="mt-3 leading-relaxed text-soft">
        The pieces start as a photograph, turned into a limited series print, hand signed and framed.
      </p>
      <p className="mt-3 leading-relaxed text-soft">
        I ship across Kenya and around the world, but I believe art travels best when it begins with
        a conversation. If a piece speaks to you or stirs a memory, I'd be delighted to hear from you
        and share more, before the piece finds its new home.
      </p>
      <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
        <div className="border border-ink/10 rounded-xl p-4 bg-white">
          <div className="font-semibold">✉️ Email</div>
          <p className="mt-1 text-soft">
            <a href="mailto:galleryofteddymburu@outlook.com" className="hover:text-clay transition-colors">
              galleryofteddymburu@outlook.com
            </a>
          </p>
        </div>
        <div className="border border-ink/10 rounded-xl p-4 bg-white">
          <div className="font-semibold">📞 Phone / WhatsApp</div>
          <p className="mt-1 text-soft">
            <a href="tel:+254729647873" className="hover:text-clay transition-colors">
              +254 729 647 873
            </a>
          </p>
        </div>
        <div className="border border-ink/10 rounded-xl p-4 bg-white">
          <div className="font-semibold">📸 Instagram</div>
          <p className="mt-1 text-soft">
            <a
              href="https://instagram.com/galleryofteddymburu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-clay transition-colors"
            >
              @galleryofteddymburu
            </a>
          </p>
        </div>
      </div>
      <h2 className="mt-14 text-2xl font-semibold">Frequently asked</h2>
      <div className="mt-4 space-y-3 text-sm">
        <details className="border border-ink/10 rounded-xl bg-white p-4">
          <summary className="font-medium cursor-pointer">How do editions work?</summary>
          <p className="mt-2 text-soft">Each print is limited to a fixed run per size, signed and numbered. When an edition sells out, it's gone.</p>
        </details>
        <details className="border border-ink/10 rounded-xl bg-white p-4">
          <summary className="font-medium cursor-pointer">Is framing included?</summary>
          <p className="mt-2 text-soft">Yes — every piece ships framed in your choice of black wood or maple, ready to hang.</p>
        </details>
        <details className="border border-ink/10 rounded-xl bg-white p-4">
          <summary className="font-medium cursor-pointer">What happens after I enquire?</summary>
          <p className="mt-2 text-soft">After you enquire, we'll reach out to confirm details and plan on delivery.</p>
        </details>
      </div>
    </main>
  );
}
