import * as React from "react";
import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGL1Renderer,
  XRFrame,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Cube from "./objects/Cube";

const App: React.FunctionComponent<unknown> = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const aspectRatio = width / height;
  const fieldOfView = 60;
  const nearPlane = 1;
  const farPlane = 10000;

  const [ambientLight] = React.useState<AmbientLight>(
    new AmbientLight(0x888888)
  );
  const [camera] = React.useState<PerspectiveCamera>(
    new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  );

  const [cube] = React.useState<Object3D>(
    new Cube({ x: 0, y: 0, z: 0 }).object
  );
  const [container, setContainer] = React.useState<HTMLDivElement | undefined>(
    undefined
  );
  const [directionalLight] = React.useState<DirectionalLight>(
    new DirectionalLight(0xfdfcf0, 1)
  );
  const [renderer] = React.useState<WebGL1Renderer>(
    new WebGL1Renderer({ alpha: true, antialias: true })
  );
  const [orbitControls] = React.useState<OrbitControls>(
    new OrbitControls(camera, renderer.domElement)
  );
  const [scene] = React.useState<Scene>(new Scene());

  React.useEffect(() => {
    // * INITIALIZE
    console.log("INITIALIZE");

    directionalLight.position.set(20, 10, 20);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    // * Add objects to scene
    scene.add(directionalLight);
    scene.add(ambientLight);
    scene.add(cube);

    // * Position Camera
    camera.position.set(0, 0, 10);

    // * Listeners
    window.addEventListener(
      "resize",
      () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      },
      false
    );

    renderer.setAnimationLoop((time: number, frame?: XRFrame) => {
      // * Runs n times per second (usually 60)
      // * This is framerate determined (I think)
      renderer.render(scene, camera);
      orbitControls.update();
    });
  }, []);

  React.useEffect(() => {
    if (container) {
      container.appendChild(renderer.domElement);
    }
  }, [container]);

  return (
    <div
      id="scene"
      ref={(containerRef) => {
        if (containerRef) {
          setContainer(containerRef);
        }
      }}
    ></div>
  );
};

export default App;
