import {loadShadersFromURLS} from "../../libs/utils.js";
import { buildProgramFromSources, setupWebGL } from "../../libs/utils.js";
import { vec2, flatten } from "../../libs/MV.js";

/** @type {WebGLRenderingContext} */
var gl;
var program; // shaders

const NUM_VER = 100;

function setup(shaders){

    //alert(shaders); //for testing

    // Setup
    const canvas = document.getElementById("gl-canvas"); // canvas in html page
    gl = setupWebGL(canvas);


    program = buildProgramFromSources(gl, shaders["shader.vert"], shaders["shader.frag"]);

    const vertices = [];

    for(let i = 0; i < NUM_VER; i++){

        vertices.push(getRandomPosition());

        let angle = 2 * Math.PI * i / NUM_VER

        vertices.push(vec2(0.8 * Math.cos(angle), 0.8 * Math.sin(angle)));

    }

    const aBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aBuffer); //the aBuffer is binded
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW); // we write the vertices to the buffer

    const vPosition1 = gl.getAttribLocation(program, "vPosition1"); //will be 0
    gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(vPosition1);

    const vPosition2 = gl.getAttribLocation(program, "vPosition2"); //will be 0
    gl.vertexAttribPointer(vPosition2, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(vPosition2);

    //Setup the view port, starting in x = 0 and y = 0 with width and height equal to canvas
    gl.viewport(0, 0, canvas.width, canvas.height);

    //Setup bachground color
    gl.clearColor(0.0, 0.0, 0.0, 1.0); //color used to clean the screen

    //Call animate for the first time
    animate(); // same as window.requestAnimationFrame(animate);


}


function getRandomPosition(){

    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;

    return vec2(x, y);

}

function animate(){

    //call in next cycle of refreshing the canvas (probably entire page), so that it keeps being called
    window.requestAnimationFrame(animate);

    //cleans the frame buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    //draw arrays vs draw elements,

    //activates the program
    gl.useProgram(program);

    const uWeight = gl.getUniformLocation(program, "uWeight");


    gl.drawArrays(gl.LINE_LOOP, 0, NUM_VER); //needs shaders
}

//doesn't need to specify prefix because prefix="shaders"
//.then means after completion of function
//shaders => setup(shaders) means that the previously returned value (loadShadersFromURLS) will be named shaders and then passed in the function setup 
loadShadersFromURLS(["shader.vert", "shader.frag"]).then(shaders => setup(shaders));