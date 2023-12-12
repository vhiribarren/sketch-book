"use client";

import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import { NumberInput } from "@mantine/core";
import styles from "../../../styles/shaderControl.module.css";
import { useUniform, useUniformClock } from "@/components/shaders/uniforms";

function CircleGridControl({controlUiTunnel}: FragmentLogic) {
  useUniformClock("u_time");
  const [frequence, setFrequence] = useUniform("u_frequence", 30.0);
  const [amplitude, setAmplitude] = useUniform("u_amplitude", 0.1);
  const [speed, setSpeed] = useUniform("u_speed", 0.3);
  const ControlUiTunnel = controlUiTunnel;

  return (
    <ControlUiTunnel>
      <div className={styles.shaderControlWrapper}>
        <NumberInput className={styles.shaderControl} label="Frequence" onChange={setFrequence} value={frequence} min={0.0} max={5000.0} />
        <NumberInput className={styles.shaderControl} label="Amplitude" onChange={setAmplitude} value={amplitude} min={0.0} max={10.0} step={0.01} decimalScale={2} />
        <NumberInput className={styles.shaderControl} label="Speed" onChange={setSpeed} value={speed} min={0.0} max={10.0} step={0.1} decimalScale={2} />
      </div>
    </ControlUiTunnel>
    );
}

export default function Page() {
  return (
    <FragmentView
      title="Circle Grid"
      autoRender={true}
      fragmentShader={fragmentShader}
      withUi={true}
      control={CircleGridControl} />
  );
}