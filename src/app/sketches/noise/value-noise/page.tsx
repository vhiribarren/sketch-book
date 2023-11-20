'use client'

import { RefObject, useCallback, useState } from "react";
import { ShaderMaterial } from "three";
import { NumberInput } from '@mantine/core';
import fragmentShader from './fragment.glsl'
import { FragmentView } from "@/components/shaders/FragmentView";

const UNIFORMS = {
    u_freq_count: {
        value: 1,
    },
    u_freq_base: {
        value: 2.0,
    },
    u_lacunarity: {
        value: 2.0,
    },
    u_gain: {
        value: 0.5,
    },
    u_shift_x: {
        value: 0.0,
    },
    u_shift_y: {
        value: 0.0,
    },
};

export default function Page() {

    const [freqCount, setFreqCount] = useState<number | string>(UNIFORMS.u_freq_count.value);
    const [freqBase, setFreqBase] = useState<number | string>(UNIFORMS.u_freq_base.value);
    const [lacunarity, setLacunarity] = useState<number | string>(UNIFORMS.u_lacunarity.value);
    const [gain, setGain] = useState<number | string>(UNIFORMS.u_gain.value);
    const [shiftX, setShiftX] = useState<number | string>(UNIFORMS.u_shift_x.value);
    const [shiftY, setShiftY] = useState<number | string>(UNIFORMS.u_shift_y.value);

    const materialRef = useCallback((material: ShaderMaterial) => {
        if (material !== null) {
            material.uniforms.u_freq_count.value = freqCount;
            material.uniforms.u_freq_base.value = freqBase;
            material.uniforms.u_lacunarity.value = lacunarity;
            material.uniforms.u_gain.value = gain;
            material.uniforms.u_shift_x.value = shiftX;
            material.uniforms.u_shift_y.value = shiftY;
        }
    }, [freqCount, freqBase, lacunarity, gain, shiftX, shiftY]) as unknown as RefObject<ShaderMaterial>;

    return (
        <FragmentView
            title="Value Noise"
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            materialRef={materialRef}>

            <NumberInput label="Number of frequences" onChange={setFreqCount} value={freqCount} min={1} max={10} allowDecimal={false} />
            <NumberInput label="Base frequence" onChange={setFreqBase} value={freqBase} min={0.0} decimalScale={2} />
            <NumberInput label="Lacunarity" onChange={setLacunarity} value={lacunarity} min={0.0} step={0.1} decimalScale={2} />
            <NumberInput label="Gain" onChange={setGain} value={gain} min={0.0} step={0.1} decimalScale={2} />
            <NumberInput label="Shift X" onChange={setShiftX} value={shiftX} step={0.1} decimalScale={2} />
            <NumberInput label="Shift Y" onChange={setShiftY} value={shiftY} step={0.1} decimalScale={2} />

        </FragmentView>
    );
}