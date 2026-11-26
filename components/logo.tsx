/** The JD mark, traced from the logo PNG into 12 rectangles so it stays sharp at any size. */
const MARK_PATH = "M586 0h73v127h-73zM716 0h380v127h-380zM0 253h126v126h-126zM969 127h127v253h-127zM0 379h127v1h-127zM0 380h1096v126h-1096zM0 574h1096v126h-1096zM0 700h127v1h-127zM253 763h73v127h-73zM969 700h127v253h-127zM0 701h126v379h-126zM253 953h843v127h-843z";

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1096 1080" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={MARK_PATH} />
    </svg>
  );
}

/** Site logo: the JD mark in the main text colour. The surrounding link or text provides the name. */
export function Logo({ className = "h-7" }: { className?: string }) {
  return <Mark className={`w-auto text-ink ${className}`} />;
}
