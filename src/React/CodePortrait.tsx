import { useEffect, useRef } from "react";

const IMAGE_PATH = `${import.meta.env.BASE_URL}images/siyam.jpeg`;
const CHARACTERS = "{}[]<>/\\#$%@&*+=01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function CodePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = 620;
    const height = 760;
    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.src = IMAGE_PATH;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let running = true;
    let ready = false;
    let inView = false;
    let frame = 0;
    let particles: { x: number; y: number; targetX: number; targetY: number; char: string; color: string; delay: number }[] = [];

    const drawStaticPortrait = () => {
      if (!image.complete || !image.naturalWidth) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width / image.width, height / image.height);
      const imageWidth = image.width * scale;
      const imageHeight = image.height * scale;
      ctx.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);
    };

    const stopAnimation = () => {
      if (!animationFrame) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const renderFrame = () => {
      animationFrame = 0;
      if (!running || !ready || !inView || motionPreference.matches || document.hidden) return;

      ctx.fillStyle = "rgba(8, 6, 16, 0.24)";
      ctx.fillRect(0, 0, width, height);
      frame += 1;
      ctx.font = "6px monospace";
      ctx.globalAlpha = 0.78;
      for (const particle of particles) {
        if (frame > particle.delay) {
          particle.x += (particle.targetX - particle.x) * 0.035;
          particle.y += (particle.targetY - particle.y) * 0.035;
        }
        ctx.fillStyle = particle.color;
        ctx.fillText(particle.char, particle.x, particle.y);
      }
      ctx.globalAlpha = 1;

      const scanY = (frame * 0.75) % height;
      ctx.fillStyle = "rgba(164, 118, 255, 0.08)";
      ctx.fillRect(0, scanY, width, 2);
      if (frame < 210) animationFrame = requestAnimationFrame(renderFrame);
    };

    const startAnimation = () => {
      if (!running || !ready || !inView || motionPreference.matches || document.hidden || animationFrame || frame >= 210) return;
      animationFrame = requestAnimationFrame(renderFrame);
    };

    const handleMotionPreference = () => {
      if (motionPreference.matches) {
        stopAnimation();
        drawStaticPortrait();
      } else {
        startAnimation();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };

    image.onload = () => {
      if (motionPreference.matches) {
        drawStaticPortrait();
        return;
      }

      const columns = 72;
      const rows = 88;
      const sampleCanvas = document.createElement("canvas");
      const sampleCtx = sampleCanvas.getContext("2d");
      if (!sampleCtx) return;
      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      sampleCtx.fillStyle = "#080610";
      sampleCtx.fillRect(0, 0, columns, rows);

      const scale = Math.min(columns / image.width, rows / image.height);
      const imageWidth = image.width * scale;
      const imageHeight = image.height * scale;
      sampleCtx.drawImage(image, (columns - imageWidth) / 2, (rows - imageHeight) / 2, imageWidth, imageHeight);
      const imageData = sampleCtx.getImageData(0, 0, columns, rows);
      const cellWidth = 7.6;
      const cellHeight = 8.1;
      const offsetX = (width - columns * cellWidth) / 2;
      const offsetY = (height - rows * cellHeight) / 2;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4;
          const red = imageData.data[index];
          const green = imageData.data[index + 1];
          const blue = imageData.data[index + 2];
          if ((red + green + blue) / 3 < 18) continue;
          const targetX = offsetX + x * cellWidth;
          const targetY = offsetY + y * cellHeight;
          particles.push({
            x: targetX + (Math.random() - 0.5) * 16,
            y: targetY + (Math.random() - 0.5) * 16,
            targetX,
            targetY,
            char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            color: `rgb(${red}, ${green}, ${blue})`,
            delay: Math.random() * 24,
          });
        }
      }
      ready = true;
      startAnimation();
    };

    image.onerror = () => console.error("CodePortrait: Image not found. Check:", IMAGE_PATH);
    const visibilityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (inView) startAnimation();
          else stopAnimation();
        }, { rootMargin: "80px" })
      : null;
    if (visibilityObserver) visibilityObserver.observe(canvas);
    else inView = true;

    motionPreference.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      stopAnimation();
      visibilityObserver?.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
      document.removeEventListener("visibilitychange", handleVisibility);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-purple-400/20 bg-[#080610] shadow-[0_0_35px_rgba(164,118,255,0.10)]">
      <div className="flex items-center justify-between border-b border-purple-400/20 px-5 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="font-mono text-xs text-purple-300">siyam.profile.tsx</span>
        <span className="font-mono text-xs text-green-400">● LIVE</span>
      </div>
      <div className="relative">
        <img src={IMAGE_PATH} alt="Portrait of Siyam Hossain" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" width="620" height="760" />
        <canvas ref={canvasRef} aria-hidden="true" className="relative block h-auto w-full" style={{ aspectRatio: "620 / 760" }} />
      </div>
      <div className="border-t border-purple-400/20 px-5 py-3 font-mono text-xs text-purple-300">
        <span className="text-green-400" aria-hidden="true">➜</span>{" "}Rendering developer profile...
      </div>
    </div>
  );
}
