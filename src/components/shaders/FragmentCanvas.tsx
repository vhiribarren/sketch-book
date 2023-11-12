'use client'

import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";


type FragmentCanvasProps = {
    children: ReactNode
};

function FragmentCanvas({children}: FragmentCanvasProps) {
    return (
        <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
            {children}
        </Canvas>
    );
}


export default FragmentCanvas;
