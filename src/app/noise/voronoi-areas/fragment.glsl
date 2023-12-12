#pragma glslify: random = require(../../../glsl-modules/random)

uniform uint u_cell_count;
uniform int u_distance_type;

varying vec2 v_uv;

const float INFINITY = 1.0 / 0.0;
const int DISTANCE_EUCLIDIAN = 0;
const int DISTANCE_MANHATTAN = 1;

vec2 generate_cell(uint id) {
    return vec2(random(vec2(float(id), 0.0)), random(vec2(float(id), 1.0)));    
}

float generate_color(uint id) {
    return random(vec2(id));    
}

float voronoi_distance(vec2 left, vec2 right) {
    if (u_distance_type == DISTANCE_MANHATTAN) {
        vec2 diff = right - left;
        return abs(diff.x) + abs(diff.y);
    } else {
        return distance(left, right);
    }
}

void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    vec2 uv = v_uv * vec2(ratio, 1.0);

    float min_dist = INFINITY;
    uint min_cell_id = 0u;
    for (uint i = 0u; i<u_cell_count; i++) {
        vec2 v_cell = generate_cell(i)*ratio;
        float v_cell_dist = voronoi_distance(v_cell, uv);
        if (v_cell_dist < min_dist) {
            min_dist = v_cell_dist;
            min_cell_id = i;
        }
    }

    gl_FragColor =  vec4(vec3(generate_color(min_cell_id)), 1.0);
}