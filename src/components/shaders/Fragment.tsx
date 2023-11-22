import { RenderCallback, useFrame, useThree } from "@react-three/fiber";
import { RefObject, forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { ShaderMaterial } from "three";


type FragmentProps = {
    fragmentShader: string,
    uniforms?: any,
    useFrameFn?: RenderCallback,
    materialRef?: RefObject<ShaderMaterial>
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

const Fragment = forwardRef(function Fragment(props, ref) {
    const { fragmentShader, uniforms, useFrameFn, materialRef } = props;
    const { viewport, invalidate } = useThree()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedUniforms = useMemo(() => uniforms, []);
    if (useFrameFn) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useFrame(useFrameFn);
    }
    useEffect(() => {
        if (materialRef && materialRef.current) {
            materialRef.current.needsUpdate = true;
        }
    });
    useImperativeHandle(ref, () => {
        return {
            render() {
                invalidate();
            }
        };
    }, []);
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