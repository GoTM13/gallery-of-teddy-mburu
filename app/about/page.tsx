import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="text-4xl font-semibold tracking-tight">About Teddy</h1>
      <p className="mt-4 leading-relaxed text-soft">
        I'm a Nairobi-based photographer and printmaker. My work follows the light — botanicals,
        streets, and everything in between. Everything here starts as my own frame, printed as a
        hand-signed archival piece from a limited edition.
      </p>
      <p className="mt-3 leading-relaxed text-soft">
        I ship across Kenya and worldwide, and I'm always happy to talk about a piece before you
        commit — that's why the shop works on enquiries, not faceless checkouts.
      </p>
      <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
        <div className="border border-ink/10 rounded-xl p-4 bg-white">
          <div className="font-semibold">📍 Studio</div>
          <p className="mt-1 text-soft">Nairobi, Kenya — visits by appointment.</p>
        </div>
        <div className="border border-ink/10 rounded-xl p-4 bg-white">
          <div className="font-semibold">✉️ Contact</div>
          <p className="mt-1 text-soft">hello@galleryofteddymburu.com</p>
        </div>
        <div className="border border-ink/10 rounded-xl p-4 bg-white">
          <div className="font-semibold">📸 Instagram</div>
          <p className="mt-1 text-soft">@galleryofteddymburu — new drops first.</p>
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
          <p className="mt-2 text-soft">Yes — every piece ships framed in your choice of black wood or walnut, ready to hang.</p>
        </details>
        <details className="border border-ink/10 rounded-xl bg-white p-4">
          <summary className="font-medium cursor-pointer">What happens after I enquire?</summary>
          <p className="mt-2 text-soft">After you enquire, we'll sort out delivery and everything else personally.</p>
        </details>
      </div>
    </main>
  );
}
