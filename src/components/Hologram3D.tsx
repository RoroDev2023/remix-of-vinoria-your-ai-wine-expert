import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface Hologram3DProps {
  isSpeaking?: boolean;
}

const Hologram3D = ({ isSpeaking = false }: Hologram3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isSpeakingRef = useRef(isSpeaking);

  // Update speaking ref
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 0.5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Hologram material with dynamic glow
    const hologramMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x8b1538) },
        glowColor: { value: new THREE.Color(0xd4af37) },
        speaking: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform float speaking;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          // Wave distortion - more when speaking
          float waveIntensity = 0.02 + speaking * 0.02;
          pos.x += sin(position.y * 3.0 + time * 2.0) * waveIntensity;
          pos.z += cos(position.y * 2.0 + time * 1.5) * waveIntensity;
          
          // Speaking pulse
          if (speaking > 0.0) {
            float pulse = sin(time * 8.0) * 0.02 * speaking;
            pos.x *= 1.0 + pulse;
            pos.z *= 1.0 + pulse;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform vec3 glowColor;
        uniform float speaking;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Scan lines
          float scanLine = sin(vPosition.y * 40.0 + time * 5.0) * 0.5 + 0.5;
          scanLine = pow(scanLine, 8.0) * 0.25;
          
          // Moving scan band
          float scanBand = 1.0 - abs(sin(time * 0.5) - vUv.y);
          scanBand = pow(scanBand, 15.0) * 0.4;
          
          // Edge glow (fresnel effect)
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = 1.0 - abs(dot(viewDir, vNormal));
          fresnel = pow(fresnel, 2.0);
          
          // Flicker effect
          float flicker = 0.92 + sin(time * 20.0) * 0.04 + sin(time * 31.0) * 0.02;
          
          // Speaking glow boost
          float glowBoost = 1.0 + speaking * 0.5 * (0.5 + sin(time * 10.0) * 0.5);
          
          // Combine colors
          vec3 baseColor = mix(color, glowColor, fresnel * 0.6 + speaking * 0.2);
          float alpha = (0.35 + fresnel * 0.45 + scanLine + scanBand) * flicker * glowBoost;
          
          // Fade at bottom
          alpha *= smoothstep(0.0, 0.25, vUv.y);
          
          gl_FragColor = vec4(baseColor, clamp(alpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Create human figure group
    const figure = new THREE.Group();

    // Head
    const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const head = new THREE.Mesh(headGeometry, hologramMaterial);
    head.position.y = 1.8;
    figure.add(head);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.2, 16);
    const neck = new THREE.Mesh(neckGeometry, hologramMaterial);
    neck.position.y = 1.35;
    figure.add(neck);

    // Torso
    const torsoGeometry = new THREE.CylinderGeometry(0.35, 0.25, 1.0, 16);
    const torso = new THREE.Mesh(torsoGeometry, hologramMaterial);
    torso.position.y = 0.75;
    figure.add(torso);

    // Shoulders
    const shoulderGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeometry, hologramMaterial);
    leftShoulder.position.set(-0.4, 1.15, 0);
    figure.add(leftShoulder);
    
    const rightShoulder = new THREE.Mesh(shoulderGeometry, hologramMaterial);
    rightShoulder.position.set(0.4, 1.15, 0);
    figure.add(rightShoulder);

    // Lower body (fading)
    const lowerGeometry = new THREE.ConeGeometry(0.25, 0.8, 16, 1, true);
    const lowerMaterial = hologramMaterial.clone();
    const lower = new THREE.Mesh(lowerGeometry, lowerMaterial);
    lower.position.y = 0.1;
    lower.rotation.x = Math.PI;
    figure.add(lower);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.55, 8);
    
    const leftArm = new THREE.Mesh(armGeometry, hologramMaterial);
    leftArm.position.set(-0.5, 0.85, 0);
    leftArm.rotation.z = 0.25;
    figure.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, hologramMaterial);
    rightArm.position.set(0.5, 0.8, 0);
    rightArm.rotation.z = -0.35;
    figure.add(rightArm);

    // Forearms (gesture position)
    const forearmGeometry = new THREE.CylinderGeometry(0.05, 0.06, 0.45, 8);
    
    const leftForearm = new THREE.Mesh(forearmGeometry, hologramMaterial);
    leftForearm.position.set(-0.55, 0.45, 0.15);
    leftForearm.rotation.z = 0.1;
    leftForearm.rotation.x = -0.3;
    figure.add(leftForearm);

    const rightForearm = new THREE.Mesh(forearmGeometry, hologramMaterial);
    rightForearm.position.set(0.55, 0.4, 0.2);
    rightForearm.rotation.z = -0.15;
    rightForearm.rotation.x = -0.4;
    figure.add(rightForearm);

    scene.add(figure);

    // Data rings with wine color
    const ringMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xd4af37) },
        speaking: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float speaking;
        varying vec2 vUv;
        void main() {
          float alpha = 0.4 + sin(vUv.x * 25.0 + time * 4.0) * 0.25;
          alpha *= (1.0 + speaking * 0.5);
          gl_FragColor = vec4(color, alpha * 0.5);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const rings: THREE.Mesh[] = [];
    const ringPositions = [1.9, 1.0, 0.3];
    const ringSizes = [0.55, 0.7, 0.5];

    ringPositions.forEach((y, i) => {
      const ringGeometry = new THREE.TorusGeometry(ringSizes[i], 0.015, 8, 64);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone());
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      rings.push(ring);
    });

    // Base platform
    const baseGeometry = new THREE.TorusGeometry(0.9, 0.025, 8, 64);
    const baseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x8b1538) },
        speaking: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float speaking;
        varying vec2 vUv;
        void main() {
          float pulse = 0.6 + sin(time * 2.0) * 0.25;
          pulse *= (1.0 + speaking * 0.4);
          gl_FragColor = vec4(color, pulse);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.3;
    base.rotation.x = Math.PI / 2;
    scene.add(base);

    // Outer ring
    const outerGeometry = new THREE.TorusGeometry(1.1, 0.015, 8, 64);
    const outer = new THREE.Mesh(outerGeometry, ringMaterial.clone());
    outer.position.y = -0.3;
    outer.rotation.x = Math.PI / 2;
    scene.add(outer);

    // Floating particles
    const particleCount = 60;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 1.2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.random() * 2.8 - 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    
    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const time = performance.now() * 0.001;
      const speaking = isSpeakingRef.current ? 1.0 : 0.0;

      // Update shader uniforms
      (hologramMaterial.uniforms.time as THREE.IUniform).value = time;
      (hologramMaterial.uniforms.speaking as THREE.IUniform).value = speaking;
      (baseMaterial.uniforms.time as THREE.IUniform).value = time;
      (baseMaterial.uniforms.speaking as THREE.IUniform).value = speaking;
      
      rings.forEach((ring, i) => {
        const mat = ring.material as THREE.ShaderMaterial;
        (mat.uniforms.time as THREE.IUniform).value = time;
        (mat.uniforms.speaking as THREE.IUniform).value = speaking;
        ring.rotation.z = time * (i % 2 === 0 ? 0.4 : -0.25);
      });

      // Figure follows mouse subtly + idle motion
      const targetRotationY = mouseRef.current.x * 0.3 + Math.sin(time * 0.3) * 0.15;
      const targetRotationX = mouseRef.current.y * 0.1;
      figure.rotation.y += (targetRotationY - figure.rotation.y) * 0.05;
      figure.rotation.x += (targetRotationX - figure.rotation.x) * 0.05;

      // Animate particles
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] += speaking ? 0.012 : 0.006;
        if (particlePositions[i * 3 + 1] > 2.8) {
          particlePositions[i * 3 + 1] = -0.5;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth || 400;
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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow backdrop */}
      <motion.div
        animate={{ 
          opacity: isSpeaking ? [0.4, 0.6, 0.4] : [0.2, 0.35, 0.2],
          scale: isSpeaking ? [1, 1.08, 1] : [1, 1.03, 1]
        }}
        transition={{ duration: isSpeaking ? 0.6 : 3, repeat: Infinity }}
        className="absolute w-72 h-72 bg-primary/25 rounded-full blur-3xl"
      />
      
      {/* Three.js container */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full h-full"
      />
      
      {/* Secondary glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute w-56 h-56 bg-gold/15 rounded-full blur-2xl"
      />
    </div>
  );
};

export default Hologram3D;