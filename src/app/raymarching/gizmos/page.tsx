"use client";

import { NumberInput } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";

function GizmosControl({controlUiTunnel}: FragmentLogic) {

    const [raymarchMaxSteps, setRaymarchMaxSteps] = useUniform("u_raymarch_max_steps", 500);
    const [raymarchDelta, setRaymarchDelta] = useUniform("u_raymarch_delta", 0.01);
    const [focalLength, setFocalLength] = useUniform("u_focal_length", 1.0);
    const [shiftX, setShiftX] = useUniform("u_shift_x", 1.0);
    const [shiftY, setShiftY] = useUniform("u_shift_y", 1.0);
    const [shiftZ, setShiftZ] = useUniform("u_shift_z", 5.0);

    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Raymarch Max Steps" onChange={setRaymarchMaxSteps} value={raymarchMaxSteps} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Raymarch Delta" onChange={setRaymarchDelta} value={raymarchDelta} step={0.01} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Focal Length" onChange={setFocalLength} value={focalLength} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift X" onChange={setShiftX} value={shiftX} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift Y" onChange={setShiftY} value={shiftY} step={0.1} decimalScale={2} />
                <NumberInput className={styles.shaderControl} label="Shift Z" onChange={setShiftZ} value={shiftZ} step={0.1} decimalScale={2} />
            </div>
        </ControlUiTunnel>
    );
}

export default function Page() {
    return (
        <FragmentView
            title="Gizmos"
            fragmentShader={fragmentShader}
            withUi={true}
            control={GizmosControl} />
    );
}