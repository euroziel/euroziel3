'use client';
import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

class Oscillator {
  phase: number;
  frequency: number;
  amplitude: number;
  offset: number;
  private current = 0;

  constructor(opts: { phase?: number; offset?: number; frequency?: number; amplitude?: number }) {
    this.phase = opts.phase ?? 0;
    this.offset = opts.offset ?? 0;
    this.frequency = opts.frequency ?? 0.001;
    this.amplitude = opts.amplitude ?? 1;
  }

  update() {
    this.phase += this.frequency;
    this.current = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.current;
  }
}

class NodePoint {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
}

class Line {
  spring: number;
  friction: number;
  nodes: NodePoint[] = [];

  constructor(spring: number, pos: Point) {
    this.spring = spring + 0.1 * Math.random() - 0.02;
    this.friction = CONFIG.friction + 0.01 * Math.random() - 0.002;
    for (let i = 0; i < CONFIG.size; i++) {
      const n = new NodePoint();
      n.x = pos.x;
      n.y = pos.y;
      this.nodes.push(n);
    }
  }

  update(pos: Point) {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;

    for (let i = 0; i < this.nodes.length; i++) {
      t = this.nodes[i];
      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * CONFIG.dampening;
        t.vy += n.vy * CONFIG.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= CONFIG.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);

    let a = 1;
    const o = this.nodes.length - 2;
    let e: NodePoint, t: NodePoint;
    for (; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export const CanvasPlaneCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let running = true;
    let lines: Line[] = [];
    const pos: Point = { x: 0, y: 0 };
    const prevPos: Point = { x: 0, y: 0 };
    const hue = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight;
    };

    const initLines = () => {
      lines = [];
      for (let i = 0; i < CONFIG.trails; i++) {
        lines.push(new Line(0.4 + (i / CONFIG.trails) * 0.025, pos));
      }
    };

    const updatePlane = (x: number, y: number) => {
      const el = planeRef.current;
      if (!el) return;
      const deltaX = x - prevPos.x;
      const deltaY = y - prevPos.y;
      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
        prevPos.x = x;
        prevPos.y = y;
      } else {
        const lastRotate = el.style.transform.split(' ').pop() ?? '';
        el.style.transform = `translate3d(${x}px, ${y}px, 0) ${lastRotate}`;
      }
    };

    const setPosition = (x: number, y: number) => {
      pos.x = x;
      pos.y = y;
      updatePlane(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        setPosition(e.touches[0].pageX, e.touches[0].pageY);
      } else {
        setPosition(e.clientX, e.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setPosition(e.touches[0].pageX, e.touches[0].pageY);
      }
    };

    const render = () => {
      if (!running) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(hue.update())}, 50%, 50%, 0.2)`;
      ctx.lineWidth = 1;

      for (let i = 0; i < CONFIG.trails; i++) {
        lines[i].update(pos);
        lines[i].draw(ctx);
      }
      window.requestAnimationFrame(render);
    };

    const handleFocus = () => {
      if (!running) {
        running = true;
        render();
      }
    };

    resizeCanvas();
    initLines();
    render();

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('resize', resizeCanvas);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('focus', handleFocus);

    return () => {
      running = false;
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" id="canvas" />
      <div
        ref={planeRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          pointerEvents: 'none',
          zIndex: 9999,
          marginTop: '-16px',
          marginLeft: '-16px',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V14l-8-5V3c0-.6-.4-1-1-1s-1 .4-1 1v6L3 14v2l8-2.5V19l-2 1.5V22l3-1 3 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>
    </>
  );
};

export default CanvasPlaneCursor;