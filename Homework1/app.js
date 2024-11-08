
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x66cc66 });
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });


const ground = new THREE.Mesh(new THREE.PlaneGeometry(25, 25), groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


const road1 = new THREE.Mesh(new THREE.PlaneGeometry(3, 25), roadMaterial);
road1.rotation.x = -Math.PI / 2;
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.PlaneGeometry(25, 3), roadMaterial);
road2.rotation.x = -Math.PI / 2;
scene.add(road2);


const buildingMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const buildingMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0099ff });

const building1 = new THREE.Mesh(new THREE.BoxGeometry(6, 2, 2), buildingMaterial1);
building1.position.set(-5, 1, -3);
scene.add(building1);

const building2 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), buildingMaterial1);
building2.position.set(5, 1, -3.5);
scene.add(building2);

const building3 = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2), buildingMaterial2);
building3.position.set(-4, 1, 3);
scene.add(building3);


const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff9020 });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 20), sphereMaterial);
sphere.position.set(0, 0.8, 0);
scene.add(sphere);


gsap.to(sphere.position, {
  x: 3,
  duration: 5,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
  onRepeat: function () {
    gsap.to(sphere.position, { z: sphere.position.z === 3 ? -3 : 3, duration: 2, ease: "power1.inOut" });
  }
});


camera.position.set(10, 8, 5);
camera.lookAt(0, 0, 0);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();