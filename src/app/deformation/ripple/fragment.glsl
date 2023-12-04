#pragma glslify: hsl2rgb = require(../../../glsl-modules/color/hsl2rgb)

varying vec2 v_uv;

uniform float u_time;
uniform float u_frequence;
uniform float u_amplitude;
uniform float u_decrease;
uniform float u_speed;

const float PI = 3.14;

mat2 rotate2d(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
  vec2 canvas_size = gl_FragCoord.xy / v_uv;
  float canvas_ratio = canvas_size.x / canvas_size.y;
  vec2 uv = (v_uv - 0.5);        // Put origin at center
  uv *= 2.0;                     // zoom out to have -1,1 for y axis
  uv *= vec2(canvas_ratio, 1.0); // Cancel screen deformation
  float time = u_time * u_speed;

  float distance = length(uv);
  float freq = u_frequence;
  float ampl = u_amplitude;
  ampl *= 1.0 / (1.0 + pow(distance, u_decrease));
  uv.x += ampl * cos(freq * (distance - time));
  uv.y += ampl * sin(freq * (distance - time));

  uv = rotate2d(time) * uv;

  float angle = atan(uv.y, uv.x);       // [-PI, PI]
  float hue = angle / (2.0 * PI) + 0.5; // [0, 1]]
  float lightness = 0.5;                //(1.0-length(uv));
  vec3 color = hsl2rgb(hue, 1.0, lightness);

  gl_FragColor = vec4(color, 1.0);
}