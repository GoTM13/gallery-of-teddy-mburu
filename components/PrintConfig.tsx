"use client";

import { useState } from "react";
import { Print, priceFor, fmtKES } from "@/lib/prints";

const FRAMES = [
  { id: "black", label: "Black wood", color: "#2b2b2b" },
  { id: "walnut", label: "Walnut", color: "#6b4430" },
];

const DIMENSIONS: Record<string, string> = {
  A4: "21 × 29.7 cm",
  A3: "29.7 × 42 cm",
  A2: "42 × 59.4 cm",
};

// Image preview height per selected size — sized by HEIGHT so portrait and
// landscape prints both fit fully inside the viewer, no cropping.
const VIEW_SCALE: Record<string, string> = { A4: "58%", A3: "82%", A2: "94%" };

export default function PrintConfig({ prints, initialId }: { prints: Print[]; initialId: string }) {
  const initialIndex = Math.max(0, prints.findIndex((p) => p.id === initialId));
  const [index, setIndex] = useState(initialIndex);
  const print = prints[index] ?? prints[0];

  const [size, setSize] = useState(print.sizes.includes("A4") ? "A4" : print.sizes[0]);
  const [frame, setFrame] = useState("black");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const price = priceFor(print, size);
  const frameColor = FRAMES.find((f) => f.id === frame)?.color ?? "#2b2b2b";
  const frameLabel = FRAMES.find((f) => f.id === frame)?.label;
  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
  const view = VIEW_SCALE[size] ?? "82%";

  function goTo(i: number) {
    const next = (i + prints.length) % prints.length;
    setIndex(next);
    const p = prints[next];
    setSize(p.sizes.includes("A4") ? "A4" : p.sizes[0]);
    setSent(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = new URLSearchParams({
      "form-name": "enquiry",
      name,
      email,
      note,
      print: `${print.title} — ${size}, ${frameLabel}`,
    });
    await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
    setSent(true);
  }

  return (
    <div className="mt-4 grid md:grid-cols-2 gap-8">
      {/* ---------- Image viewer + carousel ---------- */}
      <div>
        <div
          className="relative rounded-2xl bg-sand border border-ink/10 overflow-hidden flex items-center justify-center px-10"
          style={{ aspectRatio: "4/3" }}
        >
          {prints.length > 1 && (
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous piece"
              className="absolute left-3 z-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-ink/15 text-ink hover:bg-white shadow flex items-center justify-center text-lg"
            >
              ‹
            </button>
          )}
          <div
            className="transition-all duration-500"
            style={{ height: view }}
          >
            <div
              style={{
                background: frameColor,
                padding: "2.5%",
                borderRadius: 3,
                boxShadow: "0 16px 36px rgba(30,20,10,0.35)",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <img
                key={print.id}
                src={print.image}
                alt={print.title}
                className="block h-full w-auto max-w-full"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          {prints.length > 1 && (
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next piece"
              className="absolute right-3 z-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-ink/15 text-ink hover:bg-white shadow flex items-center justify-center text-lg"
            >
              ›
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-soft text-center">
          {size} · {frameLabel} · {DIMENSIONS[size] ?? ""}
        </p>

        {prints.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {prints.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-label={p.title}
                className={`flex-none w-16 h-16 rounded-lg overflow-hidden border-2 ${i === index ? "border-clay" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ---------- Details + enquiry ---------- */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{print.title}</h1>
        <p className="text-sm text-soft">{print.theme} · edition of {print.edition}</p>
        {print.description && <p className="mt-3 text-sm leading-relaxed text-soft">{print.description}</p>}
        <p className="mt-2 text-sm text-soft">Hand-signed archival print from a limited edition, framed and ready to hang.</p>

        <div className="mt-5">
          <div className="text-xs uppercase tracking-wider mb-1.5 text-ochre">Size</div>
          <div className="flex gap-2">
            {print.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`px-3.5 py-1.5 rounded-lg border text-sm ${size === s ? "bg-ink text-cream border-ink" : "border-ink/25"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs uppercase tracking-wider mb-1.5 text-ochre">Frame (included)</div>
          <div className="flex gap-2">
            {FRAMES.map((f) => (
              <button key={f.id} onClick={() => setFrame(f.id)}
                className={`px-3.5 py-1.5 rounded-lg border text-sm flex items-center gap-2 ${frame === f.id ? "bg-ink text-cream border-ink" : "border-ink/25"}`}>
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: f.color }} />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-4">
          <span className="text-sm text-soft">Total ({size}, framed)</span>
          <span className="text-2xl font-semibold">{price ? fmtKES(price) : "Price on enquiry"}</span>
        </div>

        {sent ? (
          <div className="mt-5 bg-white border border-ink/10 rounded-xl p-5 text-sm">
            <div className="text-2xl mb-1">🌿</div>
            <div className="font-semibold">Enquiry sent</div>
            <p className="mt-1 text-soft">Once your enquiry is in, delivery details are confirmed with you — nice and easy.</p>
          </div>
        ) : (
          <form onSubmit={submit} name="enquiry" method="POST" data-netlify="true" className="mt-5 space-y-3">
            <input type="hidden" name="form-name" value="enquiry" />
            <p className="hidden"><label>Don't fill this: <input name="bot-field" /></label></p>
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name"
              className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm bg-white" />
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email address"
              className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm bg-white" />
            <textarea name="note" value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Delivery location / any questions (optional)"
              className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm bg-white resize-none" />
            <button disabled={!valid} type="submit"
              className="w-full px-5 py-3 rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed bg-clay text-white">
              Send enquiry
            </button>
            <p className="text-xs text-center text-soft/80">Once your enquiry is in, delivery details are confirmed with you — nice and easy.</p>
          </form>
        )}
      </div>
    </div>
  );
}
