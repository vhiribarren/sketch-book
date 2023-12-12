"use client";

import { FragmentView } from "./FragmentView";
import { useUniformClock } from "./uniforms";

type ManagedFragmentShaderProps = {
  fragmentShader: string,
  withTime: boolean,
  title?: string,
  description?: string,
}

function ManagedFragmentShaderControl() {
  useUniformClock("u_time");
  return null;
}

export default function ManagedFragmentShader({ fragmentShader, withTime, title, description }: ManagedFragmentShaderProps) {
  return (
    <FragmentView
      title={title}
      description={description}
      autoRender={withTime}
      fragmentShader={fragmentShader}
      control={ManagedFragmentShaderControl} />
  );
}