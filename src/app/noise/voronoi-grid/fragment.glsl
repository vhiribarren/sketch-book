#pragma glslify: random = require(../../../glsl-modules/random)

uniform uint u_frequence;
uniform float u_line_precision;
uniform float u_luminosity;
uniform int u_distance_type;
uniform int u_draw_type;
uniform int u_display_cell_center;

varying vec2 v_uv;

const float INFINITY = 1.0 / 0.0;
const int DISTANCE_EUCLIDIAN = 0;
const int DISTANCE_MANHATTAN = 1;
const int DRAW_WORLEY = 0;
const int DRAW_AREA = 1;
const int DRAW_LINE = 2;


float voronoi_distance(vec2 left, vec2 right) {
    if (u_distance_type == DISTANCE_MANHATTAN) {
        vec2 diff = right - left;
        return abs(diff.x) + abs(diff.y);
    } else {
        return distance(left, right);
    }
}

float generate_color(vec2 cell) {
    return random(vec2(length(cell)));    
}

vec2 generate_cell(int x, int y) {
    return vec2(float(x)+random(vec2(float(x), float(y))), float(y)+random(vec2(float(y), float(x))));    
}

void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;

    vec2 uv = (v_uv-0.5) * vec2(ratio, 1.0);
    uv *= float(u_frequence); // zoom out
    //uv *= uv;

    //uv.x = cos(length(uv)); 
    //uv.y = sin(length(uv));

    float min_dist = INFINITY;
    float snd_min_dist = INFINITY;
    vec2 min_vcell = vec2(0.0);

    int grid_x = int(floor(uv.x));
    int grid_y = int(floor(uv.y));
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 current_vcell = generate_cell(grid_x + i, grid_y + j);
            float vcell_dist = voronoi_distance(uv, current_vcell);
            if (vcell_dist < min_dist) {
                snd_min_dist = min_dist;
                min_dist = vcell_dist;
                min_vcell = current_vcell;
            }
        }
    }

    float color = 0.0;
    switch (u_draw_type) {
        case DRAW_LINE:
            if (abs(min_dist - snd_min_dist) < u_line_precision) {
                color = 1.0;
            }
            break;
        case DRAW_AREA:
            color = generate_color(min_vcell);
            break;
        case DRAW_WORLEY:
        default:
            color = min_dist * u_luminosity;
    }

    if (u_display_cell_center == 1) {
        color = max(color, 1.0-step(0.05, distance(uv, generate_cell(grid_x, grid_y))));
    }

    gl_FragColor =  vec4(vec3(color), 1.0);
}