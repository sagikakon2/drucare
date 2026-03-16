---
name: 3d-scenes
description: Immersive 3D scene templates for landing pages using React Three Fiber, Drei, and postprocessing. Each template is a self-contained pattern — adapt geometry, colors, and scroll behavior to each project's design system. Use when a section needs a 3D hero, floating product, particle field, or scroll-driven WebGL scene.
---

# 3D Scenes — Immersive WebGL Templates

Each template below is a **pattern** — full source code you adapt per project. Replace colors, geometry, and animation values to match the project's `@theme` variables and brand energy.

**Dependencies:**

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
```

**Where to place:** Create `src/components/scenes/` in the client project, one file per scene.

**CRITICAL:** Always wrap 3D scenes in `React.lazy` + `Suspense` — they add ~150kb to the bundle.

```tsx
const HeroScene = lazy(() => import('@/components/scenes/HeroScene'));

<Suspense fallback={<div className="min-h-screen bg-charcoal" />}>
  <HeroScene />
</Suspense>
```

---

## Performance Rules

| Rule | Why |
|------|-----|
| `dpr={[1, 1.5]}` on Canvas | Caps pixel ratio — 2x is wasteful on most screens |
| `performance={{ min: 0.5 }}` | Auto-degrades quality on slow devices |
| `frameloop="demand"` for static scenes | Only renders when something changes |
| `React.lazy` + `Suspense` | Code-split the heavy Three.js bundle |
| `useGLTF.preload(url)` | Start loading models before component mounts |
| Dispose geometries/textures | Prevent WebGL memory leaks |
| `gsap.matchMedia()` | Disable 3D on mobile if too heavy — show static fallback |

---

## Light Theme Adaptation

All 3D scene examples use dark backgrounds (`#0a0a0a`). For light-themed archetypes:

| Component | Light Theme Approach |
|-----------|---------------------|
| Scene3D | Set `bgColor` to `var(--color-bg)` hex value (e.g. `#F8F7F5`) |
| FloatingProduct | Works on any background — adjust material colors to complement |
| ParticleField | Use dark particle colors (`#333`) at low opacity on light backgrounds |
| WavePlane | Use primary color at low opacity for wave material |
| GlobeScene | Invert: light globe mesh on light background with dark accent dots |
| StarsBackground | **Skip on light themes** — stars are invisible on light backgrounds. Use gradient blobs instead. |
| CinematicPost | Reduce bloom intensity on light themes; vignette may need inversion |

**Rule:** On light themes, 3D scenes should enhance subtly rather than dominate. Consider using them only in hero sections with a slight dark overlay, while the rest of the page stays light.

---

## Reduced Motion Support

```tsx
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  return <StaticFallbackImage />;
}
```

When `prefers-reduced-motion: reduce` is detected:
- Replace 3D scenes with a static image fallback
- Or render the 3D scene but disable all animation (freeze the first frame)
- `useFrame` callbacks should check and skip if reduced motion is preferred

---

## Mobile Strategy

3D scenes are expensive on mobile. Follow this decision tree:

```
Mobile viewport (< 768px)?
├── Scene is hero background only → Keep, but reduce: dpr={[1, 1]}, lower particle count, simpler geometry
├── Scene is interactive product → Keep, disable orbit, add touch hint
└── Scene is complex (GLTF + postprocessing) → Replace with static image + CSS parallax
```

Always provide a fallback:
```tsx
const isMobile = window.innerWidth < 768;
return isMobile ? <StaticHeroFallback /> : <Canvas>...</Canvas>;
```

---

## Color Adaptation Rule

Derive all scene colors from the project's `@theme`:

| Scene prop | Map to project variable |
|------------|------------------------|
| `meshColor` | `--color-primary` hex |
| `accentColor` | `--color-secondary` hex |
| `ambientColor` | `--color-primary` at 30% opacity |
| `bgColor` | `--color-bg` hex |
| `emissive` / bloom objects | `--color-primary` hex |
| `fog` | `--color-bg` hex |

---

## Template 1: Scene3D — Base Canvas Wrapper

Every 3D section uses this wrapper. It sets sensible defaults for performance, camera, and styling.

**Use for:** Wrapping any scene template below.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Container classes |
| `bgColor` | string | `'#0a0a0a'` | Scene background (use project bg) |
| `cameraPosition` | tuple | `[0, 0, 5]` | Camera starting position |
| `enableZoom` | boolean | `false` | Allow scroll zoom (usually false for landing pages) |
| `children` | ReactNode | — | Scene contents |

