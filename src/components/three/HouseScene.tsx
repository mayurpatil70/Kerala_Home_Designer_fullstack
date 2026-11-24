"use client";

/**
 * Procedural 3D house that assembles itself as the visitor scrolls.
 * `progress.current` (0 → 1) is written by the BuildStory section's ScrollTrigger.
 *
 * Stages (match site.process.steps):
 *   0.00–0.20  Plan       blueprint lines draw on the grid
 *   0.18–0.40  Engineer   plinth and columns rise
 *   0.36–0.58  Build      walls and glazing grow
 *   0.54–0.78  Finish     slab, upper floor and roof settle in
 *   0.76–1.00  Handover   pool, trees, warm interior lights, dusk sky
 *
 * Want to use your own model instead? Export a .glb, put it in /public/models,
 * and load it with `useGLTF` from @react-three/drei in place of <House />.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Grid, type EdgesRef } from "@react-three/drei";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

/* ───────── helpers ───────── */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const EPS = 0.0001;

const C = {
  blueprint: "#5cc8ff",
  plinth: "#bdb6a8",
  stone: "#e9e4da",
  glass: "#a9d2ec",
  wood: "#8e5f3c",
  slab: "#f1eee8",
  dark: "#26272a",
  edge: "#d4eeff",
  groundSite: "#c9c2b3",
  groundLawn: "#7f9161",
  water: "#3aa3c4",
  glow: "#ffb769",
  trunk: "#5b4330",
  leaf: "#5f7d45",
};

type P = RefObject<number>;

/* ───────── blueprint outline: thin bars that draw in sequence ───────── */
type Seg2 = { from: [number, number]; to: [number, number] };
function rectSegs(cx: number, cz: number, w: number, d: number): Seg2[] {
  const x0 = cx - w / 2, x1 = cx + w / 2, z0 = cz - d / 2, z1 = cz + d / 2;
  return [
    { from: [x0, z0], to: [x1, z0] },
    { from: [x1, z0], to: [x1, z1] },
    { from: [x1, z1], to: [x0, z1] },
    { from: [x0, z1], to: [x0, z0] },
  ];
}

