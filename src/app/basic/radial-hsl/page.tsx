"use client";

import BasicFragmentShader from "@/components/shaders/BasicFragmentShader";
import fragmentShader from "./fragment.glsl";


export default function Page() {
  return (
      <BasicFragmentShader fragmentShader={fragmentShader} />
  );
}