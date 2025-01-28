let scene, camera, renderer, vehicleModel;

// Initialize the 3D scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);

    // Add lighting to the scene
    const light = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(light);
    
    camera.position.z = 5;

    // Event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);
    
    if (vehicleModel) {
        vehicleModel.rotation.x += 0.01;
        vehicleModel.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// Function to load the model and description of the selected vehicle
function loadModel(vehicleType) {
    // Remove any previously loaded model
    if (vehicleModel) {
        scene.remove(vehicleModel);
    }

    // Load the vehicle model based on selection
    const loader = new THREE.GLTFLoader();
    let modelPath = '';
    let description = '';

    switch(vehicleType) {
        case 'car':
            modelPath = 'models/2021_bmw_m4_competition_g82.glb';
            description = "A car is a road vehicle, typically with four wheels, powered by an internal combustion engine.";
            break;
        case 'truck':
            modelPath = 'models/bateau_riva_boat.glb';
            description = "A truck is a large, heavy motor vehicle designed for transporting goods.";
            break;
        case 'motorcycle':
            modelPath = 'models/motorcycle_model.glb';
            description = "A motorcycle is a two-wheeled vehicle powered by an engine.";
            break;
        default:
            return;
    }

    // Load the selected model
    loader.load(modelPath, function(gltf) {
        vehicleModel = gltf.scene;
        scene.add(vehicleModel);
        vehicleModel.scale.set(1.5, 1.5, 1.5);  // Adjust size
        vehicleModel.position.set(0, -1, 0); // Adjust position
        loadDescription(description);  // Load description for selected vehicle
    });
}

// Function to update the vehicle description panel
function loadDescription(description) {
    document.getElementById('vehicle-info').innerText = description;
}

// Initialize the scene on page load
window.onload = init;
