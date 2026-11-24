"use client";

/**
 * 3D version of The Home Designers logo in sky blue.
 * Built by extruding the exact logo vector paths (see brand/logoPaths.ts), so the
 * 3D logo always matches the flat logo. Each part assembles on load, then the logo
 * floats, tilts toward the pointer and turns as the visitor scrolls.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { LOGO_PATHS, LOGO_VIEWBOX, type LogoPart } from "@/components/brand/logoPaths";
import { gsap, onIntro, prefersReducedMotion } from "@/lib/gsap";

const SKY = "#35adec";

type PartSpec = { part: LogoPart; depth: number; bevel: number; z: number };
const SPECS: PartSpec[] = [
  { part: "the", depth: 70, bevel: 6, z: 0 },
  { part: "roof", depth: 110, bevel: 8, z: 10 },
  { part: "home", depth: 70, bevel: 6, z: 0 },
  { part: "bar", depth: 46, bevel: 4, z: 0 },
  { part: "bar2", depth: 30, bevel: 2, z: 0 },
  { part: "designers", depth: 80, bevel: 6, z: 0 },
  { part: "line", depth: 26, bevel: 2, z: 0 },
  { part: "tagline", depth: 22, bevel: 1.2, z: 0 },
  { part: "line2", depth: 26, bevel: 2, z: 0 },
];

/** Logo units → world units */
const S = 0.0052;
const CX = LOGO_VIEWBOX.x + LOGO_VIEWBOX.w / 2;
const CY = LOGO_VIEWBOX.y + LOGO_VIEWBOX.h / 2;

function useLogoGeometries() {
  const geos = useMemo(() => {
    const loader = new SVGLoader();
    return SPECS.map((spec) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="${LOGO_PATHS[spec.part]}"/></svg>`;
      const data = loader.parse(svg);
      const shapes = data.paths.flatMap((p) => p.toShapes());
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth: spec.depth,
        bevelEnabled: true,
        bevelThickness: spec.bevel,
        bevelSize: spec.bevel * 0.6,
        bevelSegments: 3,
        curveSegments: spec.part === "tagline" ? 4 : 8,
      });
      // Centre on the logo's middle; depth centred on z = 0
      geo.translate(-CX, -CY, -spec.depth / 2);
      geo.computeVertexNormals();
      return { spec, geo };
    });
  }, []);
  useEffect(() => () => geos.forEach((g) => g.geo.dispose()), [geos]);
  return geos;
}

function Logo({ scroll, pointer }: { scroll: RefObject<number>; pointer: RefObject<{ x: number; y: number }> }) {
  const geos = useLogoGeometries();
  const root = useRef<THREE.Group>(null);
  const parts = useRef<(THREE.Group | null)[]>([]);
  const { size } = useThree();
  const tilt = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: SKY,
        roughness: 0.26,
        metalness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
      }),
    [],
  );
  useEffect(() => () => material.dispose(), [material]);

  // Assemble the logo once the preloader has lifted
  useEffect(() => {
    const groups = parts.current.filter(Boolean) as THREE.Group[];
    if (!groups.length) return;
    if (prefersReducedMotion()) return;
    const from: Record<LogoPart, { x?: number; y?: number; z?: number; rx?: number; ry?: number; sx?: number }> = {
      the: { x: -900, z: 400, ry: 0.8 },
      roof: { y: 900, z: 300, rx: -0.9 },
      home: { x: 900, z: 400, ry: -0.8 },
      bar: { sx: 0.001 },
      bar2: { sx: 0.001 },
      designers: { y: -700, z: 500, rx: 0.9 },
      line: { sx: 0.001 },
      tagline: { y: -300, z: 200 },
      line2: { sx: 0.001 },
    };
    groups.forEach((g, i) => {
      const f = from[SPECS[i].part];
      g.position.set(f.x ?? 0, f.y ?? 0, f.z ?? 0);
      g.rotation.set(f.rx ?? 0, f.ry ?? 0, 0);
      g.scale.set(f.sx ?? 1, 1, 1);
      g.visible = false;
    });
    let tl: gsap.core.Timeline | null = null;
    const off = onIntro(() => {
      tl = gsap.timeline({ delay: 0.25 });
      groups.forEach((g, i) => {
        const at = [0, 0.15, 0.3, 0.42, 0.5, 0.58, 0.75, 0.85, 0.92][i] ?? i * 0.1;
        tl!.set(g, { visible: true }, at);
        tl!.to(g.position, { x: 0, y: 0, z: 0, duration: 1.6, ease: "expo.out" }, at);
        tl!.to(g.rotation, { x: 0, y: 0, duration: 1.8, ease: "expo.out" }, at);
        tl!.to(g.scale, { x: 1, duration: 1.4, ease: "expo.inOut" }, at);
      });
    });
    return () => {
      off();
      tl?.kill();
    };
  }, [geos]);

  useFrame(({ clock }, delta) => {
    const g = root.current;
    if (!g) return;
    const p = scroll.current ?? 0;
    const t = clock.elapsedTime;
    const m = pointer.current ?? { x: 0, y: 0 };
    tilt.current.x += (m.y * 0.18 - tilt.current.x) * Math.min(1, delta * 3);
    tilt.current.y += (m.x * 0.32 - tilt.current.y) * Math.min(1, delta * 3);

    // Fit the logo to the canvas
    const aspect = size.width / size.height;
    const fit = Math.min(1, aspect / 1.15);

    g.rotation.x = -0.08 + tilt.current.x + Math.sin(t * 0.6) * 0.03 + p * 0.25;
    g.rotation.y = -0.18 + tilt.current.y + Math.sin(t * 0.4) * 0.05 + p * 1.1;
    g.position.y = Math.sin(t * 0.8) * 0.08 + p * 1.2;
    const sc = fit * (1 - p * 0.25);
    g.scale.setScalar(sc);
  });

  return (
    <group ref={root}>
      {/* Flip Y: SVG y points down */}
      <group scale={[S, -S, S]}>
        {geos.map(({ spec, geo }, i) => (
          <group
            key={spec.part}
            ref={(el) => {
              parts.current[i] = el;
            }}
          >
            <mesh geometry={geo} material={material} position={[0, 0, spec.z]} castShadow />
          </group>
        ))}
      </group>
    </group>
  );
}

export default function LogoScene({ scroll, active }: { scroll: RefObject<number>; active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, position: [0, 0, 22], near: 0.1, far: 100 }}
      role="img"
      aria-label="3D logo of The Home Designers"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 10]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-8, -2, 4]} intensity={1.1} color="#9fdcff" />
      <pointLight position={[0, 0, 8]} intensity={20} color="#bfe9ff" distance={30} />
      {/* Studio reflections, generated locally (no network) */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 6]} scale={[12, 2, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 0, 4]} rotation={[0, Math.PI / 3, 0]} scale={[6, 6, 1]} color="#8fd6ff" />
        <Lightformer form="rect" intensity={1.5} position={[6, -2, 4]} rotation={[0, -Math.PI / 3, 0]} scale={[6, 4, 1]} />
        <Lightformer form="circle" intensity={2} position={[0, -6, 2]} scale={4} color="#1b6fae" />
      </Environment>
      <Logo scroll={scroll} pointer={pointer} />
    </Canvas>
  );
}
