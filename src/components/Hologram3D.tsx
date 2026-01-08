import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Hologram human figure
const HologramFigure = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  // Shader material for hologram effect
  const hologramMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#22d3ee") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float scanLine = sin(vPosition.y * 30.0 + time * 2.0) * 0.5 + 0.5;
          float flicker = sin(time * 10.0) * 0.05 + 0.95;
          float edge = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 0.5);
          float alpha = (0.3 + scanLine * 0.2) * edge * flicker;
          
          vec3 finalColor = color + vec3(0.1, 0.2, 0.3) * scanLine;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    hologramMaterial.uniforms.time.value = state.clock.elapsedTime;
    
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime) * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 2.2, 0]} material={hologramMaterial}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.8, 0]} material={hologramMaterial}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 1.2, 0]} material={hologramMaterial}>
        <cylinderGeometry args={[0.25, 0.4, 1.0, 16]} />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[0, 1.6, 0]} material={hologramMaterial}>
        <boxGeometry args={[0.9, 0.15, 0.25]} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.55, 1.1, 0]} rotation={[0, 0, 0.2]} material={hologramMaterial}>
        <cylinderGeometry args={[0.08, 0.06, 0.8, 12]} />
      </mesh>
      
      {/* Right Arm - pointing/gesturing */}
      <mesh position={[0.5, 1.2, 0.3]} rotation={[0.5, 0, -0.3]} material={hologramMaterial}>
        <cylinderGeometry args={[0.08, 0.06, 0.7, 12]} />
      </mesh>
      
      {/* Lower body fade */}
      <mesh position={[0, 0.4, 0]} material={hologramMaterial}>
        <cylinderGeometry args={[0.35, 0.15, 1.2, 16]} />
      </mesh>

      {/* Scanning line */}
      <mesh ref={scanLineRef} position={[0, 1, 0]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
      </mesh>
      
      {/* Data rings */}
      <DataRing radius={0.6} y={2.5} speed={1} />
      <DataRing radius={0.8} y={1.8} speed={-0.7} />
      <DataRing radius={0.5} y={1.0} speed={0.5} />
    </group>
  );
};

// Animated data ring
const DataRing = ({ radius, y, speed }: { radius: number; y: number; speed: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * speed;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 64]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
    </mesh>
  );
};

// Floating particles
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 5 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// Base platform glow
const Platform = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.15, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Hologram3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.3} />
        
        <HologramFigure />
        <Particles />
        <Platform />
      </Canvas>
    </div>
  );
};

export default Hologram3D;
