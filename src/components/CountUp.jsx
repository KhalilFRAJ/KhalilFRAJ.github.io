import { useEffect, useRef, useState } from 'react';

export default function CountUp({ end, suffix = '+' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return undefined;
    }

    let started = false;
    let timerId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let current = 0;
          timerId = window.setInterval(() => {
            current = Math.min(current + end / 40, end);
            setValue(Math.floor(current));
            if (current >= end) window.clearInterval(timerId);
          }, 28);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timerId);
    };
  }, [end]);

  return <span ref={ref}>{value}{suffix}</span>;
}
