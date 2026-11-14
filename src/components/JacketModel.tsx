import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  createTorsoGeometry,
  createSleeveGeometry,
  createCollarGeometry,
  createCuffGeometry,
  createWaistbandGeometry,
  createPlacketGeometry,
  createSnapButtonGeometry,
  createPocketGeometry
} from '../utils/jacketGeometry';
import {
  createFleeceTextures,
  createRibbedStripesTexture,
  createChenilleTexture,
  createBrushedMetalNormal
} from '../utils/textureGenerators';
import { createExtrudedLetter } from '../utils/letterGeometries';

export const JacketModel: React.FC = () => {
  const floatGroupRef = useRef<THREE.Group>(null);

  // Subtle natural floating hover motion
  useFrame((state) => {
    if (floatGroupRef.current) {
      floatGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  // 1. Textures
  const { diffuseMap: blackFleeceDiffuse, normalMap: blackFleeceNormal } = useMemo(
    () => createFleeceTextures(false),
    []
  );

  const { diffuseMap: sleeveFleeceDiffuse, normalMap: sleeveFleeceNormal } = useMemo(
    () => createFleeceTextures(true),
    []
  );

  const { texture: ribTexture, normalMap: ribNormal } = useMemo(
    () => createRibbedStripesTexture(),
    []
  );

  const { texture: chenilleTexture, normalMap: chenilleNormal } = useMemo(
    () => createChenilleTexture(),
    []
  );

  const metalNormal = useMemo(() => createBrushedMetalNormal(), []);

  // 2. Geometries
  const torsoGeom = useMemo(() => createTorsoGeometry(), []);
  const leftSleeveGeom = useMemo(() => createSleeveGeometry(true), []);
  const rightSleeveGeom = useMemo(() => createSleeveGeometry(false), []);
  const collarGeom = useMemo(() => createCollarGeometry(), []);
  const cuffGeom = useMemo(() => createCuffGeometry(), []);
  const waistbandGeom = useMemo(() => createWaistbandGeometry(), []);
  const placketGeom = useMemo(() => createPlacketGeometry(), []);
  const snapGeom = useMemo(() => createSnapButtonGeometry(), []);
  const pocketGeom = useMemo(() => createPocketGeometry(), []);

  // Letters: Front "KJ"
  const letterK = useMemo(() => createExtrudedLetter('K', 0.25), []);
  const letterJ = useMemo(() => createExtrudedLetter('J', 0.25), []);

  // Letters: Back "KABIR"
  const archK = useMemo(() => createExtrudedLetter('K', 0.26), []);
  const archA = useMemo(() => createExtrudedLetter('A', 0.26), []);
  const archB = useMemo(() => createExtrudedLetter('B', 0.26), []);
  const archI = useMemo(() => createExtrudedLetter('I', 0.26), []);
  const archR = useMemo(() => createExtrudedLetter('R', 0.26), []);

  // Materials
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111214',
        map: blackFleeceDiffuse,
        normalMap: blackFleeceNormal,
        normalScale: new THREE.Vector2(0.85, 0.85),
        roughness: 0.90,
        metalness: 0.04,
        side: THREE.DoubleSide
      }),
    [blackFleeceDiffuse, blackFleeceNormal]
  );

  const sleeveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#545963', // Rich charcoal grey fleece matching reference
        map: sleeveFleeceDiffuse,
        normalMap: sleeveFleeceNormal,
        normalScale: new THREE.Vector2(0.85, 0.85),
        roughness: 0.86,
        metalness: 0.04,
        side: THREE.DoubleSide
      }),
    [sleeveFleeceDiffuse, sleeveFleeceNormal]
  );

  const ribMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: ribTexture,
        normalMap: ribNormal,
        normalScale: new THREE.Vector2(0.75, 0.75),
        roughness: 0.80,
        metalness: 0.05,
        side: THREE.DoubleSide
      }),
    [ribTexture, ribNormal]
  );

  const chenilleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        map: chenilleTexture,
        normalMap: chenilleNormal,
        normalScale: new THREE.Vector2(1.3, 1.3),
        roughness: 0.76,
        metalness: 0.02
      }),
    [chenilleTexture, chenilleNormal]
  );

  const snapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        normalMap: metalNormal,
        roughness: 0.10,
        metalness: 0.96
      }),
    [metalNormal]
  );

  // Snap button coordinates along the front center placket
  const snapPositions: [number, number, number][] = [
    [0, 0.58, 0.382],
    [0, 0.28, 0.424],
    [0, -0.02, 0.414],
    [0, -0.32, 0.388],
    [0, -0.62, 0.358]
  ];

  // Arch "KABIR" on Back
  const archLetters = [
    { geom: archK, char: 'K', angle: 0.44 },
    { geom: archA, char: 'A', angle: 0.22 },
    { geom: archB, char: 'B', angle: 0.0 },
    { geom: archI, char: 'I', angle: -0.22 },
    { geom: archR, char: 'R', angle: -0.44 }
  ];

  const archRadius = 0.88;
  const archApexY = 0.38;

  return (
    <group ref={floatGroupRef} position={[0, 0, 0]}>
      {/* 1. Deep Black Fleece Torso */}
      <mesh geometry={torsoGeom} material={bodyMaterial} castShadow receiveShadow />

      {/* 2. Charcoal Grey Fleece Sleeves */}
      <mesh geometry={leftSleeveGeom} material={sleeveMaterial} castShadow receiveShadow />
      <mesh geometry={rightSleeveGeom} material={sleeveMaterial} castShadow receiveShadow />

      {/* 3. Ribbed Collar with Dual White Stripes */}
      <mesh geometry={collarGeom} material={ribMaterial} castShadow receiveShadow />

      {/* 4. Ribbed Cuffs at Wrists */}
      <group position={[0.70, -0.73, 0.04]} rotation={[0.08, 0, -0.28]}>
        <mesh geometry={cuffGeom} material={ribMaterial} castShadow receiveShadow />
      </group>

      <group position={[-0.70, -0.73, 0.04]} rotation={[0.08, 0, 0.28]}>
        <mesh geometry={cuffGeom} material={ribMaterial} castShadow receiveShadow />
      </group>

      {/* 5. Ribbed Waistband at Hem */}
      <mesh geometry={waistbandGeom} material={ribMaterial} castShadow receiveShadow />

      {/* 6. Center Front Closure Placket */}
      <mesh
        geometry={placketGeom}
        material={bodyMaterial}
        position={[0, -0.06, 0.370]}
        rotation={[0.035, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 7. Metallic Snap Buttons (5 count down placket) */}
      {snapPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh geometry={snapGeom} material={snapMaterial} castShadow receiveShadow />
          <mesh position={[0, 0, 0.010]}>
            <ringGeometry args={[0.016, 0.026, 32]} />
            <meshStandardMaterial color="#c8ccd4" metalness={0.96} roughness={0.18} />
          </mesh>
        </group>
      ))}

      {/* 8. Slanted Welt Pockets */}
      <group position={[0.29, -0.34, 0.36]} rotation={[0.05, -0.20, -0.38]}>
        <mesh geometry={pocketGeom} material={bodyMaterial} castShadow receiveShadow />
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.028, 0.30]} />
          <meshBasicMaterial color="#080809" />
        </mesh>
      </group>

      <group position={[-0.29, -0.34, 0.36]} rotation={[0.05, 0.20, 0.38]}>
        <mesh geometry={pocketGeom} material={bodyMaterial} castShadow receiveShadow />
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.028, 0.30]} />
          <meshBasicMaterial color="#080809" />
        </mesh>
      </group>

      {/* 9. Front Chest Chenille Embroidery "KJ" (Upper right chest when viewed from front) */}
      <group position={[0.31, 0.28, 0.435]} rotation={[0.02, -0.16, 0]}>
        {/* Dark felt backing patch */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.38, 0.28, 0.012]} />
          <meshStandardMaterial color="#0a0b0e" roughness={0.95} />
        </mesh>
        
        {/* Complete Letter 'K' - centered left within patch */}
        <mesh geometry={letterK} material={chenilleMaterial} position={[-0.09, 0, 0.014]} castShadow />
        {/* Complete Letter 'J' - centered right within patch */}
        <mesh geometry={letterJ} material={chenilleMaterial} position={[0.09, 0, 0.014]} castShadow />
      </group>

      {/* 10. Back Arched Chenille Embroidery "KABIR" */}
      <group position={[0, 0, 0]}>
        {archLetters.map((item, idx) => {
          const sinA = Math.sin(item.angle);
          const cosA = Math.cos(item.angle);

          const x = archRadius * sinA;
          const y = archApexY - archRadius * (1 - cosA) * 0.85;

          const rzBackApprox = 0.365;
          const z = -Math.sqrt(Math.max(0.01, rzBackApprox * rzBackApprox - (x * 0.46) * (x * 0.46))) - 0.018;

          const rotY = Math.PI - item.angle * 0.46;
          const rotZ = item.angle * 0.90;

          return (
            <group
              key={idx}
              position={[x, y, z]}
              rotation={[0.05, rotY, rotZ]}
            >
              {/* Dark felt backing border */}
              <mesh position={[0, 0, -0.005]}>
                <boxGeometry args={[0.24, 0.26, 0.008]} />
                <meshStandardMaterial color="#08080a" roughness={0.95} />
              </mesh>

              {/* 3D Extruded Chenille Letter */}
              <mesh
                geometry={item.geom}
                material={chenilleMaterial}
                position={[0, 0, 0.008]}
                castShadow
              />
            </group>
          );
        })}
      </group>

      {/* 11. Interior Neck & Brand Label Tag */}
      <group position={[0, 0.64, -0.04]} rotation={[-0.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
          <meshStandardMaterial color="#0d0e11" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.021, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 0.05]} />
          <meshStandardMaterial color="#1a1c20" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};
