#pragma glslify: random = require(../../../glsl-modules/random)

uniform bool u_with_gizmos;
uniform uint u_freq_count;
uniform float u_freq_base;
uniform float u_lacunarity;
uniform float u_gain;
uniform float u_raymarch_delta;
uniform int u_raymarch_max_steps;
uniform bool u_with_linear_steps;
uniform float u_focal_length;
uniform float u_shift_x;
uniform float u_shift_y;
uniform float u_shift_z;
uniform float u_pitch;
uniform float u_yaw;

varying vec2 v_uv;

const float AXIS_LINE_PRECISION = 0.01;


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
    uv *= freq_base;
    float amp = 1.0;
    float total_amplitude = 0.0;
    for (uint i = 0u; i < freq_count; i++) {
        total_amplitude += amp;
        noise_val += amp * average_noise_smoothstep(uv);
        amp *= gain;
        uv *= lacunarity;
    }
    return noise_val/total_amplitude;
}

float field_height(vec2 uv) {    
    return fbm(uv, u_freq_base, u_freq_count, u_gain, u_lacunarity);
}

//float field_height(vec2 uv) {
//    return random(floor(uv* u_freq_base)) ;
//}

vec3 raymarch_scene(vec3 ray_origin, vec3 ray_direction) {
    float raymarch_dist = 0.0;
    vec3 color = vec3(0.0, 0.0, 0.0);
    float previous_z = 0.0;
    float previous_dist = 0.0;
    for (int i=0; i<u_raymarch_max_steps; i++ ) {
        vec3 scan_pos = ray_origin + raymarch_dist * ray_direction;
        float field_z = field_height(scan_pos.xy);
        if (scan_pos.z <= field_z) {
            return vec3(1.0 - float(i) / float(u_raymarch_max_steps));
        }
        if (u_with_gizmos) {
            // Origin
            if (distance(scan_pos, vec3(0.0)) < 0.1) {
                return vec3(1.0, 0.0, 1.0);
            }
            // Axis lines
            if (abs(fract(scan_pos.z)) < AXIS_LINE_PRECISION  && abs((scan_pos.y)) < AXIS_LINE_PRECISION) {
                color =  max(color, vec3(1.0, 0.0, 0.0));
            }
            if (abs((scan_pos.x)) < AXIS_LINE_PRECISION  && abs(fract(scan_pos.z)) < AXIS_LINE_PRECISION) {
                color =  max(color, vec3(0.0, 1.0, 0.0));
            }
            if ( abs((scan_pos.y)) < AXIS_LINE_PRECISION  && abs(fract(scan_pos.x)) < AXIS_LINE_PRECISION) {
                color =  max(color, vec3(0.0, 1.0, 1.0));
            }
        }
        previous_z = field_z;
        previous_dist = raymarch_dist;
        if (u_with_linear_steps) {
            raymarch_dist += u_raymarch_delta * float(i) ; // Trick from https://iquilezles.org/articles/terrainmarching/
        }
        else {
            raymarch_dist += u_raymarch_delta;
        }
    }
    return color;
}


void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    vec2 canvas_local_pos = (v_uv -0.5) * 2.0; // center coordinates, y and x in [-1, 1]
    canvas_local_pos *= vec2(ratio, 1.0); // fix width, x in [-ratio, ratio] to adapt screen

    // Prepare camera rotation matrices
    float yc = cos(radians(u_yaw));
    float ys = sin(radians(u_yaw));
    mat3 yam_rotation = mat3(
        yc, ys, 0.0,
        -ys, yc, 0.0,
        0.0, 0.0, 1.0
    );
    float pc = cos(radians(u_pitch));
    float ps = sin(radians(u_pitch));
    mat3 pitch_rotation = mat3(
        1.0, 0.0, 0.0,
        0.0, pc, ps,
        0.0, -ps, pc
    );
    mat3 camera_transform = yam_rotation * pitch_rotation;

    // Camera parameters
    float canvas_distance = u_focal_length;
    vec3 camera_eye = vec3(u_shift_x, u_shift_y, u_shift_z);
    vec3 camera_direction = camera_transform * vec3(0.0, 1.0, 0.0);

    // Prepare rays
    vec3 ray_origin = camera_eye;
    vec3 ray_dir = normalize(camera_transform * vec3(canvas_local_pos.x, canvas_distance, canvas_local_pos.y));

    // Cast rays
    vec3 color = raymarch_scene(ray_origin, ray_dir);

    gl_FragColor =  vec4(color, 1.0);
}