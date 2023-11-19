import Fragment from "./Fragment";
import { FragmentView } from "./FragmentView";

type BasicFragmentShaderProps = {
    fragmentShader: string,
}

export default function BasicFragmentShader({ fragmentShader }: BasicFragmentShaderProps) {
    return (
        <FragmentView
            fragment={<Fragment fragmentShader={fragmentShader} />}
        />
    )
}