import { useRef, useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Pure CSS/Canvas based hologram that avoids three.js React context issues
const Hologram3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear
    ctx.clearRect(0, 0, width, height);
    
    // Draw hologram figure
    const centerX = width / 2;
    const baseY = height * 0.85;
    
    // Hologram color with flicker
    const flicker = 0.8 + Math.sin(time * 10) * 0.1;
    const alpha = 0.6 * flicker;
    
    // Glow effect
    ctx.shadowBlur = 30;
    ctx.shadowColor = `rgba(34, 211, 238, ${alpha})`;
    
    // Head
    ctx.beginPath();
    ctx.arc(centerX, baseY - 280, 35, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.7})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Eyes
    ctx.beginPath();
    ctx.arc(centerX - 12, baseY - 285, 4, 0, Math.PI * 2);
    ctx.arc(centerX + 12, baseY - 285, 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 255, 255, ${alpha})`;
    ctx.fill();
    
    // Neck
    ctx.beginPath();
    ctx.moveTo(centerX - 10, baseY - 245);
    ctx.lineTo(centerX + 10, baseY - 245);
    ctx.lineTo(centerX + 12, baseY - 225);
    ctx.lineTo(centerX - 12, baseY - 225);
    ctx.closePath();
    ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.5})`;
    ctx.fill();
    
    // Shoulders
    ctx.beginPath();
    ctx.moveTo(centerX - 70, baseY - 210);
    ctx.lineTo(centerX + 70, baseY - 210);
    ctx.lineTo(centerX + 60, baseY - 195);
    ctx.lineTo(centerX - 60, baseY - 195);
    ctx.closePath();
    ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.6})`;
    ctx.fill();
    
    // Torso
    ctx.beginPath();
    ctx.moveTo(centerX - 50, baseY - 195);
    ctx.lineTo(centerX + 50, baseY - 195);
    ctx.lineTo(centerX + 40, baseY - 80);
    ctx.lineTo(centerX - 40, baseY - 80);
    ctx.closePath();
    const torsoGradient = ctx.createLinearGradient(centerX, baseY - 195, centerX, baseY - 80);
    torsoGradient.addColorStop(0, `rgba(34, 211, 238, ${alpha * 0.5})`);
    torsoGradient.addColorStop(1, `rgba(34, 211, 238, ${alpha * 0.1})`);
    ctx.fillStyle = torsoGradient;
    ctx.fill();
    
    // Lower body fade
    ctx.beginPath();
    ctx.moveTo(centerX - 40, baseY - 80);
    ctx.lineTo(centerX + 40, baseY - 80);
    ctx.lineTo(centerX + 25, baseY);
    ctx.lineTo(centerX - 25, baseY);
    ctx.closePath();
    const lowerGradient = ctx.createLinearGradient(centerX, baseY - 80, centerX, baseY);
    lowerGradient.addColorStop(0, `rgba(34, 211, 238, ${alpha * 0.3})`);
    lowerGradient.addColorStop(1, `rgba(34, 211, 238, 0)`);
    ctx.fillStyle = lowerGradient;
    ctx.fill();
    
    // Arms
    ctx.beginPath();
    ctx.moveTo(centerX - 60, baseY - 200);
    ctx.lineTo(centerX - 75, baseY - 130);
    ctx.lineTo(centerX - 65, baseY - 125);
    ctx.lineTo(centerX - 50, baseY - 190);
    ctx.closePath();
    ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.4})`;
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(centerX + 60, baseY - 200);
    ctx.lineTo(centerX + 80, baseY - 150);
    ctx.lineTo(centerX + 70, baseY - 145);
    ctx.lineTo(centerX + 50, baseY - 190);
    ctx.closePath();
    ctx.fill();
    
    // Scan lines
    ctx.shadowBlur = 0;
    for (let i = 0; i < 15; i++) {
      const y = baseY - 280 + i * 20;
      const scanAlpha = 0.1 + Math.sin(time * 2 + i * 0.5) * 0.1;
      ctx.beginPath();
      ctx.moveTo(centerX - 80, y);
      ctx.lineTo(centerX + 80, y);
      ctx.strokeStyle = `rgba(34, 211, 238, ${scanAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Moving scan line
    const scanY = baseY - 280 + ((time * 50) % 300);
    ctx.beginPath();
    ctx.moveTo(centerX - 80, scanY);
    ctx.lineTo(centerX + 80, scanY);
    ctx.strokeStyle = `rgba(34, 211, 238, 0.8)`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Data rings
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
    
    const rings = [
      { y: baseY - 300, radius: 50, speed: 1 },
      { y: baseY - 200, radius: 65, speed: -0.7 },
      { y: baseY - 120, radius: 45, speed: 0.5 },
    ];
    
    rings.forEach(ring => {
      ctx.beginPath();
      ctx.ellipse(centerX, ring.y, ring.radius, 10, time * ring.speed, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, 0.5)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // Base platform
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + 10, 80, 15, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(34, 211, 238, 0.8)`;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Outer ring
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + 10, 100, 20, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(124, 58, 237, 0.5)`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [time]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow backdrop */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
      />
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className="relative z-10"
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${20 + (i * 4)}%`,
              top: `${30 + (i % 5) * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hologram3D;
