"use client";

import fragmentShader from "./fragment.glsl";
import { useCallback, useState } from "react";
import { FragmentHandle } from "@/components/shaders/Fragment";
import { RenderCallback } from "@react-three/fiber";
import { FragmentView } from "@/components/shaders/FragmentView";
import { NumberInput } from "@mantine/core";
import styles from "./page.module.css";


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


export default function Page() {

  const [frequence, setFrequence] = useState<number | string>(UNIFORMS.u_frequence.value);
  const [amplitude, setAmplitude] = useState<number | string>(UNIFORMS.u_amplitude.value);
  const [decrease, setDecrease] = useState<number | string>(UNIFORMS.u_decrease.value);
  const [speed, setSpeed] = useState<number | string>(UNIFORMS.u_speed.value);
  const [time, setTime] = useState<number | string>(UNIFORMS.u_time.value);


  const fragmentRef = useCallback((fragmentHandler: FragmentHandle | null) => {
      if (fragmentHandler?.uniforms) {
          fragmentHandler.uniforms.u_frequence.value = frequence;
          fragmentHandler.uniforms.u_amplitude.value = amplitude;
          fragmentHandler.uniforms.u_decrease.value = decrease;
          fragmentHandler.uniforms.u_time.value = time;
          fragmentHandler.uniforms.u_speed.value = speed;
          fragmentHandler.render();
      }
  }, [frequence, amplitude, decrease, speed, time]);

  const useFrameFn: RenderCallback = (state) => {
      const { clock } = state;
      setTime(clock.elapsedTime);
    };

    // FIXME: FREQUENT RE-RENDER DUE TO CLOCK
    // TODO: when click, trigger a pulse


  return (
    <FragmentView
        title="Ripple Effect"
        autoRender={true}
        fragmentShader={fragmentShader}
        uniforms={UNIFORMS}
        useFrameFn={useFrameFn}
        fragmentRef={fragmentRef}>

        <div className={styles.shaderControlWrapper}>
            <NumberInput className={styles.shaderControl} label="Frequence" onChange={setFrequence} value={frequence} min={0.0} max={100.0} />
            <NumberInput className={styles.shaderControl} label="Amplitude" onChange={setAmplitude} value={amplitude} min={0.0} max={10.0} step={0.05} decimalScale={2} />
            <NumberInput className={styles.shaderControl} label="Decrease" onChange={setDecrease} value={decrease} min={0.0} max={100.0} decimalScale={2} />
            <NumberInput className={styles.shaderControl} label="Speed" onChange={setSpeed} value={speed} min={0.0} max={10.0} step={0.1} decimalScale={2} />
        </div>

    </FragmentView>
  );
}