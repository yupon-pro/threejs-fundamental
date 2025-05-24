import * as THREE from "three";

const width = 960;
const height = 540;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas")
});

renderer.setSize(width, height);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
camera.position.set(0, 0, +1000);

const geometry = new THREE.SphereGeometry(250, 30, 30);
const material = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const spotlight = new THREE.SpotLight(0xFFFFFF, 4, 30, Math.PI/6, 10, 0.5);
// spotlight.position.set(10, 100, 10);
// scene.add(spotlight);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 50, 1.0);
scene.add(pointLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
// directionalLight.position.set(2, 2, 2);
// scene.add(directionalLight);

animate();

function animate() {
  mesh.rotation.y += 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}