import React, {FunctionComponent, useEffect, useState} from 'react'
import {View, PermissionsAndroid} from 'react-native'
// import './style.scss';

import {EngineView, useEngine} from '@babylonjs/react-native'
import {
  ArcRotateCamera,
  Camera,
  DeviceSourceManager,
  Scene,
  SceneLoader,
  Vector3,
  WebXRDefaultExperience,
} from '@babylonjs/core'
import PageHeader from '../molecules/Header'
import createInputHandling from '../functions/createInputHandling'

import '@babylonjs/loaders'
import {WebXRSessionManager} from '@babylonjs/core/XR/webXRSessionManager'

interface MyComponentProps {}

const MyComponent: FunctionComponent<MyComponentProps> = (
  props: MyComponentProps,
) => {
  const engine = useEngine()
  const [camera, setCamera] = useState<Camera>()
  const [xr, setXr] = useState<WebXRDefaultExperience>()
  const [xrSession, setXrSession] = useState<WebXRSessionManager>()

  useEffect(() => {
    if (engine) {
      const scene = new Scene(engine)

      const camera = new ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2,
        5,
        Vector3.Zero(),
        scene,
      )

      setCamera(scene.activeCamera!)
      scene.createDefaultLight(true)
      // scene.addParticleSystem()

      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)

      scene
        .createDefaultXRExperienceAsync({
          disableDefaultUI: true,
          disableTeleportation: true,
        })
        .then(xr => {
          console.log(xr)
          console.log(xr.renderTarget)
          xr.baseExperience
            .enterXRAsync('immersive-ar', 'unbounded', xr.renderTarget)
            .then(session => {
              console.log(session)
            })
        })

      scene.beforeRender = function () {
        // sphere.rotate(Vector3.Up(), 0.01 * scene.getAnimationRatio())
        // sphere.movePOV(0.0008, -0.0005, 0.0004)
        // sphere.rotateAround(Vector3.Down(), Vector3.Up(), 0.05)
        // sphere.translate(Vector3.Down(), 0.0005)
      }
    }
  }, [engine])

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'green'}}>
      <EngineView style={{flex: 1}} camera={camera} />
    </View>
  )
}

const ARMeshTemplate: React.FC = () => {
  return (
    <View>
      <PageHeader title="AR Mesh" hasDefaultBackButton />
      <MyComponent />
    </View>
  )
}

export default ARMeshTemplate
