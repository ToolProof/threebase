import { createCamera } from '@/lib/camera';
import { createLights } from '@/lib/lights';
import { createScene } from '@/lib/scene';
import { createRenderer } from '@/lib/renderer';
import { createControls } from '@/lib/controls';
import { Resizer } from '@/lib/Resizer';
import * as THREE from 'three';


abstract class World {
    protected scene;
    protected renderer;
    protected camera;
    protected cameraRig = new THREE.Group();
    protected clock = new THREE.Clock();
    protected container;
    protected dummyCube: THREE.Mesh;

    constructor(container: HTMLDivElement) {
        this.scene = createScene('skyblue');
        this.renderer = createRenderer();
        this.camera = createCamera(30);
        this.cameraRig.add(this.camera);

        this.dummyCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
        this.dummyCube.position.set(0, 1, -2); // Position it in front of the camera

        this.container = container;

        const { ambientLight, mainLight } = createLights();

        this.scene.add(ambientLight, mainLight, this.cameraRig);

        container.append(this.renderer.domElement);

        createControls(this.camera, this.renderer.domElement);

        new Resizer(container, this.camera, this.renderer);

        this.start();
    }

    abstract init(): Promise<void>;

    abstract render(): void;

    abstract start(): void;

    abstract stop(): void;

}

export { World };