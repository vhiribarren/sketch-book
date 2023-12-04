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

#pragma glslify: export(hsl2rgb)