"use client";

import { NumberInput, Select, Switch } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";


const DISTANCE_TYPE = ["Euclidean Distance", "Manhattan Distance"];
const DRAW_TYPE = ["Worley field", "Voronoi Area", "Lines"];

function VoronoiNoiseControl({controlUiTunnel}: FragmentLogic) {
    const [freq, setFreq] = useUniform<number>("u_frequence", 20.0);
    const [linePrecision, setLinePrecision] = useUniform("u_line_precision", 0.05);
    const [distanceType, setDistanceType] = useUniform("u_distance_type", 0);
    const [drawType, setDrawType] = useUniform<number>("u_draw_type", 0);
    const [displayCellCenter, setDisplayCellCenter] = useUniform<number>("u_display_cell_center", 0);
    const [luminosity, setLuminosity] = useUniform("u_luminosity", 1.0);

    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <Select
                    className={styles.shaderControl}
                    label="Draw type"
                    placeholder="Pick value"
                    data={DRAW_TYPE}
                    value={DRAW_TYPE[drawType]}
                    onChange={(e) => setDrawType(DRAW_TYPE.indexOf(e!))}
                />
                <NumberInput className={styles.shaderControl} label="Frequence" onChange={setFreq} value={freq} min={1} max={10000} decimalScale={2} />
                {drawType === 2 &&
                     <NumberInput className={styles.shaderControl} label="Line precision" onChange={setLinePrecision} value={linePrecision} min={0.0} max={1.0} step={0.001} decimalScale={4} />
                }
                {drawType === 0 &&
                    <NumberInput className={styles.shaderControl} label="Luminosity" onChange={setLuminosity} value={luminosity} min={0.0} max={10.0} step={0.1} decimalScale={2}  />
                }
                <Select
                    className={styles.shaderControl}
                    label="Distance algorithm"
                    placeholder="Pick value"
                    data={DISTANCE_TYPE}
                    value={DISTANCE_TYPE[distanceType]}
                    onChange={(e) => setDistanceType(DISTANCE_TYPE.indexOf(e!))}
                />
            <Switch
                label="Display centers"
                checked={displayCellCenter === 1}
                onChange={(e) => setDisplayCellCenter(e.currentTarget.checked ? 1 : 0)}
            />
            </div>
        </ControlUiTunnel>
    );
}

export default function Page() {
    return (
        <FragmentView
            title="Voronoi Grid"
            fragmentShader={fragmentShader}
            withUi={true}
            control={VoronoiNoiseControl} />
    );
}