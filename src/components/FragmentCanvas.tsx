'use client'

import { Canvas, useThree } from "@react-three/fiber";
import { ForwardedRef, ReactNode, forwardRef, useMemo } from "react";
import { ShaderMaterial } from "three";


type FragmentCanvasProps = {
    children: ReactNode
};

type FragmentProps = {
    fragmentShader: string;
    uniforms?: any;
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

function FragmentCanvas({children}: FragmentCanvasProps) {
    return (
        <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
            {children}
        </Canvas>
    );
}

const Fragment = forwardRef(
    function Fragment(props: FragmentProps, ref: ForwardedRef<ShaderMaterial>) {
        const { fragmentShader, uniforms } = props;
        const viewport = useThree(state => state.viewport)
        const memoizedUniforms = useMemo( () => uniforms, []);
        return (
            <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    ref={ref} 
                    fragmentShader={fragmentShader}
                    vertexShader={VERTEX_SHADER}
                    uniforms={memoizedUniforms}
                />
            </mesh>
        );
    }
);

export {FragmentCanvas, Fragment};
