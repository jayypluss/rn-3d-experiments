import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    maxHeight: 55,
  },

  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonIcon: {
    width: 20,
    height: 20,
  },

  rightBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },

  rightButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightButtonIcon: {
    width: 20,
    height: 20,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  header: {
    alignItems: 'center',
    flex: 100,
  },

  title: {
    // fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
  },
})

export default styles
