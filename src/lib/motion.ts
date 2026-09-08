export const motion = { fast: 100, response: 200, layout: 360, narrative: 520, ease: 'cubic-bezier(.16,1,.3,1)' } as const;
/** One finite response per region; defaults stay visible if JS or observation fails. */
export function assemble(node: HTMLElement) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let animations: Animation[] = [];
  const finish = () => { animations.forEach(animation => animation.finish()); animations = []; };
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    if (preference.matches) return;
    animations = Array.from(node.querySelectorAll<HTMLElement>('[data-step]')).map((element, index) => element.animate(
      [{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],
      {duration:motion.response,delay:index * 60,easing:motion.ease,fill:'backwards'}));
  }, {threshold: .18});
  observer.observe(node); preference.addEventListener('change', finish);
  return { destroy() { observer.disconnect(); preference.removeEventListener('change', finish); animations.forEach(animation => animation.cancel()); } };
}
