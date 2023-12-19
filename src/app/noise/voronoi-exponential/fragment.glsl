#pragma glslify: random = require(../../../glsl-modules/random)

varying vec2 v_uv;

uniform float u_freq;
uniform float u_line_precision;
uniform float u_grid_line_size;
uniform bool u_display_cell_center;
uniform bool u_display_exp_grid;

const float INFINITY = 1.0 / 0.0;
const float DOT_SIZE = 0.003;


ivec2 uv_to_grid_snapped(vec2 uv) {
    int grid_y = int(log2(uv.y + 1.0));
    int grid_x = int(float(uv.x) / exp2(float(grid_y))) ;
    return ivec2(grid_x, grid_y);
}

vec2 grid_to_global_coords(int x, int y) {
    return vec2(
        float(x) * exp2(float(y)),
        exp2(float(y))-1.0
    ); 
}

vec2 gen_cell_at_grid(int x, int y) { 
    return vec2(
        float(x) * exp2(float(y)),
        exp2(float(y))-1.0) +  vec2(exp2(float(y))) * vec2(random(vec2(y, float(x)+1.5)), random(vec2(x, y))
    );  
}

void main() {
    vec2 canvas_size = gl_FragCoord.xy / v_uv;
    float canvas_ratio = canvas_size.x / canvas_size.y;
    vec2 uv = v_uv;
    //uv.y = 1.0 - uv.y; // Upside down
    //uv -= 0.01;
    uv *= vec2(canvas_ratio, 1.0); // Cancel screen deformation

    //TODO faire aussi du voronoi avec des octaves, des grosses cellules replies de petites cellules avec un coeff de ligne qui baisse

    uv *= u_freq; // zoom out

    ivec2 grid = uv_to_grid_snapped(uv);
    float min_dist = INFINITY;
    float snd_min_dist = INFINITY;
    vec2 min_vcell;

    for (int i = -1; i <= 1; i++) {
        int grid_y_scan = grid.y - i;
        int grid_x_scan_min = int(float(grid.x -1) * exp2(float(i)));
        int grid_x_scan_max = int(float(grid.x +1) * exp2(float(i)));
        for (int grid_x_scan = grid_x_scan_min; grid_x_scan<= grid_x_scan_max; grid_x_scan++) {
            vec2 current_vcell = gen_cell_at_grid(grid_x_scan,grid_y_scan);
            float vcell_dist = distance(uv, current_vcell);
            if (vcell_dist < min_dist) {
                snd_min_dist = min_dist;
                min_dist = vcell_dist;
                min_vcell = current_vcell;
            }
        }
    }

    // Web
    float web_col;
    if (abs(min_dist - snd_min_dist) < u_line_precision * u_freq ) {
        web_col = 1.0;
    }
    vec3 fragCol;
    if (u_display_exp_grid) {
        float exp_grid_col = 1.0-step(u_grid_line_size*u_freq, abs(uv.x- grid_to_global_coords(grid.x, grid.y).x))* step(u_grid_line_size*u_freq, abs(uv.y- grid_to_global_coords(grid.x, grid.y).y));
        fragCol.r = exp_grid_col;
    }
    if (u_display_cell_center) {
        float dot_col = 1.0-step(DOT_SIZE * u_freq, min_dist);
        fragCol = max(fragCol, vec3(dot_col, dot_col, 0.0));
    }
    fragCol.b = max(fragCol.b, (web_col));
    gl_FragColor =  vec4(fragCol, 1.0);
}