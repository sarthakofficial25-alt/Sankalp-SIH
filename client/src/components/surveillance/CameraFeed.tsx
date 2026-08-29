import { useEffect, useRef } from 'react';
import type { Camera, Detection } from '../../types';

interface CameraFeedProps {
  camera: Camera;
  detections?: Detection[];
  compact?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
}

export default function CameraFeed({ camera, detections = [], compact = false, onSelect, isSelected = false }: CameraFeedProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scanLineY = 0;
    let noiseSeed = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Dark background gradient simulating infrared / night security feed
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0a111e');
      grad.addColorStop(1, '#05080f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw simulated horizon / terrain lines
      ctx.strokeStyle = 'rgba(30, 58, 95, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      ctx.lineTo(width * 0.35, height * 0.62);
      ctx.lineTo(width * 0.7, height * 0.68);
      ctx.lineTo(width, height * 0.64);
      ctx.stroke();

      // Draw simulated perimeter fence posts
      ctx.strokeStyle = 'rgba(40, 70, 110, 0.3)';
      for (let x = 20; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.65);
        ctx.lineTo(x, height * 0.55);
        ctx.stroke();
      }

      // Draw sensor grid overlay
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 0.5;
      const gridSize = compact ? 30 : 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Simulated noise/grain
      noiseSeed++;
      if (noiseSeed % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        for (let i = 0; i < 40; i++) {
          const rx = Math.random() * width;
          const ry = Math.random() * height;
          ctx.fillRect(rx, ry, 1.5, 1.5);
        }
      }

      // Draw animated person silhouette / motion target
      if (camera.status !== 'OFFLINE' && detections.length > 0) {
        detections.forEach(det => {
          const scaleX = width / 400;
          const scaleY = height / 250;
          const bx = det.boundingBox.x * scaleX;
          const by = det.boundingBox.y * scaleY;
          const bw = det.boundingBox.width * scaleX;
          const bh = det.boundingBox.height * scaleY;

          // Color based on threat
          const isHostile = det.threatLevel === 'CRITICAL' || det.threatLevel === 'HIGH';
          const boxColor = isHostile ? 'rgba(239, 68, 68, 0.9)' : 'rgba(34, 197, 94, 0.85)';
          const boxBg = isHostile ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.08)';

          // Bounding Box
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = 1.5;
          ctx.fillStyle = boxBg;
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeRect(bx, by, bw, bh);

          // Corner brackets
          const cornerLen = 6;
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = 2.5;

          // Top Left
          ctx.beginPath();
          ctx.moveTo(bx, by + cornerLen);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + cornerLen, by);
          ctx.stroke();

          // Top Right
          ctx.beginPath();
          ctx.moveTo(bx + bw - cornerLen, by);
          ctx.lineTo(bx + bw, by);
          ctx.lineTo(bx + bw, by + cornerLen);
          ctx.stroke();

          // Target tag label
          ctx.fillStyle = isHostile ? '#ef4444' : '#22c55e';
          ctx.font = `${compact ? '8px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillText(`[${det.trackId}] ${det.visualStatus === 'MATCHED' ? 'AUTH' : 'UNKNOWN'}`, bx, Math.max(12, by - 4));
          if (!compact) {
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '8px JetBrains Mono, monospace';
            ctx.fillText(`THREAT: ${det.threatScore}%`, bx, by + bh + 10);
          }
        });
      }

      // Draw scanline
      scanLineY = (scanLineY + 1.2) % height;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.fillRect(0, scanLineY, width, 2);

      // Camera offline banner
      if (camera.status === 'OFFLINE') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ef4444';
        ctx.font = `${compact ? '10px' : '14px'} JetBrains Mono, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('SIGNAL LOST — NO FEED', width / 2, height / 2);
        ctx.textAlign = 'start';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [camera, detections, compact]);

  return (
    <div
      onClick={onSelect}
      className={`camera-feed group relative overflow-hidden transition cursor-pointer ${
        isSelected ? 'border-primary ring-2 ring-primary/40' : 'hover:border-primary/50'
      }`}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={compact ? 320 : 480}
        height={compact ? 180 : 270}
        className="w-full h-auto block aspect-video"
      />

      {/* Top Overlay */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none text-xs font-mono">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-white">
          <span className="font-bold text-primary">{camera.id}</span>
          <span className="text-[10px] text-muted-foreground">|</span>
          <span className="text-[10px] text-slate-300 truncate max-w-[120px]">{camera.location}</span>
        </div>

        <div className="flex items-center gap-2">
          {camera.status === 'ONLINE' && (
            <div className="rec-indicator bg-black/60 backdrop-blur-sm rounded border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              REC
            </div>
          )}
          <span className="text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-white/80 border border-white/10 font-mono">
            {camera.resolution}
          </span>
        </div>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none text-[10px] font-mono">
        <div className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-slate-300">
          AI: {camera.aiEnabled ? <span className="text-green-400">ACTIVE</span> : <span className="text-muted-foreground">OFF</span>}
        </div>
        <div className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-slate-300">
          DETECTIONS: <span className="text-primary font-bold">{camera.detectionCount}</span>
        </div>
      </div>
    </div>
  );
}
