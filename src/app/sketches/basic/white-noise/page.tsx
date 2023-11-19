'use client'

import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { ShaderMaterial } from "three";
import { Group, NumberInput, Slider, Text } from '@mantine/core';
import Fragment from "@/components/shaders/Fragment";
import fragmentShader from './fragment.glsl'
import { FragmentView } from "@/components/shaders/FragmentView";


const WhiteNoiseFragment = forwardRef(
    function WhiteNoiseFragment(props, ref: ForwardedRef<ShaderMaterial>) {
        const uniforms = {
            u_frequence: {
                type: "f",
                value: 10.0,
            },
        };
        return (
            <Fragment fragmentShader={fragmentShader} uniforms={uniforms} ref={ref} />
        )
    }
);


export default function Page() {
    const [frequence, setFrequence] = useState<number | string>(4);
    const materialRef = useRef<ShaderMaterial>(null);
    useEffect(() => {
        if ( ! materialRef.current ) {
            return;
        }
        (materialRef.current as ShaderMaterial).uniforms.u_frequence.value = frequence;
    }, [frequence]);
    return (
        <FragmentView
            fragment={
                <WhiteNoiseFragment ref={materialRef} />
            }
            control={<>
                <Group wrap="nowrap">
                    <Slider value={typeof frequence === 'string' ? 0 : frequence} style={{ minWidth: 200 }} min={2} max={500} defaultValue={30} onChange={setFrequence} />
                    <NumberInput value={frequence} onChange={setFrequence} />
                </Group>
                <Text>Height frequency</Text>
            </>
            }
        />
    );
}