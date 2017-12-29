function initProj1() {
    var container;
    var camera, scene, renderer;
    init();
    animate();
    function init() {
    container = document.getElementById( 'hero-container' );
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10 );
    camera.position.z = 10;
    scene = new THREE.Scene();
    // geometry
    var triangles = 400;
    var d = 50, d2 = d/2;	
    var geometry = new THREE.BufferGeometry();
    console.log(geometry);
    var vertices = new Float32Array( triangles * 3 * 3 );
    for ( var i = 0, l = triangles * 3 * 3; i < l; i += 3 ) {
        vertices[ i     ] = Math.random() * d - d2 + 5;
        vertices[ i + 1 ] = Math.random() * d - d2 + 5;
        vertices[ i + 2 ] = Math.random() * d - d2 + 5;
    }
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    var colors = new Uint8Array( triangles * 3 * 4 );
    for ( var i = 0, l = triangles * 3 * 4; i < l; i += 4 ) {
        colors[ i     ] = Math.random() * 155;
        colors[ i + 1 ] = Math.random() * 255;
        colors[ i + 2 ] = Math.random() * 255;
        colors[ i + 3 ] = Math.random() * 255;
    }
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 4, true ) );
    // material
    var material = new THREE.RawShaderMaterial( {
        uniforms: {
        time: { type: "f", value: 1.0 }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        side: THREE.DoubleSide,
        transparent: true
    } );

    var mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );
    
    var geometry = new THREE.TorusGeometry( 55, 3, 206, 100 );
    var material = new THREE.MeshStandardMaterial( { color: 0xAAFF1D, wireframe: true } );
    var torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    var geometry = new THREE.TorusGeometry( 25, 55, 206, 100 );
    var material = new THREE.MeshStandardMaterial( { color: 0xAAFF1D, wireframe: true } );
    var torusSmall = new THREE.Mesh( geometry, material );
    scene.add( torusSmall );  
    

    

    
    
    
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 50 );
    directionalLight.position.set( 0, 0, -12 );
    scene.add( directionalLight );

    var light = new THREE.AmbientLight( 0xffffff, 10 ); // soft white light
    scene.add( light );
    
    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setClearColor( 0xffffff, 0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize( event ) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
    requestAnimationFrame( animate );
    render();
    }

    function render() {
    var time = performance.now();
    camera.position.z = 5;
    
    var light = scene.children[1];
    light.rotation.x = Math.tan(time * 0.0005);
    
    var object = scene.children[ 0 ];
    camera.position.z = Math.sin(time/5 * 0.0005);
    object.rotation.x = time * 0.00005;
    object.rotation.y = time * 0.00005;
    object.rotation.z = time * 0.00005;
    object.material.uniforms.time.value = time * 0.005;
    renderer.render( scene, camera );
    }
}