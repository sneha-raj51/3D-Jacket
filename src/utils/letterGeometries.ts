import * as THREE from 'three';

/**
 * Authentic American Collegiate Varsity Block Letter Shapes.
 * Clean, robust polygons with solid stems, slab serifs, and bold athletic proportions.
 */

export function createVarsityShape(letter: string): THREE.Shape {
  const shape = new THREE.Shape();

  switch (letter.toUpperCase()) {
    case 'K': {
      // Clean, complete collegiate K:
      // Solid vertical left column with bilateral top and bottom serifs
      // Upper diagonal arm and lower diagonal leg branching cleanly to the right
      shape.moveTo(-0.34, -0.42);
      shape.lineTo(-0.10, -0.42);
      shape.lineTo(-0.10, -0.08);
      shape.lineTo(0.14, -0.42);
      shape.lineTo(0.36, -0.42);
      shape.lineTo(0.36, -0.28);
      shape.lineTo(0.24, -0.28);
      shape.lineTo(0.05, 0.0);
      shape.lineTo(0.24, 0.28);
      shape.lineTo(0.36, 0.28);
      shape.lineTo(0.36, 0.42);
      shape.lineTo(0.14, 0.42);
      shape.lineTo(-0.10, 0.08);
      shape.lineTo(-0.10, 0.42);
      shape.lineTo(-0.34, 0.42);
      shape.closePath();
      break;
    }

    case 'J': {
      // Clean, complete collegiate J:
      // Top horizontal bar with serifs, vertical stem curving into bottom hook
      shape.moveTo(0.02, 0.42);
      shape.lineTo(0.36, 0.42);
      shape.lineTo(0.36, 0.30);
      shape.lineTo(0.26, 0.30);
      shape.lineTo(0.26, -0.16);
      shape.quadraticCurveTo(0.26, -0.42, 0.04, -0.42);
      shape.quadraticCurveTo(-0.24, -0.42, -0.24, -0.20);
      shape.lineTo(-0.08, -0.20);
      shape.quadraticCurveTo(-0.08, -0.28, 0.04, -0.28);
      shape.quadraticCurveTo(0.12, -0.28, 0.12, -0.16);
      shape.lineTo(0.12, 0.30);
      shape.lineTo(0.02, 0.30);
      shape.closePath();
      break;
    }

    case 'A': {
      // Bold Collegiate A with bottom serifs
      shape.moveTo(-0.36, -0.42);
      shape.lineTo(-0.12, -0.42);
      shape.lineTo(-0.12, -0.30);
      shape.lineTo(-0.18, -0.30);
      shape.lineTo(-0.06, 0.18);
      shape.lineTo(0.06, 0.18);
      shape.lineTo(0.18, -0.30);
      shape.lineTo(0.12, -0.30);
      shape.lineTo(0.12, -0.42);
      shape.lineTo(0.36, -0.42);
      shape.lineTo(0.36, -0.30);
      shape.lineTo(0.28, -0.30);
      shape.lineTo(0.11, 0.42);
      shape.lineTo(-0.11, 0.42);
      shape.lineTo(-0.28, -0.30);
      shape.lineTo(-0.36, -0.30);
      shape.closePath();

      // Triangular center cutout
      const hole = new THREE.Path();
      hole.moveTo(0, 0.20);
      hole.lineTo(0.06, -0.08);
      hole.lineTo(-0.06, -0.08);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }

    case 'B': {
      // Bold Collegiate B
      shape.moveTo(-0.34, -0.42);
      shape.lineTo(0.12, -0.42);
      shape.quadraticCurveTo(0.35, -0.42, 0.35, -0.21);
      shape.quadraticCurveTo(0.35, -0.03, 0.18, 0.0);
      shape.quadraticCurveTo(0.32, 0.03, 0.32, 0.21);
      shape.quadraticCurveTo(0.32, 0.42, 0.10, 0.42);
      shape.lineTo(-0.34, 0.42);
      shape.lineTo(-0.34, 0.30);
      shape.lineTo(-0.25, 0.30);
      shape.lineTo(-0.25, -0.30);
      shape.lineTo(-0.34, -0.30);
      shape.closePath();

      const topHole = new THREE.Path();
      topHole.moveTo(-0.12, 0.10);
      topHole.lineTo(0.08, 0.10);
      topHole.quadraticCurveTo(0.18, 0.10, 0.18, 0.22);
      topHole.quadraticCurveTo(0.18, 0.30, 0.08, 0.30);
      topHole.lineTo(-0.12, 0.30);
      topHole.closePath();
      shape.holes.push(topHole);

      const botHole = new THREE.Path();
      botHole.moveTo(-0.12, -0.30);
      botHole.lineTo(0.10, -0.30);
      botHole.quadraticCurveTo(0.20, -0.30, 0.20, -0.19);
      botHole.quadraticCurveTo(0.20, -0.08, 0.10, -0.08);
      botHole.lineTo(-0.12, -0.08);
      botHole.closePath();
      shape.holes.push(botHole);
      break;
    }

    case 'I': {
      // Bold Collegiate I with wide serifs
      const w = 0.54;
      const h = 0.84;
      const stemW = 0.22;
      const serifH = 0.15;

      shape.moveTo(-w / 2, -h / 2);
      shape.lineTo(w / 2, -h / 2);
      shape.lineTo(w / 2, -h / 2 + serifH);
      shape.lineTo(stemW / 2, -h / 2 + serifH);
      shape.lineTo(stemW / 2, h / 2 - serifH);
      shape.lineTo(w / 2, h / 2 - serifH);
      shape.lineTo(w / 2, h / 2);
      shape.lineTo(-w / 2, h / 2);
      shape.lineTo(-w / 2, h / 2 - serifH);
      shape.lineTo(-stemW / 2, h / 2 - serifH);
      shape.lineTo(-stemW / 2, -h / 2 + serifH);
      shape.lineTo(-w / 2, -h / 2 + serifH);
      shape.closePath();
      break;
    }

    case 'R': {
      // Bold Collegiate R with top loop and leg
      shape.moveTo(-0.34, -0.42);
      shape.lineTo(-0.10, -0.42);
      shape.lineTo(-0.10, -0.30);
      shape.lineTo(-0.18, -0.30);
      shape.lineTo(-0.18, -0.02);
      shape.lineTo(0.10, -0.02);
      shape.lineTo(0.20, -0.42);
      shape.lineTo(0.38, -0.42);
      shape.lineTo(0.38, -0.30);
      shape.lineTo(0.28, -0.30);
      shape.lineTo(0.18, 0.02);
      shape.quadraticCurveTo(0.34, 0.05, 0.34, 0.22);
      shape.quadraticCurveTo(0.34, 0.42, 0.10, 0.42);
      shape.lineTo(-0.34, 0.42);
      shape.lineTo(-0.34, 0.30);
      shape.lineTo(-0.25, 0.30);
      shape.lineTo(-0.25, -0.30);
      shape.lineTo(-0.34, -0.30);
      shape.closePath();

      const rHole = new THREE.Path();
      rHole.moveTo(-0.12, 0.10);
      rHole.lineTo(0.08, 0.10);
      rHole.quadraticCurveTo(0.18, 0.10, 0.18, 0.22);
      rHole.quadraticCurveTo(0.18, 0.30, 0.08, 0.30);
      rHole.lineTo(-0.12, 0.30);
      rHole.closePath();
      shape.holes.push(rHole);
      break;
    }

    default:
      shape.moveTo(-0.2, -0.4);
      shape.lineTo(0.2, -0.4);
      shape.lineTo(0.2, 0.4);
      shape.lineTo(-0.2, 0.4);
      shape.closePath();
      break;
  }

  return shape;
}

export function createExtrudedLetter(letter: string, scale: number = 0.30): THREE.BufferGeometry {
  const shape = createVarsityShape(letter);
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 0.028,
    bevelEnabled: true,
    bevelThickness: 0.007,
    bevelSize: 0.005,
    bevelSegments: 3
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.scale(scale, scale, scale);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}
