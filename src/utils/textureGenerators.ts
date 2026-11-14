import * as THREE from 'three';

/**
 * Creates high-resolution procedural textures for fleece fabric,
 * ribbed knit stripes, and chenille embroidery.
 */

// 1. Fleece Texture (Normal, Roughness, and Diffuse maps)
export function createFleeceTextures(isSleeve: boolean = false) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base colors
  // Body: rich deep black fleece
  // Sleeve: medium charcoal grey fleece with wool heathering
  const baseColor = isSleeve ? '#50555e' : '#121315';
  const fleckColor = isSleeve ? '#606670' : '#1c1e21';
  const shadowColor = isSleeve ? '#3c4048' : '#090a0b';

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      
      const n1 = Math.sin(x * 0.15) * Math.cos(y * 0.15);
      const n2 = Math.sin(x * 0.45 + n1 * 2) * Math.cos(y * 0.45 - n1 * 2);
      const n3 = (Math.random() - 0.5) * 35;
      const curl = (n1 * 12 + n2 * 18 + n3);

      const baseR = isSleeve ? 82 : 18;
      const baseG = isSleeve ? 86 : 19;
      const baseB = isSleeve ? 94 : 21;

      data[idx] = Math.min(255, Math.max(0, baseR + curl));
      data[idx + 1] = Math.min(255, Math.max(0, baseG + curl));
      data[idx + 2] = Math.min(255, Math.max(0, baseB + curl * 1.08));
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Curly fleece micro-fibers
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4500; i++) {
    const rx = Math.random() * size;
    const ry = Math.random() * size;
    const radius = 2 + Math.random() * 4;
    ctx.strokeStyle = Math.random() > 0.5 ? fleckColor : shadowColor;
    ctx.beginPath();
    ctx.arc(rx, ry, radius, 0, Math.PI * (1 + Math.random()));
    ctx.stroke();
  }

  const diffuseMap = new THREE.CanvasTexture(canvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(isSleeve ? 4 : 5, isSleeve ? 4 : 5);

  // Normal Map
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = 512;
  normalCanvas.height = 512;
  const nCtx = normalCanvas.getContext('2d')!;
  const nImg = nCtx.createImageData(512, 512);
  const nData = nImg.data;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const idx = (y * 512 + x) * 4;
      const nx = Math.sin(x * 0.25) * Math.cos(y * 0.25);
      const ny = Math.cos(x * 0.3) * Math.sin(y * 0.3);
      const randX = (Math.random() - 0.5) * 0.35;
      const randY = (Math.random() - 0.5) * 0.35;

      nData[idx] = Math.floor(128 + (nx * 0.5 + randX) * 127);
      nData[idx + 1] = Math.floor(128 + (ny * 0.5 + randY) * 127);
      nData[idx + 2] = 245;
      nData[idx + 3] = 255;
    }
  }
  nCtx.putImageData(nImg, 0, 0);

  const normalMap = new THREE.CanvasTexture(normalCanvas);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(isSleeve ? 8 : 10, isSleeve ? 8 : 10);

  return { diffuseMap, normalMap };
}

// 2. Ribbed Knit with Double White Stripes (Collar, Cuffs, Waistband)
export function createRibbedStripesTexture() {
  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep black elastic knit base
  ctx.fillStyle = '#0f1012';
  ctx.fillRect(0, 0, width, height);

  // Two crisp, brilliant white parallel stripes
  // Stripe 1
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, height * 0.28, width, height * 0.11);

  // Stripe 2
  ctx.fillRect(0, height * 0.60, width, height * 0.11);

  // Vertical knit rib cords across the entire band
  const ribCount = 64;
  const ribWidth = width / ribCount;

  for (let i = 0; i < ribCount; i++) {
    const x = i * ribWidth;
    // Dark shadow between knit ribs
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.fillRect(x, 0, ribWidth * 0.28, height);

    // Light rib ridge highlight
    ctx.fillStyle = 'rgba(255,255,255,0.09)';
    ctx.fillRect(x + ribWidth * 0.28, 0, ribWidth * 0.44, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Normal map for vertical ribbed texture
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = 256;
  normalCanvas.height = 256;
  const nCtx = normalCanvas.getContext('2d')!;
  const nImg = nCtx.createImageData(256, 256);
  const nData = nImg.data;

  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const idx = (y * 256 + x) * 4;
      const ribPhase = (x / (256 / 32)) * Math.PI * 2;
      const slope = Math.cos(ribPhase);

      nData[idx] = Math.floor(128 + slope * 65);
      nData[idx + 1] = 128;
      nData[idx + 2] = 230;
      nData[idx + 3] = 255;
    }
  }
  nCtx.putImageData(nImg, 0, 0);

  const normalMap = new THREE.CanvasTexture(normalCanvas);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.ClampToEdgeWrapping;
  normalMap.repeat.set(4, 1);

  return { texture, normalMap };
}

// 3. Chenille Embroidered Yarn Texture
export function createChenilleTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Micro-loops / moss-stitch yarn texture
  ctx.fillStyle = 'rgba(215, 220, 228, 0.45)';
  for (let i = 0; i < 16000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 0.8 + Math.random() * 1.6;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(170, 175, 185, 0.35)';
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 0.5 + Math.random() * 1.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);

  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = 256;
  normalCanvas.height = 256;
  const nCtx = normalCanvas.getContext('2d')!;
  const nImg = nCtx.createImageData(256, 256);
  const nData = nImg.data;

  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const idx = (y * 256 + x) * 4;
      const nx = (Math.random() - 0.5) * 80;
      const ny = (Math.random() - 0.5) * 80;

      nData[idx] = Math.floor(128 + nx);
      nData[idx + 1] = Math.floor(128 + ny);
      nData[idx + 2] = 230;
      nData[idx + 3] = 255;
    }
  }
  nCtx.putImageData(nImg, 0, 0);

  const normalMap = new THREE.CanvasTexture(normalCanvas);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(6, 6);

  return { texture, normalMap };
}

// 4. Subtle brushed metal texture for snap buttons
export function createBrushedMetalNormal() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const data = img.data;

  const cx = size / 2;
  const cy = size / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      const brush = Math.sin(dist * 1.5) * 20 + (Math.random() - 0.5) * 15;
      data[idx] = Math.floor(128 + Math.cos(angle + Math.PI / 2) * brush * 0.3);
      data[idx + 1] = Math.floor(128 + Math.sin(angle + Math.PI / 2) * brush * 0.3);
      data[idx + 2] = 250;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
