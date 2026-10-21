# Gallery of Teddy Mburu

Production site for galleryofteddymburu.com.

## Stack
- **Next.js 14 (static export)** — pre-rendered HTML for SEO; per-print pages
- **Tailwind CSS** — warm earthy design system (cream/sand/clay/ochre/ink)
- **Cloudinary** — print images (f_auto,q_auto optimized)
- **Google Sheet** — product catalogue (source of truth). Build fetches the
  published CSV at deploy time; adding a print = upload image + add row + redeploy
- **Netlify** — hosting + **Netlify Forms** for enquiries (no online payment)

## Development

    npm install
    npm run dev      # local dev server
    npm run build    # static export to ./out

## Catalogue workflow
1. Edit in Lightroom → export JPG (~2000px long edge)
2. Upload to Cloudinary (folder: prints/, name: `<id>_a3.jpg`)
3. Add a row to the Google Sheet (columns: id, title, theme, palette, orientation,
   sizes, price_a3, price_a4, edition, sold_out, description, image)
4. Trigger a Netlify deploy — the new print gets its own page at /print/<id>

## Notes
- **Room preview image**: `ROOM_IMAGE` in `components/PrintConfig.tsx` —
  upload your own room photo to Cloudinary and point this at it.
- **Netlify Forms**: the enquiry form (`name="enquiry"`) is detected by Netlify
  automatically on first deploy. Configure email notifications in
  Netlify → Forms → enquiry.
- **SEO**: per-print pages ship OpenGraph + JSON-LD Product schema; update
  `metadataBase` in `app/layout.tsx` if the domain changes.
