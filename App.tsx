import React, {useEffect} from 'react'
import {StatusBar, useColorScheme} from 'react-native'

import SplashScreen from 'react-native-splash-screen'
import AppStack from './src/routes/AppStack'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <AppStack />
      <StatusBar
        backgroundColor={'black'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
    </>
  )
}

export default App
