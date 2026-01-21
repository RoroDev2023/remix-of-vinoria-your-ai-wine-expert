import { useEffect, useRef } from "react";
import * as THREE from "three";

export type WineType = "red" | "white" | "rose" | "champagne";

interface ParticleSwarmProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  isThinking?: boolean;
  wineType?: WineType;
  count?: number; // particle count (default 6000)
}

const palettes: Record<WineType, { base: THREE.Color; accent: THREE.Color }> = {
  red: { base: new THREE.Color("#000000"), accent: new THREE.Color("#000000") },
  white: { base: new THREE.Color("#000000"), accent: new THREE.Color("#000000") },
  rose: { base: new THREE.Color("#000000"), accent: new THREE.Color("#000000") },
  champagne: { base: new THREE.Color("#000000"), accent: new THREE.Color("#000000") },
};

// Small helpers
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Lightweight 3D curl-ish noise using sin/cos (fast + stable).
 * Not “true” curl noise but looks great for swarm flow fields.
 */
function flowField(x: number, y: number, z: number, t: number) {
  const nx = x * 0.9;
  const ny = y * 0.9;
  const nz = z * 0.9;

  const s1 = Math.sin(ny + t * 0.35) + Math.cos(nz * 1.15 - t * 0.25);
  const s2 = Math.sin(nz + t * 0.3) + Math.cos(nx * 1.2 + t * 0.2);
  const s3 = Math.sin(nx + t * 0.4) + Math.cos(ny * 1.1 - t * 0.3);

  // pseudo "curl": cross-like mixing
  return new THREE.Vector3(
    s2 - s3,
    s3 - s1,
    s1 - s2
  );
}

