import React, {FunctionComponent} from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Text} from 'react-native'

interface ButtonProps {
  title: string
  action: any
}

export const SecondaryRoundButton: FunctionComponent<ButtonProps> = ({
  title,
  action,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 65,
        width: 185,
        borderColor: 'rgba(0, 0, 0, 0.9)',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 20,
        borderRadius: 100,
      }}
      onPress={action}>
      <Text style={{color: 'white', fontWeight: '900', fontSize: 24}}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
