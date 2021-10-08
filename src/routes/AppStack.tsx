import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../pages/Home'
import Ball from '../pages/Ball'
import Dome from '../pages/Dome'
import Mesh from '../pages/Mesh'

const {Navigator, Screen} = createStackNavigator()

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
        <Screen name="Home" component={Home} />
        <Screen name="Dome" component={Dome} />
        <Screen name="Ball" component={Ball} />
        <Screen name="Mesh" component={Mesh} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack
