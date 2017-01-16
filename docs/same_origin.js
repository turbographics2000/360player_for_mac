var cnv = document.createElement('canvas');
var vid = document.createElement('video');
var ctx = null;

vid.src = 'output.mp4';
vid.onloadedmetadata = function() {
  ctx = cnv.getContext('2d');
  vid.play();
  render();
}

var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
var scene = new THREE.Scene();
var manager = new THREE.WebVRManager(renderer, effect);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
var texture = new THREE.Texture(vid);
texture.min_filter = THREE.LinearFilter;
texture.mag_filter = THREE.LinearFilter;
var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.set(-1, 1, 1);
scene.add(camera);
scene.add(mesh);
function render() {
  requestAnimationFrame(render);
  controls.update();
  texture.needsUpdate = true;
  if(renderer) {
    renderer.render(scene, camera);
  }
}
