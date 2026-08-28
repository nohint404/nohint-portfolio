"use client";

import { useRef, useState } from "react";

export function SpotlightCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={className}
      style={{
        ...style,
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.06), transparent 40%), var(--card)`,
      }}
    >
      {children}
    </div>
  );
}
