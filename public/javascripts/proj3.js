function initProj3() {
    var container;
    var camera, scene, renderer;
    init();
    animate();
    function init() {
      container =  document.getElementById( "hero-container" );
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
      camera.position.y = 400;
      scene = new THREE.Scene();
      var light, object;
      scene.add( new THREE.AmbientLight( 0x404040 ) );
      light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 5, 5, 5 );
      scene.add( light );
    
      var material = new THREE.MeshLambertMaterial( { opacity:.5, color:0xFF4242, emissive: 0x353535, wireframe: true } );
    
      var center = new THREE.Mesh( new THREE.SphereGeometry( 200, 2 ), material );
      center.position.set( 0, 0, 200 );
      scene.add( center );
    
      renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
      renderer.setClearColor( 0xffffff, 0 );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
    
      window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    function animate() {
      requestAnimationFrame( animate );
      render();
    }
          
    var count = 0;
    function render() {
      var timer = Date.now() * 0.0001;		
      camera.rotation.y += .002;
      camera.rotation.x += .002;
      for ( var i = 2, l = scene.children.length; i < l; i ++ ) {
        var object = scene.children[ i ];
        object.rotation.x = Math.sin(timer) * 10;
        object.rotation.y = Math.cos(timer) * 5;   
      }
      if (count == 15) {
        newSphere();
        count = 0; 
      }
      count++;
      renderer.render( scene, camera );
    }
    
    function newSphere() {
      
        var material = new THREE.MeshLambertMaterial({ 
          side: THREE.DoubleSide,
          opacity:0,
          color:0xFF4242,
          wireframe: true,
          wireframeLinewidth: 0
        });
      
        var object = new THREE.Mesh(
          new THREE.SphereGeometry(
            Math.random() * 80,
            Math.random() * 50,
            Math.random() * 50,
            Math.random() * 150,
            Math.random() * 200 + 50,
            Math.random() * 150,
            Math.random() * 200 + 50),
            material
        );
          
            object.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 1000 - 500,
          Math.random() * 1000 - 500
        );
    
            scene.add( object );
     
    }
    
}