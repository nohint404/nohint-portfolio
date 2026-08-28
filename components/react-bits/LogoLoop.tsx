"use client";

// Adapted from the React Bits LogoLoop component, with visibility and reduced-motion pauses.
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type LoopItem = { label: string; node: ReactNode };

type LogoLoopProps = {
  logos: readonly LoopItem[];
  speed?: number;
  gap?: number;
  pauseOnHover?: boolean;
  ariaLabel: string;
  className?: string;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function LogoLoop({ logos, speed = 28, gap = 28, pauseOnHover = true, ariaLabel, className }: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const timeRef = useRef<number | null>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  const measure = useCallback(() => {
    const sequence = sequenceRef.current?.getBoundingClientRect().width ?? 0;
    const container = containerRef.current?.clientWidth ?? 0;
    if (sequence > 0) { setSequenceWidth(sequence); setCopies(Math.max(2, Math.ceil(container / sequence) + 2)); }
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    measure();
    return () => observer.disconnect();
  }, [measure, logos]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion || !visible || sequenceWidth === 0 || (pauseOnHover && hovered)) return;
    let frame = 0;
    const tick = (time: number) => {
      const previous = timeRef.current ?? time;
      const delta = Math.min((time - previous) / 1000, 0.05);
      timeRef.current = time;
      offsetRef.current = (offsetRef.current + speed * delta) % sequenceWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => { window.cancelAnimationFrame(frame); timeRef.current = null; };
  }, [hovered, pauseOnHover, reducedMotion, sequenceWidth, speed, visible]);

  const lists = useMemo(() => Array.from({ length: copies }, (_, copyIndex) => <ul key={copyIndex} ref={copyIndex === 0 ? sequenceRef : undefined} className="logoloop__list" aria-hidden={copyIndex > 0}>
    {logos.map((item) => <li key={`${copyIndex}-${item.label}`} className="logoloop__item">{item.node}</li>)}
  </ul>), [copies, logos]);

  return <div ref={containerRef} className={`logoloop ${className ?? ""}`} role="region" aria-label={ariaLabel} style={{ "--logoloop-gap": `${gap}px` } as CSSProperties}>
    <div ref={trackRef} className="logoloop__track" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{lists}</div>
  </div>;
}
