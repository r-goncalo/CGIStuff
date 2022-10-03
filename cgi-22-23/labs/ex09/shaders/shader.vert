

uniform float uDx;
uniform float uDy;
attribute vec4 vPosition;
attribute vec3 vColor;

varying vec3 fColor;

void main()
{
    gl_Position = vPosition + vec4(uDx, uDy, 0.0, 0.0);
    fColor = vColor;
    // gl_Position = vPosition;
    // gl_Position.x += uDx;
}