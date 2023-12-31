#pragma glslify: random = require(../../../glsl-modules/random)

varying vec2 v_uv;
uniform float u_frequence;

void main() {
  vec2 size = gl_FragCoord.xy / v_uv;
  float ratio = size.x / size.y;
  vec2 uv = v_uv * vec2(ratio, 1.0);
  gl_FragColor = vec4(vec3(random(floor(u_frequence * uv))), 1.0);
}