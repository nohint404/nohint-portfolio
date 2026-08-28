"use client";

// Adapted from the React Bits RotatingText component.
import { AnimatePresence, motion, type Transition } from "motion/react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";

export type RotatingTextRef = { next: () => void; previous: () => void; jumpTo: (index: number) => void; reset: () => void };

type RotatingTextProps = {
  texts: readonly string[];
  rotationInterval?: number;
  staggerDuration?: number;
  auto?: boolean;
  className?: string;
  transition?: Transition;
};

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(function RotatingText(
  { texts, rotationInterval = 2600, staggerDuration = 0.022, auto = true, className, transition = { type: "spring", damping: 24, stiffness: 280 } },
  ref,
) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const currentText = texts[currentTextIndex] ?? "";
  const words = useMemo(() => currentText.split(" "), [currentText]);

  const jumpTo = useCallback((index: number) => setCurrentTextIndex(Math.max(0, Math.min(index, texts.length - 1))), [texts.length]);
  const next = useCallback(() => setCurrentTextIndex((index) => (index + 1) % texts.length), [texts.length]);
  const previous = useCallback(() => setCurrentTextIndex((index) => (index - 1 + texts.length) % texts.length), [texts.length]);
  const reset = useCallback(() => setCurrentTextIndex(0), []);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [jumpTo, next, previous, reset]);

  useEffect(() => {
    if (!auto || texts.length < 2) return;
    const intervalId = window.setInterval(next, rotationInterval);
    return () => window.clearInterval(intervalId);
  }, [auto, next, rotationInterval, texts.length]);

  return <motion.span layout className={`text-rotate ${className ?? ""}`} transition={transition}>
    <span className="text-rotate-sr-only">{currentText}</span>
    <AnimatePresence initial={false} mode="wait">
      <motion.span key={currentTextIndex} layout className="text-rotate__visible" aria-hidden="true">
        {words.map((word, wordIndex) => <span key={`${word}-${wordIndex}`} className="text-rotate__word">
          {Array.from(word).map((character, characterIndex) => <motion.span
            key={`${character}-${characterIndex}`}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ ...transition, delay: (wordIndex + characterIndex) * staggerDuration }}
            className="text-rotate__character"
          >{character}</motion.span>)}
          {wordIndex < words.length - 1 && <span className="text-rotate__space"> </span>}
        </span>)}
      </motion.span>
    </AnimatePresence>
  </motion.span>;
});
