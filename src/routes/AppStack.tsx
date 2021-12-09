import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../pages/Home'
import Ball from '../pages/Ball'
import Dome from '../pages/Dome'
import Mesh from '../pages/Mesh'
import MeshGltf from '../pages/MeshGltf'
import ARMesh from '../pages/ARMesh'

const {Navigator, Screen} = createStackNavigator()

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
        <Screen name="Home" component={Home} />
        <Screen name="Dome" component={Dome} />
        <Screen name="Ball" component={Ball} />
        <Screen name="Mesh" component={Mesh} />
        <Screen name="MeshGltf" component={MeshGltf} />
        <Screen name="ARMesh" component={ARMesh} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack
