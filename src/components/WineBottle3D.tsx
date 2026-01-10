import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WineBottle3DProps {
  isSpeaking?: boolean;
}

const WineBottle3D = ({ isSpeaking = false }: WineBottle3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    bottle: THREE.Group;
    liquid: THREE.Mesh;
    particles: THREE.Points;
    glowRing: THREE.Mesh;
    animationId: number;
    mouseX: number;
    mouseY: number;
    targetRotationX: number;
    targetRotationY: number;
    isSpeaking: boolean;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x8b3a62, 0.8);
    rimLight.position.set(-5, 0, -3);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xffd700, 0.5, 10);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // Create wine bottle group
    const bottle = new THREE.Group();

    // Bottle body - main cylinder with curves
    const bottleBodyGeometry = new THREE.CylinderGeometry(0.45, 0.5, 2.2, 32, 1, true);
    const bottleGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a4a2a,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
      envMapIntensity: 1,
    });
    const bottleBody = new THREE.Mesh(bottleBodyGeometry, bottleGlassMaterial);
    bottleBody.position.y = -0.3;
    bottle.add(bottleBody);

    // Bottle shoulder - tapered section
    const shoulderGeometry = new THREE.CylinderGeometry(0.2, 0.45, 0.5, 32);
    const shoulder = new THREE.Mesh(shoulderGeometry, bottleGlassMaterial);
    shoulder.position.y = 0.95;
    bottle.add(shoulder);

    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1, 32);
    const neck = new THREE.Mesh(neckGeometry, bottleGlassMaterial);
    neck.position.y = 1.7;
    bottle.add(neck);

    // Cork/cap
    const corkGeometry = new THREE.CylinderGeometry(0.13, 0.15, 0.25, 32);
    const corkMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4a35a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const cork = new THREE.Mesh(corkGeometry, corkMaterial);
    cork.position.y = 2.3;
    bottle.add(cork);

    // Wine liquid inside bottle
    const liquidGeometry = new THREE.CylinderGeometry(0.42, 0.47, 1.8, 32);
    const liquidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x722f37) },
        color2: { value: new THREE.Color(0x4a1c24) },
        isSpeaking: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform float isSpeaking;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Subtle wave effect when speaking
          vec3 pos = position;
          float wave = sin(pos.y * 4.0 + time * 2.0) * 0.02 * isSpeaking;
          pos.x += wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float time;
        uniform float isSpeaking;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Gradient from bottom to top
          vec3 color = mix(color2, color1, vUv.y);
          
          // Add subtle shimmer
          float shimmer = sin(vUv.y * 20.0 + time * 3.0) * 0.05 + 0.95;
          color *= shimmer;
          
          // Pulsing glow when speaking
          float pulse = sin(time * 4.0) * 0.15 * isSpeaking;
          color += vec3(0.3, 0.1, 0.1) * pulse;
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = -0.45;
    bottle.add(liquid);

    // Label - elegant wine label
    const labelGeometry = new THREE.PlaneGeometry(0.7, 0.9);
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 320;
    const ctx = labelCanvas.getContext('2d')!;
    
    // Label background
    ctx.fillStyle = '#f5f0e6';
    ctx.fillRect(0, 0, 256, 320);
    
    // Elegant border
    ctx.strokeStyle = '#8b3a62';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 236, 300);
    ctx.strokeRect(16, 16, 224, 288);
    
    // Label text
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'italic 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('VINORIA', 128, 80);
    
    ctx.font = '14px serif';
    ctx.fillStyle = '#4a4a4a';
    ctx.fillText('AI SOMMELIER', 128, 110);
    
    // Decorative line
    ctx.strokeStyle = '#c4a35a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(206, 130);
    ctx.stroke();
    
    // Year
    ctx.font = 'bold 28px serif';
    ctx.fillStyle = '#8b3a62';
    ctx.fillText('2024', 128, 180);
    
    // Wine type
    ctx.font = '12px serif';
    ctx.fillStyle = '#666';
    ctx.fillText('CABERNET SAUVIGNON', 128, 220);
    ctx.fillText('NAPA VALLEY', 128, 240);
    
    // Bottom decoration
    ctx.beginPath();
    ctx.moveTo(80, 270);
    ctx.lineTo(176, 270);
    ctx.stroke();
    
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0.46, -0.2, 0);
    label.rotation.y = Math.PI / 2;
    // Slight curve to wrap around bottle
    bottle.add(label);

    // Back label
    const backLabel = label.clone();
    backLabel.position.set(-0.46, -0.2, 0);
    backLabel.rotation.y = -Math.PI / 2;
    bottle.add(backLabel);

    // Bottle bottom
    const bottomGeometry = new THREE.CircleGeometry(0.48, 32);
    const bottomMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a4a2a,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.rotation.x = Math.PI / 2;
    bottom.position.y = -1.4;
    bottle.add(bottom);

    bottle.position.y = -0.3;
    scene.add(bottle);

    // Floating particles around bottle
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Wine-colored particles
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        // Wine red
        particleColors[i * 3] = 0.54;
        particleColors[i * 3 + 1] = 0.18;
        particleColors[i * 3 + 2] = 0.24;
      } else {
        // Gold
        particleColors[i * 3] = 0.77;
        particleColors[i * 3 + 1] = 0.64;
        particleColors[i * 3 + 2] = 0.35;
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Glow ring at base
    const glowRingGeometry = new THREE.RingGeometry(0.6, 1.2, 64);
    const glowRingMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isSpeaking: { value: 0 },
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
        uniform float isSpeaking;
        varying vec2 vUv;
        
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float alpha = (1.0 - dist) * 0.4;
          
          // Pulsing effect
          float pulse = sin(time * 3.0) * 0.2 + 0.8;
          alpha *= pulse;
          
          // Stronger when speaking
          alpha *= (1.0 + isSpeaking * 0.5);
          
          // Wine color glow
          vec3 color = vec3(0.54, 0.18, 0.24);
          
          // Add some gold accent
          float goldMix = sin(time * 2.0 + vUv.x * 6.28) * 0.5 + 0.5;
          color = mix(color, vec3(0.77, 0.64, 0.35), goldMix * 0.3);
          
          gl_FragColor = vec4(color, alpha * 0.6);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const glowRing = new THREE.Mesh(glowRingGeometry, glowRingMaterial);
    glowRing.rotation.x = -Math.PI / 2;
    glowRing.position.y = -1.5;
    scene.add(glowRing);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
      
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      bottle,
      liquid,
      particles,
      glowRing,
      animationId: 0,
      mouseX: 0,
      mouseY: 0,
      targetRotationX: 0,
      targetRotationY: 0,
      isSpeaking: false,
    };

    // Animation
    let time = 0;
    const animate = () => {
      if (!sceneRef.current) return;
      
      time += 0.01;
      const { bottle, liquid, particles, glowRing, isSpeaking } = sceneRef.current;

      // Update liquid shader
      (liquid.material as THREE.ShaderMaterial).uniforms.time.value = time;
      (liquid.material as THREE.ShaderMaterial).uniforms.isSpeaking.value = isSpeaking ? 1.0 : 0.0;

      // Update glow ring
      (glowRing.material as THREE.ShaderMaterial).uniforms.time.value = time;
      (glowRing.material as THREE.ShaderMaterial).uniforms.isSpeaking.value = isSpeaking ? 1.0 : 0.0;

      // Smooth rotation following mouse
      bottle.rotation.y += (targetRotationY - bottle.rotation.y) * 0.05;
      bottle.rotation.x += (targetRotationX - bottle.rotation.x) * 0.05;

      // Subtle idle rotation
      bottle.rotation.y += Math.sin(time * 0.5) * 0.002;

      // Gentle bobbing motion
      bottle.position.y = -0.3 + Math.sin(time * 0.8) * 0.05;

      // Animate particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.005;
        if (positions[i + 1] > 2) positions[i + 1] = -2;
        
        // Slight horizontal drift
        positions[i] += Math.sin(time + i) * 0.001;
        positions[i + 2] += Math.cos(time + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Rotate particles slowly
      particles.rotation.y += 0.002;

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = newWidth / newHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        container.removeChild(sceneRef.current.renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, []);

  // Update speaking state
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.isSpeaking = isSpeaking;
    }
  }, [isSpeaking]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ cursor: 'grab' }}
    />
  );
};

export default WineBottle3D;
