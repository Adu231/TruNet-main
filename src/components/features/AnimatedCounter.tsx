import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ target, duration = 2000, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animateCount = () => {
    const suffix = target.replace(/[0-9.,]/g, "");
    const numStr = target.replace(/[^0-9.]/g, "");
    const num = parseFloat(numStr);
    const hasDecimal = numStr.includes(".");
    const decimalPlaces = hasDecimal ? numStr.split(".")[1]?.length || 1 : 0;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;

      if (hasDecimal) {
        setDisplay(current.toFixed(decimalPlaces) + suffix);
      } else {
        setDisplay(Math.floor(current).toLocaleString() + suffix);
      }

      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(target);
    };

    requestAnimationFrame(tick);
  };

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
