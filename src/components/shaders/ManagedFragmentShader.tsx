'use client'

import { ShaderMaterial } from 'three';
import { useRef } from "react";
import { FragmentView } from "./FragmentView";
import { RenderCallback } from '@react-three/fiber';
import { FragmentHandle } from './Fragment';

type ManagedFragmentShaderProps = {
  fragmentShader: string,
  withTime: boolean,
}

const UNIFORMS = {
  u_time: {
    value: 1.0,
  },
};

export default function ManagedFragmentShader({ fragmentShader, withTime }: ManagedFragmentShaderProps) {

  const fragmentRef = useRef<FragmentHandle>(null!);
  const useFrameFn: RenderCallback = (state) => {
    const { clock } = state;
    if (fragmentRef.current) {
      fragmentRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  }

  return (
    <FragmentView
      autoRender={withTime}
      fragmentShader={fragmentShader}
      uniforms={UNIFORMS}
      useFrameFn={useFrameFn}
      fragmentRef={fragmentRef} />
  )
}