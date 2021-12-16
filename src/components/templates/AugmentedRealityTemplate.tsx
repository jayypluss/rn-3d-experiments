import React, {FunctionComponent} from 'react'
import {View} from 'react-native'
import PageHeader from '../molecules/Header'

import exchangeIcon from '../../../assets/icons/exchange-alt-solid.png'
import openARVRLink from '../functions/ARVR'
import {Accordion} from '../molecules/Accordion'
import LinearGradient from 'react-native-linear-gradient'
import {StyleSheet} from 'react-native'
import {SecondaryRoundButton} from '../molecules/SecondaryRoundButton'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // paddingTop: 20,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
})

// colors: (string | number)[];
// start?: { x: number; y: number };
// end?: { x: number; y: number };
// locations?: number[];
// useAngle?: boolean;
// angleCenter?: {x: number, y: number};
// angle?: number;

interface MyComponentProps {}

const MyComponent: FunctionComponent<MyComponentProps> = (
  props: MyComponentProps,
) => {
  return (
    <LinearGradient
      colors={['black', 'white']}
      useAngle={false}
      end={{x: 0, y: 9}}
      style={styles.container}>
      <Accordion title={'Google ARVR'}>
        <View
          // colors={['#009688', '#8b00ffff']}
          style={styles.contentContainer}>
          <SecondaryRoundButton
            title="Avocado"
            action={async () => {
              await openARVRLink()
            }}
          />
        </View>
      </Accordion>
    </LinearGradient>
  )
}

const AugmentedRealityTemplate: React.FC<MyComponentProps> = () => {
  return (
    <View>
      <PageHeader title="Augmented Reality" hasDefaultBackButton />
      <MyComponent />
    </View>
  )
}

export default AugmentedRealityTemplate
