const canvas = document.querySelector('canvas.threejs')

let WIDTH = window.innerWidth * 0.6, HEIGHT = window.innerHeight

const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 8000)
camera.position.set(0, 0, 170);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas});
renderer.setSize(WIDTH, HEIGHT);

document.body.appendChild(renderer.domElement)

const light = new THREE.PointLight( "#fff", 3, 100 );
light.position.set( 0, 5, 0 );
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
scene.add( directionalLight );

const geometry = new THREE.PlaneBufferGeometry( 100, 100, 32, 32 );
const loader = new THREE.TextureLoader();
const t = loader.load('https://aleksandermasojc.github.io/CV//t2.png')
const h = loader.load('https://aleksandermasojc.github.io/CV/h3.png')
const a = loader.load('https://aleksandermasojc.github.io/CV//a3.png')
const material = new THREE.MeshStandardMaterial({
    map: t,
    displacementMap: h,
    displacementScale: 8,
    alphaMap: a,
    transparent: true,
    depthTest: false,
    //flatShading: true,
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
        WIDTH = window.innerWidth * .6;
    }
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}
window.onload = function(){
    handleWindowResize()
}
window.addEventListener('resize', handleWindowResize)
