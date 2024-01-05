"use client";

import { NumberInput } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";

function ValueNoiseRaymarchControl({controlUiTunnel}: FragmentLogic) {

    const [freqCount, setFreqCount] = useUniform("u_freq_count", 8);
    const [freqBase, setFreqBase] = useUniform("u_freq_base", 2.0);
    const [lacunarity, setLacunarity] = useUniform("u_lacunarity", 2.0);
    const [gain, setGain] = useUniform("u_gain", 0.5);
    const [shiftX, setShiftX] = useUniform("u_shift_x", 0.0);
    const [shiftY, setShiftY] = useUniform("u_shift_y", 0.0);
    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Number of frequences" onChange={setFreqCount} value={freqCount} min={1} max={10} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Base frequence" onChange={setFreqBase} value={freqBase} min={0.0} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Lacunarity" onChange={setLacunarity} value={lacunarity} min={0.0} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Gain" onChange={setGain} value={gain} min={0.0} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift X" onChange={setShiftX} value={shiftX} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift Y" onChange={setShiftY} value={shiftY} step={0.1} decimalScale={2} />
            </div>
        </ControlUiTunnel>
    );
}

export default function Page() {
    return (
        <FragmentView
            title="Raymarching with Value Noise"
            fragmentShader={fragmentShader}
            withUi={true}
            control={ValueNoiseRaymarchControl} />
    );
}