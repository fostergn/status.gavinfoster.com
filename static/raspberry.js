var camera, scene, renderer;
var raspberry;
var mesh;
init();
animate();
function init() {
  var container = document.getElementById('container');
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 5000);
  camera.position.z = 20;


  scene = new THREE.Scene();

  // Ambient light
  var ambient = new THREE.AmbientLight(0xFFFFFF, 4);
  scene.add(ambient);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor (0x000000, 0);
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  //
  window.addEventListener( 'resize', onWindowResize, false );

  var manager = new THREE.LoadingManager( manager );
  manager.onProgress = function(item, loaded, total) {
    // console.log(item, loaded, total)
  };

  var onProgress = function(xhr) {
    if(xhr.lengthComputable) {
      var percentComplete = xhr.loaded/xhr.total*100;
      // console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function(e){
    console.log('error: ', e);
    console.log("loader failed! because of error " + e.target.status + ", " + e.target.statusText);
  }

THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( '../static/' );
mtlLoader.load( 'pi.mtl', function( materials ) {
  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.load( '../static/pi.obj', function ( object ) {

  object.position.y = .3;
  object.position.x = 0;
  object.rotation.x = .5 * Math.PI / 2;

  scene.add( object );
  raspberry = object;

  }, onProgress, onError );
});

}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
  requestAnimationFrame( animate );
  if(raspberry){
    raspberry.rotation.y += 0.005;
  }
  renderer.render( scene, camera );
}