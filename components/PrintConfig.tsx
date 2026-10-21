"use client";

import { useState } from "react";
import { Print, priceFor, fmtKES } from "@/lib/prints";

const FRAMES = [
  { id: "black", label: "Black wood", color: "#2b2b2b" },
  { id: "walnut", label: "Walnut", color: "#6b4430" },
];

// NOTE: replace ROOM_IMAGE with your own room photo on Cloudinary for production.
const ROOM_IMAGE =
  "https://mistralaichatupprodswe.blob.core.windows.net/chat-images/assistant/99/29/aa/9929aa34-0e86-4795-a6b3-af6e93848863/ae085834-4dee-4ba1-b91a-988abfed5271/b3676cb8-97e6-4d78-861e-ae315d1de98c/54421587-e8cc-483d-83a3-3c5583d43dc5.jpg";

export default function PrintConfig({ print }: { print: Print }) {
  const [size, setSize] = useState(print.sizes.includes("A4") ? "A4" : print.sizes[0]);
  const [frame, setFrame] = useState("black");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const price = priceFor(print, size);
  const frameColor = FRAMES.find((f) => f.id === frame)?.color ?? "#2b2b2b";
  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = new URLSearchParams({
      "form-name": "enquiry",
      name,
      email,
      note,
      print: `${print.title} — ${size}, ${FRAMES.find((f) => f.id === frame)?.label}`,
    });
    await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
    setSent(true);
  }

  return (
    <div className="mt-4 grid md:grid-cols-2 gap-8">
      <div>
        <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
          <img src={ROOM_IMAGE} alt="Sitting room" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute left-1/2 top-[14%] w-[38%] -translate-x-1/2">
            <div style={{ background: frameColor, padding: "2.5%", borderRadius: 2, boxShadow: "0 14px 30px rgba(30,20,10,0.45)" }}>
              <img src={print.image} alt={print.title} className="w-full block" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-soft text-center">In a real room — {size}, {FRAMES.find((f) => f.id === frame)?.label}</p>
      </div>

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
