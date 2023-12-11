import { useFrame } from "@react-three/fiber";
import { createContext, useContext, useEffect, useState } from "react";



export const UniformsContext = createContext(null);

export function useFragmentRef() {
    return useContext(UniformsContext);
}

export function useUniform(uniformName, defaultValue) {
  const fragmentRef = useFragmentRef();
  const [uniformState, setUniformState] = useState(defaultValue);
  useEffect(() => {
      if (fragmentRef?.current?.uniforms[uniformName]) {
        fragmentRef.current.uniforms[uniformName].value = uniformState;
        fragmentRef.current.render(); // Or not ?
      }
  }, [uniformName, uniformState, fragmentRef]);
  return [uniformState, setUniformState];
}

export function useUniformClock(uniformName) {
  const fragmentRef = useFragmentRef();
  useFrame((state) => {
    const { clock } = state;
    if (fragmentRef.current?.uniforms) {
      fragmentRef.current.uniforms[uniformName].value = clock.elapsedTime;
      fragmentRef.current.render(); // Or not ?
    }
  });
}