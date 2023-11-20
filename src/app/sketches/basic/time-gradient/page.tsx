'use client'

import ManagedFragmentShader from '@/components/shaders/ManagedFragmentShader';
import fragmentShader from './fragment.glsl'

export default function Page() {
  return (
    <ManagedFragmentShader fragmentShader={fragmentShader} />
  )
}