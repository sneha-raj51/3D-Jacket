import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { JacketModel } from './JacketModel';
import { Pedestal } from './Pedestal';
import { StudioLighting } from './StudioLighting';

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'chest' | 'backText' | 'reset';

interface SceneProps {
  autoRotate: boolean;
  currentPreset: CameraPreset;
  onUserDragStart?: () => void;
}

// Rotator component that handles Y-axis jacket rotation and smooth preset transitions
const RotatableJacketGroup: React.FC<{
  autoRotate: boolean;
  currentPreset: CameraPreset;
  dragDeltaY: number;
}> = ({ autoRotate, currentPreset, dragDeltaY }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetAngleRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const prevPresetRef = useRef<CameraPreset>(currentPreset);

  // Set target angle whenever preset changes
  useEffect(() => {
    if (!groupRef.current) return;

    let targetAngle = 0;
    switch (currentPreset) {
      case 'front':
        targetAngle = 0;
        break;
      case 'back':
        targetAngle = Math.PI;
        break;
      case 'left':
        targetAngle = Math.PI / 2;
        break;
      case 'right':
        targetAngle = -Math.PI / 2;
        break;
      case 'chest':
        targetAngle = 0;
        break;
      case 'backText':
        targetAngle = Math.PI;
        break;
      default:
        targetAngle = 0;
        break;
    }

    if (prevPresetRef.current !== currentPreset) {
      prevPresetRef.current = currentPreset;
      // Calculate shortest angular path from current rotation
      const curr = groupRef.current.rotation.y;
      const diff = ((targetAngle - curr + Math.PI) % (Math.PI * 2)) - Math.PI;
      targetAngleRef.current = curr + diff;
      isTransitioningRef.current = true;
    }
  }, [currentPreset]);

  // Apply drag delta
  useEffect(() => {
    if (dragDeltaY !== 0 && groupRef.current) {
      groupRef.current.rotation.y += dragDeltaY;
      targetAngleRef.current = groupRef.current.rotation.y;
      isTransitioningRef.current = false;
    }
  }, [dragDeltaY]);

  // Animation frame loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      // Continuous smooth 360 rotation around Y axis
      groupRef.current.rotation.y += delta * 0.85;
      targetAngleRef.current = groupRef.current.rotation.y;
    } else if (isTransitioningRef.current) {
      // Smoothly lerp towards target angle
      const diff = targetAngleRef.current - groupRef.current.rotation.y;
      if (Math.abs(diff) > 0.002) {
        groupRef.current.rotation.y += diff * Math.min(1, delta * 6.5);
      } else {
        groupRef.current.rotation.y = targetAngleRef.current;
        isTransitioningRef.current = false;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <JacketModel />
    </group>
  );
};

// Smooth Camera Controller for zoom and framing
const CameraPresetController: React.FC<{
  controlsRef: React.RefObject<OrbitControlsType | null>;
  currentPreset: CameraPreset;
}> = ({ controlsRef, currentPreset }) => {
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(0, -0.10, 0);

    switch (currentPreset) {
      case 'front':
      case 'back':
      case 'left':
      case 'right':
      case 'reset':
        // Centered framing showing entire jacket and pedestal
        targetPos.set(0, -0.05, 3.8);
        targetLookAt.set(0, -0.10, 0);
        break;
      case 'chest':
        // Zoom into "KJ" chest patch
        targetPos.set(0.34, 0.28, 1.25);
        targetLookAt.set(0.31, 0.28, 0.435);
        break;
      case 'backText':
        // Zoom into arched "KABIR" lettering (jacket rotates 180° to face camera)
        targetPos.set(0, 0.38, 1.45);
        targetLookAt.set(0, 0.38, 0.38);
        break;
    }

    const camera = controls.object;
    if (!camera) return;

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const startTime = performance.now();
    const duration = 700;

    let animId: number;
    const animateCamera = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, targetPos, ease);
      controls.target.lerpVectors(startTarget, targetLookAt, ease);
      controls.update();

      if (progress < 1) {
        animId = requestAnimationFrame(animateCamera);
      }
    };

    animId = requestAnimationFrame(animateCamera);
    return () => cancelAnimationFrame(animId);
  }, [currentPreset, controlsRef]);

  return null;
};

export const Scene: React.FC<SceneProps> = ({
  autoRotate,
  currentPreset,
  onUserDragStart
}) => {
  const controlsRef = useRef<OrbitControlsType>(null);
  const [dragDeltaY, setDragDeltaY] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);

  // Pointer drag event handlers for direct jacket rotation
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    if (onUserDragStart) onUserDragStart();
  }, [onUserDragStart]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    // Map horizontal drag to jacket Y rotation
    setDragDeltaY(deltaX * 0.0075);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setDragDeltaY(0);
  }, []);

  return (
    <div
      className="w-full h-full relative select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12
        }}
        camera={{ position: [0, -0.05, 3.8], fov: 38 }}
      >
        {/* Studio Lighting */}
        <StudioLighting />

        {/* Orbit Controls (Zoom enabled, camera stable on orbit) */}
        <OrbitControls
          ref={controlsRef}
          enableRotate={false}
          enableZoom={true}
          enablePan={false}
          minDistance={1.1}
          maxDistance={5.5}
          target={[0, -0.10, 0]}
        />

        {/* Smooth Camera Positioning */}
        <CameraPresetController
          controlsRef={controlsRef}
          currentPreset={currentPreset}
        />

        {/* Rotatable 3D Jacket Model (rotates on its Y-axis as one group) */}
        <RotatableJacketGroup
          autoRotate={autoRotate}
          currentPreset={currentPreset}
          dragDeltaY={dragDeltaY}
        />

        {/* Stationary Display Pedestal (directly underneath jacket) */}
        <Pedestal />

        {/* Invisible ground plane that only receives cast shadows from pedestal */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.10, 0]}
          receiveShadow
        >
          <circleGeometry args={[0.85, 64]} />
          <shadowMaterial opacity={0.45} />
        </mesh>
      </Canvas>
    </div>
  );
};