function Blueprint({ progress }: { progress: P }) {
  const segs = useMemo(
    () => [
      ...rectSegs(0, 0, 14, 10),
      ...rectSegs(-4.5, 0, 5, 9),
      ...rectSegs(2.4, 0.2, 8.8, 7.6),
      ...rectSegs(2.8, -0.8, 10, 7),
      ...rectSegs(3, 6.6, 6, 3),
    ],
    [],
  );
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  // Each bar's geometry starts at x = 0, so scaling x grows it from its start point.
  const items = useMemo(
    () =>
      segs.map((s) => {
        const dx = s.to[0] - s.from[0];
        const dz = s.to[1] - s.from[1];
        const len = Math.hypot(dx, dz);
        const geometry = new THREE.BoxGeometry(len, 0.02, 0.07).translate(len / 2, 0, 0);
        return { geometry, angle: Math.atan2(-dz, dx), from: s.from };
      }),
    [segs],
  );
  useEffect(() => () => items.forEach((it) => it.geometry.dispose()), [items]);

  useFrame(() => {
    const p = progress.current ?? 0;
    const n = items.length;
    const fade = 1 - seg(p, 0.42, 0.62);
    for (let i = 0; i < n; i++) {
      const m = bars.current[i];
      if (!m) continue;
      const a = 0.01 + (i / n) * 0.16;
      const t = easeOut(seg(p, a, a + 0.05));
      m.scale.x = Math.max(EPS, t);
      m.visible = t > 0.001 && fade > 0.001;
      (m.material as THREE.MeshBasicMaterial).opacity = fade;
    }
  });

  return (
    <group position={[0, 0.03, 0]}>
      {items.map((it, i) => (
        <group key={i} position={[it.from[0], 0, it.from[1]]} rotation={[0, it.angle, 0]}>
          <mesh
            ref={(m) => {
              bars.current[i] = m;
            }}
            geometry={it.geometry}
            visible={false}
          >
            <meshBasicMaterial color={C.blueprint} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ───────── a box that grows up from its base ───────── */
function Riser({
  progress,
  range,
  size,
  position,
  color,
  edges = true,
  glass = false,
}: {
  progress: P;
  range: [number, number];
  size: [number, number, number];
  position: [number, number, number]; // base centre (y = bottom)
  color: string;
  edges?: boolean;
  glass?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const edge = useRef<EdgesRef>(null);

  useFrame(() => {
    const p = progress.current ?? 0;
    const t = easeOut(seg(p, range[0], range[1]));
    if (group.current) {
      group.current.scale.y = Math.max(EPS, t);
      group.current.visible = t > 0.001;
    }
    if (glass && mat.current) {
      mat.current.emissiveIntensity = 1.5 * easeInOut(seg(p, 0.84, 1));
      mat.current.opacity = 0.42 + 0.3 * seg(p, 0.84, 1);
    }
    const em = edge.current?.material;
    if (em) em.opacity = 0.95 - 0.8 * seg(p, 0.8, 0.95);
  });

  return (
    <group ref={group} position={position} visible={false}>
      <mesh position={[0, size[1] / 2, 0]} castShadow={!glass} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          ref={mat}
          color={color}
          roughness={glass ? 0.08 : 0.85}
          metalness={glass ? 0.2 : 0}
          transparent={glass}
          opacity={glass ? 0.42 : 1}
          emissive={glass ? C.glow : "#000000"}
          emissiveIntensity={0}
        />
        {edges && <Edges ref={edge} color={C.edge} transparent opacity={0.95} threshold={15} />}
      </mesh>
    </group>
  );
}

/* ───────── a box that drops into place from above ───────── */
function Dropper({
  progress,
  range,
  size,
  position,
  color,
  drop = 6,
  glow = false,
}: {
  progress: P;
  range: [number, number];
  size: [number, number, number];
  position: [number, number, number]; // centre
  color: string;
  drop?: number;
  glow?: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const edge = useRef<EdgesRef>(null);

  useFrame(() => {
    const p = progress.current ?? 0;
    const raw = seg(p, range[0], range[1]);
    const t = easeOut(raw);
    if (mesh.current) {
      mesh.current.position.y = position[1] + (1 - t) * drop;
      mesh.current.visible = raw > 0.001;
    }
    if (mat.current) {
      mat.current.opacity = clamp01(raw * 1.6);
      if (glow) mat.current.emissiveIntensity = 1.6 * easeInOut(seg(p, 0.86, 1));
    }
    const em = edge.current?.material;
    if (em) em.opacity = clamp01(raw * 1.6) * (0.95 - 0.8 * seg(p, 0.8, 0.95));
  });

  return (
    <mesh ref={mesh} position={position} castShadow={!glow} receiveShadow visible={false}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={mat}
        color={color}
        roughness={glow ? 0.1 : 0.8}
        transparent
        opacity={0}
        emissive={glow ? C.glow : "#000000"}
        emissiveIntensity={0}
      />
      {!glow && <Edges ref={edge} color={C.edge} transparent opacity={0} threshold={15} />}
    </mesh>
  );
}

/* ───────── landscape ───────── */
const TREES: { pos: [number, number, number]; s: number }[] = [
  { pos: [-9.6, 0, 5.8], s: 1.15 },
  { pos: [-10.4, 0, -3.6], s: 1.35 },
  { pos: [9.6, 0, -4.8], s: 1.25 },
  { pos: [10.4, 0, 2.8], s: 0.95 },
  { pos: [-5.5, 0, -8.2], s: 1.05 },
  { pos: [5.8, 0, -8.4], s: 1.2 },
];

function Trees({ progress }: { progress: P }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame(() => {
    const p = progress.current ?? 0;
    TREES.forEach((tree, i) => {
      const g = refs.current[i];
      if (!g) return;
      const a = 0.8 + i * 0.022;
      const t = seg(p, a, a + 0.08);
      const s = Math.max(EPS, easeBack(t)) * tree.s;
      g.scale.setScalar(s);
      g.visible = t > 0.001;
    });
  });
  return (
    <>
      {TREES.map((tree, i) => (
        <group
          key={i}
          position={tree.pos}
          ref={(g) => {
            refs.current[i] = g;
          }}
          visible={false}
        >
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.17, 1.4, 6]} />
            <meshStandardMaterial color={C.trunk} roughness={1} />
          </mesh>
          <mesh position={[0, 2.1, 0]} castShadow>
            <icosahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial color={C.leaf} roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0.35, 2.75, 0.1]} castShadow>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color={C.leaf} roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Pool({ progress }: { progress: P }) {
  const deck = useRef<THREE.Group>(null);
  const water = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const p = progress.current ?? 0;
    const t = easeOut(seg(p, 0.76, 0.84));
    const w = easeOut(seg(p, 0.8, 0.9));
    if (deck.current) {
      deck.current.scale.set(Math.max(EPS, t), 1, Math.max(EPS, t));
      deck.current.visible = t > 0.001;
    }
    if (water.current) {
      water.current.scale.y = Math.max(EPS, w);
      water.current.visible = w > 0.001;
      const m = water.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.25 + 0.15 * Math.sin(clock.elapsedTime * 1.4) + 0.5 * seg(p, 0.9, 1);
    }
  });
  return (
    <group position={[3, 0, 6.6]}>
      <group ref={deck} visible={false}>
        <mesh position={[0, 0.06, 0]} receiveShadow>
          <boxGeometry args={[8, 0.12, 4.4]} />
          <meshStandardMaterial color={C.slab} roughness={0.9} />
        </mesh>
      </group>
      <mesh ref={water} position={[0, 0.14, 0]} visible={false}>
        <boxGeometry args={[6, 0.08, 3]} />
        <meshStandardMaterial color={C.water} roughness={0.15} metalness={0.1} emissive="#1c6f8c" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

/** Radial alpha texture so the plot fades softly into the background. */
function useSoftEdge() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "#fff");
    grad.addColorStop(0.55, "#fff");
    grad.addColorStop(1, "#000");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function Ground({ progress }: { progress: P }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const alpha = useSoftEdge();
  const site = useMemo(() => new THREE.Color(C.groundSite), []);
  const lawn = useMemo(() => new THREE.Color(C.groundLawn), []);
  useFrame(() => {
    const p = progress.current ?? 0;
    if (!mat.current) return;
    mat.current.opacity = easeOut(seg(p, 0.16, 0.34));
    mat.current.color.copy(site).lerp(lawn, easeInOut(seg(p, 0.8, 0.95)));
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[26, 64]} />
      <meshStandardMaterial ref={mat} color={C.groundSite} roughness={1} transparent opacity={0} alphaMap={alpha} depthWrite={false} />
    </mesh>
  );
}

/* ───────── the house ───────── */
function House({ progress }: { progress: P }) {
  const columns: [number, number, number][] = [
    [-1.9, 0.5, 4.1],
    [2.4, 0.5, 4.1],
    [6.7, 0.5, 4.1],
    [-1.9, 0.5, -3.7],
    [2.4, 0.5, -3.7],
    [6.7, 0.5, -3.7],
  ];
  return (
    <group>
      {/* Engineer: plinth + columns */}
      <Riser progress={progress} range={[0.18, 0.3]} size={[14, 0.5, 10]} position={[0, 0, 0]} color={C.plinth} />
      {columns.map((c, i) => (
        <Riser key={i} progress={progress} range={[0.26 + i * 0.018, 0.36 + i * 0.018]} size={[0.2, 3.2, 0.2]} position={c} color={C.dark} edges={false} />
      ))}

      {/* Build: walls + glazing */}
      <Riser progress={progress} range={[0.36, 0.5]} size={[5, 3.2, 9]} position={[-4.5, 0.5, 0]} color={C.stone} />
      <Riser progress={progress} range={[0.42, 0.56]} size={[8.8, 3.2, 7.6]} position={[2.4, 0.5, 0.2]} color={C.glass} glass />

      {/* Finish: terrace slab, upper floor, glazing strip, roof */}
      <Dropper progress={progress} range={[0.54, 0.62]} size={[14.4, 0.3, 10.2]} position={[0, 3.85, 0]} color={C.slab} drop={3} />
      <Dropper progress={progress} range={[0.6, 0.71]} size={[10, 2.9, 7]} position={[2.8, 5.45, -0.8]} color={C.wood} drop={7} />
      <Dropper progress={progress} range={[0.64, 0.73]} size={[7, 1.3, 0.08]} position={[2.6, 5.5, 2.74]} color={C.glass} drop={7} glow />
      <Dropper progress={progress} range={[0.64, 0.73]} size={[0.08, 1.3, 4.2]} position={[7.84, 5.5, -0.6]} color={C.glass} drop={7} glow />
      <Dropper progress={progress} range={[0.67, 0.77]} size={[11, 0.3, 8]} position={[2.8, 7.05, -0.8]} color={C.slab} drop={6} />
      <Dropper progress={progress} range={[0.7, 0.78]} size={[4.8, 0.9, 0.06]} position={[-4.6, 4.45, 5.02]} color={C.glass} drop={4} glow />
    </group>
  );
}

/* ───────── lights + camera ───────── */
function Rig({ progress, pointer }: { progress: P; pointer: RefObject<{ x: number; y: number }> }) {
  const { camera, size } = useThree();
  const sun = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const warmA = useRef<THREE.PointLight>(null);
  const warmB = useRef<THREE.PointLight>(null);
  const smooth = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const posCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 40, 19),
        new THREE.Vector3(19, 28, 30),
        new THREE.Vector3(31, 17, 16),
        new THREE.Vector3(-6, 16, 35),
        new THREE.Vector3(24, 9, 27),
      ]),
    [],
  );
  const lookCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 1, 0.5),
        new THREE.Vector3(0.5, 2, 0),
        new THREE.Vector3(0.5, 2.6, 0),
        new THREE.Vector3(0.8, 2.8, 0.5),
      ]),
    [],
  );
  const sunDay = useMemo(() => new THREE.Color("#fff4e6"), []);
  const sunDusk = useMemo(() => new THREE.Color("#ff9a5c"), []);
  const skyDay = useMemo(() => new THREE.Color("#d6e4ff"), []);
  const skyDusk = useMemo(() => new THREE.Color("#5b5f86"), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  // Frame the house beside the text: shift it right on wide screens, up on tall ones
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const { width: w, height: h } = size;
    if (w / h >= 1.1) cam.setViewOffset(w, h, -w * 0.15, 0, w, h);
    else cam.setViewOffset(w, h, 0, h * 0.1, w, h);
    cam.updateProjectionMatrix();
    return () => {
      cam.clearViewOffset();
      cam.updateProjectionMatrix();
    };
  }, [camera, size]);

  useFrame((_, delta) => {
    const target = progress.current ?? 0;
    smooth.current += (target - smooth.current) * Math.min(1, delta * 5);
    const p = smooth.current;

    // Camera path, pulled back on tall / narrow screens so the whole house fits
    const aspect = size.width / size.height;
    const fit = aspect < 1.25 ? Math.min(1.7, 1.25 / aspect) : 1;
    posCurve.getPoint(p, pos);
    lookCurve.getPoint(p, look);
    pos.sub(look).multiplyScalar(fit).add(look);

    const m = pointer.current ?? { x: 0, y: 0 };
    mouse.current.x += (m.x - mouse.current.x) * Math.min(1, delta * 3);
    mouse.current.y += (m.y - mouse.current.y) * Math.min(1, delta * 3);
    camera.position.set(pos.x + mouse.current.x * 1.2, pos.y + mouse.current.y * 0.8, pos.z);
    camera.lookAt(look);

    // Day → dusk
    const dusk = easeInOut(seg(p, 0.8, 1));
    if (sun.current) {
      sun.current.intensity = 2.4 - 1.3 * dusk;
      sun.current.color.copy(sunDay).lerp(sunDusk, dusk);
    }
    if (hemi.current) {
      hemi.current.intensity = 1.1 - 0.4 * dusk;
      hemi.current.color.copy(skyDay).lerp(skyDusk, dusk);
    }
    const glow = easeInOut(seg(p, 0.86, 1));
    if (warmA.current) warmA.current.intensity = 22 * glow;
    if (warmB.current) warmB.current.intensity = 16 * glow;
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={["#d6e4ff", "#3b342c", 1.1]} />
      <directionalLight
        ref={sun}
        position={[14, 22, 10]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0004}
      />
      <pointLight ref={warmA} position={[2.4, 2.2, 0.5]} color="#ffb769" intensity={0} distance={14} decay={1.6} />
      <pointLight ref={warmB} position={[2.8, 5.4, 0]} color="#ffb769" intensity={0} distance={12} decay={1.6} />
    </>
  );
}

function Scene({ progress, pointer }: { progress: P; pointer: RefObject<{ x: number; y: number }> }) {
  const gridRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const p = progress.current ?? 0;
    if (gridRef.current) gridRef.current.visible = p < 0.6;
  });
  return (
    <>
      <Rig progress={progress} pointer={pointer} />
      <Grid
        ref={gridRef}
        position={[0, -0.02, 0]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#1f6fa8"
        sectionSize={5}
        sectionThickness={1.1}
        sectionColor="#5cc8ff"
        fadeDistance={55}
        fadeStrength={1.6}
        infiniteGrid
      />
      <Ground progress={progress} />
      <Blueprint progress={progress} />
      <House progress={progress} />
      <Pool progress={progress} />
      <Trees progress={progress} />
    </>
  );
}

export default function HouseScene({ progress, active }: { progress: P; active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 32, near: 0.5, far: 200, position: [0, 32, 16] }}
      aria-label="3D model of a house being built, stage by stage"
      role="img"
    >
      <Scene progress={progress} pointer={pointer} />
    </Canvas>
  );
}
