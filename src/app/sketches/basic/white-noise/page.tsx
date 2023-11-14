'use client'

import { ForwardedRef, forwardRef, useRef } from "react";
import { ShaderMaterial } from "three";
import { Slider } from 'antd';
import Fragment from "@/components/shaders/Fragment";
import FragmentCanvas from "@/components/shaders/FragmentCanvas";
import fragmentShader from './fragment.glsl'


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
    const materialRef = useRef<ShaderMaterial>(null);
    const onFreqChange = (newValue: number) => {
        (materialRef.current as ShaderMaterial).uniforms.u_frequence.value = newValue;
    };
    return (
        <>
            <Slider min={2} max={500} defaultValue={30} tooltip={{ open: true }} onChange={onFreqChange} />
            <FragmentCanvas>
                <WhiteNoiseFragment ref={materialRef} />
            </FragmentCanvas>
        </>

    )
}