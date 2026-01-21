import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface AIOrbProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  isThinking?: boolean;
}

// Easing functions for smoother transitions
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const AIOrb = ({ isSpeaking = false, isListening = false, isThinking = false }: AIOrbProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const stateRef = useRef({ isSpeaking, isListening, isThinking });
  const smoothStatesRef = useRef({ speaking: 0, listening: 0, thinking: 0, activity: 0 });
  const lastTimeRef = useRef(0);

  useEffect(() => {
    stateRef.current = { isSpeaking, isListening, isThinking };
  }, [isSpeaking, isListening, isThinking]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera with slight offset for depth
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.1, 5);
    cameraRef.current = camera;

    // High-quality renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced core orb shader with more organic movement
    const coreOrbMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        thinking: { value: 0 },
        activity: { value: 0 },
        coreColor: { value: new THREE.Color(0x0891b2) },
        accentColor: { value: new THREE.Color(0x22d3ee) },
        wineAccent: { value: new THREE.Color(0x8b1538) },
        goldAccent: { value: new THREE.Color(0xd4af37) },
        mouseX: { value: 0 },
        mouseY: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying float vDisplacement;
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform float thinking;
        uniform float activity;
        uniform float mouseX;
        uniform float mouseY;
        
        // Improved 3D simplex noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        // Fractal brownian motion for more organic noise
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          for (int i = 0; i < 4; i++) {
            value += amplitude * snoise(p * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          return value;
        }
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          float displacement = 0.0;
          
          // Organic idle breathing with multiple frequencies
          float breathe1 = sin(time * 0.4) * 0.015;
          float breathe2 = sin(time * 0.7 + 1.0) * 0.008;
          float breathe3 = sin(time * 1.1 + 2.0) * 0.005;
          float idleBreathe = breathe1 + breathe2 + breathe3;
          pos *= 1.0 + idleBreathe;
          
          // Mouse influence - subtle attraction
          vec3 mouseDir = normalize(vec3(mouseX * 0.3, mouseY * 0.3, 0.5));
          float mouseDot = dot(normalize(pos), mouseDir);
          pos += normal * mouseDot * 0.02 * (1.0 - activity * 0.5);
          
          // Speaking: confident, rhythmic pulsation with harmonics
          if (speaking > 0.01) {
            float speakBase = sin(time * 5.0) * 0.035;
            float speakHarmonic1 = sin(time * 10.0) * 0.018;
            float speakHarmonic2 = sin(time * 15.0 + 0.5) * 0.008;
            float speakNoise = fbm(pos * 1.5 + time * 1.5) * 0.025;
            float speakWave = speakBase + speakHarmonic1 + speakHarmonic2 + speakNoise;
            displacement += speakWave * speaking;
            pos += normal * speakWave * speaking;
          }
          
          // Listening: attentive, focused gathering motion
          if (listening > 0.01) {
            float listenPulse = sin(time * 3.0) * 0.02;
            float listenFocus = sin(time * 1.5) * 0.015;
            // Directional "leaning" toward sound source
            vec3 listenDir = vec3(0.0, 0.1, 0.3);
            float listenBias = dot(normalize(pos), listenDir) * 0.02;
            float listenNoise = snoise(pos * 2.5 + time * 2.0) * 0.015;
            displacement += (listenPulse + listenFocus + listenNoise) * listening;
            pos += normal * (listenPulse + listenNoise) * listening;
            pos += listenDir * listenBias * listening;
          }
          
          // Thinking: complex, contemplative internal motion
          if (thinking > 0.01) {
            float thinkNoise1 = fbm(pos * 2.0 + time * 0.8) * 0.03;
            float thinkNoise2 = snoise(pos * 4.0 - time * 1.2) * 0.015;
            float thinkWave = sin(pos.y * 6.0 + time * 1.5) * cos(pos.x * 4.0 + time) * 0.012;
            displacement += (thinkNoise1 + thinkNoise2 + thinkWave) * thinking;
            pos += normal * (thinkNoise1 + thinkNoise2 + thinkWave) * thinking;
          }
          
          vDisplacement = displacement;
          vPosition = pos;
          vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform float thinking;
        uniform float activity;
        uniform vec3 coreColor;
        uniform vec3 accentColor;
        uniform vec3 wineAccent;
        uniform vec3 goldAccent;
        uniform float mouseX;
        uniform float mouseY;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying float vDisplacement;
        
        void main() {
          // Enhanced fresnel for volumetric depth
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
          float fresnelSoft = pow(1.0 - abs(dot(viewDir, vNormal)), 1.5);
          
          // Core luminosity gradient
          float coreGlow = 1.0 - length(vUv - 0.5) * 1.6;
          coreGlow = pow(max(coreGlow, 0.0), 1.8);
          
          // Dynamic internal energy patterns
          float energy1 = sin(vPosition.x * 8.0 + time * 1.8 + vPosition.y * 3.0) * 0.5 + 0.5;
          float energy2 = sin(vPosition.y * 10.0 + time * 2.2 - vPosition.z * 2.0) * 0.5 + 0.5;
          float energy3 = sin(vPosition.z * 6.0 + time * 1.5 + vPosition.x * 4.0) * 0.5 + 0.5;
          float internalEnergy = (energy1 * energy2 + energy2 * energy3 + energy3 * energy1) / 3.0;
          
          // Subtle volumetric scan lines
          float scanLine = sin(vPosition.y * 50.0 + time * 2.5) * 0.5 + 0.5;
          scanLine = pow(scanLine, 20.0) * 0.12;
          
          // Animated highlight band
          float highlightBand = 1.0 - abs(sin(time * 0.25) - vUv.y);
          highlightBand = pow(highlightBand, 35.0) * 0.25;
          
          // Secondary rotating highlight
          float angle = atan(vPosition.x, vPosition.z);
          float rotatingHighlight = sin(angle * 2.0 + time * 0.5) * 0.5 + 0.5;
          rotatingHighlight = pow(rotatingHighlight, 8.0) * 0.1 * (1.0 - fresnel);
          
          // Base color with smooth transitions
          vec3 baseColor = mix(coreColor, accentColor, fresnel * 0.6 + internalEnergy * 0.25);
          
          // Speaking: warm wine/gold accent with smooth pulsation
          float speakPulse = sin(time * 6.0) * 0.5 + 0.5;
          speakPulse = speakPulse * speakPulse; // Ease-in curve
          vec3 speakColor = mix(wineAccent, goldAccent, speakPulse * 0.3);
          baseColor = mix(baseColor, speakColor, speaking * speakPulse * 0.3);
          
          // Listening: focused cyan intensification
          float listenGlow = sin(time * 3.0) * 0.3 + 0.7;
          baseColor = mix(baseColor, accentColor * 1.4, listening * listenGlow * 0.35);
          
          // Thinking: subtle blue-violet contemplative shift
          float thinkShift = sin(time * 1.2) * 0.5 + 0.5;
          vec3 thinkColor = vec3(0.35, 0.45, 0.95);
          baseColor = mix(baseColor, thinkColor, thinking * thinkShift * 0.25);
          
          // Displacement-based brightness variation
          float dispBrightness = 1.0 + vDisplacement * 2.0;
          baseColor *= dispBrightness;
          
          // Final alpha composition
          float alpha = 0.3 + fresnel * 0.5 + fresnelSoft * 0.15 + coreGlow * 0.2;
          alpha += scanLine + highlightBand + rotatingHighlight;
          alpha += speaking * 0.12 + listening * 0.08 + thinking * 0.06;
          
          // Smooth micro-flicker for organic feel
          float flicker = 0.97 + sin(time * 30.0) * 0.015 + sin(time * 53.0) * 0.01;
          alpha *= flicker;
          
          // Add subtle edge glow
          float edgeGlow = fresnel * 0.2;
          baseColor += accentColor * edgeGlow;
          
          gl_FragColor = vec4(baseColor, clamp(alpha, 0.0, 0.92));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Main core orb with higher resolution
    const coreGeometry = new THREE.SphereGeometry(1, 160, 160);
    const coreOrb = new THREE.Mesh(coreGeometry, coreOrbMaterial);
    scene.add(coreOrb);

    // Enhanced inner glow with pulsing core
    const innerGlowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        thinking: { value: 0 },
        color: { value: new THREE.Color(0x22d3ee) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform float speaking;
        uniform float listening;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Inner core pulsation
          float pulse = sin(time * 2.0) * 0.02 + speaking * sin(time * 8.0) * 0.03;
          vec3 pos = position * (1.0 + pulse);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform float thinking;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 4.5);
          
          float activity = max(speaking, max(listening, thinking));
          float pulse = 0.5 + sin(time * 1.8) * 0.15 + activity * 0.35;
          
          // Color shift based on state
          vec3 finalColor = color;
          finalColor = mix(finalColor, vec3(0.9, 0.3, 0.4), speaking * 0.2);
          finalColor = mix(finalColor, color * 1.3, listening * 0.3);
          
          gl_FragColor = vec4(finalColor * 1.6, fresnel * pulse * 0.45);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const innerGlow = new THREE.Mesh(new THREE.SphereGeometry(0.82, 64, 64), innerGlowMaterial);
    scene.add(innerGlow);

    // Outer atmosphere with breathing effect
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        thinking: { value: 0 },
        color: { value: new THREE.Color(0x0891b2) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform float speaking;
        uniform float listening;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Organic breathing
          float breathe = sin(time * 0.4) * 0.025 + sin(time * 0.7) * 0.015;
          breathe += speaking * sin(time * 5.0) * 0.035;
          breathe += listening * sin(time * 3.0) * 0.02;
          
          vec3 pos = position * (1.0 + breathe);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform float thinking;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.2);
          
          float activity = max(speaking, max(listening, thinking));
          float pulse = 0.55 + sin(time * 1.2) * 0.12 + activity * 0.2;
          
          // Subtle color variation
          vec3 atmColor = color;
          atmColor = mix(atmColor, vec3(0.85, 0.25, 0.35), speaking * 0.15);
          
          gl_FragColor = vec4(atmColor, fresnel * pulse * 0.22);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.35, 64, 64), atmosphereMaterial);
    scene.add(atmosphere);

    // Enhanced orbital rings with smooth rotation
    const createOrbitalRing = (radius: number, rotationSpeed: number, thickness: number, tilt: number) => {
      const ringMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speaking: { value: 0 },
          listening: { value: 0 },
          thinking: { value: 0 },
          color: { value: new THREE.Color(0x22d3ee) },
          goldColor: { value: new THREE.Color(0xd4af37) },
        },
        vertexShader: `
          varying float vAngle;
          varying vec3 vPosition;
          uniform float time;
          uniform float speaking;
          
          void main() {
            vAngle = atan(position.x, position.z);
            vPosition = position;
            
            // Subtle wobble
            vec3 pos = position;
            float wobble = sin(time * 0.8 + vAngle * 2.0) * 0.01 * (1.0 + speaking);
            pos.y += wobble;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float speaking;
          uniform float listening;
          uniform float thinking;
          uniform vec3 color;
          uniform vec3 goldColor;
          varying float vAngle;
          varying vec3 vPosition;
          
          void main() {
            // Segmented glow with smooth transitions
            float segments = 10.0;
            float segment = sin(vAngle * segments + time * 2.5) * 0.5 + 0.5;
            segment = smoothstep(0.3, 0.7, segment);
            
            // Running light effect
            float runningLight = sin(vAngle * 2.0 - time * 3.0) * 0.5 + 0.5;
            runningLight = pow(runningLight, 4.0) * 0.4;
            
            float alpha = 0.12 + segment * 0.25 + runningLight;
            alpha += speaking * 0.15 + listening * 0.12 + thinking * 0.08;
            alpha *= 0.6 + sin(time * 1.5) * 0.15;
            
            // Color mixing
            vec3 ringColor = mix(color, goldColor, speaking * 0.3);
            
            gl_FragColor = vec4(ringColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, thickness, 8, 128),
        ringMaterial
      );
      ring.rotation.x = Math.PI / 2 + tilt;
      ring.userData = { rotationSpeed, baseRotation: ring.rotation.z };
      return ring;
    };

    const rings = [
      createOrbitalRing(1.45, 0.25, 0.007, 0.1),
      createOrbitalRing(1.6, -0.18, 0.005, -0.15),
      createOrbitalRing(1.75, 0.12, 0.004, 0.05),
      createOrbitalRing(1.9, -0.08, 0.003, -0.08),
    ];
    rings.forEach(ring => scene.add(ring));

    // Enhanced particle system with organic behavior
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.15 + Math.random() * 0.9;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
      
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.5 + Math.random() * 0.5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particleGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        thinking: { value: 0 },
        color: { value: new THREE.Color(0x22d3ee) },
        wineColor: { value: new THREE.Color(0xd4af37) },
      },
      vertexShader: `
        attribute float phase;
        attribute float size;
        varying float vAlpha;
        varying float vPhase;
        varying float vSize;
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform float thinking;
        
        void main() {
          vPhase = phase;
          vSize = size;
          
          vec3 pos = position;
          
          // Smooth orbital motion with easing
          float orbitSpeed = 0.25 + speaking * 0.15 + listening * 0.1;
          float orbit = time * orbitSpeed + phase;
          
          // Orbital motion with slight eccentricity
          float radius = length(pos.xz);
          float eccentricity = 0.05 * sin(phase * 3.0);
          float angle = atan(pos.z, pos.x) + orbit;
          float r = radius * (1.0 + eccentricity * cos(angle * 2.0));
          pos.x = cos(angle) * r;
          pos.z = sin(angle) * r;
          
          // Organic vertical oscillation
          float vertOsc = sin(time * 1.5 + phase * 2.5) * 0.08;
          vertOsc += sin(time * 2.3 + phase * 4.0) * 0.04;
          pos.y += vertOsc;
          
          // State-based expansion with smooth easing
          float activity = max(speaking, max(listening, thinking));
          float expansion = 1.0 + speaking * 0.18 + listening * 0.12 + thinking * 0.08;
          pos *= expansion;
          
          // Alpha based on position and state
          float distFromCenter = length(pos);
          vAlpha = 0.35 + sin(time * 2.5 + phase) * 0.25;
          vAlpha *= smoothstep(2.2, 1.2, distFromCenter);
          vAlpha += activity * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float sizeScale = 3.0 + speaking * 2.0 + activity * 1.0;
          gl_PointSize = size * sizeScale * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 wineColor;
        uniform float speaking;
        uniform float time;
        varying float vAlpha;
        varying float vPhase;
        varying float vSize;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Soft glow with core
          float glow = 1.0 - dist * 2.0;
          glow = pow(glow, 1.3);
          
          // Subtle pulsing
          float pulse = 0.9 + sin(time * 3.0 + vPhase * 2.0) * 0.1;
          glow *= pulse;
          
          // Color mixing based on state
          vec3 finalColor = mix(color, wineColor, speaking * sin(vPhase + time) * 0.4);
          
          gl_FragColor = vec4(finalColor, glow * vAlpha * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Energy tendrils / light streams
    const tendrilCount = 6;
    const tendrils: THREE.Line[] = [];
    
    for (let t = 0; t < tendrilCount; t++) {
      const tendrilPoints: THREE.Vector3[] = [];
      const pointCount = 30;
      const baseAngle = (t / tendrilCount) * Math.PI * 2;
      
      for (let i = 0; i < pointCount; i++) {
        const progress = i / (pointCount - 1);
        const radius = 1.1 + progress * 0.8;
        const angle = baseAngle + progress * 0.5;
        const y = (Math.random() - 0.5) * 0.3;
        tendrilPoints.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          y + progress * 0.2,
          Math.sin(angle) * radius
        ));
      }
      
      const tendrilGeometry = new THREE.BufferGeometry().setFromPoints(tendrilPoints);
      const tendrilMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speaking: { value: 0 },
          color: { value: new THREE.Color(0x22d3ee) },
          offset: { value: t * 0.5 },
        },
        vertexShader: `
          uniform float time;
          uniform float offset;
          varying float vProgress;
          
          void main() {
            vProgress = position.x; // Use x as progress indicator
            vec3 pos = position;
            
            // Flowing motion
            pos.y += sin(time * 2.0 + offset + pos.x * 3.0) * 0.05;
            pos.x += cos(time * 1.5 + offset) * 0.03;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float speaking;
          uniform vec3 color;
          uniform float offset;
          varying float vProgress;
          
          void main() {
            float alpha = sin(time * 3.0 + offset) * 0.3 + 0.4;
            alpha *= speaking * 0.7 + 0.3;
            alpha *= 0.15;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      
      const tendril = new THREE.Line(tendrilGeometry, tendrilMaterial);
      tendrils.push(tendril);
      scene.add(tendril);
    }

    // Ripple rings for interaction
    const rippleRings: THREE.Mesh[] = [];

    // Mouse interaction with smooth following
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    
    const handleClick = () => {
      const rippleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          maxTime: { value: 1.8 },
          color: { value: new THREE.Color(0x22d3ee) },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          uniform float maxTime;
          void main() {
            vUv = uv;
            float progress = time / maxTime;
            // Ease-out expansion
            float easeProgress = 1.0 - pow(1.0 - progress, 3.0);
            float scale = 1.0 + easeProgress * 0.9;
            vec3 pos = position * scale;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float maxTime;
          uniform vec3 color;
          varying vec2 vUv;
          void main() {
            float progress = time / maxTime;
            // Smooth fade out
            float alpha = pow(1.0 - progress, 2.0) * 0.35;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const ripple = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.015, 8, 64),
        rippleMaterial
      );
      ripple.rotation.x = Math.PI / 2;
      ripple.userData = { startTime: performance.now() * 0.001 };
      scene.add(ripple);
      rippleRings.push(ripple);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Animation loop with delta time for consistent motion
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const currentTime = performance.now() * 0.001;
      const deltaTime = Math.min(currentTime - lastTimeRef.current, 0.1); // Cap delta for tab switching
      lastTimeRef.current = currentTime;
      
      const { isSpeaking, isListening, isThinking } = stateRef.current;
      const smoothStates = smoothStatesRef.current;
      
      // Smooth state transitions with easing
      const transitionSpeed = 0.08;
      smoothStates.speaking += (isSpeaking ? 1 : 0 - smoothStates.speaking) * transitionSpeed;
      smoothStates.listening += (isListening ? 1 : 0 - smoothStates.listening) * transitionSpeed;
      smoothStates.thinking += (isThinking ? 1 : 0 - smoothStates.thinking) * transitionSpeed;
      smoothStates.activity = Math.max(smoothStates.speaking, smoothStates.listening, smoothStates.thinking);
      
      // Smooth mouse following
      const mouseSmooth = 0.06;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * mouseSmooth;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * mouseSmooth;

      // Update core orb uniforms
      const coreUniforms = coreOrbMaterial.uniforms;
      coreUniforms.time.value = currentTime;
      coreUniforms.speaking.value = smoothStates.speaking;
      coreUniforms.listening.value = smoothStates.listening;
      coreUniforms.thinking.value = smoothStates.thinking;
      coreUniforms.activity.value = smoothStates.activity;
      coreUniforms.mouseX.value = mouseRef.current.x;
      coreUniforms.mouseY.value = mouseRef.current.y;

      // Smooth orb rotation following mouse with damping
      const rotationDamping = 0.015;
      coreOrb.rotation.y += (mouseRef.current.x * 0.15 - coreOrb.rotation.y) * rotationDamping;
      coreOrb.rotation.x += (mouseRef.current.y * 0.08 - coreOrb.rotation.x) * rotationDamping;

      // Update inner glow
      innerGlowMaterial.uniforms.time.value = currentTime;
      innerGlowMaterial.uniforms.speaking.value = smoothStates.speaking;
      innerGlowMaterial.uniforms.listening.value = smoothStates.listening;
      innerGlowMaterial.uniforms.thinking.value = smoothStates.thinking;

      // Update atmosphere
      atmosphereMaterial.uniforms.time.value = currentTime;
      atmosphereMaterial.uniforms.speaking.value = smoothStates.speaking;
      atmosphereMaterial.uniforms.listening.value = smoothStates.listening;
      atmosphereMaterial.uniforms.thinking.value = smoothStates.thinking;

      // Animate orbital rings with smooth rotation
      rings.forEach((ring) => {
        const mat = ring.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = currentTime;
        mat.uniforms.speaking.value = smoothStates.speaking;
        mat.uniforms.listening.value = smoothStates.listening;
        mat.uniforms.thinking.value = smoothStates.thinking;
        
        const speedMultiplier = 1 + smoothStates.activity * 0.5;
        ring.rotation.z += ring.userData.rotationSpeed * 0.008 * speedMultiplier;
      });

      // Update particles
      particleMaterial.uniforms.time.value = currentTime;
      particleMaterial.uniforms.speaking.value = smoothStates.speaking;
      particleMaterial.uniforms.listening.value = smoothStates.listening;
      particleMaterial.uniforms.thinking.value = smoothStates.thinking;

      // Update tendrils
      tendrils.forEach((tendril) => {
        const mat = tendril.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = currentTime;
        mat.uniforms.speaking.value = smoothStates.speaking;
      });

      // Update ripples
      for (let i = rippleRings.length - 1; i >= 0; i--) {
        const ripple = rippleRings[i];
        const mat = ripple.material as THREE.ShaderMaterial;
        const elapsed = currentTime - ripple.userData.startTime;
        mat.uniforms.time.value = elapsed;
        
        if (elapsed > mat.uniforms.maxTime.value) {
          scene.remove(ripple);
          ripple.geometry.dispose();
          mat.dispose();
          rippleRings.splice(i, 1);
        }
      }

      // Subtle camera movement for depth
      const cameraSway = 0.02;
      camera.position.x = Math.sin(currentTime * 0.15) * cameraSway;
      camera.position.y = 0.1 + Math.cos(currentTime * 0.12) * cameraSway * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  const getStateLabel = () => {
    if (isSpeaking) return "Speaking";
    if (isListening) return "Listening";
    if (isThinking) return "Thinking";
    return "Ready";
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Deep ambient background glow */}
      <motion.div
        animate={{ 
          opacity: isSpeaking ? [0.45, 0.65, 0.45] : isListening ? [0.35, 0.5, 0.35] : [0.2, 0.3, 0.2],
          scale: isSpeaking ? [1, 1.08, 1] : isListening ? [1, 1.04, 1] : [1, 1.015, 1]
        }}
        transition={{ 
          duration: isSpeaking ? 0.35 : isListening ? 0.5 : 3.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[500px] h-[500px] bg-gradient-radial from-cyan-500/25 via-blue-600/12 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      
      {/* Secondary warm accent glow */}
      <motion.div
        animate={{
          opacity: isSpeaking ? [0.25, 0.45, 0.25] : [0.08, 0.12, 0.08],
          scale: isSpeaking ? [0.85, 1.02, 0.85] : [1, 1.015, 1],
        }}
        transition={{ 
          duration: isSpeaking ? 0.45 : 4.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[350px] h-[350px] bg-gradient-radial from-wine/18 via-gold/8 to-transparent rounded-full blur-2xl pointer-events-none"
      />
      
      {/* Three.js canvas container */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full h-full cursor-pointer"
      />
      
      {/* State indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{
            boxShadow: isSpeaking 
              ? ['0 0 20px rgba(139,21,56,0.35)', '0 0 35px rgba(139,21,56,0.55)', '0 0 20px rgba(139,21,56,0.35)']
              : isListening
              ? ['0 0 15px rgba(6,182,212,0.25)', '0 0 28px rgba(6,182,212,0.45)', '0 0 15px rgba(6,182,212,0.25)']
              : '0 0 10px rgba(6,182,212,0.15)'
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="px-5 py-2 rounded-full bg-background/75 backdrop-blur-md border border-cyan-500/25 flex items-center gap-2"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.25, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-2 h-2 rounded-full ${
              isSpeaking ? 'bg-wine' : isListening ? 'bg-cyan-400' : isThinking ? 'bg-blue-400' : 'bg-cyan-500/50'
            }`}
          />
          <span className="text-sm font-medium text-foreground/75">{getStateLabel()}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIOrb;
