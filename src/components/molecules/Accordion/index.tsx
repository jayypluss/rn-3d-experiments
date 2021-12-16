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

interface AccordionProps {
  title: string
}

export const Accordion: FunctionComponent<AccordionProps> = ({
  title,
  children,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)

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
        style={styles.toggleButton}
        onPress={() => toggleExpand()}>
        <Text style={styles.toggleButtonTitleText}>{title}</Text>
      </TouchableOpacity>
      {expanded && children}
    </LinearGradient>
  )
}
