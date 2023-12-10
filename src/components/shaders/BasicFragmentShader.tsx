import { FragmentView } from "./FragmentView";

type BasicFragmentShaderProps = {
    fragmentShader: string,
    title?: string,
    description?: string,
}

export default function BasicFragmentShader({fragmentShader, title, description}: BasicFragmentShaderProps) {
    return (
      <FragmentView
        title={title}
        description={description}
        fragmentShader={fragmentShader} />
    );
  }