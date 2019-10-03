// imports
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

let scene, camera, renderer, cube;

// initial scene setup
const init = () => {
  scene = new Scene();

  // OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
  // https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera

  // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
  // https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
  // fov — Camera frustum vertical field of view.
  // aspect — Camera frustum aspect ratio.
  // near — Camera frustum near plane. -- closest renderable
  // far — Camera frustum far plane. -- farthest renderable
  camera = new PerspectiveCamera(
    75, // default 50
    window.innerWidth / window.innerHeight, // default 1
    0.1, // default 0.1
    1000, // default 2000
  );
  camera.position.z = 5;
  console.log('⚡🚨: init -> camera', camera);

  // camera captures the scene, sends it to the renderer to process it into a dom element
  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // "mesh": an object in the scene
  // i.e. a geometry: vertices + material (shader)
  const geometry = new BoxGeometry(1, 1, 1); //https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
  const material = new MeshBasicMaterial({ color: 'hsla(100,80%,50%,1)' }); // built-in meshes: preset, pre-made shaders (no shaders)
  // Mesh: shape + look
  cube = new Mesh(geometry, material);
  scene.add(cube);
};

// updates every frame
const animate = time => {
  // time is like performance.now() -- // can use delta-time for updates
  // call animate recursively
  requestAnimationFrame(animate);

  // update logic
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // render scene
  renderer.render(scene, camera);
};

// updates viewport on resize
const resize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};
window.addEventListener('resize', resize);

// runs init, then animate
if (!init()) animate(); // weirdo

// ===================== //

// TODO: CSS
// node is getting repainted too much?
// `will-change: transform`

// TODO: Boomerang Game (MVP)
// - Orthographic camera
// - Character BONUS: with a hat
// - Movement logic
// - Mouse logic for throwing boomerang
// - Logic for boomerang movement
//    - 1. comes right back
//    - 2. interpolate btw current / start
