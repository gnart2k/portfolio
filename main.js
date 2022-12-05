import "./style.css"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshStandardMaterial } from "three";
const scene = new THREE.Scene();
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// personalview, 0.1 and 1000 is view frustum to see everything from camera lens
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//render with webgl rendered
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})
renderer.setSize(window.innerWidth, window.innerHeight);


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3)
renderer.render(scene, camera)
//create geometry
const geometry = new THREE.TorusGeometry(3, 1, 10, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x3461EB, wireframe: true })
const torus = new THREE.Mesh(geometry, material)

const geometry0 = new THREE.TorusGeometry(3, 2, 10, 100)
const material0 = new THREE.MeshStandardMaterial({ color: 0xE134EB, wireframe: true })
const torus0 = new THREE.Mesh(geometry0, material0)


const geometry2 = new THREE.TorusGeometry(4, 2, 10, 100)
const material2 = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true })
const torus2 = new THREE.Mesh(geometry2, material2)
torus.position.setX(5)
torus0.position.setX(10)
torus0.position.setY(15)
torus0.position.setZ(10)
torus2.position.setX(-10)
torus2.position.setY(-15)
torus2.position.setZ(-4)



scene.add(torus, torus0, torus2)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)

//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(500, 200)

new OrbitControls(camera, renderer.domElement);


const loader = new GLTFLoader();

loader.load('/public/imgs/mc-laren/source/McLaren.glb', function(gltf) {
  scene.add(gltf.scene);
  console.log(scene)
}, undefined, function(error) {

  console.error(error);

});


function animate() {
  requestAnimationFrame(animate);

  torus.rotateX(0.01)
  torus.rotateY(0.01)
  torus.rotateZ(0.01)

  if (torus.position.x >= 10) {
    torus.translateX(-0.01)
  } else {
    torus.translateX(0.01)
  }

  torus0.rotateX(-0.01)
  torus0.rotateY(0.01)
  torus0.rotateZ(0.01)
  torus2.rotateZ(0.01)
  renderer.render(scene, camera)
}


// //add background
// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top
//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera
animate()
