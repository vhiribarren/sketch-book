'use client'

import { Canvas, useThree } from "@react-three/fiber";


type FragmentCanvasProps = {
    fragmentShader: string;
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


export default FragmentCanvas;

function FragmentCanvas({ fragmentShader }: FragmentCanvasProps) {
    return (
        <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
            <Fragment fragmentShader={fragmentShader}/>
        </Canvas>
    );
};

function Fragment({ fragmentShader }: FragmentCanvasProps) {
    const viewport = useThree(state => state.viewport)

    return (
        <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={VERTEX_SHADER}
            />
        </mesh>
    );
};