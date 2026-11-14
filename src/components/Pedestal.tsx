import React from 'react';

export const Pedestal: React.FC = () => {
  return (
    <group position={[0, -1.02, 0]}>
      {/* Sleek Circular Display Pedestal matching reference image */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.71, 0.12, 64]} />
        <meshStandardMaterial
          color="#1c1e24"
          roughness={0.32}
          metalness={0.75}
        />
      </mesh>

      {/* Subtle Base Tier Ring */}
      <mesh position={[0, -0.07, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.74, 0.03, 64]} />
        <meshStandardMaterial
          color="#101115"
          roughness={0.38}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
