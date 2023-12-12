"use client";

import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import { useUniform, useUniformClock } from "@/components/shaders/uniforms";
import { NumberInput } from "@mantine/core";
import styles from "../../../styles/shaderControl.module.css";

function RippleControl({controlUiTunnel}: FragmentLogic) {

  useUniformClock("u_time");
  const [frequence, setFrequence] = useUniform("u_frequence", 20.0);
  const [amplitude, setAmplitude] = useUniform("u_amplitude", 0.1);
  const [decrease, setDecrease] = useUniform("u_decrease", 10.0);
  const [speed, setSpeed] = useUniform("u_speed", 0.1);
  const ControlUiTunnel = controlUiTunnel;

    // TODO: when click, trigger a pulse

  return (
    <ControlUiTunnel>
      <div className={styles.shaderControlWrapper}>
        <NumberInput className={styles.shaderControl} label="Frequence" onChange={setFrequence} value={frequence} min={0.0} max={500.0} />
        <NumberInput className={styles.shaderControl} label="Amplitude" onChange={setAmplitude} value={amplitude} min={0.0} max={10.0} step={0.05} decimalScale={2} />
        <NumberInput className={styles.shaderControl} label="Decrease" onChange={setDecrease} value={decrease} min={0.0} max={100.0} decimalScale={2} />
        <NumberInput className={styles.shaderControl} label="Speed" onChange={setSpeed} value={speed} min={0.0} max={10.0} step={0.05} decimalScale={2} />
      </div>
    </ControlUiTunnel>
    );
}

export default function Page() {
  return (
    <FragmentView
      title="Ripple Effect"
      autoRender={true}
      fragmentShader={fragmentShader}
      withUi={true}
      control={RippleControl} />
  );
}