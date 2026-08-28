export function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.4}>
      <path d="M6 3l5 5-5 5M11 8H3" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M11 3h3v3" strokeLinecap="square" />
    </svg>
  );
}
