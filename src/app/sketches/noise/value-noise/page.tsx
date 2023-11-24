"use client";

import { useCallback, useState } from "react";
import { NumberInput } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentView } from "@/components/shaders/FragmentView";
import { FragmentHandle } from "@/components/shaders/Fragment";
import styles from "./page.module.css";

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

    const fragmentRef = useCallback((fragmentHandler: FragmentHandle | null) => {
        if (fragmentHandler?.uniforms) {
            fragmentHandler.uniforms.u_freq_count.value = freqCount;
            fragmentHandler.uniforms.u_freq_base.value = freqBase;
            fragmentHandler.uniforms.u_lacunarity.value = lacunarity;
            fragmentHandler.uniforms.u_gain.value = gain;
            fragmentHandler.uniforms.u_shift_x.value = shiftX;
            fragmentHandler.uniforms.u_shift_y.value = shiftY;
            fragmentHandler.render();
        }
    }, [freqCount, freqBase, lacunarity, gain, shiftX, shiftY]);

    return (
        <FragmentView
            title="Value Noise"
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            fragmentRef={fragmentRef}>

            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Number of frequences" onChange={setFreqCount} value={freqCount} min={1} max={10} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Base frequence" onChange={setFreqBase} value={freqBase} min={0.0} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Lacunarity" onChange={setLacunarity} value={lacunarity} min={0.0} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Gain" onChange={setGain} value={gain} min={0.0} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift X" onChange={setShiftX} value={shiftX} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift Y" onChange={setShiftY} value={shiftY} step={0.1} decimalScale={2} />
            </div>

        </FragmentView>
    );
}