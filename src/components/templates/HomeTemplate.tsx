import React, {FunctionComponent} from 'react'
import {View, Text, Alert, Linking} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
// import './style.scss';

import PageHeader from '../molecules/Header'
import {useNavigation} from '@react-navigation/native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import openARVRLink from "../functions/ARVR";

interface NavigateButtonProps {
  title: string
  navigateTo: string
}

const NavigateButton: FunctionComponent<NavigateButtonProps> = ({
  title,
  navigateTo,
}) => {
  const {navigate} = useNavigation()

  return (
    <TouchableOpacity
      style={{
        height: 65,
        width: 185,
        backgroundColor: '#eeede7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 20,
        borderRadius: 100,
      }}
      onPress={() => navigate(navigateTo)}>
      <Text
        style={{
          color: 'black',
          fontWeight: '900',
          fontSize: 24,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

interface ButtonProps {
  title: string
  action: any
}

const Button: FunctionComponent<ButtonProps> = ({title, action}) => {
  return (
    <TouchableOpacity
      style={{
        height: 65,
        width: 185,
        backgroundColor: '#eeede7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 20,
        borderRadius: 100,
      }}
      onPress={action}>
      <Text
        style={{
          color: 'black',
          fontWeight: '900',
          fontSize: 24,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

interface MyComponentProps {}

const HomeContainer: FunctionComponent<MyComponentProps> = ({}) => {
  return (
    <LinearGradient
      colors={['#8b00ffff', '#009688']}
      style={{
        width: '100%',
        height: '100%',
        // backgroundColor: 'black',
        alignItems: 'center',
        padding: 20,
      }}>
      <NavigateButton title="Ball" navigateTo="Ball" />
      <NavigateButton title="Dome" navigateTo="Dome" />
      <NavigateButton title="Mesh Babylon" navigateTo="Mesh" />
      <NavigateButton title="Mesh glTF" navigateTo="MeshGltf" />
      <NavigateButton title="AR Mesh" navigateTo="ARMesh" />
      <Button
        title="Google ARVR"
        action={async () => {
          await openARVRLink()
        }}
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
