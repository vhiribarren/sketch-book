"use client";

import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import { useUniform, useUniformClock } from "@/components/shaders/uniforms";

import { NumberInput } from "@mantine/core";
import styles from "../../../styles/shaderControl.module.css";

const UNIFORMS = {
  u_frequence: {
      value: 20.0,
  },
  u_amplitude: {
      value: 0.1,
  },
  u_decrease: {
      value: 10.0,
  },
  u_speed: {
    value: 0.1,
  },
  u_time: {
      value: 0.0,
  },
};

function RippleControl({controlUiTunnel}: FragmentLogic) {

  useUniformClock("u_time");
  const [frequence, setFrequence] = useUniform("u_frequence", UNIFORMS.u_frequence.value);
  const [amplitude, setAmplitude] = useUniform("u_amplitude", UNIFORMS.u_amplitude.value);
  const [decrease, setDecrease] = useUniform("u_decrease", UNIFORMS.u_decrease.value);
  const [speed, setSpeed] = useUniform("u_speed",UNIFORMS.u_speed.value);

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
      uniforms={UNIFORMS}
      withUi={true}
      control={RippleControl} />
  );
}