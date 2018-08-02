var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new PIXI.autoDetectRenderer(width, height);
$('#hero-container').append(renderer.view);

var stage = new PIXI.Container();

var uniforms = {};
uniforms.resolution = { type: 'v2', value: { x: width, y: height}};
uniforms.alpha = { type: '1f', value: 1};
uniforms.shift = { type: '1f', value: .6};
uniforms.time = {type: '1f',value: 0};
uniforms.speed = {type: 'v2', value: {x: 1.7, y: 0.4}};
uniforms.mouseX = {type: '1f', value: 0}; // WIP
uniforms.mouseY = {type: '1f', value: 0}; // WIP


var shaderCode = document.getElementById( 'fragShader' ).innerHTML
var smokeShader = new PIXI.AbstractFilter('',shaderCode, uniforms);

var bg = PIXI.Sprite.fromImage("http://www.goodboydigital.com/pixijs/pixi_v3_github-pad.png");
bg.width = width;
bg.height = height;
bg.filters = [smokeShader]
stage.addChild(bg);

animate()


var count = 0
function animate() {
    requestAnimationFrame(animate);
    count+=0.008
    smokeShader.uniforms.time.value = count;
    renderer.render(stage);
}

// WIP
// document.onmousemove = handleMouseMove;
// function handleMouseMove(event) {
//   event = event || window.event;
//   console.log(event.clientX, event.clientY);
//   smokeShader.uniforms.mouseX = event.clientX;
//   smokeShader.uniforms.mouseY = event.clientY; 
// }