```tsx
import { Canvas } from '@react-three/fiber';
import { Preload, OrbitControls } from '@react-three/drei';

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  cameraPosition?: [number, number, number];
  enableZoom?: boolean;
}

export const Scene3D = ({
  children,
  className = '',
  bgColor = '#0a0a0a',
  cameraPosition = [0, 0, 5],
  enableZoom = false,
}: Scene3DProps) => (
  <div className={`w-full h-full ${className}`}>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: cameraPosition, fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.5 }}
    >
      <OrbitControls enableZoom={enableZoom} enablePan={false} enableRotate={false} />
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 8, 25]} />
      {children}
      <Preload all />
    </Canvas>
  </div>
);
```

---

## Template 2: FloatingProduct — Scroll-Driven 3D Object

A geometric shape (or GLTF model) that floats, rotates slowly, and responds to scroll position. The core pattern for product showcases and hero scenes.

**Use for:** Hero sections, product spotlights, "about" visual anchors.

**Adapt per project:** geometry type, mesh color, rotation speed, float range.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `meshColor` | string | `'#8b5cf6'` | Object color (use project primary) |
| `emissiveColor` | string | `'#4c1d95'` | Glow color for bloom (darker primary) |
| `geometry` | string | `'torusKnot'` | `'torusKnot'` / `'icosahedron'` / `'octahedron'` / `'sphere'` |
| `floatSpeed` | number | `1.5` | Float animation speed |
| `rotationSpeed` | number | `0.3` | Auto-rotation speed |

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows, Environment } from '@react-three/drei';
import type { Mesh } from 'three';

const geometries = {
  torusKnot: <torusKnotGeometry args={[1, 0.35, 128, 32]} />,
  icosahedron: <icosahedronGeometry args={[1.3, 4]} />,
  octahedron: <octahedronGeometry args={[1.3, 4]} />,
  sphere: <sphereGeometry args={[1.2, 64, 64]} />,
};

interface FloatingProductProps {
  meshColor?: string;
  emissiveColor?: string;
  geometry?: keyof typeof geometries;
  floatSpeed?: number;
  rotationSpeed?: number;
}

export const FloatingProduct = ({
  meshColor = '#8b5cf6',
  emissiveColor = '#4c1d95',
  geometry = 'torusKnot',
  floatSpeed = 1.5,
  rotationSpeed = 0.3,
}: FloatingProductProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color={meshColor} />
      <Environment preset="city" />

      <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={meshRef} castShadow>
          {geometries[geometry]}
          <MeshDistortMaterial
            color={meshColor}
            emissive={emissiveColor}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.15}
            speed={2}
          />
        </mesh>
      </Float>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={4}
        resolution={256}
        frames={1}
      />
    </>
  );
};
```

**Full hero usage:**
```tsx
import { Scene3D } from '@/components/scenes/Scene3D';
import { FloatingProduct } from '@/components/scenes/FloatingProduct';
import { CinematicPost } from '@/components/scenes/CinematicPost';

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Scene3D bgColor="#0a0a0a" cameraPosition={[0, 0, 4.5]}>
        <FloatingProduct
          meshColor="PRIMARY_HEX"
          emissiveColor="PRIMARY_DARK_HEX"
          geometry="torusKnot"
        />
        <CinematicPost />
      </Scene3D>
    </div>
    <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
      <h1 className="text-5xl md:text-7xl font-bold text-white">
        Your Headline
      </h1>
    </div>
  </section>
);
```

---

## Template 3: ParticleField — GPU Particle System

Thousands of floating particles with depth, driven by scroll position. Creates an immersive space/cosmos feel.

**Use for:** Hero backgrounds, transitions between sections, full-page atmospherics.

**Adapt per project:** `count` (energy level), `color`, `size`, scroll multiplier.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | number | `2000` | Particle count (1000 = subtle, 5000 = dense) |
| `color` | string | `'#8b5cf6'` | Particle color (project primary) |
| `size` | number | `0.015` | Particle base size |
| `spread` | number | `8` | XYZ distribution radius |
| `scrollInfluence` | number | `2` | How much scroll affects Y position |

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Points } from 'three';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
  scrollInfluence?: number;
}

export const ParticleField = ({
  count = 2000,
  color = '#8b5cf6',
  size = 0.015,
  spread = 8,
  scrollInfluence = 2,
}: ParticleFieldProps) => {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [count, spread]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * size + size * 0.5;
    }
    return s;
  }, [count, size]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;

    const time = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.0003 * scrollInfluence;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
```

