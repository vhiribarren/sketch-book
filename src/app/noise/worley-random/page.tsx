"use client";

import { NumberInput } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";

const UNIFORMS = {
    u_cell_count: {
        value: 20,
    },
    u_luminosity: {
        value: 2.0,
    },
};

function VoronoidNoiseControl({controlUiTunnel}: FragmentLogic) {

    const [cellCount, setCellCount] = useUniform("u_cell_count", UNIFORMS.u_cell_count.value);
    const [luminosity, setLuminosity] = useUniform("u_luminosity", UNIFORMS.u_luminosity.value);

    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Number of cells" onChange={setCellCount} value={cellCount} min={1} max={1000} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Luminosity" onChange={setLuminosity} value={luminosity} min={0.0} max={10.0} step={0.1} decimalScale={2}  />
            </div>
        </ControlUiTunnel>
    );
}


export default function Page() {
    return (
        <FragmentView
            title="Random Worley Noise"
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            withUi={true}
            control={VoronoidNoiseControl} />
    );
}