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
camera.position.set(0,50,50);

renderer.render(scene, camera);

const redSquares = [];
const blackSquares = [];
const geometry = new THREE.BoxGeometry(1.8, .5, 1.8);
const gameBoard = new THREE.BoxGeometry(17, .3, 17);
const redSquareMaterial = new THREE.MeshBasicMaterial({color: 0x870900});
const blackSquareMaterial = new THREE.MeshBasicMaterial({color: 0x575757});
const yellow = new THREE.MeshBasicMaterial({color: 0xb2b500});
const circMat = new THREE.MeshBasicMaterial({color: 0xb2b500, wireframe: true })

const center = new THREE.IcosahedronGeometry(1, 2);

for( let j = 0; j < 8; j++){

  for( let i = 0; i < 4; i++ ){
    // console.log(i%2 === 0)
    const newRed = new THREE.Mesh(geometry, redSquareMaterial);
    const newBlack = new THREE.Mesh(geometry, blackSquareMaterial);
    // newRed.position.set(4*i +2 ,0,2*j)
    // newBlack.position.set(4*i ,0,2*j)
    j%2 === 1? newRed.position.set(-4*i + 5 ,0,-2*j+7) : newRed.position.set(-4*i +7,0,-2*j+7)
    j%2 === 0? newBlack.position.set(-4*i +5 ,0,-2*j+7) : newBlack.position.set(-4*i +7,0,-2*j+7)
    // j%2 === 1? newRed.position.set(4*i +2 ,0,2*j) : newRed.position.set(4*i ,0,2*j)
    // j%2 === 0? newBlack.position.set(4*i +2 ,0,2*j) : newBlack.position.set(4*i ,0,2*j)
    redSquares.push(newRed)
    blackSquares.push(newBlack)
  }
}
const theCenter = new THREE.Mesh(center, circMat)
theCenter.position.set(0,0,0)
scene.add(theCenter)
const theBoard = new THREE.Mesh(gameBoard, yellow)
theBoard.position.set(0,0,0)
scene.add(theBoard)
// scene.add(blackSquares[0]);
// scene.add(redSquares[0]);
blackSquares.forEach( (square, i) => {
  scene.add(square)
  scene.add(redSquares[i])
})
renderer.render(scene, camera)


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(50,50,50)
scene.add((pointLight))

const controls = new OrbitControls(camera, renderer.domElement);


function animate () {
  requestAnimationFrame(animate)
  // smallSquare.rotation.x += .02;


  controls.update();

  renderer.render(scene, camera)
}
animate();

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
