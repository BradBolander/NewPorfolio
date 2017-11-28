function initProj4() {
      
        var container;
        var camera, scene, renderer, flowerMaterial, stemMaterial, start = Date.now();
        init();

        function init() {
        container =  document.getElementById( "hero-container" );

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.x = 2000;
        camera.position.y = 1000;
        camera.target = new THREE.Vector3( 0, 1000, 0 );
        scene = new THREE.Scene();


        var light;
        scene.add( new THREE.AmbientLight( 0xFF9F2C ) );
        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 1, 0 );
        scene.add( light );
        
        flowerMaterial = new THREE.ShaderMaterial({
            wireframe: true,
            uniforms: { 
                time: { // float initialized to 0
                    type: "f", 
                    value: 0.0 
                }
            },
            vertexShader: document.getElementById( 'vertexShader3' ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader3' ).textContent
        });
        
        stemMaterial = new THREE.MeshLambertMaterial({
            color: 0x6DDB59,
            wireframe: true
        });

        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        window.addEventListener( 'resize', onWindowResize, false );
        }



        function generateFlower(stemHeight, ySplit) {
        var xOffset = Math.floor(Math.random() * (1000 + 1000)) -1000;
        var zOffset = Math.floor(Math.random() * (1000 + 1000)) -1000;
        
        //Head stuff
        var flowerHeadValues = {
            radius: Math.random() * 60 + 20,
            widthSegments: Math.random() * 50,
            heightSegments: Math.random() * 50,
            phiStart: Math.random() * 50,
            phiLength: Math.random() * 20 + 20,
            thetaStart: Math.random() * 20,
            thetaLength: Math.random() * 20 + 20
        };
        if (ySplit == 0) {
            
            var flowerStem = new THREE.Mesh( new THREE.CylinderGeometry( 1, 10, stemHeight ), stemMaterial );
            var stemOffset = (stemHeight / 2);
            flowerStem.position.set( xOffset, stemOffset, zOffset );
            
            var stemHeight2 = getRanHeight() / 2;
            var flowerStem2 = new THREE.Mesh( new THREE.CylinderGeometry( 2, 1, stemHeight2 ), stemMaterial );
            flowerStem2.position.set( xOffset, stemHeight + stemHeight2 / 3, zOffset + stemHeight2/3 );
            flowerStem2.rotateX( Math.PI / 4 );

            var stemHeight3 = getRanHeight() / 2;
            var flowerStem3 = new THREE.Mesh( new THREE.CylinderGeometry( 2, 1, stemHeight3 ), stemMaterial );
            flowerStem3.position.set( xOffset, stemHeight + stemHeight3 / 3, zOffset - stemHeight3/3 );
            flowerStem3.rotateX( Math.PI / -4 );
            
            var flowerHead3 = new THREE.Mesh( new THREE.SphereGeometry( flowerHeadValues.radius, flowerHeadValues.widthSegments, flowerHeadValues.heightSegments, flowerHeadValues.phiStart, flowerHeadValues.phiLength, flowerHeadValues.thetaStart, flowerHeadValues.thetaLength ), flowerMaterial );
            flowerHead3.position.set( xOffset, stemHeight + stemHeight3 * .7, zOffset - stemHeight3 * .7 );

            var flowerHead2 = new THREE.Mesh( new THREE.SphereGeometry( flowerHeadValues.radius, flowerHeadValues.widthSegments, flowerHeadValues.heightSegments, flowerHeadValues.phiStart, flowerHeadValues.phiLength, flowerHeadValues.thetaStart, flowerHeadValues.thetaLength ), flowerMaterial );
            flowerHead2.position.set( xOffset, stemHeight + stemHeight2 * .7, zOffset + stemHeight2 * .7 );
            
            scene.add( flowerStem3, flowerStem2, flowerStem, flowerHead2, flowerHead3 );
            
        } else {
            var flowerHead = new THREE.Mesh( new THREE.SphereGeometry( flowerHeadValues.radius, flowerHeadValues.widthSegments, flowerHeadValues.heightSegments, flowerHeadValues.phiStart, flowerHeadValues.phiLength, flowerHeadValues.thetaStart, flowerHeadValues.thetaLength ), flowerMaterial );
            flowerHead.position.set( xOffset, stemHeight, zOffset );

            //Stem stuff
            var flowerStem = new THREE.Mesh( new THREE.CylinderGeometry( 1, 10, stemHeight ), stemMaterial );
            var stemOffset = (stemHeight / 2);
            flowerStem.position.set( xOffset, stemOffset, zOffset );

            //add to scene
            scene.add( flowerHead, flowerStem );
            }
        }

        function generateGrass() {
        var grassGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 50 );
        var grassTexture = new THREE.CanvasTexture( generateGrassTexture() );
        
        for ( var i = 0; i < 15; i ++ ) {
            var material = new THREE.MeshBasicMaterial( {
            color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 10 ) * .4 + .1 ),
            map: grassTexture,
            side: THREE.DoubleSide,
            transparent: true
            } );
            var mesh = new THREE.Mesh( grassGeometry, material );
            mesh.position.y = i * 2.2;
            mesh.rotation.x = - Math.PI / 2;
            scene.add( mesh );
        }
        }

        function generateDirt() {
        var dirtGeometry = new THREE.BoxBufferGeometry( 2000, 2000, 500 );
        var dirtTexture = new THREE.CanvasTexture( generateDirtTexture() );
        
        for ( var i = 0; i < 15; i ++ ) {
            var material = new THREE.MeshBasicMaterial( {
            map: dirtTexture,
            side: THREE.DoubleSide
            } );
            var mesh = new THREE.Mesh( dirtGeometry, material );
            mesh.position.y = i - 270;
            mesh.rotation.x = - Math.PI / 2;
            scene.add( mesh );
        }
        }

        function generateGrassTexture() {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 512;
        canvas.height = 512;
        var context = canvas.getContext( '2d' );
        for ( var i = 0; i < 40000; i ++ ) {
            context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 40 + 20 ) + '%)';
            context.beginPath();
            context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 4, true );
            context.fill();
        }
        context.globalAlpha = 0.175;
        context.globalCompositeOperation = 'lighter';
        return canvas;
        }
        
        function generateDirtTexture() {
            var canvas = document.createElement( 'canvas' );
            canvas.width = 512;
            canvas.height = 512;
            var context = canvas.getContext( '2d' );
            for ( var i = 0; i < 40000; i ++ ) {
            context.fillStyle = 'hsl(26,76%,9%)';
            context.beginPath();
            context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 20, Math.PI * 4, true );
            context.fill();
            }
            context.globalAlpha = 0.175;
            context.globalCompositeOperation = 'lighter';
            return canvas;
        }

        for (var i = 0; i < 20; i++) {
        var ySplit = Math.floor(Math.random() * (1 + 2)) - 2;
        generateFlower(getRanHeight(), ySplit);
        }

        function getRanHeight() {
        return Math.floor(Math.random() * (600 - 200)) + 200
        }

        generateGrass();
        generateDirt();

        function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function animate() {
        requestAnimationFrame( animate );
        render();
        }
            

        function render() {
        var timer = Date.now() * 0.0001;
        flowerMaterial.uniforms[ 'time' ].value = .000025 * ( Date.now() - start);
        renderer.render( scene, camera );
        }

        animate();


}