'use client'

import { ForwardedRef, forwardRef, useCallback, useState } from "react";
import { ShaderMaterial } from "three";
import { Group, NumberInput, Slider, Text } from '@mantine/core';
import Fragment from "@/components/shaders/Fragment";
import fragmentShader from './fragment.glsl'
import { FragmentView } from "@/components/shaders/FragmentView";

const UNIFORMS = {
    u_frequence: {
        value: 4.0,
    },
};

export default function Page() {

    const [frequence, setFrequence] = useState<number | string>(UNIFORMS.u_frequence.value);

    const materialRef = useCallback((material: ShaderMaterial) => {
        if (material !== null) {
            material.uniforms.u_frequence.value = frequence;
        }
    }, [frequence]);

    return (
        <FragmentView
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            materialRef={materialRef}>
            <Group wrap="nowrap">
                <Slider onChange={setFrequence} value={typeof frequence === 'string' ? 0 : frequence} style={{ minWidth: 200 }} min={2} max={500} />
                <NumberInput onChange={setFrequence} value={frequence} min={2} max={500} />
            </Group>
            <Text>Height frequency</Text>
        </FragmentView>
    );
}