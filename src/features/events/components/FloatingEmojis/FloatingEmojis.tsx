import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./FloatingEmojis.module.css";

type FloatingEmojisProps = {
  emoji: string;
  zIndex: number;
  count?: number;
  sizeScale?: number;
  speedScale?: number;
};

type PhysicsParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  omega: number;
};

const COLLISION_RADIUS = 4;

export function FloatingEmojis({
  emoji,
  zIndex,
  count = 5,
  sizeScale = 1,
  speedScale = 1,
}: FloatingEmojisProps) {
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const stateRef = useRef<PhysicsParticle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!emoji) return;

    stateRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.04 + Math.random() * 0.08) * speedScale;
      return {
        x: Math.random() * 90,
        y: Math.random() * 90,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: (1.2 + Math.random() * 1) * sizeScale,
        rot: Math.random() * 360,
        omega: (Math.random() - 0.5) * 0.4,
      };
    });

    stateRef.current.forEach((p, i) => {
      const el = spansRef.current[i];
      if (!el) return;
      el.style.left = `${p.x}%`;
      el.style.top = `${p.y}%`;
      el.style.fontSize = `${p.size}rem`;
      el.style.transform = `rotate(${p.rot}deg)`;
    });

    function tick() {
      const ps = stateRef.current;

      // Update positions and wall bounces
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0) { p.x = 0; p.vx = Math.abs(p.vx); }
        else if (p.x >= 95) { p.x = 95; p.vx = -Math.abs(p.vx); }
        if (p.y <= 0) { p.y = 0; p.vy = Math.abs(p.vy); }
        else if (p.y >= 95) { p.y = 95; p.vy = -Math.abs(p.vy); }
        p.rot = (p.rot + p.omega) % 360;
      }

      // Particle-particle collision
      const minDist = COLLISION_RADIUS * 2;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist && d > 0) {
            const nx = dx / d;
            const ny = dy / d;
            const dot = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (dot < 0) {
              a.vx += dot * nx;
              a.vy += dot * ny;
              b.vx -= dot * nx;
              b.vy -= dot * ny;
            }
            const overlap = (minDist - d) / 2;
            a.x -= overlap * nx;
            a.y -= overlap * ny;
            b.x += overlap * nx;
            b.y += overlap * ny;
          }
        }
      }

      // Write to DOM
      for (let i = 0; i < ps.length; i++) {
        const el = spansRef.current[i];
        if (!el) continue;
        el.style.left = `${ps[i].x}%`;
        el.style.top = `${ps[i].y}%`;
        el.style.transform = `rotate(${ps[i].rot}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [emoji, count, sizeScale, speedScale]);

  if (!emoji) return null;

  return createPortal(
    <div className={styles.container} style={{ zIndex }} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          ref={(el) => { spansRef.current[i] = el; }}
          className={styles.particle}
        >
          {emoji}
        </span>
      ))}
    </div>,
    document.body
  );
}
