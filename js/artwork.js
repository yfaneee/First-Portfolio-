let animationContainer = document.getElementById('animation-container');

document.addEventListener('DOMContentLoaded', function() {
    init();

    // Handle window resize for Three.js
    window.addEventListener('resize', function() {
        const animationContainer = document.getElementById('animation-container');
        renderer.setSize(animationContainer.clientWidth, animationContainer.clientHeight);
        camera.aspect = animationContainer.clientWidth / animationContainer.clientHeight;
        camera.updateProjectionMatrix();
    });
    const logo = document.getElementById('home-link');
    logo.addEventListener('click', navigateToHome);
});

function navigateToHome() {
    window.location.href = 'index.html';
}

let scene, camera, renderer, animalMesh;
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
function init() {

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x52796F); 

    // Camera setup
    camera = new THREE.PerspectiveCamera(40, animationContainer.clientWidth / animationContainer.clientHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.set(800, 100, 1000);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(animationContainer.clientWidth, animationContainer.clientHeight);
    animationContainer.appendChild(renderer.domElement);

    // Ambient light
    let hlight = new THREE.AmbientLight(0x404040, 1 );
    scene.add(hlight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    console.log(camera);
    console.log(scene);

    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    console.log(animalMesh);

    // GLTF model loading
    let loader = new THREE.GLTFLoader();
    loader.load('animated/scene.gltf', function(gltf) {
        console.log("Model loaded!");
        animalMesh = gltf.scene.children[0];
        animalMesh.scale.set(2, 2, 2); // Normal scale
        animalMesh.position.set(0, 0, 0); // Center the duck
        scene.add(gltf.scene);
        animate();
        }, undefined, function(error) {
            console.error("Error loading model:", error);
    });

    // Mouse event handlers
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    
     // Draggable header event handlers
     animationContainer.addEventListener('mousedown', function() {
        isDragging = true;
        this.querySelector('.overlay').style.opacity = 0; // Hide overlay when dragging starts
    });

    animationContainer.addEventListener('mouseup', function() {
        isDragging = false;
        if (!this.querySelector(':hover')) {
            this.querySelector('.overlay').style.opacity = 1; // Show overlay when dragging ends and not hovering
        }
    });

    // Handle mouse enter and leave events to toggle hover effect
    animationContainer.addEventListener('mouseenter', function() {
        if (!isDragging) {
            this.querySelector('.overlay').style.opacity = 1; // Show overlay when mouse enters header area
        }
    });

    animationContainer.addEventListener('mouseleave', function() {
        if (!isDragging) {
            this.querySelector('.overlay').style.opacity = 0; // Hide overlay when mouse leaves header area
        }
    });
}
//container for header
function isCursorInContainer(e) {
    const containerBounds = animationContainer.getBoundingClientRect();
    return e.clientX >= containerBounds.left && e.clientX <= containerBounds.right &&
           e.clientY >= containerBounds.top && e.clientY <= containerBounds.bottom;
}

//moving the 3d model
animationContainer.addEventListener('mousedown', function() {
    this.classList.add('active-interaction');
});

animationContainer.addEventListener('mouseup', function() {
    this.classList.remove('active-interaction');
});

function onMouseDown(e) {
    isDragging = true;
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
}

function onMouseMove(e) {
    if (isDragging) {
        if (!isCursorInContainer(e)) {
            isDragging = false;
            return;
        }

        var deltaX = e.clientX - previousMousePosition.x;
        var deltaY = e.clientY - previousMousePosition.y;

        animalMesh.rotation.y += deltaX * 0.01;
        animalMesh.rotation.x += deltaY * 0.01;

        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    }
}


function onMouseUp(e) {
    isDragging = false;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

