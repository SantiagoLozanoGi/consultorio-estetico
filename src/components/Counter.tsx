"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;          // valor final del contador
  label: string;        // texto debajo del número
  suffix?: string;      // símbolo opcional (ej: "+")
  duration?: number;    // duración de la animación (ms)
}

export default function Counter({
  end,
  label,
  suffix = "+",
  duration = 2000,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter();
          setHasAnimated(true);
          observer.disconnect(); // detiene la observación una vez animado
        }
      },
      { threshold: 0.5 } // activa cuando el 50% del elemento es visible
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div ref={ref} className="text-center">
      <div
        className="fw-bold"
        style={{
          fontSize: "1.6rem",
          color: "#4E3B2B", // marrón elegante (de tu paleta)
          transition: "opacity 0.5s ease-out",
        }}
      >
        {count}
        {suffix}
      </div>
      <small
        style={{
          color: "#6C584C",
          fontWeight: 500,
        }}
      >
        {label}
      </small>
    </div>
  );
}
