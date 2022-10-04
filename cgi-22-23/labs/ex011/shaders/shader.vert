

attribute vec4 vPosition1;
attribute vec4 vPosition2;

uniform float uWeight;

void main()
{

gl_Position = mix(vPosition1, vPosition2, uWeight);

}