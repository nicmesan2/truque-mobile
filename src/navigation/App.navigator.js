import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import HomeNavigator from './Home.navigator'

// Enhance routing performance https://reactnavigation.org/docs/react-native-screens/
enableScreens()

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)

export default AppNavigator
