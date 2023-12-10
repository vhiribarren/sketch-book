"use client";

import { useFrame } from "@react-three/fiber";
import { FragmentLogic, FragmentView } from "./FragmentView";

type ManagedFragmentShaderProps = {
  fragmentShader: string,
  withTime: boolean,
  title?: string,
  description?: string,
}

const UNIFORMS = {
  u_time: {
    value: 1.0,
  },
};

function ManagedFragmentShaderControl({fragmentRef}: FragmentLogic) {
  useFrame((state) => {
    const { clock } = state;
    if (fragmentRef.current?.uniforms) {
      fragmentRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });
  return null;
}

export default function ManagedFragmentShader({ fragmentShader, withTime, title, description }: ManagedFragmentShaderProps) {
  return (
    <FragmentView
      title={title}
      description={description}
      autoRender={withTime}
      uniforms={UNIFORMS}
      fragmentShader={fragmentShader}
      control={ManagedFragmentShaderControl} />
  );
}