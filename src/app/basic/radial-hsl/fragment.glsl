#pragma glslify: hsl2rgb = require(../../../glsl-modules/color/hsl2rgb)


varying vec2 v_uv;

const float PI = 3.14;



void main() {
  vec2 canvas_size = gl_FragCoord.xy / v_uv;
  float canvas_ratio = canvas_size.x / canvas_size.y;
  vec2 uv = (v_uv - 0.5);  // Put origin at center
  uv *= 2.0; // zoom out to have -1,1 for y axis
  uv *= vec2(canvas_ratio, 1.0); // Cancel screen deformation

  float angle = atan(uv.y, uv.x); // [-PI, PI]
  float hue = angle / (2.0*PI) + 0.5; // [0, 1]]
  float lightness = 0.5;//(1.0-length(uv));
  vec3 color = hsl2rgb(hue, 1.0, lightness);

  gl_FragColor = vec4(color, 1.0);
}