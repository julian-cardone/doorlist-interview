import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./FloatingEmojis.module.css";

const INITIAL_SPEED = 0.12;
const MIN_SPEED = 0.02;
const MAX_SPEED = 0.2;
const FRICTION = 0.999;
const COLLISION_RADIUS = 1.5;
const INTERACTION_RADIUS = 200;
const IMPULSE_SCALE = 0.4;
const OMEGA_FLOOR = 0.05;
const OMEGA_MAX = 1.0;
const OMEGA_FRICTION = 0.99;
const OMEGA_BOOST_SCALE = 0.3;

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
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseRef.current.vx = e.clientX - mouseRef.current.x;
      mouseRef.current.vy = e.clientY - mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!emoji) return;

    const initSpeed = INITIAL_SPEED * speedScale;
    stateRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * 90,
        y: Math.random() * 90,
        vx: Math.cos(angle) * initSpeed,
        vy: Math.sin(angle) * initSpeed,
        size: (1.2 + Math.random() * 1) * sizeScale,
        rot: Math.random() * 360,
        omega: (Math.random() < 0.5 ? 1 : -1) * (0.05 + Math.random() * 0.15),
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

    const minSpeed = MIN_SPEED * speedScale;
    const maxSpeed = MAX_SPEED * speedScale;

    function tick() {
      const ps = stateRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Wall bounce
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x >= 95) {
          p.x = 95;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y <= 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y >= 95) {
          p.y = 95;
          p.vy = -Math.abs(p.vy);
        }

        // Rotation + decay toward floor
        p.rot = (p.rot + p.omega) % 360;
        const absOmega = Math.abs(p.omega);
        if (absOmega > OMEGA_FLOOR) {
          p.omega = Math.sign(p.omega) * Math.max(absOmega * OMEGA_FRICTION, OMEGA_FLOOR);
        }

        // Friction
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > minSpeed) {
          const newSpeed = Math.max(speed * FRICTION, minSpeed);
          p.vx = (p.vx / speed) * newSpeed;
          p.vy = (p.vy / speed) * newSpeed;
        }

        // Mouse interaction
        const px = (p.x / 100) * window.innerWidth;
        const py = (p.y / 100) * window.innerHeight;
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INTERACTION_RADIUS && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const mvx = (mouse.vx / window.innerWidth) * 100;
          const mvy = (mouse.vy / window.innerHeight) * 100;
          const dot = mvx * nx + mvy * ny;
          if (dot < 0) {
            p.vx -= nx * dot * IMPULSE_SCALE;
            p.vy -= ny * dot * IMPULSE_SCALE;
            const boostedSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (boostedSpeed > maxSpeed) {
              p.vx = (p.vx / boostedSpeed) * maxSpeed;
              p.vy = (p.vy / boostedSpeed) * maxSpeed;
            }
            const approachSpeed = -dot;
            p.omega += Math.sign(p.omega || 1) * approachSpeed * OMEGA_BOOST_SCALE;
            const absO = Math.abs(p.omega);
            if (absO > OMEGA_MAX) p.omega = Math.sign(p.omega) * OMEGA_MAX;
          }
        }
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
          ref={(el) => {
            spansRef.current[i] = el;
          }}
          className={styles.particle}
        >
          {emoji}
        </span>
      ))}
    </div>,
    document.body,
  );
}
