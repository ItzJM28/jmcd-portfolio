// Build the location tile's map once: standard OpenStreetMap tiles around Bacolod, darkened and
// tinted to the site's charcoal theme, saved as a WebP in public/. Visitors never call a map
// service, and no key is needed. Credit required on the page: "© OpenStreetMap contributors".
// (CARTO's dark tiles now need an API key, so they are not used.)
//   node scripts/make-map.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const CENTER = { lat: 10.6765, lon: 122.9509 }; // Bacolod City
const Z = 13, W = 1200, H = 400, S = 1;         // CSS size of the image; S = 1 (OSM serves 256px tiles)
const TILE = 256;

const world = TILE * 2 ** Z;
const px = ((CENTER.lon + 180) / 360) * world;
const latR = (CENTER.lat * Math.PI) / 180;
const py = ((1 - Math.log(Math.tan(latR) + 1 / Math.cos(latR)) / Math.PI) / 2) * world;
const left = px - W / 2, top = py - H / 2;
const x0 = Math.floor(left / TILE), x1 = Math.floor((left + W) / TILE);
const y0 = Math.floor(top / TILE), y1 = Math.floor((top + H) / TILE);

const layers = [];
for (let x = x0; x <= x1; x++) {
  for (let y = y0; y <= y1; y++) {
    const url = `https://tile.openstreetmap.org/${Z}/${x}/${y}.png`;
    const res = await fetch(url, { headers: { "User-Agent": "portfolio-static-map/1.0 (one-time static image)" } });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    layers.push({ input: Buffer.from(await res.arrayBuffer()), left: (x - x0) * TILE * S, top: (y - y0) * TILE * S });
  }
}
const canvas = sharp({ create: { width: (x1 - x0 + 1) * TILE * S, height: (y1 - y0 + 1) * TILE * S, channels: 3, background: "#0e0e0e" } });
const stitched = await canvas.composite(layers).png().toBuffer();
mkdirSync("public/map", { recursive: true });
const cropped = await sharp(stitched)
  .extract({ left: Math.round((left - x0 * TILE) * S), top: Math.round((top - y0 * TILE) * S), width: W * S, height: H * S })
  .toBuffer();
// Dark mode: invert, swing hues back (water stays blue-ish), mute, then tint toward the theme's charcoal #1d1d20.
// invert in its own pass (sharp applies negate after modulate otherwise), then swing hues back and mute
const inverted = await sharp(cropped).removeAlpha().linear(-1, 255).toBuffer();
const out = await sharp(inverted)
  .modulate({ hue: 180, saturation: 0.35, brightness: 0.85 })
  .composite([{ input: { create: { width: W * S, height: H * S, channels: 4, background: { r: 29, g: 29, b: 32, alpha: 0.45 } } }, blend: "soft-light" }])
  .webp({ quality: 74 })
  .toFile("public/map/bacolod-dark.webp");
console.log(`tiles ${layers.length}, z${Z}, ${out.width}x${out.height}, ${(out.size / 1024).toFixed(0)} KB`);
