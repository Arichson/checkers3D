import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
let selectedPeice = null;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 20,0);



///////////// Game Board ( not including the small squares )
const gameBoard = new THREE.Group;
const boardOutline = new THREE.BoxGeometry(17, .2, 17);
const yellow = new THREE.MeshBasicMaterial({color: 0xb2b500});
const theBoard = new THREE.Mesh(boardOutline, yellow)
theBoard.position.set(0,0,0)
gameBoard.add(theBoard)

/////////////Squares on the board
const smallSquares = new THREE.BoxGeometry(1.8, .5, 1.8);
const redSquareMaterial = new THREE.MeshBasicMaterial({color: 0x870900});
const blackSquareMaterial = new THREE.MeshBasicMaterial({color: 0x151515});

///////// Positions the squares on the board and places it on the board

for( let i  = 0; i  < 8; i ++){
  for( let j= 0; j< 8; j++ ){

    const newSquare = new THREE.Mesh(smallSquares, i % 2 === 0 && j % 2 === 1  || i % 2 === 1 && j % 2 === 0? redSquareMaterial : blackSquareMaterial);
    i % 2 === 1 ? newSquare.position.set(-2 * j + 7 , 0, -2 * i + 7) : newSquare.position.set(-2 * j + 7, 0, -2 * i + 7)
    // i % 2 === 0? newSquare.position.set(-2 * j + 5 , 0, -2 * i + 7) : newSquare.position.set(-2 * j + 7, 0, -2 * i + 7)
    console.log( i + "" + j )
    gameBoard.add(newSquare)
    // gameBoard.add(newRed)
  }
}
scene.add(gameBoard)


// for( let i  = 0; i  < 8; i ++){
//   for( let j= 0; j< 4; j++ ){

//     const newRed = new THREE.Mesh(smallSquares, redSquareMaterial);
//     const newBlack = new THREE.Mesh(smallSquares, blackSquareMaterial);
//     i %2 === 1? newRed.position.set(-4 * j + 5 , 0, -2 * i + 7) : newRed.position.set(-4 * j + 7, 0, -2 * i + 7)
//     i %2 === 0? newBlack.position.set(-4 * j + 5 , 0, -2 * i + 7) : newBlack.position.set(-4 * j + 7, 0, -2 * i + 7)
//     console.log( i + "" + j )
//     gameBoard.add(newBlack)
//     gameBoard.add(newRed)
//   }
// }
// scene.add(gameBoard)

////// This puts the peices on the board
for( let i = 0; i < 8; i++) {
  for (let j = 0; j < 3;  j++){

    const peices = new THREE.CylinderGeometry(.6, .6, 1, 30);
    const circMat = new THREE.MeshStandardMaterial( i < 4 ? {color: 0xffffff} : {color: 0xf32f43})
    const thePeices = new THREE.Mesh(peices, circMat)
    // i <4 || i > 7 
    // ?  
    // thePeices.userData.currentSquare = i +j &&
    // j%2 === 1? thePeices.position.set( 4*i - 7, 0, 2*j -7) : thePeices.position.set(4*i - 5, 0, 2* j - 7)
    // :
    // thePeices.userData.currentSquare = i +j &&
    // j%2 === 0? thePeices.position.set( 4*i - 23, 0, 2*j + 3) : thePeices.position.set(4*i -21, 0, 2* j +3)
    
    if(i <4 || i > 7 ) {
      thePeices.userData.owner = "player one"
      thePeices.userData.currentSquare = i +j && j%2 === 1? thePeices.position.set( 4*i - 7, 0, 2*j -7) : thePeices.position.set(4*i - 5, 0, 2* j - 7)
    } else {
      thePeices.userData.owner = "player two"
      thePeices.userData.currentSquare = i +j && j%2 === 0? thePeices.position.set( 4*i - 23, 0, 2*j + 3) : thePeices.position.set(4*i -21, 0, 2* j +3)
    } 
    
    console.log( i + j)

    scene.add(thePeices)
  }
}

////// This just shows the center of the board
// const center = new THREE.CylinderGeometry(.6, .6, 1, 30);
// const circMat = new THREE.MeshBasicMaterial({color: 0xffffff})
// const theCenter = new THREE.Mesh(center, circMat)
// theCenter.position.set( 0, 0 , 0)
// scene.add(theCenter)


//////// adds a light source 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,50,30)
const bottomPointLight = new THREE.PointLight(0xffffff)
bottomPointLight.position.set(0,-50,30)
scene.add((pointLight))
scene.add((bottomPointLight))

//////// allows orbit of hte board and zoom in/out
const controls = new OrbitControls(camera, renderer.domElement);

///////////// RAY CASTING SECTION

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const onMouseMove = ( event ) => {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
const hoverOnPeices = (event) => {
  
  raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {
    intersects[ i ].object.material.transparent = true;
		intersects[ i ].object.material.opacity = .5;
	}
}

const leavePeices = (event) => {
  for ( let i = 0; i < scene.children.length; i ++ ) {
    if(scene.children[i].material) {
      scene.children[i].material.opacity = scene.children[i].userData.currentSquare === selectedPeice ? 0.5 : 1.0;
    }
	}
}
const onMouseClick = (event) => {
  raycaster.setFromCamera( mouse, camera );
	let intersects = raycaster.intersectObjects( scene.children );

  if(intersects.length > 0){
    selectedPeice = intersects[0].object.userData.currentSquare;
    // console.log(intersects[0].object.material.color = {r:0, g: 0, b: 99})
  }
  // if( selectedPeice) {
  //   raycaster.setFromCamera(mouse, camera);
  //   intersects = raycaster.intersectObjects(board.children);

  //   if( intersects.length > 0 && intersects[0].object.userData. )
  // }
}
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onMouseClick)
///// recursive function to keep updating the camera and render the images
function animate () {

  controls.update();
  leavePeices();
  hoverOnPeices();
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate();