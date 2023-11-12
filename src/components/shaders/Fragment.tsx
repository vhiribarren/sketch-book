import { useThree } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { ShaderMaterial } from "three";


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

const Fragment = forwardRef(
    function Fragment(props: FragmentProps, ref: ForwardedRef<ShaderMaterial>) {
        const { fragmentShader, uniforms } = props;
        const viewport = useThree(state => state.viewport)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default Fragment;