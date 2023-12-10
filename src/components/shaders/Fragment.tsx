"use client";

import { useThree } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { IUniform, ShaderMaterial } from "three";

type FragmentProps = {
    fragmentShader: string,
    uniforms?: any,
};

export type FragmentHandle = {
    render: () => void,
    get uniforms(): { [uniform: string]: IUniform } | undefined;
};

const VERTEX_SHADER = `
    varying vec2 v_uv;
    void main() {
        v_uv = uv;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
    }
`;

const Fragment = forwardRef(function Fragment(props: FragmentProps, ref: ForwardedRef<FragmentHandle>) {
    const { fragmentShader, uniforms } = props;
    const materialRef = useRef<ShaderMaterial>(null);
    const { viewport, invalidate } = useThree();
    const memoizedUniforms = useMemo(() => uniforms, [uniforms]);

    useEffect(() => {
        if (materialRef && materialRef.current) {
            materialRef.current.needsUpdate = true;
        }
    });
    useImperativeHandle(ref, () => {
        return {
            render() {
                invalidate();
            },
            get uniforms() {
                return materialRef.current?.uniforms;
            }
        };
    });
    
    return (
        <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                vertexShader={VERTEX_SHADER}
                uniforms={memoizedUniforms}
            />
        </mesh>
    );
});

export default Fragment;