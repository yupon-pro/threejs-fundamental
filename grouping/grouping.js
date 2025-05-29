import * as THREE from "three";

const width = 1024;
const height = 560;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas")
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(300, 300, 300);
camera.lookAt(0, 0);

const group = new THREE.Group();
scene.add(group);

[...new Array(10)].forEach((_, i) => {
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.SphereGeometry(30, 30, 30);
  const mesh = new THREE.Mesh(geometry, material);

  const radian = i/10 * Math.PI * 2;
  mesh.position.set(
    200*Math.cos(radian),
    30,
    200*Math.sin(radian)
  );
  group.add(mesh);
})


// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0, 1, 0);
// scene.add(directionalLight);

animate()

function animate() {
  group.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}