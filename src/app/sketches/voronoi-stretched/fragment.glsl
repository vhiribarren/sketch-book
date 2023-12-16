#pragma glslify: random = require(../../../glsl-modules/random)

varying vec2 v_uv;

const float INFINITY = 1.0 / 0.0;
const float FREQUENCE = 31.0;
const float LINE_PRECISION = 0.1;


ivec2 uv_to_grid(vec2 uv) {
    //return ivec2(uv/2.0);
    //return ivec2(uv.x, log2(uv.y + 1.0));
    int grid_y = int(log2(uv.y + 1.0));
    int grid_x = int(float(uv.x) / exp2(float(grid_y))) ;
    return ivec2(grid_x, grid_y);
}

vec2 gen_cell_at_grid(int x, int y) {
    //return 2.0*(vec2(x, y) + 0.5);    
    //return vec2(float(x), exp2(float(y))-1.0)*(vec2(1.0, 1.0));
    //return vec2(float(x)+0.0, exp2(float(y-1))-1.0) + vec2(0.0, 0.0) * vec2(float(x), exp2(float(y-1)));  
    return vec2(float(x) * exp2(float(y -1)), exp2(float(y-1))-1.0) + vec2(random(vec2(y, x)), random(vec2(x, y))) * vec2(exp2(float(y-1)), exp2(float(y-1)));  
    //return vec2(float(x) * exp2(float(y -1)), exp2(float(y-1))-1.0);  

}

void main() {
    vec2 canvas_size = gl_FragCoord.xy / v_uv;
    float canvas_ratio = canvas_size.x / canvas_size.y;
    vec2 uv = v_uv;
    //uv.y = 1.0 - uv.y;
    //uv -= 0.01;
    uv *= vec2(canvas_ratio, 1.0); // Cancel screen deformation

    //TODO faire aussi du voronoi avec des octaves, des grosses cellules replies de petites cellules avec un coeff de ligne qui baisse

    uv *= FREQUENCE; // zoom out

    ivec2 grid = uv_to_grid(uv);
    float min_dist = INFINITY;
    float snd_min_dist = INFINITY;
    vec2 min_vcell;
    int scan_max = 2; //int(exp2(float(grid.y))); // 1;
    for (int i = -30; i <= 10; i++) {
        for (int j = -1; j <= 2; j++) {
            vec2 current_vcell = gen_cell_at_grid(grid.x + i, grid.y + j);
            float vcell_dist = distance(uv, current_vcell);
            if (vcell_dist < min_dist) {
                snd_min_dist = min_dist;
                min_dist = vcell_dist;
                min_vcell = current_vcell;
            }
        }
    }

    // Cell dots
    float dot_col = 1.0-step(0.1, min_dist);
    // Web
    float web_col;
    if (abs(min_dist - snd_min_dist) < LINE_PRECISION) {
        web_col = 1.0;
    }
    // Worley field
    float worley_col = 0.02*min_dist;
    // Grid
    float grid_col = step(0.98, fract(uv.y)) + step(0.98, fract(uv.x));

    // Final color
    vec3 fragCol;
    //fragCol.r = grid_col;
    fragCol = max(fragCol, vec3(dot_col, dot_col, 0.0));
    //fragCol = max(fragCol, vec3(worley_col));
    fragCol.b = max(fragCol.b, (web_col));
    gl_FragColor =  vec4(fragCol, 1.0);
}