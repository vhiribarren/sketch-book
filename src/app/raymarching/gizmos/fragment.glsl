#pragma glslify: random = require(../../../glsl-modules/random)


uniform float u_raymarch_delta;
uniform int u_raymarch_max_steps;
uniform float u_focal_length;
uniform float u_shift_x;
uniform float u_shift_y;
uniform float u_shift_z;

varying vec2 v_uv;

const float AXIS_LINE_PRECISION = 0.01;


vec3 raymarch_scene(vec3 ray_origin, vec3 ray_direction) {
    float raymarch_dist = 0.0;
    vec3 color = vec3(0.0, 0.0, 0.0);
    for (int i=0; i<u_raymarch_max_steps; i++ ) {
        vec3 scan_pos = ray_origin + raymarch_dist * ray_direction;
        if (distance(scan_pos, vec3(0.0)) < 0.1) {
            return vec3(1.0, 0.0, 1.0);
        }
        if (abs(fract(scan_pos.z)) < AXIS_LINE_PRECISION  && abs((scan_pos.y)) < AXIS_LINE_PRECISION) {
            color =  max(color, vec3(1.0, 0.0, 0.0));
        }
        if (abs((scan_pos.x)) < AXIS_LINE_PRECISION  && abs(fract(scan_pos.z)) < AXIS_LINE_PRECISION) {
            color =  max(color, vec3(0.0, 1.0, 0.0));
        }
        if ( abs((scan_pos.y)) < AXIS_LINE_PRECISION  && abs(fract(scan_pos.x)) < AXIS_LINE_PRECISION) {
            color =  max(color, vec3(0.0, 1.0, 1.0));
        }
        raymarch_dist += u_raymarch_delta;
    }
    return color;
}


void main() {
    vec2 size = gl_FragCoord.xy / v_uv;
    float ratio = size.x / size.y;
    vec2 canvas_local_pos = (v_uv -0.5) * 2.0; // center coordinates
    canvas_local_pos *= vec2(ratio, 1.0); // fix width

    // Camera parameters
    vec3 camera_eye = vec3(u_shift_x, u_shift_y, u_shift_z);
    vec3 camera_target = vec3(0.0, 0.0, 0.0);
    float canvas_distance = u_focal_length;

    // Transform canvas coordinates
    vec3 camera_axis_z = normalize(camera_target - camera_eye);
    vec3 camera_axis_x = normalize(cross(camera_axis_z, vec3(0.0, 1.0, 0.0)));
    vec3 camera_axis_y = normalize(cross(camera_axis_x, camera_axis_z));
    mat3x3 camera_transform = mat3x3(camera_axis_x, camera_axis_y, camera_axis_z);

    // Prepare rays
    vec3 ray_dir_unormalized = camera_transform * vec3(canvas_local_pos, canvas_distance);
    vec3 ray_origin =  camera_eye + ray_dir_unormalized;
    vec3 ray_dir = normalize(ray_dir_unormalized);

    // Cast rays
    vec3 color = raymarch_scene(ray_origin, ray_dir);

    gl_FragColor =  vec4(color, 1.0);
}