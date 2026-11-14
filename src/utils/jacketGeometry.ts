import * as THREE from 'three';

/**
 * Creates custom 3D geometries for the varsity jacket:
 * - Torso with realistic body contours, chest volume, and shoulder slope
 * - Left and Right curved sleeves with seamless rounded shoulder caps and relaxed arm drape
 * - Collar with dual white stripes
 * - Cuffs with dual white stripes
 * - Waistband with dual white stripes
 * - Front Placket and Snap Buttons
 * - Welt Pockets
 */

// 1. Torso Geometry
export function createTorsoGeometry(): THREE.BufferGeometry {
  const slices = 48;
  const segments = 56;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const yMin = -0.72;
  const yMax = 0.72;

  for (let i = 0; i <= slices; i++) {
    const v = i / slices;
    const y = yMin + v * (yMax - yMin);

    let rx = 0.58;
    let rzFront = 0.36;
    let rzBack = 0.34;
    let zCenter = 0.0;

    if (v < 0.18) {
      // Lower waist / hem
      const t = v / 0.18;
      rx = THREE.MathUtils.lerp(0.53, 0.57, t);
      rzFront = THREE.MathUtils.lerp(0.33, 0.36, t);
      rzBack = THREE.MathUtils.lerp(0.31, 0.34, t);
    } else if (v < 0.6) {
      // Mid chest and abdomen
      const t = (v - 0.18) / 0.42;
      rx = THREE.MathUtils.lerp(0.57, 0.64, t);
      rzFront = THREE.MathUtils.lerp(0.36, 0.40, t);
      rzBack = THREE.MathUtils.lerp(0.34, 0.36, t);
      zCenter = THREE.MathUtils.lerp(0.0, 0.02, t);
    } else if (v < 0.85) {
      // Upper chest & broad athletic shoulder slope
      const t = (v - 0.6) / 0.25;
      rx = THREE.MathUtils.lerp(0.64, 0.67, Math.sin(t * Math.PI * 0.5));
      rzFront = THREE.MathUtils.lerp(0.40, 0.36, t);
      rzBack = THREE.MathUtils.lerp(0.36, 0.38, t);
      zCenter = 0.01;
    } else {
      // Neckline taper
      const t = (v - 0.85) / 0.15;
      rx = THREE.MathUtils.lerp(0.67, 0.28, t * t);
      rzFront = THREE.MathUtils.lerp(0.36, 0.22, t);
      rzBack = THREE.MathUtils.lerp(0.38, 0.24, t);
      zCenter = THREE.MathUtils.lerp(0.01, -0.04, t);
    }

    for (let j = 0; j <= segments; j++) {
      const u = j / segments;
      const angle = u * Math.PI * 2;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      let z = sinA >= 0 ? sinA * rzFront : sinA * rzBack;
      let x = cosA * rx;

      if (v > 0.4 && v < 0.8 && sinA > 0.3) {
        z += Math.sin(u * Math.PI) * 0.02;
      }

      const foldWave = Math.sin(y * 12 + angle * 3) * 0.005 * (1 - Math.abs(v - 0.5));
      x += cosA * foldWave;
      z += sinA * foldWave + zCenter;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < slices; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + j;
      const b = (i + 1) * (segments + 1) + j;
      const c = (i + 1) * (segments + 1) + (j + 1);
      const d = i * (segments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

// 2. Curved Sleeve Geometry with Natural Hang & Drapery
export function createSleeveGeometry(isLeft: boolean = true): THREE.BufferGeometry {
  const slices = 44;
  const segments = 32;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const side = isLeft ? 1 : -1;

  // Sleeve spine points matching reference jacket
  const points = [
    new THREE.Vector3(side * 0.54, 0.58, 0.0),    // Shoulder anchor inside body
    new THREE.Vector3(side * 0.66, 0.46, 0.01),   // Shoulder slope
    new THREE.Vector3(side * 0.77, 0.24, 0.02),   // Upper bicep
    new THREE.Vector3(side * 0.82, 0.00, 0.03),   // Elbow bend
    new THREE.Vector3(side * 0.79, -0.28, 0.04),  // Forearm
    new THREE.Vector3(side * 0.74, -0.54, 0.04),  // Lower forearm
    new THREE.Vector3(side * 0.70, -0.68, 0.04)   // Wrist meeting cuff
  ];

  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);

  for (let i = 0; i <= slices; i++) {
    const v = i / slices;
    const pt = curve.getPointAt(v);
    const tangent = curve.getTangentAt(v).normalize();

    let up = new THREE.Vector3(0, 1, 0);
    if (Math.abs(tangent.dot(up)) > 0.9) {
      up = new THREE.Vector3(0, 0, 1);
    }
    const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
    const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

    let radius = 0.22;
    if (v < 0.15) {
      // Smooth dome cap merging into the shoulder slope
      const capFactor = Math.sin((v / 0.15) * Math.PI * 0.5);
      radius = THREE.MathUtils.lerp(0.08, 0.23, capFactor);
    } else if (v < 0.5) {
      // Upper arm
      radius = THREE.MathUtils.lerp(0.23, 0.21, (v - 0.15) / 0.35);
    } else if (v < 0.8) {
      // Elbow & folds
      radius = THREE.MathUtils.lerp(0.21, 0.19, (v - 0.5) / 0.3);
    } else {
      // Taper down to wrist
      radius = THREE.MathUtils.lerp(0.19, 0.165, (v - 0.8) / 0.2);
    }

    // Natural elbow crease waves
    let crease = 0;
    if (v > 0.35 && v < 0.7) {
      const elbowFactor = Math.sin(((v - 0.35) / 0.35) * Math.PI);
      crease = Math.sin(v * 38) * 0.008 * elbowFactor;
    }

    for (let j = 0; j <= segments; j++) {
      const u = j / segments;
      const angle = u * Math.PI * 2;

      const r = (radius + crease) * (1 + 0.08 * Math.cos(angle * 2));
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const x = pt.x + (normal.x * cosA + binormal.x * sinA) * r;
      const y = pt.y + (normal.y * cosA + binormal.y * sinA) * r;
      const z = pt.z + (normal.z * cosA + binormal.z * sinA) * r;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < slices; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + j;
      const b = (i + 1) * (segments + 1) + j;
      const c = (i + 1) * (segments + 1) + (j + 1);
      const d = i * (segments + 1) + (j + 1);

      if (isLeft) {
        indices.push(a, b, d);
        indices.push(b, c, d);
      } else {
        indices.push(a, d, b);
        indices.push(b, d, c);
      }
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

// 3. Ribbed Collar Geometry
export function createCollarGeometry(): THREE.BufferGeometry {
  const radialSegments = 40;
  const tubularSegments = 16;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const rx = 0.28;
  const rz = 0.23;
  const height = 0.14;
  const thickness = 0.035;

  for (let i = 0; i <= radialSegments; i++) {
    const u = i / radialSegments;
    const angle = u * Math.PI * 2;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const cx = cosA * rx;
    const cz = sinA * rz - 0.03;
    const baseY = 0.69 - sinA * 0.025;

    for (let j = 0; j <= tubularSegments; j++) {
      const v = j / tubularSegments;
      const taper = 1.0 - v * 0.06;
      const x = cx * taper + cosA * (v > 0.5 ? thickness : 0);
      const y = baseY + v * height;
      const z = cz * taper + sinA * (v > 0.5 ? thickness : 0);

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < radialSegments; i++) {
    for (let j = 0; j < tubularSegments; j++) {
      const a = i * (tubularSegments + 1) + j;
      const b = (i + 1) * (tubularSegments + 1) + j;
      const c = (i + 1) * (tubularSegments + 1) + (j + 1);
      const d = i * (tubularSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

// 4. Ribbed Cuff Geometry
export function createCuffGeometry(): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(0.165, 0.155, 0.13, 32, 1, true);
  geom.computeVertexNormals();
  return geom;
}

// 5. Ribbed Waistband Geometry
export function createWaistbandGeometry(): THREE.BufferGeometry {
  const segments = 52;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const rx = 0.53;
  const rzFront = 0.33;
  const rzBack = 0.31;
  const bandHeight = 0.14;
  const baseY = -0.72;

  for (let i = 0; i <= 1; i++) {
    const v = i;
    const y = baseY - v * bandHeight;

    for (let j = 0; j <= segments; j++) {
      const u = j / segments;
      const angle = u * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const z = sinA >= 0 ? sinA * rzFront : sinA * rzBack;
      const x = cosA * rx;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let j = 0; j < segments; j++) {
    const a = j;
    const b = (segments + 1) + j;
    const c = (segments + 1) + (j + 1);
    const d = j + 1;

    indices.push(a, b, d);
    indices.push(b, c, d);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

// 6. Center Snap Placket Strip
export function createPlacketGeometry(): THREE.BufferGeometry {
  const geom = new THREE.BoxGeometry(0.08, 1.48, 0.02, 4, 20, 2);
  return geom;
}

// 7. Snap Button Geometry (Bright silver dome with bevel)
export function createSnapButtonGeometry(): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(0.030, 0.033, 0.018, 32);
  geom.rotateX(Math.PI / 2);
  return geom;
}

// 8. Angled Welt Pocket Lip
export function createPocketGeometry(): THREE.BufferGeometry {
  const geom = new THREE.BoxGeometry(0.035, 0.32, 0.022);
  return geom;
}
