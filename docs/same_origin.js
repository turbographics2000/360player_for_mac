var vid = document.createElement('video');
vid.onloadedmetadata = function() {
  vid.play();
  render();
}
vid.src = 'output.mp4';
vid.setAttribute('webkit-playsinline', 'webkit-playsinline');
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
var texture = new THREE.Texture(vid); //✳️
var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
var mesh = new THREE.Mesh(geometry, material);
var effect = new THREE.VREffect(renderer);
var manager = new WebVRManager(renderer, effect);
mesh.scale.set(-1, 1, 1);
scene.add(camera);
scene.add(mesh);
texture.min_filter = THREE.LinearFilter;
texture.mag_filter = THREE.LinearFilter;
effect.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

function onResize() {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function render() {
  requestAnimationFrame(render);
  controls.update();
  texture.needsUpdate = true;
  manager.render(scene, camera);
}
