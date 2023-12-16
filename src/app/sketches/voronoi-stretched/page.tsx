"use client";

import fragmentShader from "./fragment.glsl";
import BasicFragmentShader from "@/components/shaders/BasicFragmentShader";

export default function Page() {
    return (
        <BasicFragmentShader
            title="Voronoi Stretched"
            fragmentShader={fragmentShader} />
    );
}