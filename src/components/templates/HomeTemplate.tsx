import React, {FunctionComponent} from 'react'
import {View, Text} from 'react-native'
// import './style.scss';

import PageHeader from '../molecules/Header'
import {useNavigation} from '@react-navigation/native'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface ButtonProps {
  title: string
  navigateTo: string
}

const Button: FunctionComponent<ButtonProps> = ({title, navigateTo}) => {
  const {navigate} = useNavigation()

  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 150,
        backgroundColor: '#eeede7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 20,
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

interface MyComponentProps {}

const HomeContainer: FunctionComponent<MyComponentProps> = ({}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 20,
      }}>
      <Button title="Ball" navigateTo="Ball" />
      <Button title="Dome" navigateTo="Dome" />
      <Button title="Mesh" navigateTo="Mesh" />
    </View>
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
