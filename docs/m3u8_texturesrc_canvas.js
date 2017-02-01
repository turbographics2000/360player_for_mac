var cnv = document.createElement('canvas');
//var vid = document.createElement('video');
var ctx = null;
cnv.crossOrigin = 'anonymous';
//vid.crossOrigin = 'anonymous';
//vid.setAttribute('webkit-playsinline', 'webkit-playsinline');

vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8';
vid.onloadedmetadata = function() {
  ctx = cnv.getContext('2d');
  //vid.play();
}
vid.style.width = '1280px';
vid.style.height = '1280px';
//document.body.appendChild(vid);

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
var texture = new THREE.Texture(cnv); //✳️
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
renderer.domElement.onclick = function() {
  vid.play();
  render();
};

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
  if(ctx && vid.videoWidth && vid.videoHeight) {
    cnv.width = vid.videoWidth;
    cnv.height = vid.videoHeight;
    ctx.drawImage(vid, 0, 0);
  }
  texture.needsUpdate = true;
  manager.render(scene, camera);
}
