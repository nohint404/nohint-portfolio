"use client";

// Adapted from the React Bits Variable Proximity component (TS/Tailwind variant).
import { forwardRef, useEffect, useMemo, useRef, type CSSProperties, type HTMLAttributes, type MutableRefObject } from "react";

type VariableProximityProps = HTMLAttributes<HTMLSpanElement> & {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  disabled?: boolean;
  style?: CSSProperties;
};

export const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(function VariableProximity(
  { label, fromFontVariationSettings, toFontVariationSettings, containerRef, radius = 110, disabled = false, className, style, ...props },
  ref,
) {
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });
  const parsed = useMemo(() => {
    const parse = (value: string) => new Map(value.split(",").flatMap((entry) => {
      const [axis, amount] = entry.trim().split(" ");
      return axis && amount ? [[axis.replace(/["']/g, ""), Number.parseFloat(amount)] as const] : [];
    }));
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);
    return [...from].map(([axis, value]) => ({ axis, from: value, to: to.get(axis) ?? value }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  useEffect(() => {
    if (disabled) return;
    let frame = 0;
    const update = (event: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || event.pointerType === "touch") return;
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        letters.current.forEach((letter) => {
          if (!letter) return;
          const box = letter.getBoundingClientRect();
          const cx = box.left + box.width / 2 - container.getBoundingClientRect().left;
          const cy = box.top + box.height / 2 - container.getBoundingClientRect().top;
          const ratio = Math.max(0, 1 - Math.hypot(pointer.current.x - cx, pointer.current.y - cy) / radius) ** 2;
          letter.style.fontVariationSettings = parsed.map(({ axis, from, to }) => `'${axis}' ${from + (to - from) * ratio}`).join(", ");
        });
      });
    };
    const reset = () => letters.current.forEach((letter) => { if (letter) letter.style.fontVariationSettings = fromFontVariationSettings; });
    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("blur", reset);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", update); window.removeEventListener("blur", reset); };
  }, [containerRef, disabled, fromFontVariationSettings, parsed, radius]);

  return <span ref={ref} className={className} style={style} {...props}>{[...label].map((letter, index) => (
    <span key={`${letter}-${index}`} ref={(node) => { letters.current[index] = node; }} aria-hidden="true" className="inline-block" style={{ fontVariationSettings: fromFontVariationSettings }}>{letter}</span>
  ))}<span className="sr-only">{label}</span></span>;
});
