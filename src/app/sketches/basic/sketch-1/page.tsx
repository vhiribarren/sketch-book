'use client'

import FragmentCanvas from '@/components/FragmentCanvas'
import fragmentShader from './fragment.glsl'

export default function Page() {
  return (
    <FragmentCanvas fragmentShader={fragmentShader} />
  )
}