---

## Template 4: WavePlane — Animated Wave Mesh

A subdivided plane with vertex displacement creating an organic wave surface. Responds to time for continuous motion.

**Use for:** Section backgrounds, footer atmosphere, beneath content areas.

**Adapt per project:** `color`, `wireframe` (techy feel), `amplitude`, `frequency`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `'#8b5cf6'` | Wave surface color (project primary) |
| `wireframe` | boolean | `false` | Wireframe mode (tech/futuristic look) |
| `amplitude` | number | `0.3` | Wave height (0.1 = gentle, 0.5+ = dramatic) |
| `frequency` | number | `0.4` | Wave density |
| `speed` | number | `0.8` | Animation speed |

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, PlaneGeometry } from 'three';
import * as THREE from 'three';

interface WavePlaneProps {
  color?: string;
  wireframe?: boolean;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

export const WavePlane = ({
  color = '#8b5cf6',
  wireframe = false,
  amplitude = 0.3,
  frequency = 0.4,
  speed = 0.8,
}: WavePlaneProps) => {
  const meshRef = useRef<Mesh>(null);

  const basePositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 12, 64, 64);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry as PlaneGeometry;
    const positions = geo.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * speed;

    for (let i = 0; i < positions.length; i += 3) {
      const x = basePositions[i];
      const y = basePositions[i + 1];
      positions[i + 2] =
        Math.sin(x * frequency + time) * amplitude +
        Math.cos(y * frequency * 1.3 + time * 0.7) * amplitude * 0.6;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[12, 12, 64, 64]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        side={THREE.DoubleSide}
        metalness={wireframe ? 0 : 0.6}
        roughness={wireframe ? 1 : 0.3}
        transparent
        opacity={wireframe ? 0.3 : 0.8}
      />
    </mesh>
  );
};
```

---

## Template 5: MorphingSphere — Distorted Reactive Sphere

A sphere with noise-based distortion that reacts to mouse position and time. Creates an organic, living feel.

**Use for:** Hero centerpiece, about section visual, interactive background element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `'#8b5cf6'` | Sphere color (project primary) |
| `emissiveColor` | string | `'#4c1d95'` | Glow color |
| `distortStrength` | number | `0.4` | Distortion amount (0.2 = subtle, 0.6 = dramatic) |
| `speed` | number | `2` | Distortion animation speed |
| `scale` | number | `1.8` | Sphere size |

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import type { Mesh } from 'three';

interface MorphingSphereProps {
  color?: string;
  emissiveColor?: string;
  distortStrength?: number;
  speed?: number;
  scale?: number;
}

export const MorphingSphere = ({
  color = '#8b5cf6',
  emissiveColor = '#4c1d95',
  distortStrength = 0.4,
  speed = 2,
  scale = 1.8,
}: MorphingSphereProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    const pointer = state.pointer;
    meshRef.current.position.x = pointer.x * 0.3;
    meshRef.current.position.y = pointer.y * 0.3;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale}>
        <MeshDistortMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          distort={distortStrength}
          speed={speed}
        />
      </Sphere>
    </Float>
  );
};
```

---

## Template 6: ScrollStory — Scroll-Driven Scene with Drei ScrollControls

Multi-page scroll experience where 3D objects and HTML content move together, driven by scroll position. This is the **Corn Revolution** pattern adapted for React.

**Use for:** Full storytelling pages, product journeys, process/how-it-works sections.

**Adapt per project:** Number of pages, content per page, 3D objects per scene.

