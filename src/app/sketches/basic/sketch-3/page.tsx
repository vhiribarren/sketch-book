'use client'


import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from 'three';

import { useMemo, useRef } from "react";
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'


const Fragment = () => {

  const mesh = useRef<Mesh>(null!);
  const viewport = useThree(state => state.viewport)
  const uniforms = useMemo(
    () => ({
      u_time: {
        type: "f",
        value: 1.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    (mesh.current.material as ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
      <Fragment />
    </Canvas>
  );
};

export default function Page() {
  return (
    <Scene />
  )
}