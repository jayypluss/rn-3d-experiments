import React, {FunctionComponent, useEffect, useState} from 'react'
import {View, PermissionsAndroid, Image} from 'react-native'
// import './style.scss';

import {EngineView, useEngine} from '@babylonjs/react-native'
import {
    ArcRotateCamera,
    Camera,
    DeviceSourceManager, Mesh, MeshBuilder, Quaternion,
    Scene,
    SceneLoader,
    StandardMaterial,
    Texture, TubeBuilder,
    Vector3,
    WebXRDefaultExperience,
    WebXRFeatureName,
    WebXRHitTest,
    WebXRPlaneDetector,
} from '@babylonjs/core'
import PageHeader from '../molecules/Header'
import createInputHandling from '../functions/createInputHandling'

import '@babylonjs/loaders'
import {WebXRSessionManager} from '@babylonjs/core/XR/webXRSessionManager'
import {BorderlessButton} from 'react-native-gesture-handler'
import exchangeIcon from '../../../assets/icons/exchange-alt-solid.png'
import earcut from 'earcut'

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

              // Set up the hit test.
              const xrHitTestModule =
                xr.baseExperience.featuresManager.enableFeature(
                  WebXRFeatureName.HIT_TEST,
                  'latest',
                  {
                    offsetRay: {
                      origin: {x: 0, y: 0, z: 0},
                      direction: {x: 0, y: 0, z: -1},
                    },
                  },
                ) as WebXRHitTest

              console.log('xrHitTestModule: ', xrHitTestModule)

              // Do some plane shtuff.
              const xrPlanes = xr.baseExperience.featuresManager.enableFeature(
                WebXRFeatureName.PLANE_DETECTION,
                'latest',
              ) as WebXRPlaneDetector
              console.log('Enabled plane detection.')
              const planes: any[] = []

              console.log('planes: ', planes)

              xrPlanes.onPlaneAddedObservable.add(webXRPlane => {
                if (scene) {
                  console.log('Plane added.')
                  let plane: any = webXRPlane

                  webXRPlane.polygonDefinition.push(
                    webXRPlane.polygonDefinition[0],
                  )
                  try {
                    plane.mesh = MeshBuilder.CreatePolygon(
                      'plane',
                      {shape: plane.polygonDefinition},
                      scene,
                        earcut,
                    )
                    let tubeMesh: Mesh = TubeBuilder.CreateTube(
                      'tube',
                      {
                        path: plane.polygonDefinition,
                        radius: 0.005,
                        sideOrientation: Mesh.FRONTSIDE,
                        updatable: true,
                      },
                      scene,
                    )
                    tubeMesh.setParent(plane.mesh)
                    planes[plane.id] = plane.mesh
                    plane.mesh.material = planeMat

                    plane.mesh.rotationQuaternion = new Quaternion()
                    plane.transformationMatrix.decompose(
                      plane.mesh.scaling,
                      plane.mesh.rotationQuaternion,
                      plane.mesh.position,
                    )
                  } catch (ex) {
                    console.error(ex)
                  }
                }
              })

              // import model
              SceneLoader.ImportMeshAsync(
                '',
                'https://models.babylonjs.com/seagulf.glb',
                // "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf",
              ).then(result => {
                const mesh = result.meshes[0]
                mesh.position.x = 2
                mesh.position.z = 2
                mesh.position.y = -2
              })

              const planeTexture = new Texture(
                'https://i.imgur.com/z7s3C5B.png',
                scene,
              )
              planeTexture.hasAlpha = true
              planeTexture.uScale = 1
              planeTexture.vScale = 1
              planeTexture.coordinatesMode = Texture.PROJECTION_MODE

              const planeMat = new StandardMaterial('noLight', scene)
              planeMat.diffuseTexture = planeTexture
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

const ARMeshTemplate: React.FC<MyComponentProps> = () => {
  return (
    <View>
      <PageHeader title="AR Mesh" hasDefaultBackButton>
        <BorderlessButton
          style={{height: 30, width: 30}}
          onPress={result => {
            console.log(result)
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={exchangeIcon}
            resizeMode="contain"
          />
        </BorderlessButton>
      </PageHeader>
      <MyComponent />
    </View>
  )
}

export default ARMeshTemplate
