import * as THREE from "three";

const width = 1024;
const height = 600;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas") });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // 背景色を少し明るく

const camera = new THREE.PerspectiveCamera(74, width / height, 1, 10000);
camera.position.set(0, 0, 1000);

const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(400),
  new THREE.MeshStandardMaterial({ color: 0xffffff }) // 色を明るく
);
mesh.castShadow = true;
scene.add(mesh);

const meshFloor = new THREE.Mesh(
  new THREE.BoxGeometry(2000, 0.1, 2000),
  new THREE.MeshStandardMaterial({ color: 0xffffff }) // 床に色をつける
);
meshFloor.receiveShadow = true;
scene.add(meshFloor);

// スポットライトの設定
const spotlight = new THREE.SpotLight(0xffffff, 2, 2000, Math.PI / 4, 0.5);
spotlight.position.set(500, 1000, 500);
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 2048;
spotlight.shadow.mapSize.height = 2048;

// ターゲットを球体に向ける
spotlight.target = mesh;
scene.add(spotlight);
scene.add(spotlight.target); // 明示的にシーンに追加

animate();

function animate() {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
