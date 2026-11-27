/**
 * Pauses a tile's endless decorative loops (marquee, bobbing logos, the spinning badge...) while
 * the tile is off screen. Tiles render with data-offscreen (paused) and one shared observer
 * clears it for whatever is in view, so a phone never animates what nobody can see, and nothing
 * loops while the page is still loading. Without IntersectionObserver every tile just plays.
 */
let io: IntersectionObserver | null = null;

export function watchOffscreen(el: HTMLElement): () => void {
  if (typeof IntersectionObserver === "undefined") {
    el.removeAttribute("data-offscreen");
    return () => {};
  }
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
    },
    { rootMargin: "120px 0px" },
  );
  io.observe(el);
  return () => io?.unobserve(el);
}

/** Tests only: forget the shared observer. */
export function resetOffscreen() {
  io?.disconnect();
  io = null;
}