```tsx
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  ScrollControls,
  Scroll,
  useScroll,
  Float,
  Environment,
  MeshDistortMaterial,
} from '@react-three/drei';
import type { Group } from 'three';
import * as THREE from 'three';

const PAGES = 4;

function ScrollScene() {
  const scroll = useScroll();
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;

    groupRef.current.rotation.y = offset * Math.PI * 2;
    groupRef.current.position.y = -offset * viewport.height * (PAGES - 1);

    groupRef.current.children.forEach((child, i) => {
      const childOffset = offset * PAGES - i;
      const scale = 1 - Math.abs(childOffset) * 0.3;
      child.scale.setScalar(THREE.MathUtils.clamp(scale, 0.3, 1));
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} position={[0, 0, 0]}>
        <mesh>
          <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
          <MeshDistortMaterial color="PRIMARY_HEX" metalness={0.8} roughness={0.2} distort={0.2} speed={2} />
        </mesh>
      </Float>

      <Float speed={1.2} position={[0, -viewport.height, 0]}>
        <mesh>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial color="SECONDARY_HEX" metalness={0.7} roughness={0.3} distort={0.3} speed={1.5} />
        </mesh>
      </Float>

      <Float speed={1} position={[0, -viewport.height * 2, 0]}>
        <mesh>
          <octahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial color="ACCENT_HEX" metalness={0.9} roughness={0.1} distort={0.15} speed={2.5} />
        </mesh>
      </Float>
    </group>
  );
}

export const ScrollStory = () => (
  <ScrollControls pages={PAGES} damping={0.15}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Environment preset="city" />

    <ScrollScene />

    <Scroll html>
      <section className="h-screen flex items-center px-8" style={{ width: '100vw' }}>
        <div className="max-w-xl">
          <span className="text-sm tracking-widest uppercase text-primary/80">Step 01</span>
          <h2 className="text-5xl font-bold text-white mt-2">First Chapter</h2>
          <p className="text-white/60 mt-4 text-lg">Description of the first step in the journey.</p>
        </div>
      </section>

      <section className="h-screen flex items-center px-8" style={{ width: '100vw' }}>
        <div className="max-w-xl ms-auto">
          <span className="text-sm tracking-widest uppercase text-secondary/80">Step 02</span>
          <h2 className="text-5xl font-bold text-white mt-2">Second Chapter</h2>
          <p className="text-white/60 mt-4 text-lg">Description of the second step.</p>
        </div>
      </section>

      <section className="h-screen flex items-center px-8" style={{ width: '100vw' }}>
        <div className="max-w-xl">
          <span className="text-sm tracking-widest uppercase text-accent/80">Step 03</span>
          <h2 className="text-5xl font-bold text-white mt-2">Third Chapter</h2>
          <p className="text-white/60 mt-4 text-lg">Description of the third step.</p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center px-8" style={{ width: '100vw' }}>
        <div className="text-center">
          <h2 className="text-6xl font-bold text-white">Ready?</h2>
          <button className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl text-lg font-bold">
            Get Started
          </button>
        </div>
      </section>
    </Scroll>
  </ScrollControls>
);
```

**Full page usage:**
```tsx
import { Scene3D } from '@/components/scenes/Scene3D';
import { ScrollStory } from '@/components/scenes/ScrollStory';

export const StoryPage = () => (
  <div className="h-screen">
    <Scene3D bgColor="#0a0a0a" className="fixed inset-0">
      <ScrollStory />
    </Scene3D>
  </div>
);
```

---

## Template 7: GlobeScene — Interactive Earth/Sphere

A textured or stylized globe with atmosphere glow. Rotates slowly and responds to mouse. Great for "global reach" messaging.

**Use for:** SaaS hero, "our reach" sections, international presence.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `'#8b5cf6'` | Globe color |
| `atmosphereColor` | string | `'#a78bfa'` | Atmosphere glow color |
| `rotationSpeed` | number | `0.15` | Auto-rotation speed |
| `size` | number | `1.5` | Globe radius |

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import type { Mesh } from 'three';
import * as THREE from 'three';

interface GlobeSceneProps {
  color?: string;
  atmosphereColor?: string;
  rotationSpeed?: number;
  size?: number;
}

export const GlobeScene = ({
  color = '#8b5cf6',
  atmosphereColor = '#a78bfa',
  rotationSpeed = 0.15,
  size = 1.5,
}: GlobeSceneProps) => {
  const globeRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y += delta * rotationSpeed;

    const pointer = state.pointer;
    globeRef.current.rotation.x = THREE.MathUtils.lerp(
      globeRef.current.rotation.x,
      pointer.y * 0.2,
      0.05
    );

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = globeRef.current.rotation.y;
      atmosphereRef.current.rotation.x = globeRef.current.rotation.x;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color={color} />

      {/* Main globe */}
      <Sphere ref={globeRef} args={[size, 64, 64]}>
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.6}
          wireframe
        />
      </Sphere>

      {/* Atmosphere glow — slightly larger, transparent */}
      <Sphere ref={atmosphereRef} args={[size * 1.15, 32, 32]}>
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer glow ring */}
      <Sphere args={[size * 1.3, 32, 32]}>
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};
```

---

## Template 8: CinematicPost — Post-Processing Preset

Bloom + Vignette + subtle ChromaticAberration for a cinematic film look. Drop into any scene.

**Use for:** Any scene that needs the "premium" look — add inside `<Canvas>` after scene contents.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bloomIntensity` | number | `0.8` | Bloom strength (0.5 = subtle, 1.5 = dreamy) |
| `vignetteStrength` | number | `0.5` | Edge darkening |
| `chromaticAberration` | number | `0.003` | Color fringe (0 = off, 0.01 = glitchy) |

