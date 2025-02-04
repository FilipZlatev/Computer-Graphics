// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Adjust light position
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add a simple cube to test the scene rendering
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Function to Load and Position 3D Models
function loadModel(path, position, scale, rotation) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        console.log('Model Loaded:', model); // Check if model is loaded
        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale.x, scale.y, scale.z);
        model.rotation.y = rotation;
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(model);
    }, undefined, (error) => {
        console.error(`Error loading ${path}:`, error);
    });
}

// Load Models (Ensure paths are correct)
loadModel('models/sofa.gltf', { x: 0, y: 0, z: -2 }, { x: 1, y: 1, z: 1 }, 0); // Sofa
loadModel('models/coffee_table.gltf', { x: 0, y: 0, z: -1 }, { x: 0.8, y: 0.8, z: 0.8 }, 0); // Coffee Table
loadModel('models/smart_tv.glb', { x: 0, y: 1, z: 2 }, { x: 0.5, y: 0.5, z: 0.5 }, Math.PI); // Smart TV
loadModel('models/book_shelf.glb', { x: -3, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, Math.PI / 2); // Bookshelf
loadModel('models/floor_lamp.glb', { x: 2, y: 0, z: -2 }, { x: 1, y: 1, z: 1 }, 0); // Floor Lamp
loadModel('models/floor_pot.glb', { x: -2, y: 0, z: 1.5 }, { x: 1, y: 1, z: 1 }, 0); // Floor Pot (Plant)
loadModel('models/wall_art.glb', { x: 0, y: 1.5, z: -2.95 }, { x: 1, y: 1, z: 1 }, 0); // Wall Art
loadModel('models/curtains.glb', { x: 0, y: 1.5, z: 3 }, { x: 1, y: 1, z: 1 }, 0); // Curtains
loadModel('models/chair.glb', { x: 1.5, y: 0, z: -1 }, { x: 1, y: 1, z: 1 }, Math.PI / 2); // Chair

// Resize Handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera); // Render the scene
}
animate();