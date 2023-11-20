'use client'

import { RefObject, useCallback, useState } from "react";
import { ShaderMaterial } from "three";
import { Group, NumberInput, Slider, Text } from '@mantine/core';
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
    }, [frequence]) as unknown as RefObject<ShaderMaterial>;

    return (
        <FragmentView
            title="White Noise"
            description="Simple raw white noise without any processing. Frequency can be modified."
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