import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const Hologram3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = 400;
    const height = 500;

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

    // Hologram material
    const hologramMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x22d3ee) },
        glowColor: { value: new THREE.Color(0xa855f7) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          // Subtle wave distortion
          pos.x += sin(position.y * 3.0 + time * 2.0) * 0.02;
          pos.z += cos(position.y * 2.0 + time * 1.5) * 0.02;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform vec3 glowColor;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Scan lines
          float scanLine = sin(vPosition.y * 30.0 + time * 5.0) * 0.5 + 0.5;
          scanLine = pow(scanLine, 8.0) * 0.3;
          
          // Moving scan band
          float scanBand = 1.0 - abs(sin(time * 0.5) - vUv.y);
          scanBand = pow(scanBand, 20.0) * 0.5;
          
          // Edge glow (fresnel effect)
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = 1.0 - abs(dot(viewDir, vNormal));
          fresnel = pow(fresnel, 2.0);
          
          // Flicker effect
          float flicker = 0.9 + sin(time * 15.0) * 0.05 + sin(time * 23.0) * 0.03;
          
          // Combine colors
          vec3 baseColor = mix(color, glowColor, fresnel * 0.5);
          float alpha = (0.4 + fresnel * 0.4 + scanLine + scanBand) * flicker;
          
          // Fade at bottom
          alpha *= smoothstep(0.0, 0.3, vUv.y);
          
          gl_FragColor = vec4(baseColor, alpha);
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

    // Lower body (fading)
    const lowerGeometry = new THREE.ConeGeometry(0.25, 0.8, 16, 1, true);
    const lowerMaterial = hologramMaterial.clone();
    const lower = new THREE.Mesh(lowerGeometry, lowerMaterial);
    lower.position.y = 0.1;
    lower.rotation.x = Math.PI;
    figure.add(lower);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.6, 8);
    
    const leftArm = new THREE.Mesh(armGeometry, hologramMaterial);
    leftArm.position.set(-0.45, 0.9, 0);
    leftArm.rotation.z = 0.3;
    figure.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, hologramMaterial);
    rightArm.position.set(0.45, 0.85, 0);
    rightArm.rotation.z = -0.4;
    figure.add(rightArm);

    scene.add(figure);

    // Data rings
    const ringMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xa855f7) },
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
        varying vec2 vUv;
        void main() {
          float alpha = 0.5 + sin(vUv.x * 20.0 + time * 3.0) * 0.3;
          gl_FragColor = vec4(color, alpha * 0.6);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const rings: THREE.Mesh[] = [];
    const ringPositions = [1.9, 1.0, 0.3];
    const ringSizes = [0.5, 0.65, 0.45];

    ringPositions.forEach((y, i) => {
      const ringGeometry = new THREE.TorusGeometry(ringSizes[i], 0.02, 8, 64);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone());
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      rings.push(ring);
    });

    // Base platform
    const baseGeometry = new THREE.TorusGeometry(0.8, 0.03, 8, 64);
    const baseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x22d3ee) },
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
        varying vec2 vUv;
        void main() {
          float pulse = 0.7 + sin(time * 2.0) * 0.3;
          gl_FragColor = vec4(color, pulse * 0.8);
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
    const outerGeometry = new THREE.TorusGeometry(1.0, 0.02, 8, 64);
    const outer = new THREE.Mesh(outerGeometry, ringMaterial.clone());
    outer.position.y = -0.3;
    outer.rotation.x = Math.PI / 2;
    scene.add(outer);

    // Floating particles
    const particleCount = 50;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.0;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.random() * 2.5 - 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const time = performance.now() * 0.001;

      // Update shader uniforms
      (hologramMaterial.uniforms.time as THREE.IUniform).value = time;
      (baseMaterial.uniforms.time as THREE.IUniform).value = time;
      
      rings.forEach((ring, i) => {
        const mat = ring.material as THREE.ShaderMaterial;
        (mat.uniforms.time as THREE.IUniform).value = time;
        ring.rotation.z = time * (i % 2 === 0 ? 0.3 : -0.2);
      });

      // Rotate figure slowly
      figure.rotation.y = Math.sin(time * 0.3) * 0.2;

      // Animate particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.005;
        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = -0.5;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      
      // Dispose geometries and materials
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
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
      />
      
      {/* Three.js container */}
      <div 
        ref={containerRef}
        className="relative z-10"
      />
      
      {/* Additional glow effects */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"
      />
    </div>
  );
};

export default Hologram3D;
