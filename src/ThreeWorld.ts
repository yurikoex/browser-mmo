const THREE = require("three");
import toc from "three-orbit-controls";
const OrbitControls = toc(THREE);

import GamepadControl from "./GamepadControl";
GamepadControl(THREE);

import { ScreenSize } from "./ScreenSize";

class ThreeWorld {
  screenSize: ScreenSize;
  camera: any;
  renderer: any;
  scene: any;
  controls: any;
  canvas: HTMLElement;
  useGamepad: boolean;

  constructor(private screenSize: ScreenSize) {
    this.canvas = document.getElementById("game");
    screenSize || this.dynamicScreenSize();
    console.log("screensize", this.screenSize);
    this.testGamepad();
    this.setupScene();
    this.animate();
  }

  testGamepad() {
    this.useGamepad = navigator.getGamepads()[0] !== null;
    console.log(this.useGamepad);
  }

  setDimensions() {
    this.camera.aspect = this.screenSize.width / this.screenSize.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dynamicScreenSize() {
    this.screenSize = { width: window.innerWidth, height: window.innerHeight };
    const that = this;
    window.addEventListener("resize", () => {
      if (!this.screenSize) this.screenSize = {};
      that.screenSize.width = window.innerWidth;
      that.screenSize.height = window.innerHeight;
      that.setDimensions();
    });
  }

  setupScene() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.screenSize.width / this.screenSize.height,
      0.01,
      100000
    );
    this.camera.position.z = 10;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas
    });

    var ambientLight = new THREE.AmbientLight(0x404040);
    var directionalLight1 = new THREE.DirectionalLight(0xc0c090);
    var directionalLight2 = new THREE.DirectionalLight(0xc0c090);
    directionalLight1.position.set(-100, -50, 100);
    directionalLight2.position.set(100, 50, -100);
    this.scene.add(directionalLight1);
    this.scene.add(directionalLight2);
    this.scene.add(ambientLight);
    var helper = new THREE.GridHelper(1200, 60, 0xff4444, 0x404040);
    this.scene.add(helper);

    this.controls = !this.useGamepad
      ? new OrbitControls(this.camera)
      : new THREE.GamepadControls(this.camera);

    //controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set(0, 20, 100);
    this.controls.update();

    this.setDimensions();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default ThreeWorld;
