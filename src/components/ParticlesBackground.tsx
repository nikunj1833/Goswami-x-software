"use client";

import { useEffect, useRef } from "react";

interface Particle {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = 1;
    let particles: Particle[] = [];
    let animationId: number;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const count = Math.min(500, Math.floor((w * h) / 2600));
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          hx: x,
          hy: y,
          x,
          y,
          vx: 0,
          vy: 0,
          r: Math.random() * 1.3 + 0.7,
        });
      }
    }

    resize();
    initParticles();

    const handleResize = () => {
      resize();
      initParticles();
      if (prefersReduced) {
        drawStatic();
      }
    };

    window.addEventListener("resize", handleResize);

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    function accentRGB() {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-rgb")
          .trim() || "185,122,76"
      );
    }

    const REPEL_RADIUS = 170;
    const REPEL_STRENGTH = 3.6;
    const SPRING = 0.045;
    const DAMPING = 0.88;

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const rgb = accentRGB();
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.hx, p.hy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.4)`;
        ctx.fill();
      });
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const rgb = accentRGB();

      for (const p of particles) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

        if (dist < REPEL_RADIUS) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (p.hx - p.x) * SPRING;
        p.vy += (p.hy - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.4)`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(frame);
    }

    if (prefersReduced) {
      drawStatic();
    } else {
      frame();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="particles" aria-hidden="true" />;
}
