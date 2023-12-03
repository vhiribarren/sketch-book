uniform uint u_freq_count;
uniform float u_freq_base;
uniform float u_lacunarity;
uniform float u_gain;
uniform float u_shift_x;
uniform float u_shift_y;

varying vec2 v_uv;

float random(vec2 uv) {
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

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

float average_noise_mix(vec2 scaled_uv) {
    float rand_tl = random(floor(scaled_uv));
    float rand_tr = random(floor(scaled_uv + vec2(1.0, 0.0)));
    float rand_bl = random(floor(scaled_uv + vec2(0.0, 1.0)));
    float rand_br = random(ceil(scaled_uv));
    float top_avg = mix(rand_tl, rand_tr, fract(scaled_uv.x));
    float bottom_avg = mix(rand_bl, rand_br, fract(scaled_uv.x));
    return mix(top_avg, bottom_avg, fract(scaled_uv.y));
}


void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    float scaled_u = v_uv.x * u_freq_base * ratio + u_shift_x;
    float scaled_v = v_uv.y * u_freq_base + u_shift_y;
    float noise_val = 0.0;
    float freq = u_freq_base;
    float amp = 1.0;
    float total_amplitude = 0.0;
    for (uint i = 0u; i < u_freq_count; i++) {
        total_amplitude += amp;
        noise_val += amp * average_noise_smoothstep(vec2(scaled_u, scaled_v));
        amp *= u_gain;
        scaled_u *= u_lacunarity;
        scaled_v *= u_lacunarity;
    }
    noise_val /= total_amplitude;
    gl_FragColor =  vec4(vec3(noise_val), 1.0);
}