"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Print, fmtKES } from "@/lib/prints";

const THEMES = ["All", "Urban", "Landscape", "Abstract", "Wildlife", "Botanical"];

export default function Gallery({ prints }: { prints: Print[] }) {
  const [theme, setTheme] = useState("All");
  const themes = useMemo(() => {
    const present = new Set(prints.map((p) => p.theme));
    return THEMES.filter((t) => t === "All" || present.has(t));
  }, [prints]);
  const filtered = theme === "All" ? prints : prints.filter((p) => p.theme === theme);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition-all ${
              theme === t ? "bg-clay text-white border-clay" : "border-ink/20 text-soft"
            }`}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto text-sm text-soft">{filtered.length} prints</span>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        <AnimatePresence>
          {filtered.map((p, i) => {
            const from = Math.min(p.priceA3 ?? p.priceA4 ?? Infinity, p.priceA4 ?? p.priceA3 ?? Infinity);
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/print/${p.id}`} className="group w-full mb-5 break-inside-avoid block">
                  <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white outline outline-1 outline-ink/10">
                    {/* full image, natural aspect ratio — no cropping */}
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-auto block" />
                  </div>
                  <div className="mt-2.5 flex justify-between items-baseline">
                    <span className="font-medium">{p.title}</span>
                    <span className="text-sm text-soft">
                      {from !== Infinity ? `from ${fmtKES(from)} · framed` : <em>Price on enquiry</em>}
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-ochre">
                    {p.theme} · edition of {p.edition}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
