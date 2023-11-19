'use client'

import { useFrame } from "@react-three/fiber";
import { ShaderMaterial } from 'three';
import { useRef } from "react";
import Fragment from "@/components/shaders/Fragment";
import { FragmentView } from "./FragmentView";

type ManagedFragmentShaderProps = {
  fragmentShader: string,
}

function FragmentWithManagedUniforms({ fragmentShader }: ManagedFragmentShaderProps) {
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

export default function ManagedFragmentShader({ fragmentShader }: ManagedFragmentShaderProps) {
  return (
    <FragmentView
      fragment={<FragmentWithManagedUniforms fragmentShader={fragmentShader} />}
    />
  )
}