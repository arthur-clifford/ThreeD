import { Component, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-experiment',
  imports: [],
  templateUrl: './experiment.html',
  styleUrl: './experiment.scss'
})
export class Experiment {
  lastRender = Date.now();
  camera: any;
  scene: any;
  renderer: any;
  geometries: Array<any> = [];
  material: any;
  mesh: any;

  constructor(private domNode:ElementRef<HTMLElement>) { }
  ngAfterViewInit() {
    this.lastRender = Date.now()

    this.Init();
    this.Animate();

  }

  Animate() {

    requestAnimationFrame(this.Animate.bind(this));
    this.Render();

  }
  Render() {
    const now = Date.now();
    if ((now - this.lastRender) < 1000) {
      return;
    }
    this.lastRender = now;
    // mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 7.2921159e-5;

    this.renderer.render(this.scene, this.camera);

  }
  Init() {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 500;
    this.scene.add(this.camera);

    this.geometries.push(new THREE.SphereGeometry(64, 180, 90));
    this.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xff0000});
    this.mesh = new THREE.Mesh(this.geometries[0], this.material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xFFFFFF);
    this.renderer.setSize(this.domNode.nativeElement.clientWidth, this.domNode.nativeElement.clientHeight);

    this.domNode.nativeElement.appendChild(this.renderer.domElement);

  }
}
