"use client";

import { useCallback, useState } from "react";
import { Group, NumberInput, Slider, Text } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentView } from "@/components/shaders/FragmentView";
import { FragmentHandle } from "@/components/shaders/Fragment";

const UNIFORMS = {
    u_frequence: {
        value: 4.0,
    },
};

export default function Page() {

    const [frequence, setFrequence] = useState<number | string>(UNIFORMS.u_frequence.value);
    const fragmentRef = useCallback((fragmentHandler: FragmentHandle | null) => {
        if (fragmentHandler?.uniforms) {
            fragmentHandler.uniforms.u_frequence.value = frequence;
            fragmentHandler.render();
        }
    }, [frequence]);

    return (
        <FragmentView
            title="White Noise"
            description="Simple raw white noise without any processing. Frequency can be modified."
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            fragmentRef={fragmentRef}>
            <Group wrap="nowrap">
                <Slider onChange={setFrequence} value={typeof frequence === "string" ? 0 : frequence} style={{ minWidth: 200 }} min={2} max={500} />
                <NumberInput onChange={setFrequence} value={frequence} min={2} max={500} />
            </Group>
            <Text>Height frequency</Text>
        </FragmentView>
    );
}