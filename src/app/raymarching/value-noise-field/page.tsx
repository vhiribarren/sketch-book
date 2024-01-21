"use client";

import { Accordion, NumberInput, Select, Switch, Title } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform } from "@/components/shaders/uniforms";


const VIEW_TYPE = ["Sun Rays", "Normal Field", "Depth Field"];


function ValueNoiseRaymarchControl({controlUiTunnel}: FragmentLogic) {

    const [viewType, setViewType] = useUniform<number>("u_view_type", 0);

    const [gizmos, setGizmos] = useUniform("u_with_gizmos", false);

    const [freqCount, setFreqCount] = useUniform("u_freq_count", 8);
    const [freqBase, setFreqBase] = useUniform("u_freq_base", 2.0);
    const [lacunarity, setLacunarity] = useUniform("u_lacunarity", 2.0);
    const [gain, setGain] = useUniform("u_gain", 0.5);
    const [heightCoeff, setHeightCoeff] = useUniform("u_field_height_coeff", 1.0);

    const [raymarchMaxSteps, setRaymarchMaxSteps] = useUniform("u_raymarch_max_steps", 50);
    const [raymarchDelta, setRaymarchDelta] = useUniform("u_raymarch_delta", 0.01);
    const [withLinearSteps, setWithLinearSteps] = useUniform("u_with_linear_steps", true);

    const [focalLength, setFocalLength] = useUniform("u_focal_length", 1.0);
    const [shiftX, setShiftX] = useUniform("u_shift_x", 0.0);
    const [shiftY, setShiftY] = useUniform("u_shift_y", 0.0);
    const [shiftZ, setShiftZ] = useUniform("u_shift_z", 2.0);

    const [pitch, setPitch] = useUniform("u_pitch", 0.0);
    const [yaw, setYaw] = useUniform("u_yaw", 0.0);


    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
                <Accordion multiple={true}>

                    <Accordion.Item value="Noise" key="Noise">
                        <Accordion.Control>
                            <Title order={6}>Noise</Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className={styles.shaderControlWrapper}>
                                <NumberInput className={styles.shaderControl} label="Base frequence" onChange={setFreqBase} value={freqBase} min={0.0} step={0.1} decimalScale={2} />
                                <NumberInput className={styles.shaderControl} label="Field Height Coeff" onChange={setHeightCoeff} value={heightCoeff} min={0.0} step={0.1} decimalScale={2} />
                                <NumberInput className={styles.shaderControl} label="Number of frequences" onChange={setFreqCount} value={freqCount} min={1} max={20} allowDecimal={false} />
                                <NumberInput className={styles.shaderControl} label="Lacunarity" onChange={setLacunarity} value={lacunarity} min={0.0} step={0.1} decimalScale={2} />
                                <NumberInput className={styles.shaderControl} label="Gain" onChange={setGain} value={gain} min={0.0} step={0.1} decimalScale={2} />
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="Raymarching" key="Raymarching">
                        <Accordion.Control>
                            <Title order={6}>Raymarching</Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className={styles.shaderControlWrapper}>
                                <Select
                                    className={styles.shaderControl}
                                    label="View type"
                                    placeholder="Pick value"
                                    data={VIEW_TYPE}
                                    value={VIEW_TYPE[viewType]}
                                    onChange={(e) => setViewType(VIEW_TYPE.indexOf(e!))}
                                />
                                <Switch
                                    className={styles.shaderControl}
                                    label="Increasing steps"
                                    checked={withLinearSteps}
                                    onChange={(e) => setWithLinearSteps(e.currentTarget.checked)}
                                />
                                <NumberInput className={styles.shaderControl} label="Raymarch Max Steps" onChange={setRaymarchMaxSteps} value={raymarchMaxSteps} allowDecimal={false} />
                                <NumberInput className={styles.shaderControl} label="Raymarch Delta" onChange={setRaymarchDelta} value={raymarchDelta} step={0.01} decimalScale={4} />
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                    
                    <Accordion.Item value="Camera" key="Camera">
                        <Accordion.Control>
                            <Title order={6}>Camera</Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className={styles.shaderControlWrapper}>
                                <NumberInput className={styles.shaderControl} label="Focal Length" onChange={setFocalLength} value={focalLength} step={0.1} decimalScale={2} />
                                <NumberInput className={styles.shaderControl} label="Yaw" onChange={setYaw} value={yaw} />
                                <NumberInput className={styles.shaderControl} label="Pitch" onChange={setPitch} value={pitch} />
                                <NumberInput className={styles.shaderControl} label="Shift X" onChange={setShiftX} value={shiftX} step={0.1} decimalScale={2} />
                                <NumberInput className={styles.shaderControl} label="Shift Y" onChange={setShiftY} value={shiftY} step={0.1} decimalScale={2} />
                                <NumberInput className={styles.shaderControl} label="Shift Z" onChange={setShiftZ} value={shiftZ} step={0.1} decimalScale={2} />
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="Misc" key="Misc">
                        <Accordion.Control>
                            <Title order={6}>Misc</Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div className={styles.shaderControlWrapper}>
                                <Switch
                                    className={styles.shaderControl}
                                    label="With Gizmos"
                                    checked={gizmos}
                                    onChange={(e) => setGizmos(e.currentTarget.checked)}
                                />
                           </div>
                        </Accordion.Panel>
                    </Accordion.Item>

                </Accordion>
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