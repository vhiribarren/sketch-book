import { useFrame } from "@react-three/fiber";
import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { FragmentHandle } from "./Fragment";

type UniformsContextType = {
  fragmentRef: MutableRefObject<FragmentHandle>,
  addUniform: (_uniformName: string, _defaultValue: any) => void,
}

export const UniformsContext = createContext<UniformsContextType>(null!);

export function useFragmentRef(): MutableRefObject<FragmentHandle> {
    return useContext(UniformsContext).fragmentRef;
}

export function useUniform<S extends string | number>(uniformName: string, defaultValue: S | (() => S)): [S, Dispatch<SetStateAction<string | number>>] {
  const fragmentRef = useFragmentRef();
  const addUniform = useContext(UniformsContext).addUniform;

  const [uniformState, setUniformState] = useState(defaultValue);
  addUniform(uniformName, defaultValue);
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
  const addUniform = useContext(UniformsContext).addUniform;
  addUniform(uniformName, 0.0);

  useFrame((state) => {
    const { clock } = state;
    if (fragmentRef?.current?.uniforms) {
      fragmentRef.current.uniforms[uniformName] = {value: clock.elapsedTime};
      fragmentRef.current.render();
    }
  });
}