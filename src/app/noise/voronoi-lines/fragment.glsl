#pragma glslify: random = require(../../../glsl-modules/random)

uniform uint u_cell_count;
uniform float u_line_precision;

varying vec2 v_uv;

const float infinity = 1.0 / 0.0;

vec2 generate_cell(uint id) {
    return vec2(random(vec2(float(id), 0.0)), random(vec2(float(id), 1.0)));    
}

float generate_color(uint id) {
    return random(vec2(id));    
}

void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    vec2 uv = v_uv * vec2(ratio, 1.0);

    float min_dist = infinity;
    float snd_min_dist = infinity;
    for (uint i = 0u; i<u_cell_count; i++) {
        vec2 v_cell = generate_cell(i)*ratio;
        float v_cell_dist = distance(v_cell, uv);
        if (v_cell_dist < min_dist) {
            snd_min_dist = min_dist;
            min_dist = v_cell_dist;
        }
    }

    float color = 0.0;
    if (abs(min_dist - snd_min_dist) < u_line_precision) {
        color = 1.0;
    }

    gl_FragColor =  vec4(vec3(color), 1.0);
}