import React from 'react';

interface StudioLightingProps {
  lightingMode?: 'studio' | 'dramatic' | 'warm';
}

export const StudioLighting: React.FC<StudioLightingProps> = () => {
  return (
    <>
      {/* 1. Balanced Ambient Light for Deep Fabric Tones */}
      <ambientLight intensity={0.65} color="#e8ecf2" />

      {/* 2. Main Studio Key Light (Upper Front Right) */}
      <directionalLight
        position={[3.0, 3.5, 3.8]}
        intensity={1.45}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0005}
      />

      {/* 3. Soft Studio Fill Light (Upper Front Left) */}
      <directionalLight
        position={[-3.2, 2.5, 3.2]}
        intensity={0.85}
        color="#d0d8e4"
      />

      {/* 4. Front Direct Specular Glint Light (Highlights Metallic Buttons & Chest Patch) */}
      <directionalLight
        position={[0.2, 0.4, 4.2]}
        intensity={0.85}
        color="#ffffff"
      />

      {/* 5. Placket Front Fill Light for Snap Buttons */}
      <pointLight
        position={[0.0, -0.05, 1.6]}
        intensity={0.9}
        color="#ffffff"
        distance={4.0}
      />

      {/* 6. Left Rim Light (Sharp Silver Edge on Left Arm & Shoulder) */}
      <directionalLight
        position={[-4.0, 2.6, -3.0]}
        intensity={1.8}
        color="#f0f4fa"
      />

      {/* 7. Right Rim Light (Sharp Silver Edge on Right Arm & Shoulder) */}
      <directionalLight
        position={[4.0, 2.6, -3.0]}
        intensity={1.8}
        color="#f0f4fa"
      />

      {/* 8. Top Spotlight (Accents Collar, Hem & Pedestal Top) */}
      <spotLight
        position={[0, 4.5, 0.6]}
        angle={0.65}
        penumbra={0.7}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-bias={-0.0005}
      />

      {/* 9. Back Direct Light (Illuminates Arched "KABIR" White Embroidery) */}
      <directionalLight
        position={[0, 1.8, -4.0]}
        intensity={1.3}
        color="#eef2f8"
      />
    </>
  );
};
