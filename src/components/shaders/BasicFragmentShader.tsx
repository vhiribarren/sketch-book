import Fragment from "./Fragment";
import FragmentCanvas from "./FragmentCanvas";

type BasicFragmentShaderProps = {
    fragmentShader: string,
}

export default function BasicFragmentShader({ fragmentShader }: BasicFragmentShaderProps) {
    return (
        <FragmentCanvas>
            <Fragment fragmentShader={fragmentShader} />
        </FragmentCanvas>
    )
}