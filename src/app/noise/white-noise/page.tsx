"use client";

import { useEffect, useState } from "react";
import { Group, NumberInput, Slider, Stack, Text } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";

const UNIFORMS = {
    u_frequence: {
        value: 4.0,
    },
};

function WhiteNoiseControl({ fragmentRef, controlUiTunnel }: FragmentLogic) {

    const [frequence, setFrequence] = useState<number | string>(UNIFORMS.u_frequence.value);
    useEffect(() => {
        if (fragmentRef.current?.uniforms) {
            fragmentRef.current.uniforms.u_frequence.value = frequence;
            fragmentRef.current.render();
        }
    }, [frequence, fragmentRef]);
    const ControlUiTunnel = controlUiTunnel;

    return (
        <ControlUiTunnel>
            <Group justify="center" align="center">
                <Stack>
                    <Text size="sm">Height frequency</Text>
                    <Slider onChange={setFrequence} value={typeof frequence === "string" ? 0 : frequence} style={{ minWidth: 200 }} min={2} max={500} />
                </Stack>
                <NumberInput onChange={setFrequence} value={frequence} min={2} max={500} />
            </Group>
        </ControlUiTunnel>
    );
}

export default function Page() {
    return (
        <FragmentView
            title="White Noise"
            description="Simple raw white noise without any processing. Frequency can be modified."
            fragmentShader={fragmentShader}
            uniforms={UNIFORMS}
            withUi={true}
            control={WhiteNoiseControl} />
    );
}