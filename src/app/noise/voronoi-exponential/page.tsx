"use client";

import { NumberInput, Switch } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";


function ExponentialVoronoiNoiseControl({controlUiTunnel}: FragmentLogic) {
    const [freq, setFreq] = useUniform<number>("u_freq", 125.0);
    const [linePrecision, setLinePrecision] = useUniform("u_line_precision", 0.005);
    const [gridLineSize, setGridLineSize] = useUniform("u_grid_line_size", 0.0015);
    const [displayCellCenter, setDisplayCellCenter] = useUniform<boolean>("u_display_cell_center", false);
    const [displayExpGrid, setDisplayExpGrid] = useUniform<boolean>("u_display_exp_grid", false);
    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <div className={styles.shaderControlWrapper}>
                <NumberInput className={styles.shaderControl} label="Frequence of cells" onChange={setFreq} value={freq} min={1} max={500} allowDecimal={false} />
                <NumberInput className={styles.shaderControl} label="Line precision" onChange={setLinePrecision} value={linePrecision} min={0.0} max={1.0} step={0.001} decimalScale={4} />
                <Switch
                    className={styles.shaderControl}
                    label="Display centers"
                    checked={displayCellCenter}
                    onChange={(e) => setDisplayCellCenter(e.currentTarget.checked)}
                />
                <Switch
                    className={styles.shaderControl}
                    label="Display exponential grid"
                    checked={displayExpGrid}
                    onChange={(e) => setDisplayExpGrid(e.currentTarget.checked)}
                />
                {displayExpGrid &&
                    <NumberInput className={styles.shaderControl} label="Grid line size" onChange={setGridLineSize} value={gridLineSize} min={0.0} max={1.0} step={0.0001} decimalScale={4} />
                }

            </div>
        </ControlUiTunnel>
    );
}

export default function Page() {
    return (
        <FragmentView
            title="Exponential Voronoi"
            fragmentShader={fragmentShader}
            withUi={true}
            control={ExponentialVoronoiNoiseControl} />
    );
}