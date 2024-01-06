"use client";

import { NumberInput, Switch } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";

function ValueNoiseRaymarchControl({controlUiTunnel}: FragmentLogic) {

    const [gizmos, setGizmos] = useUniform("u_with_gizmos", false);

    const [freqCount, setFreqCount] = useUniform("u_freq_count", 8);
    const [freqBase, setFreqBase] = useUniform("u_freq_base", 2.0);
    const [lacunarity, setLacunarity] = useUniform("u_lacunarity", 2.0);
    const [gain, setGain] = useUniform("u_gain", 0.5);

    const [raymarchMaxSteps, setRaymarchMaxSteps] = useUniform("u_raymarch_max_steps", 50);
    const [raymarchDelta, setRaymarchDelta] = useUniform("u_raymarch_delta", 0.001);
    const [withLinearSteps, setWithLinearSteps] = useUniform("u_with_linear_steps", true);

    const [focalLength, setFocalLength] = useUniform("u_focal_length", 1.0);
    const [shiftX, setShiftX] = useUniform("u_shift_x", 0.0);
    const [shiftY, setShiftY] = useUniform("u_shift_y", 1.5);
    const [shiftZ, setShiftZ] = useUniform("u_shift_z", -2.0);

    const [pitch, setPitch] = useUniform("u_pitch", 0.0);
    const [yaw, setYaw] = useUniform("u_yaw", 0.0);


    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Number of frequences" onChange={setFreqCount} value={freqCount} min={1} max={10} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Base frequence" onChange={setFreqBase} value={freqBase} min={0.0} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Lacunarity" onChange={setLacunarity} value={lacunarity} min={0.0} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Gain" onChange={setGain} value={gain} min={0.0} step={0.1} decimalScale={2} />
                <Switch
                    className={styles.shaderControl}
                    label="Increasing steps"
                    checked={withLinearSteps}
                    onChange={(e) => setWithLinearSteps(e.currentTarget.checked)}
                />
                <NumberInput className={styles.shaderControl} label="Raymarch Max Steps" onChange={setRaymarchMaxSteps} value={raymarchMaxSteps} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Raymarch Delta" onChange={setRaymarchDelta} value={raymarchDelta} step={0.01} decimalScale={4} />
                <NumberInput className={styles.shaderControl} label="Focal Length" onChange={setFocalLength} value={focalLength} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Yaw" onChange={setYaw} value={yaw} />
                <NumberInput className={styles.shaderControl} label="Pitch" onChange={setPitch} value={pitch} />
                <NumberInput className={styles.shaderControl} label="Shift X" onChange={setShiftX} value={shiftX} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift Y" onChange={setShiftY} value={shiftY} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift Z" onChange={setShiftZ} value={shiftZ} step={0.1} decimalScale={2} />
                <Switch
                    className={styles.shaderControl}
                    label="With Gizmos"
                    checked={gizmos}
                    onChange={(e) => setGizmos(e.currentTarget.checked)}
                />
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