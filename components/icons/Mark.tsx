export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <rect width={32} height={32} rx={2} fill="currentColor" className="text-foreground" />
      <path d="M8 10h4l4 8 4-8h4L14 22H10L8 10Z" fill="currentColor" className="text-background" />
      <circle cx={24} cy={22} r={2} fill="currentColor" className="text-background" />
    </svg>
  );
}
