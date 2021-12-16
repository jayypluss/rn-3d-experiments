import React, {FunctionComponent, useState} from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Animated, Text} from 'react-native'

interface ButtonProps {
  title: string
  action: any
}

export const SecondaryRoundButton: FunctionComponent<ButtonProps> = ({
  title,
  action,
}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0))

  let springAnimation = Animated.loop(
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }),
  )

  // Animated.timing(animation, {
  //   toValue: 1,
  //   duration: 1000,
  //   useNativeDriver: false,
  // }).start()

  springAnimation.start()

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgb(100,255,100)', 'rgb(100, 0, 100)', 'rgb(100,255,100)'],
  })

  return (
    <TouchableOpacity
      style={{
        height: 65,
        width: 185,
        borderColor: boxInterpolation,
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
