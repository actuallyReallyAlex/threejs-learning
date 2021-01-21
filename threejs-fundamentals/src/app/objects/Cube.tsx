import * as React from "react";
import * as THREE from "three";
import { Object3D } from "three";

interface CubeProps {
  x: number;
  y: number;
  z: number;
}

class Cube extends React.Component<unknown, unknown> {
  constructor(props: CubeProps) {
    super(props);
    this.object = new THREE.Object3D();
    this.x = props.x;
    this.y = props.y;
    this.z = props.z;
    this.init();
  }

  object: Object3D;
  x: number;
  y: number;
  z: number;

  init(): void {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: "red" });
    const mesh = new THREE.Mesh(geometry, material);

    this.object.add(mesh);
    this.object.position.set(this.x, this.y, this.z);
  }
}

export default Cube;