const ParticleSwarm = ({
  isSpeaking = false,
  isListening = false,
  isThinking = false,
  wineType = "red",
  count = 6000,
}: ParticleSwarmProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);

  const stateRef = useRef({ isSpeaking, isListening, isThinking });
  const wineTypeRef = useRef<WineType>(wineType);

  useEffect(() => {
    stateRef.current = { isSpeaking, isListening, isThinking };
  }, [isSpeaking, isListening, isThinking]);

  useEffect(() => {
    wineTypeRef.current = wineType;
  }, [wineType]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const getSize = () => {
      const w = Math.max(1, container.clientWidth || 600);
      const h = Math.max(1, container.clientHeight || 600);
      return { w, h };
    };

    const { w: width, h: height } = getSize();

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // ---------- Particles data ----------
    // We simulate positions/velocities on CPU. (3k–8k is usually fine on modern machines)
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const pos = new Array<THREE.Vector3>(count);
    const vel = new Array<THREE.Vector3>(count);

    // Spawn as a loose sphere / shell
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i] = new THREE.Vector3(x, y, z);

      // small initial velocity
      vel[i] = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const palette = palettes[wineTypeRef.current];
    const material = new THREE.PointsMaterial({
      size: 0.022,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Soft ambient glow background (optional)
    // You can remove this if you already have a background.
    const bgPlaneGeo = new THREE.PlaneGeometry(20, 20);
    const bgPlaneMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.0 });
    const bgPlane = new THREE.Mesh(bgPlaneGeo, bgPlaneMat);
    bgPlane.position.z = -5;
    scene.add(bgPlane);

    // ---------- State smoothing ----------
    const smoothed = {
      speak: 0,
      listen: 0,
      think: 0,
      activity: 0,
    };

    // Focal point the swarm can gather around
    const focus = new THREE.Vector3(0, 0.15, 0);

    // Temp vectors to avoid allocations
    const tmp = new THREE.Vector3();
    const tmp2 = new THREE.Vector3();
    const tmp3 = new THREE.Vector3();
    const tmp4 = new THREE.Vector3();
    const outward = new THREE.Vector3();
    const swirl = new THREE.Vector3();

    // For speaking “pulse”
    let pulsePhase = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const t = performance.now() * 0.001;
      const { isSpeaking: sp, isListening: li, isThinking: th } = stateRef.current;

      const speakTarget = sp ? 1 : 0;
      const listenTarget = li ? 1 : 0;
      const thinkTarget = th ? 1 : 0;

      // Smooth states
      smoothed.speak = lerp(smoothed.speak, speakTarget, 0.10);
      smoothed.listen = lerp(smoothed.listen, listenTarget, 0.10);
      smoothed.think = lerp(smoothed.think, thinkTarget, 0.10);
      smoothed.activity = lerp(
        smoothed.activity,
        Math.max(smoothed.speak, Math.max(smoothed.listen, smoothed.think)),
        0.08
      );

      // Update palette if changed
      const pal = palettes[wineTypeRef.current];

      // Behavior tuning by state
      // Base “field” strength and speed
      const baseSpeed = 0.004 + smoothed.activity * 0.024;

      // Listening: gather inward (tighter)
      const gatherStrength = 0.006 + smoothed.listen * 0.05;

      // Thinking: orbit/spiral around focus
      const orbitStrength = 0.01 + smoothed.think * 0.08;

      // Speaking: outward pulses + extra brightness
      const speakBoost = smoothed.speak;

      // Keep things stable
      const maxVel = 0.075 + smoothed.activity * 0.12;

      pulsePhase += 0.05 + speakBoost * 0.5;
      const pulse = (Math.sin(pulsePhase) * 0.5 + 0.5) * speakBoost; // 0..1 while speaking

      // Animate points group slightly (premium “alive” feel)
      points.rotation.y = t * (0.08 + 0.12 * smoothed.think);
      points.rotation.x = Math.sin(t * 0.22) * 0.08;

      // Sim step
      for (let i = 0; i < count; i++) {
        const p = pos[i];
        const v = vel[i];

        // Flow field force
        const f = flowField(p.x, p.y, p.z, t);
        f.multiplyScalar(baseSpeed);

        // Gather to focus (listening)
        tmp.copy(focus).sub(p).multiplyScalar(gatherStrength);

        // Orbit around focus (thinking)
        // tangential direction around Y axis
        tmp2.set(-(p.z - focus.z), 0, (p.x - focus.x)).multiplyScalar(orbitStrength);

        // Listening: flatten into a wide lens + stabilize height
        const listenPlaneStrength = 0.004 + smoothed.listen * 0.03;
        tmp3.set(0, -p.y, 0).multiplyScalar(listenPlaneStrength);

        const radialLen = Math.sqrt(p.x * p.x + p.z * p.z) || 1;
        const ringTarget = 1.35 + smoothed.listen * 0.35;
        const ringForce = (ringTarget - radialLen) * (0.004 + smoothed.listen * 0.02);
        tmp4.set(p.x / radialLen, 0, p.z / radialLen).multiplyScalar(ringForce);

        // Always-on gentle swirl for fluid feel
        swirl.set(-p.z, 0, p.x).multiplyScalar(0.004 + smoothed.think * 0.006);

        // Speaking pulse (push outward from center)
        outward.copy(p).normalize().multiplyScalar(0.016 * pulse);

        // Combine
        v.add(f).add(tmp).add(tmp2).add(tmp3).add(tmp4).add(swirl).add(outward);

        // Damping (calmer when listening)
        const damping = 0.94 - smoothed.listen * 0.03 + smoothed.speak * 0.01;
        v.multiplyScalar(damping);

        // Clamp velocity
        const len = v.length();
        if (len > maxVel) v.multiplyScalar(maxVel / len);

        // Integrate position
        p.add(v);

        // Soft bounds (keep within sphere)
        const r = p.length();
        const bound = 3.0;
        if (r > bound) {
          // steer back inward
          p.multiplyScalar(bound / r);
          v.multiplyScalar(0.6);
        }

        // Write to buffer
        positions[i * 3 + 0] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;

        // Color: base cyan + wine accent when speaking/thinking
        const accentMix = clamp01(0.15 + 0.55 * smoothed.think + 0.75 * pulse);
        const c = pal.base.clone().lerp(pal.accent, accentMix);

        // Brightness varies slightly by radius + pulse
        const br = 0.65 + 0.35 * (1 - clamp01(r / bound)) + 0.35 * pulse;
        c.multiplyScalar(br);

        // Keep particles visible even when palette is black
        const visibilityFloor = 0.06 + 0.12 * smoothed.activity + 0.16 * pulse;
        c.r = Math.max(c.r, visibilityFloor);
        c.g = Math.max(c.g, visibilityFloor);
        c.b = Math.max(c.b, visibilityFloor);

        colors[i * 3 + 0] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      // Update GPU buffers
      (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // Material response
      material.size = 0.026 + 0.02 * smoothed.activity + 0.022 * pulse;
      material.opacity = 0.74 + 0.22 * smoothed.activity + 0.24 * pulse;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const { w: nw, h: nh } = getSize();
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);

      // Dispose
      geometry.dispose();
      material.dispose();
      bgPlaneGeo.dispose();
      bgPlaneMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [count]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={containerRef} className="relative w-full h-full" />
    </div>
  );
};

export default ParticleSwarm;
