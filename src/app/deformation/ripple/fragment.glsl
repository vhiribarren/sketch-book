varying vec2 v_uv;

uniform float u_time;
uniform float u_frequence;
uniform float u_amplitude;
uniform float u_decrease;
uniform float u_speed;

const float PI = 3.14;

vec3 hsl2rgb(float hue, float saturation, float lightness) {
  // From https://en.wikipedia.org/wiki/HSL_and_HSV
  float c = (1.0 - abs(2.0 * lightness - 1.0)) * saturation;
  float hp = hue * 6.0;
  float x = c * (1.0 - abs(mod(hp, 2.0) - 1.0));
  vec3 rgb1;
  if (hp < 1.0) {
    rgb1 = vec3(c, x, 0.0);
  } else if (hp < 2.0) {
    rgb1 = vec3(x, c, 0.0);
  } else if (hp < 3.0) {
    rgb1 = vec3(0.0, c, x);
  } else if (hp < 4.0) {
    rgb1 = vec3(0.0, x, c);
  } else if (hp < 5.0) {
    rgb1 = vec3(x, 0.0, c);
  } else {
    rgb1 = vec3(c, 0.0, x);
  }
  float m = lightness - c/2.0;
  return rgb1 + m;
}

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