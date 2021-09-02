import React, {ReactNode} from 'react'
import {View, Text, Image} from 'react-native'
import {BorderlessButton} from 'react-native-gesture-handler'

import {useNavigation} from '@react-navigation/native'

import styles from './styles'

import backButtonIcon from '../../../../assets/icons/arrow-left-solid.png'

interface PageHeaderProps {
  title: string
  hasDefaultBackButton?: boolean
  backButtonAction?: (item: any) => string
  headerRight?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  hasDefaultBackButton,
  backButtonAction,
  children,
}) => {
  const {goBack, canGoBack} = useNavigation()

  function handleGoBack() {
    if (canGoBack()) goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {(backButtonAction || hasDefaultBackButton) && (
          <BorderlessButton
            style={styles.backButton}
            onPress={hasDefaultBackButton ? handleGoBack : backButtonAction}>
            <Image
              style={styles.backButtonIcon}
              source={backButtonIcon}
              resizeMode="contain"
            />
          </BorderlessButton>
        )}
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      <View style={styles.rightBar}>{children}</View>
    </View>
  )
}

export default PageHeader
