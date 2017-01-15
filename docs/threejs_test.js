var cnv = document.createElement('canvas');
var vid = document.createElement('video');
vid.width = 1920;
vid.height = 960;
cnv.crossOrigin = "anonymous";
vid.crossOrigin = "anonymous";
var ctx = null;

if(window.chrome) {
  //vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd';
  if(Hls.isSupported()) {
    var hls = new Hls();
    //hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd');
    hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8');
    hls.attachMedia(vid);
    render();
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      ctx = cnv.getContext('2d');
      vid.play();
    });
  }
} else {
  vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8';
  vid.onloadedmetadata = function() {
    ctx = cnv.getContext('2d');
    vid.play();
    render();
  }
}
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
var texture = new THREE.Texture(cnv);
var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
var mesh = new THREE.Mesh(geometry, material);
scene.add(camera);
scene.add(mesh);
function render() {
  console.log('1');
  requestAnimationFrame(render);
  controls.update();
  cnv.width = vid.videoWidth;
  cnv.height = vid.videoHeight;
  if(ctx && vid.videoWidth && vid.videoHeight) {
    ctx.drawImage(vid, 0, 0);
  }
  if(texture) texture.needsUpdate = true;
  if(renderer) {
    renderer.render(scene, camera);
  }
}
