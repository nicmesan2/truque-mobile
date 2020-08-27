import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import AppNavigator from './src/navigation/App.navigator'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthProvider from './src/providers/AuthProvider/AuthProvider.js'

export default () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
      </AuthProvider>
    </ApplicationProvider>
  )
}
