function initProj2() {
    console.log('init 2');
    var container, 
    renderer, 
    scene, 
    camera, 
    mesh, 
    start = Date.now(),
    fov = 30;



    // grab the container from the DOM
    container = document.getElementById( "hero-container" );
    console.log('in here');
    // create a scene
    scene = new THREE.Scene();

    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera( 
    fov, 
    window.innerWidth / window.innerHeight, 
    1, 
    10000 );
    camera.position.z = 150;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene.add( camera );

    // create a wireframe material		
    material = new THREE.ShaderMaterial( {

        uniforms: { 
            time: { // float initialized to 0
                type: "f", 
                value: 0.0 
            }
        },
        vertexShader: document.getElementById( 'vertexShader2' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader2' ).textContent
        
    } );

    // create a sphere and assign the material

    mesh2 = new THREE.Mesh( 
        new THREE.IcosahedronGeometry( 25, 5),
        material 
    );

    
    scene.add(  mesh2 );

    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    render();

    var time = 0;
    function render() {
        var object = scene.children[1];
        object.position.z = 20;
        object.rotation.z += .009;

        
        material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
        // let there be light
        renderer.render( scene, camera );
        requestAnimationFrame( render );
        time++;
    }
}