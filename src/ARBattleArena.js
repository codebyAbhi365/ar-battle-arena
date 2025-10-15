import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Generic 3D Model component
function Model({ path, position = [0, 0, 0], scale = 0.5, rotate = false }) {
  const gltf = useGLTF(path);
  const ref = useRef();

  useFrame(() => {
    if (rotate && ref.current) {
      ref.current.rotation.y += 0.01; // slow rotation
    }
  });

  return <primitive object={gltf.scene} ref={ref} position={position} scale={[scale, scale, scale]} />;
}

// Main Scene
export default function ARBattleArena() {
  const [selectedModel, setSelectedModel] = useState('arena');

  const renderModel = () => {
    switch (selectedModel) {
      case 'arena':
        return <Model path="/models/arena.glb" scale={1} rotate={true} />;
      case 'player':
        return <Model path="/models/car_player.glb" scale={1.5} rotate={true} />;
      case 'enemy':
        return <Model path="/models/car_enemy.glb" scale={1.5} rotate={true} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Buttons to select model */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <button onClick={() => setSelectedModel('arena')}>View Arena</button>
        <button onClick={() => setSelectedModel('player')}>View Player Car</button>
        <button onClick={() => setSelectedModel('enemy')}>View Enemy Car</button>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Suspense fallback={null}>{renderModel()}</Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
