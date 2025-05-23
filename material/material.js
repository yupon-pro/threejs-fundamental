import * as THREE from "three";

const width = 960;
const height = 540;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas")});
renderer.setSize(width, height);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(0, 0, +1000);

const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x6699FF,
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

animate();

function animate() {
  // mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}



