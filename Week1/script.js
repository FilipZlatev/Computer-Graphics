import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff0000); 

const geometry = new THREE.CylinderGeometry(1, 1, 2, 3); 
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
}

mesh.position.set(1, 1, 0); 
mesh.rotation.y = Math.PI / 4; 
mesh.scale.set(2, 2, 2); 

scene.add(mesh);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();


renderer.render(scene, camera)