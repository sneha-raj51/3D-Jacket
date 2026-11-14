# KABIR ATELIER — 3D Varsity Jacket Showcase

An interactive, high-fidelity 3D product visualization showcase for a custom luxury varsity jacket. Built with React, Three.js, React Three Fiber, and Tailwind-inspired CSS for an ultra-responsive, immersive fashion e-commerce product experience.

---

## 🌟 Highlights & Features

- **Custom Tailored 3D Jacket:**
  - Deep black fleece body with procedural surface normal mapping.
  - Charcoal grey textured fleece sleeves with natural hanging fold geometry.
  - Arched varsity embroidery on the back featuring custom 3D extruded lettering (**KABIR**).
  - Bold chenille felt chest patch with dual embroidered letters (**KJ**).
  - Ribbed elastic collar, cuffs, and bottom waistband with dual parallel white stripes.
  - Metallic brushed silver snap buttons down the front center placket.
  - Dual slanted welt pocket details.

- **Cinematic 3D Lighting & Atmosphere:**
  - Dark charcoal studio environment with radial gradient lighting.
  - Multi-point studio lighting rig (Key Light, Soft Fill, Specular Highlights, Rim Lights, Overhead Spotlight, and Back Light).
  - Grounded circular display pedestal directly beneath the jacket.
  - Realistic floating hover animation (`useFrame`).

- **Interactive Camera & Controls:**
  - **Smooth 360° Rotation:** Rotate the jacket continuously around its vertical Y-axis via horizontal mouse drag or mobile touch swipe.
  - **Zoom & Pan:** Smooth camera zoom using mouse scroll or touch pinch gestures.
  - **Preset Navigation Bar:**
    - `FRONT`: Centers the front view of the jacket.
    - `BACK (KABIR)`: Smoothly rotates 180° to display the arched back embroidery.
    - `LEFT` / `RIGHT`: Positions the camera to side profile views.
    - `CHEST PATCH`: Smoothly flies the camera into a close-up zoom of the "KJ" chenille patch.
    - `ARCH ZOOM`: Zooms into the "KABIR" back embroidery.
    - `AUTO 360°`: Toggles continuous automatic 360-degree rotation.

---

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **3D Engine:** [Three.js](https://threejs.org/)
- **React 3D Integration:** [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Installation

1. Clone or extract the project repository:
   ```bash
   cd 3D
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

The compiled and minified assets will be generated in the `dist/` directory, ready to be served by any static web server or CDN.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

This project is pre-configured for one-click deployment on [Vercel](https://vercel.com/):

### Option A: Vercel CLI
```bash
npx vercel
```

### Option B: Vercel Git Integration
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, click **"Add New Project"** and select the repository.
3. Vercel automatically detects the Vite configuration:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

---

## 📁 Project Structure

```
├── public/                 # Static assets (favicons, manifest)
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/         # React & Three.js 3D Components
│   │   ├── UI/
│   │   │   └── ControlBar.tsx   # Minimal floating bottom navigation
│   │   ├── JacketModel.tsx      # Unified 3D jacket assembly
│   │   ├── Pedestal.tsx         # Circular display pedestal
│   │   ├── Scene.tsx            # Main Canvas, camera controller & drag handlers
│   │   └── StudioLighting.tsx   # Cinematic multi-point studio lights
│   ├── utils/              # Procedural generators & geometries
│   │   ├── jacketGeometry.ts    # Custom procedural jacket mesh generators
│   │   ├── letterGeometries.ts  # 3D varsity extruded typography
│   │   └── textureGenerators.ts # Procedural fabric & metal normal maps
│   ├── App.tsx             # Root component
│   ├── main.tsx            # React application entry point
│   └── style.css           # Global layout & control bar styles
├── index.html              # HTML shell
├── package.json            # Project manifest & dependencies
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment & routing configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # Project documentation
```

---

## 🔒 Security & Best Practices

- No secrets, tokens, or private credentials are included or committed.
- Production environment configurations and local development logs are ignored via `.gitignore`.
- Fully self-contained procedural textures and geometries—no external asset dependencies or unauthenticated CDN calls at runtime.

