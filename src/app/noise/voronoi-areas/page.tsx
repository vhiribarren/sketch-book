"use client";

import { NumberInput, Select } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";


const DISTANCE_TYPE = ["Euclidean Distance", "Manhattan Distance"];

function VoronoiNoiseControl({controlUiTunnel}: FragmentLogic) {
    const [cellCount, setCellCount] = useUniform("u_cell_count", 20);
    const [distanceType, setDistanceType] = useUniform("u_distance_type", 0);
    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Number of cells" onChange={setCellCount} value={cellCount} min={1} max={1000} allowDecimal={false} />
                <Select
                    className={styles.shaderControl}
                    label="Distance algorithm"
                    placeholder="Pick value"
                    data={DISTANCE_TYPE}
                    value={DISTANCE_TYPE[distanceType]}
                    onChange={(e) => setDistanceType(DISTANCE_TYPE.indexOf(e!))} />
            </div>
        </ControlUiTunnel>
    );
}


export default function Page() {
    return (
        <FragmentView
            title="Voronoi Areas"
            fragmentShader={fragmentShader}
            withUi={true}
            control={VoronoiNoiseControl} />
    );
}