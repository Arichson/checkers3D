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

camera.position.set(0, 20,0);

///////////// Game Board ( not including the small squares )
const gameBoard = new THREE.BoxGeometry(17, .2, 17);
const yellow = new THREE.MeshBasicMaterial({color: 0xb2b500});
const theBoard = new THREE.Mesh(gameBoard, yellow)
theBoard.position.set(0,0,0)
scene.add(theBoard)

/////////////Squares on the board
const smallSquares = new THREE.BoxGeometry(1.8, .5, 1.8);
const redSquareMaterial = new THREE.MeshBasicMaterial({color: 0x870900});
const blackSquareMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

///////// Positions the squares on the board and places it on the board
for( let j = 0; j < 8; j++){
  for( let i = 0; i < 4; i++ ){
    const newRed = new THREE.Mesh(smallSquares, redSquareMaterial);
    const newBlack = new THREE.Mesh(smallSquares, blackSquareMaterial);
    j%2 === 1? newRed.position.set(-4*i + 5 ,0,-2*j+7) : newRed.position.set(-4*i +7,0,-2*j+7)
    j%2 === 0? newBlack.position.set(-4*i +5 ,0,-2*j+7) : newBlack.position.set(-4*i +7,0,-2*j+7)
    scene.add(newBlack, newRed)
  }
}

////// This puts the peices on the board
// const peices = new THREE.CylinderGeometry(.6, .6, 1, 30);
// const circMat = new THREE.MeshBasicMaterial({color: 0xffffff})
// const thePeices = new THREE.Mesh(peices, circMat)
// thePeices.position.set( 0, 0 , 0)
// scene.add(thePeices)




////// This just shows the center of the board
const center = new THREE.CylinderGeometry(.6, .6, 1, 30);
const circMat = new THREE.MeshBasicMaterial({color: 0xffffff})
const theCenter = new THREE.Mesh(center, circMat)
theCenter.position.set( 0, 0 , 0)
scene.add(theCenter)


//////// adds a light source 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(50,50,50)
scene.add((pointLight))

//////// allows orbit of hte board and zoom in/out
const controls = new OrbitControls(camera, renderer.domElement);


///// recursive function to keep updating the camera and render the images
function animate () {
  requestAnimationFrame(animate)


  controls.update();

  renderer.render(scene, camera)
}
animate();