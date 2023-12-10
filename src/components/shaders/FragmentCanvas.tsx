"use client";

import { Canvas } from "@react-three/fiber";
import { StatsGl } from "@react-three/drei";
import { ReactNode, useContext, useEffect, useRef } from "react";
import styles from "./FragmentCanvas.module.css";
import { Settings } from "@/app/Context";

type FragmentCanvasProps = {
    children: ReactNode,
    autoRender?: boolean,
};

export default function FragmentCanvas({autoRender = false, children}: FragmentCanvasProps) {
    const settings = useContext(Settings);
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const parentParentRef = useRef<HTMLElement|null>(null);
    useEffect(() => {
        parentParentRef.current = canvasRef.current.parentElement;
      }, []);
    return (
        <Canvas ref={canvasRef} frameloop={autoRender ? "always" : "demand"} camera={{ position: [0.0, 0.0, 1.0] }}>
            {children}
            {settings.displayFps &&
                (<StatsGl parent={parentParentRef} className={styles.stats}/>)
            }
        </Canvas>
    );
}
