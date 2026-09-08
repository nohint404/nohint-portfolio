import { stepSpring } from './spring';
/** One finite, interruptible spring per manipulated element; no idle animation. */
export function physical(node: HTMLElement) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let x = { position: 0, velocity: 0 }, y = { position: 0, velocity: 0 };
  let tx = 0, ty = 0, frame = 0, last = 0, visible = true;
  let pointer: number | null = null, origin = 0, dragged = false;
  const paint = () => { node.style.translate = `${x.position}px ${y.position}px`; };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0; };
  const settle = () => { if (pointer !== null && node.hasPointerCapture(pointer)) node.releasePointerCapture(pointer); pointer = null; stop(); tx = ty = 0; x = { position: 0, velocity: 0 }; y = { ...x }; paint(); };
  const tick = (time: number) => {
    const dt = last ? (time - last) / 1000 : 1 / 60; last = time;
    x = stepSpring(x, tx, dt); y = stepSpring(y, ty, dt); paint();
    if (x.position === tx && y.position === ty && !x.velocity && !y.velocity) stop();
    else frame = requestAnimationFrame(tick);
  };
  const start = () => { if (!frame && visible && !document.hidden && !reduce.matches) frame = requestAnimationFrame(tick); };
  const move = (event: PointerEvent) => {
    if (pointer === event.pointerId) {
      tx = Math.max(-55, Math.min(55, event.clientX - origin)); dragged ||= Math.abs(tx) > 5;
      if (reduce.matches) { x = {position:tx,velocity:0}; paint(); } else start();
      return;
    }
    if (!fine.matches || reduce.matches) return;
    const rect = node.getBoundingClientRect();
    tx = Math.max(-9, Math.min(9, (event.clientX - rect.left - rect.width / 2) * .045));
    ty = Math.max(-7, Math.min(7, (event.clientY - rect.top - rect.height / 2) * .045)); start();
  };
  const leave = () => { if (pointer !== null) return; tx = ty = 0; start(); };
  const down = (event: PointerEvent) => {
    if (!node.hasAttribute('data-draggable') || pointer !== null || event.button !== 0) return;
    pointer = event.pointerId; origin = event.clientX; dragged = false; node.setPointerCapture(pointer);
  };
  const up = (event: PointerEvent) => {
    if (pointer !== event.pointerId) return;
    pointer = null; if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
    tx = ty = 0; if (reduce.matches) settle(); else start();
  };
  const key = (event: KeyboardEvent) => {
    if (!node.hasAttribute('data-draggable') || !['ArrowLeft','ArrowRight','Home','Escape'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home' || event.key === 'Escape') { settle(); return; }
    tx = Math.max(-55, Math.min(55, tx + (event.key === 'ArrowLeft' ? -18 : 18)));
    if (reduce.matches) { x = {position:tx,velocity:0}; paint(); } else start();
  };
  const click = (event: MouseEvent) => { if (dragged) { event.preventDefault(); event.stopImmediatePropagation(); dragged = false; } };
  const observer = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; if (!visible) settle(); });
  observer.observe(node);
  node.addEventListener('keydown', key); node.addEventListener('blur', settle); node.addEventListener('pointerdown', down); node.addEventListener('pointerup', up); node.addEventListener('pointercancel', up); node.addEventListener('lostpointercapture', up); node.addEventListener('click', click, true);
  node.addEventListener('pointermove', move); node.addEventListener('pointerleave', leave);
  reduce.addEventListener('change', settle); document.addEventListener('visibilitychange', settle);
  return { destroy() { node.removeEventListener('keydown', key); node.removeEventListener('blur', settle); node.removeEventListener('pointerdown', down); node.removeEventListener('pointerup', up); node.removeEventListener('pointercancel', up); node.removeEventListener('lostpointercapture', up); node.removeEventListener('click', click, true); settle(); observer.disconnect(); node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); reduce.removeEventListener('change', settle); document.removeEventListener('visibilitychange', settle); } };
}
