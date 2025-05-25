
import * as THREE from "three";

const width = 960;
const height = 540;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 1.0);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf9f9f9, 200, 300);

const camera = new THREE.PerspectiveCamera(45, width / height);

const texture = new THREE.TextureLoader().load("imgs/star.png");
texture.colorSpace = THREE.SRGBColorSpace;
// マテリアルを作成する
const material = new THREE.SpriteMaterial({
  map: texture,
});
// フォグ（霞）を有効にする
material.fog = true;

// ビルボードを作成
for (let i = 0; i < 1000; i++) {
  const sprite = new THREE.Sprite(material);
  // ランダムな座標に配置
  let horizontalPosition = 500 * (Math.random() - 0.5);
  if (horizontalPosition > -20 && horizontalPosition < 20) {
    horizontalPosition += horizontalPosition > 0 ? 20 : -20; 
  }
  let verticalPosition = 500 * (Math.random() - 0.5);
  if (verticalPosition > -20 && verticalPosition < 20) {
    verticalPosition += verticalPosition > 0 ? 20 : -20; 
  }
  sprite.position.x = horizontalPosition;
  sprite.position.y = 100 * Math.random() - 40;
  sprite.position.z = verticalPosition;
  // 必要に応じてスケールを調整
  sprite.scale.set(10, 10, 10);

  scene.add(sprite);
}

const earthTexture = new THREE.TextureLoader().load("imgs/earth.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace;

const earthGeometry = new THREE.SphereGeometry(20, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(2,2,2);
scene.add(directionalLight);


// 地面を作成
const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
plane.position.y = -100;
scene.add(plane);

tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
  // カメラの自動移動
  camera.position.x = 100 * Math.sin(Date.now() / 20000);
  camera.position.z = 100 * Math.cos(Date.now() / 20000);
  camera.position.y = 50 * Math.sin(Date.now() / 10000) + 60;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
