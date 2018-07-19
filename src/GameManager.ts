const THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)
require('./GamepadControl').default(THREE)
interface ScreenSize {
	width: number
	height: number
}

class GameManager {
	camera: any
	renderer: any
	scene: any
	controls: any
	canvas: HTMLElement
	useGamepad: boolean

	constructor(private screenSize: ScreenSize) {
		this.canvas = document.getElementById('game')
		screenSize || this.dynamicScreenSize()
		this.testGamepad()
		this.setupScene()
		this.animate()
	}

	testGamepad() {
		this.useGamepad = navigator.getGamepads()[0] !== null
		console.log(this.useGamepad)
	}

	setDimensions() {
		this.camera.aspect = this.screenSize.width / this.screenSize.height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	dynamicScreenSize() {
		this.screenSize = { width: window.innerWidth, height: window.innerHeight }

		window.addEventListener('resize', () => {
			this.screenSize.width = window.innerWidth
			this.screenSize.height = window.innerHeight
			this.setDimensions()
		})
	}

	setupScene() {
		this.camera = new THREE.PerspectiveCamera(
			70,
			this.screenSize.width / this.screenSize.height,
			0.01,
			100000
		)
		this.camera.position.z = 10

		this.scene = new THREE.Scene()

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: this.canvas
		})

		var ambientLight = new THREE.AmbientLight(0x404040)
		var directionalLight1 = new THREE.DirectionalLight(0xc0c090)
		var directionalLight2 = new THREE.DirectionalLight(0xc0c090)
		directionalLight1.position.set(-100, -50, 100)
		directionalLight2.position.set(100, 50, -100)
		this.scene.add(directionalLight1)
		this.scene.add(directionalLight2)
		this.scene.add(ambientLight)
		var helper = new THREE.GridHelper(1200, 60, 0xff4444, 0x404040)
		this.scene.add(helper)

		this.controls = !this.useGamepad
			? new OrbitControls(this.camera)
			: new THREE.GamepadControls(this.camera)

		//controls.update() must be called after any manual changes to the camera's transform
		this.camera.position.set(0, 20, 100)
		this.controls.update()

		this.setDimensions()
	}

	animate() {
		window.requestAnimationFrame(() => this.animate())

		this.controls.update()
		this.renderer.render(this.scene, this.camera)
	}
}

export default GameManager
