export interface Print {
  id: string;
  title: string;
  theme: string;
  palette: string;
  orientation: string;
  sizes: string[];
  priceA3: number | null;
  priceA4: number | null;
  edition: string;
  soldOut: boolean;
  description: string;
  image: string;
}

const SHEET_ID = "1bmPYPbErcYkWq9K1H4uiYV9TE3S54y74b-F1Buqu9qo";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

/** Minimal CSV parser that handles quoted fields with commas. */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field.trim()); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field.trim()); rows.push(row); }
  return rows;
}

export async function getPrints(): Promise<Print[]> {
  const res = await fetch(SHEET_URL, { next: { revalidate: false } as never });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const rows = parseCSV(await res.text());
  const [header, ...data] = rows;
  const idx = (name: string) => header.findIndex((h) => h.trim().toLowerCase() === name);
  const num = (v: string | undefined) => {
    const n = parseFloat((v || "").replace(/[^0-9.]/g, ""));
    return isNaN(n) ? null : n;
  };
  return data
    .filter((r) => (r[idx("id")] || "").trim())
    .map((r) => ({
      id: r[idx("id")].trim(),
      title: r[idx("title")].trim(),
      theme: r[idx("theme")].trim(),
      palette: r[idx("palette")].trim(),
      orientation: r[idx("orientation")].trim().toLowerCase(),
      sizes: (r[idx("sizes")] || "").split(",").map((s) => s.trim()).filter(Boolean),
      priceA3: num(r[idx("price_a3")]),
      priceA4: num(r[idx("price_a4")]),
      edition: (r[idx("edition")] || "25").trim(),
      soldOut: (r[idx("sold_out")] || "").trim().toUpperCase() === "TRUE",
      description: (r[idx("description")] || "").trim(),
      image: (r[idx("image")] || "").trim(),
    }))
    .filter((p) => p.image);
}

export function priceFor(print: Print, size: string): number | null {
  return size === "A3" ? print.priceA3 : print.priceA4;
}

export function fmtKES(n: number): string {
  return "KSh " + n.toLocaleString("en-KE");
}
