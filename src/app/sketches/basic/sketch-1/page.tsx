'use client'

import { Fragment, FragmentCanvas } from '@/components/FragmentCanvas'
import fragmentShader from './fragment.glsl'

export default function Page() {
  return (
    <FragmentCanvas>
      <Fragment fragmentShader={fragmentShader} />
    </FragmentCanvas>
  )
}