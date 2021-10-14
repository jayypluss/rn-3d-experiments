import React, {FunctionComponent, useEffect, useState} from 'react'
import {View} from 'react-native'
// import './style.scss';

import {EngineView, useEngine} from '@babylonjs/react-native'
import {
  ArcRotateCamera,
  Camera,
  DeviceSourceManager,
  Scene,
  SceneLoader,
  Vector3,
} from '@babylonjs/core'
import PageHeader from '../molecules/Header'
import createInputHandling from '../functions/createInputHandling'

import '@babylonjs/loaders'

interface MyComponentProps {}

const MyComponent: FunctionComponent<MyComponentProps> = (
  props: MyComponentProps,
) => {
  const engine = useEngine()
  const [camera, setCamera] = useState<Camera>()

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

      SceneLoader.ImportMeshAsync(
        null,
        'https://models.babylonjs.com/',
        'seagulf.glb',
        scene,
      ).then(result => {
        const root = result.meshes[0]
        //so our raycasts dont hit ourself
        root.isPickable = false
        root.setAbsolutePosition(new Vector3(0, 0, 100))
        root.scaling.x -= 0.8
        root.scaling.y -= 0.8
        root.scaling.z -= 0.8

        const body = result.meshes[1]
        body.rotate(Vector3.Up(), 3)

        const deviceSourceManager = new DeviceSourceManager(engine)
        createInputHandling(deviceSourceManager, body, true).then(
          createValue => {
            console.log('createValue: ', createValue)
          },
        )
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

const MeshGltfTemplate: React.FC = () => {
  return (
    <View>
      <PageHeader title="Mesh glTF" hasDefaultBackButton />
      <MyComponent />
    </View>
  )
}

export default MeshGltfTemplate
