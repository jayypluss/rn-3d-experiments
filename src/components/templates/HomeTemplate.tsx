import React, {FunctionComponent} from 'react'
import {View, Text, Alert, Linking} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import PageHeader from '../molecules/Header'
import {NavigationButton} from '../molecules/NavigationButton'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
})

interface MyComponentProps {}

const HomeContainer: FunctionComponent<MyComponentProps> = ({}) => {
  return (
    <LinearGradient colors={['#8b00ffff', '#009688']} style={styles.container}>
      <NavigationButton title="Ball" navigateTo="Ball" />
      <NavigationButton title="Dome" navigateTo="Dome" />
      <NavigationButton title="Mesh Babylon" navigateTo="Mesh" />
      <NavigationButton title="Mesh glTF" navigateTo="MeshGltf" />
      <NavigationButton title="AR Mesh" navigateTo="ARMesh" />
      <NavigationButton
        title="Augmented Reality"
        navigateTo="AugmentedReality"
      />
    </LinearGradient>
  )
}

const HomeTemplate: React.FC = () => {
  return (
    <View>
      <PageHeader title="Home" />
      <HomeContainer />
    </View>
  )
}

export default HomeTemplate
