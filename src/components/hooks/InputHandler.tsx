import {
  DeviceSource,
  DeviceSourceManager,
  DeviceType,
  PointerInput,
  Vector3,
} from '@babylonjs/core'
import {AbstractMesh} from '@babylonjs/core/Meshes/abstractMesh'

export default async function createInputHandling(
  deviceSourceManager: DeviceSourceManager,
  mesh: AbstractMesh,
  rotateOnly?: boolean,
) {
  var numInputs = 0
  var previousDiff = 0

  deviceSourceManager?.onDeviceConnectedObservable.clear()
  deviceSourceManager?.onDeviceDisconnectedObservable.clear()

  deviceSourceManager?.onDeviceDisconnectedObservable.add((device: any) => {
    numInputs--
  })

  deviceSourceManager?.onDeviceConnectedObservable.add((device: any) => {
    numInputs++
    if (device.deviceType === DeviceType.Touch) {
      const touch: DeviceSource<DeviceType.Touch> =
        deviceSourceManager.getDeviceSource(
          device.deviceType,
          device.deviceSlot,
        )!
      touch.onInputChangedObservable.add(touchEvent => {
        if (touchEvent && mesh) {
          const diff = touchEvent?.previousState - touchEvent?.currentState

          if (mesh?.isEnabled())
            if (rotateOnly) {
              if (
                numInputs === 1 &&
                touchEvent.inputIndex === PointerInput.Horizontal &&
                touchEvent.deviceSlot === 0
              )
                mesh.rotate(Vector3.Up(), diff / 200)
            } else if (numInputs === 1)
              if (touchEvent.inputIndex === PointerInput.Horizontal)
                mesh.position.x -= diff / 1000
              else mesh.position.z += diff / 750
            // Panning do rotation.
            else if (
              numInputs === 2 &&
              touchEvent.inputIndex === PointerInput.Horizontal &&
              touchEvent.deviceSlot === 0
            )
              mesh.rotate(Vector3.Up(), diff / 200)
            else if (
              numInputs === 2 &&
              touchEvent.inputIndex === PointerInput.Vertical &&
              touchEvent.deviceSlot === 0
            ) {
              //pinch

              let input1 = device.getInput(0)
              let input2 = device.getInput(1)
              let upperTouch = 0
              let downerTouch = 0

              if (input1 < input2) {
                upperTouch = input1
                downerTouch = input2
              } else {
                upperTouch = input2
                downerTouch = input1
              }

              let diff = downerTouch - upperTouch

              if (diff < previousDiff)
                //zoom out
                mesh.scaling = new Vector3(
                  (mesh.scaling.x -= 0.03),
                  (mesh.scaling.y -= 0.03),
                  (mesh.scaling.z -= 0.03),
                )

              if (diff > previousDiff)
                //zoom in
                mesh.scaling = new Vector3(
                  (mesh.scaling.x += 0.03),
                  (mesh.scaling.y += 0.03),
                  (mesh.scaling.z += 0.03),
                )

              previousDiff = diff
            }
        }
      })
    }
  })
}
