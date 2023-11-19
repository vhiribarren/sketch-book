import { Flex } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React, { Ref } from "react";
import Fragment from "./Fragment";
import { ShaderMaterial } from "three";
import { RenderCallback } from "@react-three/fiber";

type FragmentView = {
    fragmentShader: string,
    uniforms?: any,
    materialRef?: Ref<ShaderMaterial>
    children?: React.ReactNode,
    useFrameFn?: RenderCallback,
};

export function FragmentView({ fragmentShader, uniforms, children, materialRef, useFrameFn }: FragmentView) {
    return (
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
                <div>
                    {children}
                </div>
            }
        </Flex>
    );
}