"use client";

import { Group, NumberInput, Slider, Stack, Text } from "@mantine/core";
import fragmentShader from "./fragment.glsl";
import { FragmentLogic, FragmentView } from "@/components/shaders/FragmentView";
import { useUniform } from "@/components/shaders/uniforms";

function WhiteNoiseControl({ controlUiTunnel }: FragmentLogic) {
    const [frequence, setFrequence] = useUniform("u_frequence", 50.0);
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
            withUi={true}
            control={WhiteNoiseControl} />
    );
}