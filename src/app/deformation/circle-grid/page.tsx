"use client";

import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import { NumberInput } from "@mantine/core";
import styles from "./page.module.css";
import { useUniform, useUniformClock } from "@/components/shaders/uniforms";

const UNIFORMS = {
  u_frequence: {
      value: 30.0,
  },
  u_amplitude: {
      value: 0.1,
  },
  u_speed: {
    value: 0.3,
  },
  u_time: {
      value: 0.0,
  },
};

function CircleGridControl({controlUiTunnel}: FragmentLogic) {

  useUniformClock("u_time");
  const [frequence, setFrequence] = useUniform("u_frequence", UNIFORMS.u_frequence.value);
  const [amplitude, setAmplitude] = useUniform("u_amplitude", UNIFORMS.u_amplitude.value);
  const [speed, setSpeed] = useUniform("u_speed",UNIFORMS.u_speed.value);

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
      uniforms={UNIFORMS}
      withUi={true}
      control={CircleGridControl} />
  );
}