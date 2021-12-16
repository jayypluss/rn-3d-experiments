import React, {FunctionComponent, useState} from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {
  LayoutAnimation,
  Platform,
  StyleProp,
  Text,
  UIManager,
  ViewStyle,
} from 'react-native'

import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import {useColorScheme} from 'react-native-appearance'

interface AccordionProps {
  title: string
}

export const Accordion: FunctionComponent<AccordionProps> = ({
  title,
  children,
}) => {
  const colorScheme = useColorScheme() // Can be dark | light | no-preference

  const [expanded, setExpanded] = useState<boolean>(false)
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark')

  // Listening to changes of device appearance while in run-time
  React.useEffect(() => {
    setIsDark(colorScheme === "dark")
  }, [colorScheme])


  if (Platform.OS === 'android')
    UIManager.setLayoutAnimationEnabledExperimental(true)

  const ExpandCollapseAnimation = {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
      duration: 200,
      delay: 200,
    },
    update: {
      type: LayoutAnimation.Types.linear,
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
      duration: 150,
      delay: 0,
    },
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(ExpandCollapseAnimation)
    setExpanded(!expanded)
  }

  return (
    <LinearGradient
      colors={['#009688', '#8b00ffff']}
      useAngle={true}
      style={styles.container}>
      <TouchableOpacity
        style={[styles.toggleButton, styles.toggleButtonColors]}
        onPress={() => toggleExpand()}>
        <Text style={styles.toggleButtonTitleText}>{title}</Text>
      </TouchableOpacity>
      {expanded && children}
    </LinearGradient>
  )
}
