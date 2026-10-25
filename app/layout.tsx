import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE = "https://galleryofteddymburu.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Gallery of Teddy Mburu — Original Prints from Nairobi",
    template: "%s — Gallery of Teddy Mburu",
  },
  description:
    "Hand-signed archival prints from a limited edition. Botanical, urban and landscape photography by Nairobi-based artist Teddy Mburu. Framed delivery across Kenya and worldwide.",
  openGraph: {
    siteName: "Gallery of Teddy Mburu",
    type: "website",
    url: SITE,
    images: [
      {
        url: "https://res.cloudinary.com/hp5e1kxp/image/upload/f_auto,q_auto,w_1200/og_image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen">
        <header className="sticky top-0 z-40 backdrop-blur border-b border-ink/10 bg-cream/90">
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <Link href="/">
              <div className="text-lg font-semibold tracking-tight">Gallery of Teddy Mburu</div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-soft">
                Original prints · Nairobi
              </div>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="px-3 py-1.5 rounded-full hover:bg-ink hover:text-cream transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="px-3 py-1.5 rounded-full hover:bg-ink hover:text-cream transition-colors">
                About
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-ink/10 py-8 text-center text-sm text-soft">
          © {new Date().getFullYear()} Teddy Mburu · Nairobi, Kenya
          <span className="mx-2">·</span>
          <a href="mailto:galleryofteddymburu@outlook.com" className="hover:text-clay transition-colors">
            galleryofteddymburu@outlook.com
          </a>
        </footer>
      </body>
    </html>
  );
}
