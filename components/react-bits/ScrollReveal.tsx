"use client";

// Adapted from the React Bits Scroll Reveal component; kept semantic and static-first.
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const context = gsap.context(() => {
      const spans = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!spans?.length) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 82%",
        once: true,
        onEnter: () => gsap.to(spans, { color: "var(--foreground)", stagger: 0.035, duration: 0.48, ease: "power3.out" }),
      });
    }, ref);
    return () => context.revert();
  }, []);

  return <p ref={ref} className={className}>{words.map((word, index) => word.trim() ? <span data-word key={`${word}-${index}`} className="inline-block">{word}</span> : word)}</p>;
}
