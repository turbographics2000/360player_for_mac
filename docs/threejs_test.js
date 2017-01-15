var ctx = null;
if(Hls.isSupported()) {
  var video = document.getElementById('vid');
  var hls = new Hls();
  hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd');
  //hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8');
  hls.attachMedia(video);
  render();
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    ctx = cnv.getContext('2d');
    video.play();
  });
}
//cnv.crossOrigin = "Anonymous";
//vid.crossOrigin = "Anonymous";
//vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd';

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
var texture = new THREE.Texture(cnv);
var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
function render() {
  console.log('1');
  requestAnimationFrame(render);
  cnv.width = video.videoWidth;
  cnv.height = video.videoHeight;
  if(ctx && video.videoWidth && video.videoHeight) {
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  }
  if(texture) texture.needsupdate = true;
  if(renderer) renderer.render(scene, camera);
}
