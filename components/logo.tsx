/** Code-tag wordmark: <jmcd /> with palette-coloured brackets. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono font-semibold tracking-tight ${className}`}>
      <span className="text-terracotta">&lt;</span>
      <span className="text-ink">jmcd</span>
      <span className="text-blue"> /&gt;</span>
    </span>
  );
}
