import { Flex, Stack, Text, Title } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React, { RefObject } from "react";
import Fragment from "./Fragment";
import { ShaderMaterial } from "three";
import { RenderCallback } from "@react-three/fiber";

type FragmentView = {
    fragmentShader: string,
    uniforms?: any,
    materialRef?: RefObject<ShaderMaterial>
    children?: React.ReactNode,
    useFrameFn?: RenderCallback,
    title?: string,
    description?: string,
};

export function FragmentView({ fragmentShader, uniforms, children, materialRef, useFrameFn, title, description }: FragmentView) {
    return (
        <Stack style={{ height: "100%" }}>
            {title &&<Title order={1}>{title}</Title>}
            {description && <Text>{description}</Text>}
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap="20"
                justify="center"
                align="center"
                style={{ height: "100%" }}>

            <FragmentCanvas>
                <Fragment
                    uniforms={uniforms}
                    fragmentShader={fragmentShader} 
                    useFrameFn={useFrameFn}
                    materialRef={materialRef} />
            </FragmentCanvas>
            {children &&
            <Flex
            direction={{ base: 'row', sm: 'column' }}
            gap="20"
            justify="center"
            align="center">
                    {children}
                </Flex>
            }
        </Flex>
        </Stack>
    );
}