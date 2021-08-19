import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
// import './style.scss';

import {EngineView, useEngine} from '@babylonjs/react-native';
import {
  ArcRotateCamera,
  Camera,
  Color3,
  DeviceSourceManager,
  DeviceType,
  Engine,
  FreeCameraInputsManager,
  Mesh,
  PBRMetallicRoughnessMaterial,
  Scene,
  SceneLoader,
  TransformNode,
  Vector3,
} from '@babylonjs/core';

interface MyComponentProps {}

const MyComponent: FunctionComponent<MyComponentProps> = (
  props: MyComponentProps,
) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();

  useEffect(() => {
    if (engine) {
      const scene = new Scene(engine);
      scene.createDefaultCamera(true);
      (scene.activeCamera as ArcRotateCamera).beta -= Math.PI / 8;

      let camera = scene.activeCamera as ArcRotateCamera;
      const deviceSourceManager = new DeviceSourceManager(engine);

      deviceSourceManager.onDeviceConnectedObservable.add(deviceEventData => {
        console.log(deviceEventData);
        if (deviceEventData.deviceType === DeviceType.Touch) {
          const deviceSource = deviceSourceManager.getDeviceSource(
            deviceEventData.deviceType,
            deviceEventData.deviceSlot,
          )!;
          deviceSource.onInputChangedObservable.add(inputEventData => {
            console.log(inputEventData);
          });
        }
      });
      // camera.
      // camera.inputs.
      // camera.inputs.attachInput()
      // let input = new TouchInput();
      console.log(camera?.inputs);
      // console.log(camera);
      // = FreeCameraInputsManager.addTouch();

      // scene.activeCamera?.attachControl(engine.getRenderingCanvas(), true);

      setCamera(scene.activeCamera!);
      scene.createDefaultLight(true);
      // scene.addParticleSystem()

      const magentaMat = new PBRMetallicRoughnessMaterial('magentaMat', scene);
      magentaMat.metallic = 1;
      magentaMat.roughness = 0.5;
      magentaMat.baseColor = Color3.Magenta();

      const purpleMat = new PBRMetallicRoughnessMaterial('purpleMat', scene);
      purpleMat.metallic = 1;
      purpleMat.roughness = 0.5;
      purpleMat.baseColor = Color3.Purple();

      // const box = Mesh.CreateBox('box', 0.3, scene);
      // box.material = purpleMat;

      const sphere = Mesh.CreateSphere('sphere', 10, 0.3, scene);
      sphere.material = purpleMat;

      // SceneLoader.Load()

      scene.beforeRender = function () {
        // box.rotate(Vector3.Up(), 0.005 * scene.getAnimationRatio());
        sphere.rotate(Vector3.Up(), 0.01 * scene.getAnimationRatio());
        sphere.movePOV(0.0008, -0.0005, 0.0004);
        sphere.rotateAround(Vector3.Down(), Vector3.Up(), 0.05);
        // sphere.
        // sphere.beginAnimation()
        // sphere.translate(Vector3.Down(), 0.0005);
      };
    }
  }, [engine]);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'green'}}>
      <EngineView style={{flex: 1}} camera={camera} />
    </View>
  );
};

const HomeTemplate: React.FC = () => {
  return (
    <View>
      <MyComponent />
    </View>
  );
};

export default HomeTemplate;
