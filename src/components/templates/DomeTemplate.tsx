import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import {Image, View} from 'react-native'
// import './style.scss';

import {EngineView, useEngine} from '@babylonjs/react-native'
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
  PhotoDome,
  DeviceOrientationCamera,
  FreeCamera,
} from '@babylonjs/core'
import PageHeader from '../molecules/Header'
import {BorderlessButton} from 'react-native-gesture-handler'
import styles from '../molecules/Header/styles'
import backButtonIcon from '../../../assets/icons/arrow-left-solid.png'
import exchangeIcon from '../../../assets/icons/exchange-alt-solid.png'
// import * as image1 from '../../assets/360/1.jpg'

interface MyComponentProps {}

const pictures = [
  'https://i.pinimg.com/originals/e6/a9/04/e6a9049ae71b9ca3f26b7b34b6fb7f91.jpg',
  'https://venturebeat.com/wp-content/uploads/2017/06/1strandykosekseattlewaterfrontatdusk.jpg',
  'https://www.ecgprod.com/wp-content/uploads/2019/07/monoscopic-360-video-virtual-reality-timothy-oldfield-1024x512.jpg',
  'https://video.360cities.net/littleplanet-360-imagery/360Level43Lounge-8K-stable-noaudio-1024x512.jpg',
  'https://www.kadvacorp.com/wp-content/uploads/2019/01/360-wp-plugin.jpg',
]

const MyComponent: FunctionComponent<MyComponentProps> = (
  props: MyComponentProps,
) => {
  const engine = useEngine()
  const [camera, setCamera] = useState<Camera>()

  useEffect(async () => {
    if (engine) {
      const scene = new Scene(engine)
      scene.createDefaultLight(true)

      // let deviceOrientationCamera = new DeviceOrientationCamera(
      //   'DevOr_camera',
      //   new Vector3(0, 0, 0),
      //   scene,
      // )
      // deviceOrientationCamera.setTarget(new Vector3(0, 0, -10))
      // deviceOrientationCamera.angularSensibility = 10
      // // deviceOrientationCamera.attachControl(engine.getInputElement(), true)
      // setCamera(deviceOrientationCamera)

      let arcRotateCamera = new ArcRotateCamera(
        'ArcRotate',
        Math.PI / 2,
        Math.PI / 2,
        5,
        Vector3.Zero(),
        scene,
        true,
      )
      setCamera(arcRotateCamera)

      // let freeCamera = new FreeCamera('ArcRotate', Vector3.Zero(), scene, true)
      // setCamera(freeCamera)

      // setCamera(scene.activeCamera!)

      // console.log(scene.getEngine().getRenderingCanvas())
      // console.log(scene.getEngine().getInputElement())
      // console.log(camera?.inputs)

      // ;(scene.activeCamera as ArcRotateCamera).alpha = Math.PI / 2
      // ;(scene.activeCamera as ArcRotateCamera).beta = Math.PI / 2
      // ;(scene.activeCamera as ArcRotateCamera).radius = 5
      // ;(scene.activeCamera as ArcRotateCamera).target = Vector3.Zero()

      // let camera = scene.activeCamera as ArcRotateCamera

      // const deviceSourceManager = new DeviceSourceManager(engine)
      //
      // deviceSourceManager.onDeviceConnectedObservable.add(deviceEventData => {
      //   console.log(deviceEventData)
      //   if (deviceEventData.deviceType === DeviceType.Touch) {
      //     const deviceSource = deviceSourceManager.getDeviceSource(
      //       deviceEventData.deviceType,
      //       deviceEventData.deviceSlot,
      //     )!
      //     deviceSource.onInputChangedObservable.add(inputEventData => {
      //       console.log(inputEventData)
      //     })
      //   }
      // })

      const dome = new PhotoDome(
        'Dome',
        pictures[0],
        {
          resolution: 32,
          size: 1000,
        },
        scene,
      )

      // var xrHelper = await scene.createDefaultXRExperienceAsync()
      // var base = await xrHelper.baseExperience.enterXRAsync(
      //   'inline',
      //   'local-floor',
      // )
      // xrHelper.enterExitUI.options.sessionMode = 'inline'
      // console.log(base.currentTimestamp)

      // console.log(docum)

      // var vrHelper = scene.createDefaultVRExperience()
      // vrHelper.enterVR()

      // vrHelper.deviceOrientationCamera
      // var xrHelper = await scene.createDefaultXRExperienceAsync()
      // var base = await xrHelper.baseExperience.enterXRAsync(
      //   'inline',
      //   'local-floor',
      // )
      // xrHelper.enterExitUI.options.sessionMode = 'inline'
      // console.log(base.currentTimestamp)

      scene.beforeRender = function () {
        // console.log(engine.getRenderingCanvasClientRect())
        dome.rotate(Vector3.Up(), -0.001 * scene.getAnimationRatio())
      }
    }
  }, [engine])

  return (
    <View
      style={{width: '100%', height: '100%', backgroundColor: 'green'}}
      nativeID="engineViewContainer">
      <EngineView style={{flex: 1}} camera={camera} nativeID="engineView" />
    </View>
  )
}

const DomeTemplate: React.FC = () => {
  return (
    <View>
      <PageHeader title="360 View" hasDefaultBackButton>
        <BorderlessButton
          style={styles.rightButton}
          onPress={() => {
            console.log('pressed button')
          }}>
          <Image
            style={styles.rightButtonIcon}
            source={exchangeIcon}
            resizeMode="contain"
          />
        </BorderlessButton>
      </PageHeader>
      <MyComponent />
    </View>
  )
}

export default DomeTemplate
