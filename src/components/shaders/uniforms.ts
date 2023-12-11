import { useFrame } from "@react-three/fiber";
import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { FragmentHandle } from "./Fragment";

export const UniformsContext = createContext<MutableRefObject<FragmentHandle>>(null!);

export function useFragmentRef(): MutableRefObject<FragmentHandle> {
    return useContext(UniformsContext);
}

export function useUniform<S extends string | number>(uniformName: string, defaultValue: S | (() => S)): [S, Dispatch<SetStateAction<string | number>>] {
  const fragmentRef = useFragmentRef();
  const [uniformState, setUniformState] = useState(defaultValue);
  useEffect(() => {
      if (fragmentRef?.current?.uniforms) {
        fragmentRef.current.uniforms[uniformName] = {value:uniformState};
        fragmentRef.current.render();
      }
  }, [uniformName, uniformState, fragmentRef]);
  return [uniformState, setUniformState as Dispatch<SetStateAction<string | number>>];
}

export function useUniformClock(uniformName: string) {
  const fragmentRef = useFragmentRef();
  useFrame((state) => {
    const { clock } = state;
    if (fragmentRef?.current?.uniforms) {
      fragmentRef.current.uniforms[uniformName] = {value: clock.elapsedTime};
      fragmentRef.current.render();
    }
  });
}