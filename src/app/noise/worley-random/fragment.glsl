#pragma glslify: random = require(../../../glsl-modules/random)

uniform uint u_cell_count;
uniform float u_luminosity;

varying vec2 v_uv;

const float infinity = 1.0 / 0.0;

vec2 generate_cell(uint id) {
    return vec2(random(vec2(float(id), 0.0)), random(vec2(float(id), 1.0)));    
}

void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    vec2 uv = v_uv * vec2(ratio, 1.0);

    float min_dist = infinity;
    for (uint i = 0u; i<u_cell_count; i++) {
        vec2 v_cell = generate_cell(i)*ratio;
        min_dist = min(min_dist, distance(v_cell, uv));
    }

    gl_FragColor =  vec4(vec3(u_luminosity*min_dist), 1.0);
}