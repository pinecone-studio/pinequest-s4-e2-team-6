type MarkProps = { className?: string; spin?: boolean };

/**
 * Ölzii — the Mongolian "eternal knot". Two interlaced squares around a centre
 * loop. Used as a section accent and, when `spin`, as a calm loader.
 */
export function KnotMark({ className = "", spin = false }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${spin ? "animate-spin-slow" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="24" y="24" width="52" height="52" rx="12" />
      <rect x="24" y="24" width="52" height="52" rx="12" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="11" />
    </svg>
  );
}

/** Ornamental divider: a hairline rule on each side of a small knot. */
export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[#00658b] dark:text-[#e0a32e] ${className}`}>
      <span className="h-px w-16 bg-linear-to-r from-transparent to-current opacity-50 sm:w-24" />
      <KnotMark className="size-5 shrink-0" />
      <span className="h-px w-16 bg-linear-to-l from-transparent to-current opacity-50 sm:w-24" />
    </div>
  );
}
