import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface AIOrbProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  isThinking?: boolean;
}

const AIOrb = ({ isSpeaking = false, isListening = false, isThinking = false }: AIOrbProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef({ isSpeaking, isListening, isThinking });

  // Update state ref
  useEffect(() => {
    stateRef.current = { isSpeaking, isListening, isThinking };
  }, [isSpeaking, isListening, isThinking]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene with subtle fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4;
    cameraRef.current = camera;

    // Renderer with high quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Core orb material - volumetric glassy sphere
    const coreOrbMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        thinking: { value: 0 },
        coreColor: { value: new THREE.Color(0x0891b2) }, // Cyan
        accentColor: { value: new THREE.Color(0x06b6d4) }, // Light cyan
        wineAccent: { value: new THREE.Color(0x8b1538) }, // Wine red
        mouseX: { value: 0 },
        mouseY: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform float thinking;
        
        // Noise function for organic distortion
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
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
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
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
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          
          // Idle breathing - slow, calm
          float breathe = sin(time * 0.5) * 0.02;
          pos *= 1.0 + breathe;
          
          // Speaking: confident, rhythmic expansion
          if (speaking > 0.0) {
            float speakWave = sin(time * 6.0) * 0.04 + sin(time * 10.0) * 0.02;
            float speakNoise = snoise(pos * 2.0 + time * 2.0) * 0.03;
            pos += normal * (speakWave + speakNoise) * speaking;
          }
          
          // Listening: subtle reactive pulses
          if (listening > 0.0) {
            float listenPulse = sin(time * 4.0) * 0.025;
            float listenNoise = snoise(pos * 3.0 + time * 3.0) * 0.02;
            pos += normal * (listenPulse + listenNoise) * listening;
          }
          
          // Thinking: complex organic movement
          if (thinking > 0.0) {
            float thinkNoise = snoise(pos * 4.0 + time * 1.5) * 0.04;
            float thinkWave = sin(pos.y * 8.0 + time * 2.0) * 0.015;
            pos += normal * (thinkNoise + thinkWave) * thinking;
          }
          
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
        uniform vec3 coreColor;
        uniform vec3 accentColor;
        uniform vec3 wineAccent;
        uniform float mouseX;
        uniform float mouseY;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        
        void main() {
          // Fresnel effect for volumetric glow
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
          
          // Core glow - brightest at center
          float coreGlow = 1.0 - length(vUv - 0.5) * 1.8;
          coreGlow = pow(max(coreGlow, 0.0), 2.0);
          
          // Internal energy patterns
          float energy1 = sin(vPosition.x * 10.0 + time * 2.0) * 0.5 + 0.5;
          float energy2 = sin(vPosition.y * 12.0 + time * 2.5) * 0.5 + 0.5;
          float energy3 = sin(vPosition.z * 8.0 + time * 1.8) * 0.5 + 0.5;
          float internalEnergy = (energy1 + energy2 + energy3) / 3.0;
          
          // Subtle scan lines
          float scanLine = sin(vPosition.y * 60.0 + time * 3.0) * 0.5 + 0.5;
          scanLine = pow(scanLine, 16.0) * 0.15;
          
          // Moving highlight band
          float highlightBand = 1.0 - abs(sin(time * 0.3) - vUv.y);
          highlightBand = pow(highlightBand, 30.0) * 0.3;
          
          // Base color mixing
          vec3 baseColor = mix(coreColor, accentColor, fresnel * 0.7 + internalEnergy * 0.2);
          
          // Speaking: warm wine accent pulses
          if (speaking > 0.0) {
            float speakPulse = sin(time * 8.0) * 0.5 + 0.5;
            baseColor = mix(baseColor, wineAccent, speaking * speakPulse * 0.25);
          }
          
          // Listening: intensified cyan
          if (listening > 0.0) {
            baseColor = mix(baseColor, accentColor * 1.3, listening * 0.3);
          }
          
          // Thinking: subtle color shift
          if (thinking > 0.0) {
            float thinkShift = sin(time * 1.5) * 0.5 + 0.5;
            baseColor = mix(baseColor, vec3(0.3, 0.5, 0.9), thinking * thinkShift * 0.2);
          }
          
          // Final alpha with volumetric depth
          float alpha = 0.35 + fresnel * 0.55 + coreGlow * 0.25 + scanLine + highlightBand;
          alpha += speaking * 0.15 + listening * 0.1;
          
          // Gentle flicker
          float flicker = 0.95 + sin(time * 25.0) * 0.025 + sin(time * 47.0) * 0.015;
          alpha *= flicker;
          
          gl_FragColor = vec4(baseColor, clamp(alpha, 0.0, 0.95));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Main core orb
    const coreGeometry = new THREE.SphereGeometry(1, 128, 128);
    const coreOrb = new THREE.Mesh(coreGeometry, coreOrbMaterial);
    scene.add(coreOrb);

    // Inner glow sphere
    const innerGlowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        color: { value: new THREE.Color(0x06b6d4) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float speaking;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 4.0);
          float pulse = 0.5 + sin(time * 2.0) * 0.2 + speaking * 0.3;
          gl_FragColor = vec4(color * 1.5, fresnel * pulse * 0.4);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const innerGlow = new THREE.Mesh(new THREE.SphereGeometry(0.85, 64, 64), innerGlowMaterial);
    scene.add(innerGlow);

    // Outer atmosphere glow
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        color: { value: new THREE.Color(0x0891b2) },
      },
      vertexShader: `
        varying vec3 vNormal;
        uniform float time;
        uniform float speaking;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec3 pos = position;
          float breathe = sin(time * 0.5) * 0.03 + speaking * sin(time * 6.0) * 0.04;
          pos *= 1.0 + breathe;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float speaking;
        uniform float listening;
        uniform vec3 color;
        varying vec3 vNormal;
        
        void main() {
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
          float pulse = 0.6 + sin(time * 1.5) * 0.15 + speaking * 0.25 + listening * 0.15;
          gl_FragColor = vec4(color, fresnel * pulse * 0.25);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.3, 64, 64), atmosphereMaterial);
    scene.add(atmosphere);

    // Orbital rings
    const createOrbitalRing = (radius: number, rotationSpeed: number, thickness: number, yOffset: number) => {
      const ringMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speaking: { value: 0 },
          listening: { value: 0 },
          color: { value: new THREE.Color(0x06b6d4) },
        },
        vertexShader: `
          varying float vAngle;
          uniform float time;
          void main() {
            vAngle = atan(position.x, position.z);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float speaking;
          uniform float listening;
          uniform vec3 color;
          varying float vAngle;
          
          void main() {
            float segments = 12.0;
            float segment = sin(vAngle * segments + time * 3.0) * 0.5 + 0.5;
            segment = pow(segment, 2.0);
            
            float alpha = 0.15 + segment * 0.3 + speaking * 0.2 + listening * 0.15;
            alpha *= 0.5 + sin(time * 2.0) * 0.2;
            
            gl_FragColor = vec4(color, alpha);
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
      ring.position.y = yOffset;
      ring.rotation.x = Math.PI / 2 + Math.random() * 0.3 - 0.15;
      ring.userData = { rotationSpeed };
      return ring;
    };

    const rings = [
      createOrbitalRing(1.5, 0.3, 0.008, 0),
      createOrbitalRing(1.65, -0.2, 0.006, 0.1),
      createOrbitalRing(1.8, 0.15, 0.004, -0.05),
    ];
    rings.forEach(ring => scene.add(ring));

    // Data particles orbiting the sphere
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.2 + Math.random() * 0.8;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particleGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speaking: { value: 0 },
        listening: { value: 0 },
        color: { value: new THREE.Color(0x22d3ee) },
        wineColor: { value: new THREE.Color(0xd4af37) },
      },
      vertexShader: `
        attribute float phase;
        varying float vAlpha;
        varying float vPhase;
        uniform float time;
        uniform float speaking;
        uniform float listening;
        
        void main() {
          vPhase = phase;
          
          vec3 pos = position;
          float orbit = time * 0.3 + phase;
          
          // Orbital motion
          float radius = length(pos.xz);
          float angle = atan(pos.z, pos.x) + orbit;
          pos.x = cos(angle) * radius;
          pos.z = sin(angle) * radius;
          
          // Vertical oscillation
          pos.y += sin(time * 2.0 + phase * 3.0) * 0.1;
          
          // Expand when active
          float expansion = 1.0 + speaking * 0.15 + listening * 0.1;
          pos *= expansion;
          
          vAlpha = 0.4 + sin(time * 3.0 + phase) * 0.3;
          vAlpha += speaking * 0.2 + listening * 0.15;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (3.5 + speaking * 1.5) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 wineColor;
        uniform float speaking;
        varying float vAlpha;
        varying float vPhase;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float glow = 1.0 - dist * 2.0;
          glow = pow(glow, 1.5);
          
          vec3 finalColor = mix(color, wineColor, speaking * sin(vPhase) * 0.5);
          gl_FragColor = vec4(finalColor, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Subtle ripple rings (touch/click response placeholder)
    const rippleRings: THREE.Mesh[] = [];

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    
    const handleClick = () => {
      // Create ripple effect on click
      const rippleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          maxTime: { value: 1.5 },
          color: { value: new THREE.Color(0x22d3ee) },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          uniform float maxTime;
          void main() {
            vUv = uv;
            float progress = time / maxTime;
            float scale = 1.0 + progress * 0.8;
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
            float alpha = (1.0 - progress) * 0.4;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const ripple = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.02, 8, 64),
        rippleMaterial
      );
      ripple.rotation.x = Math.PI / 2;
      ripple.userData = { startTime: performance.now() * 0.001 };
      scene.add(ripple);
      rippleRings.push(ripple);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const time = performance.now() * 0.001;
      const { isSpeaking, isListening, isThinking } = stateRef.current;
      
      // Smooth state transitions
      const speakingTarget = isSpeaking ? 1.0 : 0.0;
      const listeningTarget = isListening ? 1.0 : 0.0;
      const thinkingTarget = isThinking ? 1.0 : 0.0;

      // Update core orb
      const coreUniforms = coreOrbMaterial.uniforms;
      coreUniforms.time.value = time;
      coreUniforms.speaking.value += (speakingTarget - coreUniforms.speaking.value) * 0.1;
      coreUniforms.listening.value += (listeningTarget - coreUniforms.listening.value) * 0.1;
      coreUniforms.thinking.value += (thinkingTarget - coreUniforms.thinking.value) * 0.1;
      coreUniforms.mouseX.value += (mouseRef.current.x - coreUniforms.mouseX.value) * 0.05;
      coreUniforms.mouseY.value += (mouseRef.current.y - coreUniforms.mouseY.value) * 0.05;

      // Subtle orb rotation following mouse
      coreOrb.rotation.y += (mouseRef.current.x * 0.1 - coreOrb.rotation.y) * 0.02;
      coreOrb.rotation.x += (mouseRef.current.y * 0.05 - coreOrb.rotation.x) * 0.02;

      // Update inner glow
      innerGlowMaterial.uniforms.time.value = time;
      innerGlowMaterial.uniforms.speaking.value = coreUniforms.speaking.value;

      // Update atmosphere
      atmosphereMaterial.uniforms.time.value = time;
      atmosphereMaterial.uniforms.speaking.value = coreUniforms.speaking.value;
      atmosphereMaterial.uniforms.listening.value = coreUniforms.listening.value;

      // Animate orbital rings
      rings.forEach((ring) => {
        const mat = ring.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = time;
        mat.uniforms.speaking.value = coreUniforms.speaking.value;
        mat.uniforms.listening.value = coreUniforms.listening.value;
        ring.rotation.z += ring.userData.rotationSpeed * 0.01;
      });

      // Update particles
      particleMaterial.uniforms.time.value = time;
      particleMaterial.uniforms.speaking.value = coreUniforms.speaking.value;
      particleMaterial.uniforms.listening.value = coreUniforms.listening.value;

      // Update ripples
      for (let i = rippleRings.length - 1; i >= 0; i--) {
        const ripple = rippleRings[i];
        const mat = ripple.material as THREE.ShaderMaterial;
        const elapsed = time - ripple.userData.startTime;
        mat.uniforms.time.value = elapsed;
        
        if (elapsed > mat.uniforms.maxTime.value) {
          scene.remove(ripple);
          ripple.geometry.dispose();
          mat.dispose();
          rippleRings.splice(i, 1);
        }
      }

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
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  // Get state label
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
          opacity: isSpeaking ? [0.5, 0.7, 0.5] : isListening ? [0.4, 0.55, 0.4] : [0.25, 0.35, 0.25],
          scale: isSpeaking ? [1, 1.1, 1] : isListening ? [1, 1.05, 1] : [1, 1.02, 1]
        }}
        transition={{ 
          duration: isSpeaking ? 0.4 : isListening ? 0.6 : 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[500px] h-[500px] bg-gradient-radial from-cyan-500/30 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      
      {/* Secondary warm accent glow */}
      <motion.div
        animate={{
          opacity: isSpeaking ? [0.3, 0.5, 0.3] : [0.1, 0.15, 0.1],
          scale: isSpeaking ? [0.9, 1.05, 0.9] : [1, 1.02, 1],
        }}
        transition={{ 
          duration: isSpeaking ? 0.5 : 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[350px] h-[350px] bg-gradient-radial from-wine/20 via-gold/10 to-transparent rounded-full blur-2xl pointer-events-none"
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{
            boxShadow: isSpeaking 
              ? ['0 0 20px rgba(139,21,56,0.4)', '0 0 40px rgba(139,21,56,0.6)', '0 0 20px rgba(139,21,56,0.4)']
              : isListening
              ? ['0 0 15px rgba(6,182,212,0.3)', '0 0 30px rgba(6,182,212,0.5)', '0 0 15px rgba(6,182,212,0.3)']
              : '0 0 10px rgba(6,182,212,0.2)'
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="px-5 py-2 rounded-full bg-background/80 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${
              isSpeaking ? 'bg-wine' : isListening ? 'bg-cyan-400' : isThinking ? 'bg-blue-400' : 'bg-cyan-500/60'
            }`}
          />
          <span className="text-sm font-medium text-foreground/80">{getStateLabel()}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIOrb;