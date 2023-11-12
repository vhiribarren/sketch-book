'use client'

import { Canvas } from "@react-three/fiber";
import { StatsGl } from "@react-three/drei";
import { ReactNode, useEffect, useRef } from "react";
import styles from "./FragmentCanvas.module.css";

type FragmentCanvasProps = {
    children: ReactNode
};

function FragmentCanvas({children}: FragmentCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const parentParentRef = useRef<HTMLElement|null>(null);
    useEffect(() => {
        parentParentRef.current = canvasRef.current.parentElement;
      }, [])
    return (
        <Canvas ref={canvasRef} camera={{ position: [0.0, 0.0, 1.0] }}>
            {children}
            <StatsGl parent={parentParentRef} className={styles.stats}/>
        </Canvas>
    );
}

export default FragmentCanvas;
