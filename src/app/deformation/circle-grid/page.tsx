"use client";

import fragmentShader from "./fragment.glsl";
import { useEffect, useState } from "react";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import { NumberInput } from "@mantine/core";
import styles from "./page.module.css";
import { useFrame } from "@react-three/fiber";

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

function CircleGridControl({fragmentRef, controlUiTunnel}: FragmentLogic) {

  const [frequence, setFrequence] = useState<number | string>(UNIFORMS.u_frequence.value);
  const [amplitude, setAmplitude] = useState<number | string>(UNIFORMS.u_amplitude.value);
  const [speed, setSpeed] = useState<number | string>(UNIFORMS.u_speed.value);
  const ControlUiTunnel = controlUiTunnel;

  useEffect(() => {
    if (fragmentRef.current?.uniforms) {
      const uniforms = fragmentRef.current?.uniforms;
      uniforms.u_frequence.value = frequence;
      uniforms.u_amplitude.value = amplitude;
      uniforms.u_speed.value = speed;
      fragmentRef.current.render();
    }
  }, [frequence, amplitude, speed, fragmentRef]);

  useFrame((state) => {
      const { clock } = state;
      if (fragmentRef.current?.uniforms) {
        fragmentRef.current.uniforms.u_time.value = clock.elapsedTime;
      }
    });

    // TODO: when click, trigger a pulse

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