```tsx
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface CinematicPostProps {
  bloomIntensity?: number;
  vignetteStrength?: number;
  chromaticAberration?: number;
}

export const CinematicPost = ({
  bloomIntensity = 0.8,
  vignetteStrength = 0.5,
  chromaticAberration = 0.003,
}: CinematicPostProps) => (
  <EffectComposer>
    <Bloom
      intensity={bloomIntensity}
      luminanceThreshold={0.6}
      luminanceSmoothing={0.4}
      mipmapBlur
    />
    <Vignette
      offset={0.3}
      darkness={vignetteStrength}
      blendFunction={BlendFunction.NORMAL}
    />
    {chromaticAberration > 0 && (
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(chromaticAberration, chromaticAberration)}
      />
    )}
  </EffectComposer>
);
```

---

## Template 9: ModelViewer — Load & Display GLTF Model

Load any `.glb`/`.gltf` model with auto-rotation and environment lighting. The pattern for product showcases when you have a 3D model file.

**Use for:** Product display, 3D logo, mascot, any asset from a 3D artist or AI model generator.

**Model sources:** [Sketchfab](https://sketchfab.com), [Poly Haven](https://polyhaven.com), [Meshy AI](https://meshy.ai), [Rodin AI](https://hyperhuman.deemos.com/rodin), [Tripo AI](https://www.tripo3d.ai).

```tsx
import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, ContactShadows, Environment, Center } from '@react-three/drei';
import type { Group } from 'three';

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
}

export const ModelViewer = ({
  modelPath,
  scale = 1,
  rotationSpeed = 0.2,
  floatSpeed = 1.5,
}: ModelViewerProps) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <Environment preset="studio" />

      <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.6}>
        <Center>
          <group ref={groupRef} scale={scale}>
            <primitive object={scene.clone()} />
          </group>
        </Center>
      </Float>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
        resolution={256}
        frames={1}
      />
    </>
  );
};

export const preloadModel = (path: string) => useGLTF.preload(path);
```

**Usage:**
```tsx
import { preloadModel } from '@/components/scenes/ModelViewer';
preloadModel('/models/product.glb');

<Scene3D bgColor="#0a0a0a">
  <Suspense fallback={null}>
    <ModelViewer modelPath="/models/product.glb" scale={2} />
  </Suspense>
  <CinematicPost />
</Scene3D>
```

---

## Template 10: StarsBackground — Cosmic Starfield

An animated starfield using Drei's Stars component. Drop-in background for dark-themed sections.

**Use for:** Hero backgrounds, dark sections, footer atmosphere, space/cosmic themes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | number | `3000` | Star count |
| `color` | string | `'#ffffff'` | Star color |
| `speed` | number | `0.5` | Rotation speed |
| `depth` | number | `50` | Star field depth |

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import type { Points } from 'three';

interface StarsBackgroundProps {
  count?: number;
  color?: string;
  speed?: number;
  depth?: number;
}

export const StarsBackground = ({
  count = 3000,
  color = '#ffffff',
  speed = 0.5,
  depth = 50,
}: StarsBackgroundProps) => {
  const starsRef = useRef<Points>(null);

  useFrame((_, delta) => {
    if (!starsRef.current) return;
    starsRef.current.rotation.y += delta * speed * 0.01;
    starsRef.current.rotation.x += delta * speed * 0.005;
  });

  return (
    <group>
      <Stars
        ref={starsRef}
        radius={depth}
        depth={depth}
        count={count}
        factor={4}
        saturation={0}
        fade
        speed={speed}
      />
      {color !== '#ffffff' && (
        <ambientLight color={color} intensity={0.1} />
      )}
    </group>
  );
};
```

---

## Section Recipes

### Hero Recipe: Floating Shape + Particles + Cinematic Post

```
Scene3D + FloatingProduct + ParticleField + CinematicPost + DOM overlay
```

```tsx
<section className="relative min-h-screen">
  <div className="absolute inset-0">
    <Scene3D bgColor="BG_HEX">
      <ParticleField count={1500} color="PRIMARY_HEX" size={0.01} />
      <FloatingProduct meshColor="PRIMARY_HEX" geometry="torusKnot" />
      <CinematicPost bloomIntensity={0.6} />
    </Scene3D>
  </div>
  <div className="relative z-10 min-h-screen flex items-center">
    {/* Hero text content */}
  </div>
</section>
```

### Hero Recipe: Globe + Stars (SaaS / Global)

```
Scene3D + GlobeScene + StarsBackground + CinematicPost
```

```tsx
<section className="relative min-h-screen">
  <div className="absolute inset-0">
    <Scene3D bgColor="#050510">
      <StarsBackground count={4000} speed={0.3} />
      <GlobeScene color="PRIMARY_HEX" atmosphereColor="SECONDARY_HEX" />
      <CinematicPost bloomIntensity={1} />
    </Scene3D>
  </div>
  <div className="relative z-10 min-h-screen flex items-center justify-center text-center">
    {/* "Global reach" headline */}
  </div>
</section>
```

### Section Background Recipe: Wave + Fog

```
Scene3D + WavePlane (behind content)
```

```tsx
<section className="relative py-24 md:py-32 overflow-hidden">
  <div className="absolute inset-0 opacity-40">
    <Scene3D bgColor="transparent">
      <WavePlane color="PRIMARY_HEX" wireframe amplitude={0.2} speed={0.5} />
    </Scene3D>
  </div>
  <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
    {/* Section content */}
  </div>
</section>
```

### Full Scroll Story Recipe: Immersive Multi-Page

```
Scene3D (fixed) + ScrollStory (full takeover)
```

```tsx
<div className="h-screen">
  <Scene3D bgColor="#0a0a0a" className="fixed inset-0">
    <ScrollStory />
    <CinematicPost bloomIntensity={0.5} />
  </Scene3D>
</div>
```

### Product Showcase Recipe: Model Viewer

```
Scene3D + ModelViewer + CinematicPost
```

```tsx
<section className="relative h-[70vh]">
  <Scene3D bgColor="BG_HEX">
    <Suspense fallback={null}>
      <ModelViewer modelPath="/models/product.glb" scale={1.5} />
    </Suspense>
    <CinematicPost bloomIntensity={0.4} vignetteStrength={0.7} />
  </Scene3D>
</section>
```

---

## Brand Energy Guide

| Brand type | Geometry | Particle count | Distort | Bloom | Speed |
|------------|----------|---------------|---------|-------|-------|
| Calm (wellness, spa) | sphere | 800-1200 | 0.1-0.2 | 0.3-0.5 | 0.5-1.0 |
| Professional (law, finance) | icosahedron | 1000-1500 | 0.1 | 0.4-0.6 | 0.3-0.5 |
| Energetic (fitness, tech) | torusKnot | 2000-4000 | 0.3-0.5 | 0.8-1.2 | 1.5-2.5 |
| Playful (kids, food) | octahedron | 1500-2500 | 0.2-0.4 | 0.6-0.8 | 1.0-2.0 |
| Luxury (fashion, jewelry) | sphere | 1000-1500 | 0.1-0.2 | 0.5-0.7 | 0.3-0.8 |
| Cosmic (SaaS, AI) | globe + stars | 3000-5000 | 0 | 1.0-1.5 | 0.5-1.0 |

---

## Combining with Existing Stack

3D scenes live **alongside** (not replacing) existing effects from `premium-effects`:

```
┌──────────────────────────────┐
│  DOM Layer (z-10+)           │  ← KineticText, ShimmerButton, NumberTicker
├──────────────────────────────┤
│  Overlay Effects (z-0)       │  ← Spotlight, SparklesCore (Canvas 2D)
├──────────────────────────────┤
│  3D Scene (absolute inset-0) │  ← Scene3D + templates from this skill
└──────────────────────────────┘
```

**Rule:** If a section already has a `premium-effects` atmospheric (SparklesCore, BackgroundBeams, LampEffect), do NOT also add a 3D scene background to that same section. Pick one. 3D scenes are for hero/showcase sections; premium-effects are for content sections.
