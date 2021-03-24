const canvas = document.querySelector('canvas.threejs')

let WIDTH = window.innerWidth * .65, HEIGHT = window.innerHeight

const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 8000)
camera.position.set(0, 0, 170);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas});
renderer.setSize(WIDTH, HEIGHT);

document.body.appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight("#fff", 1.2);
scene.add(ambientLight)

const light = new THREE.PointLight( "#fff", .9, 100 );
light.position.set( 20, 20, 50 );
scene.add( light );

const geometry = new THREE.PlaneBufferGeometry( 80, 80, 32, 32 );
const loader = new THREE.TextureLoader();
const t = loader.load('./static/t.png')
const h = loader.load('./static/h3.png')
const a = loader.load('./static/a.png')
const material = new THREE.MeshStandardMaterial({
    map: t,
    displacementMap: h,
    displacementScale: 8,
    alphaMap: a,
    transparent: true,
    depthTest: false,
    flatShading: true,
});
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

plane.rotation.x = 199.7

let y = 0
function animateMove(event){
    let client = event.clientY
    let client_x = event.clientX
    let w = WIDTH - client_x
    if(client_x > 750 && window.innerWidth > 1300){ y = HEIGHT - client }
    else if(window.innerWidth < 1300){ y = HEIGHT - client }
    else{ y = 8 }
}
document.addEventListener('mousemove', animateMove)

const clock = new THREE.Clock()

function render() {
    let time = clock.getElapsedTime()
    plane.rotation.z = time * .3
    plane.material.displacementScale = 9 + y*0.02
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render()

function handleWindowResize() {
    HEIGHT = window.innerHeight;
    
    if(window.innerWidth<900){
        WIDTH = window.innerWidth
    }else{
        WIDTH = window.innerWidth * .65;
    }
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', handleWindowResize)
