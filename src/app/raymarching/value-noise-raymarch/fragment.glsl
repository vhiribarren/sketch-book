#pragma glslify: random = require(../../../glsl-modules/random)

uniform uint u_freq_count;
uniform float u_freq_base;
uniform float u_lacunarity;
uniform float u_gain;
uniform float u_shift_x;
uniform float u_shift_y;

varying vec2 v_uv;

float average_noise_smoothstep(vec2 scaled_uv) {
    vec2 percent = smoothstep(vec2(0.), vec2(1.), fract(scaled_uv));
    float rand_tl = random(floor(scaled_uv));
    float rand_tr = random(floor(scaled_uv + vec2(1.0, 0.0)));
    float rand_bl = random(floor(scaled_uv + vec2(0.0, 1.0)));
    float rand_br = random(ceil(scaled_uv));
    float top_avg = mix(rand_tl, rand_tr, percent.x);
    float bottom_avg = mix(rand_bl, rand_br, percent.x);
    return mix(top_avg, bottom_avg, percent.y);
}

float fbm(vec2 uv, float freq_base, uint freq_count, float gain, float lacunarity) {
    float noise_val = 0.0;
    float freq = freq_base;
    float amp = 1.0;
    float total_amplitude = 0.0;
    for (uint i = 0u; i < freq_count; i++) {
        total_amplitude += amp;
        noise_val += amp * average_noise_smoothstep(vec2(uv.x, uv.y));
        amp *= gain;
        uv *= lacunarity;
    }
    return noise_val/total_amplitude;
}


void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    vec2 uv = v_uv * vec2(u_freq_base) * vec2(ratio, 1.0) + vec2(u_shift_x, u_shift_y);
    float noise_val = fbm(uv, u_freq_base, u_freq_count, u_gain, u_lacunarity);
    gl_FragColor =  vec4(vec3(noise_val), 1.0);
}