var cnv = document.createElement('canvas');
var vid = document.createElement('video');
//vid.width = 1440;
//vid.height = 720;
//document.body.appendChild(cnv);
//document.body.appendChild(vid);

//cnv.crossOrigin = "anonymous";
//vid.crossOrigin = "anonymous";
var ctx = null;

if(window.chrome) {
  //vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd';
  if(Hls.isSupported()) {
    var hls = new Hls();
    //hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd');
    hls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8');
    vid.onloadedmetadata = function() {
      ctx = cnv.getContext('2d');
      vid.play();
      render();
    }
    hls.attachMedia(vid);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
    });
  }
} else {
  //vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8';
  //vid.src = 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560_video_1080_5000000.m3u8';
  vid.src = 'output.mp4';
  vid.onloadedmetadata = function() {
    ctx = cnv.getContext('2d');
    vid.play();
    render();
  }
}
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.domElement.crossOrigin = 'anonymous';
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
var geometry = new THREE.SphereBufferGeometry(100, 64, 64);
//var texture = new THREE.Texture(cnv);
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
  /*if(!cnv.width || !cnv.height) {
    cnv.width = vid.videoWidth;
    cnv.height = vid.videoHeight;
  }
  if(ctx && vid.videoWidth && vid.videoHeight) {
    ctx.drawImage(vid, 0, 0, cnv.width, cnv.height);
  }*/
  texture.needsUpdate = true;
  if(renderer) {
    renderer.render(scene, camera);
  }
}
