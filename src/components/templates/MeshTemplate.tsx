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
import createInputHandling from '../hooks/InputHandler'

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
        Math.PI / 2.5,
        5,
        Vector3.Zero(),
        scene,
      )

      setCamera(scene.activeCamera!)
      scene.createDefaultLight(true)
      // scene.addParticleSystem()


      SceneLoader.ImportMeshAsync(
        'semi_house',
        'https://assets.babylonjs.com/meshes/',
        'both_houses_scene.babylon',
        scene,
      ).then(result => {
        const root = result.meshes[0]
        //body is our actual player mesh
        const body = root
        body.isPickable = false //so our raycasts dont hit ourself
        console.log('body: ', body)

        console.log(body.getAbsolutePosition())

        body.setAbsolutePosition(Vector3.Zero())
        body.rotation.y = 1.55

        const deviceSourceManager = new DeviceSourceManager(engine)
        createInputHandling(deviceSourceManager, body).then(createValue => {
          console.log('createValue: ', createValue)
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

const MeshTemplate: React.FC = () => {
  return (
    <View>
      <PageHeader title="Mesh" hasDefaultBackButton />
      <MyComponent />
    </View>
  )
}

export default MeshTemplate
