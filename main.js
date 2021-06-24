import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(0);

renderer.render(scene, camera);

const verticesOfCube = [
  -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
  -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
];
const indicesOfFaces = [
  2, 1, 0,    0, 3, 2,
  0, 4, 7,    7, 3, 0,
  0, 1, 5,    5, 4, 0,
  1, 2, 6,    6, 5, 1,
  2, 3, 7,    7, 6, 2,
  4, 5, 6,    6, 7, 4,
];
const radius = 7;  
const detail = 5;  
const circle = new THREE.PolyhedronGeometry(
  verticesOfCube, indicesOfFaces, radius, detail);
circle.addEventListener("click", () => {console.log("hi")})

const geometry = new THREE.TorusGeometry(10,1,10,12);
const geometrys = new THREE.TorusGeometry(5,1,10,12);
const material = new THREE.MeshStandardMaterial({color: 0xffffff
  // , wireframe: true
});
const color3 = new THREE.Color("rgba(255, 255, 0, .1)");
const circMaterial = new THREE.MeshBasicMaterial({ color: color3 });
const circ = new THREE.Mesh(circle, circMaterial)
const stuff = new THREE.Mesh(geometrys,material)
const stuff2 = new THREE.Mesh(geometrys,material)
const stuff3 = new THREE.Mesh(geometrys,material)
const stuff4 = new THREE.Mesh(geometrys,material)
const torus = new THREE.Mesh(geometry, material);
const torus2 = new THREE.Mesh(geometry, material);
const torus3 = new THREE.Mesh(geometry, material);
const torus4 = new THREE.Mesh(geometry, material);
circ.position.set(5,50,50)



scene.add(circ)
scene.add(torus);
scene.add(torus2);
scene.add(torus3);
scene.add(torus4);
scene.add(stuff)
scene.add(stuff2)
scene.add(stuff3)
scene.add(stuff4)
// const newShape = new THREE.Mesh(geometry, material)
// scene.add(newShape)
renderer.render(scene, camera)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(50,50,50)
scene.add((pointLight))
const controls = new OrbitControls(camera, renderer.domElement);


function animate () {
  requestAnimationFrame(animate)
  // stuff.rotation.x += .01;
  stuff.rotation.y += .02;
  stuff2.rotation.y -= .02;
  stuff3.rotation.x += .02;
  stuff4.rotation.x -= .02;
  // stuff.rotation.z += .05;
  // torus.rotation.y += .04;
  // torus.rotation.z += .08;
  torus.rotation.x += .02;
  torus2.rotation.y -= .02;
  torus3.rotation.x -= .02;
  torus4.rotation.y += .02


  controls.update();

  renderer.render(scene, camera)
}
animate();

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
