'use client'

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from 'three';
import { useMemo, useRef, useState } from "react";
import fragmentShader from './fragment.glsl'
import { FragmentCanvas, Fragment } from "@/components/FragmentCanvas";

function MyFragment() {
  const materialRef = useRef(null!);
  const uniforms = {
      u_time: {
        type: "f",
        value: 1.0,
      },
    };

  useFrame((state) => {
    const { clock } = state;
    (materialRef.current as ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <Fragment fragmentShader={fragmentShader} uniforms={uniforms} ref={materialRef} />
  )
}

export default function Page() {
  return (
    <FragmentCanvas>
      <MyFragment />
    </FragmentCanvas>
  )
}