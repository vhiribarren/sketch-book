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
};

function VoronoiNoiseControl({controlUiTunnel}: FragmentLogic) {

    const [cellCount, setCellCount] = useUniform("u_cell_count", UNIFORMS.u_cell_count.value);

    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Number of cells" onChange={setCellCount} value={cellCount} min={1} max={1000} allowDecimal={false} />
            </div>
        </ControlUiTunnel>
    );
}


export default function Page() {
    return (
        <FragmentView
            title="Voronoi Noise"
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            withUi={true}
            control={VoronoiNoiseControl} />
    );
}