import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css'

function main(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(20, 20, 20);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, gridHelper);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  
  function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill('').map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
  }

  Array(200).fill('').forEach(addStar);

  const spaceTexture = new THREE.TextureLoader().load('space.jpeg');

  scene.background = spaceTexture;

  (function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
  })();
  const jeffTexture = new THREE.TextureLoader().load('colibri.png');
  const jeff = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: jeffTexture })
  )
  scene.add(jeff);

  const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
  const normalTexture = new THREE.TextureLoader().load('normal.jpeg');
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
  );
  scene.add(moon);
  moon.position.x = 30;
  moon.position.setX(10);
  moon.position.setY(10);
  function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;
    camera.position.z = t * -0.01;
    camera.position.y = t * -0.0002;
    camera.position.x = t * -0.0002;
  }
  document.body.onscroll = moveCamera
}
function App() {
  useEffect(() => {
    main();
  }, [])
  return (
    <div>
      <canvas id="bg"></canvas>
    </div>
  )
}

export default App
