import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import HomeNavigator from './Home.navigator'
import { createStackNavigator } from '@react-navigation/stack'
import CreateProduct from '../screens/Product/CreateProduct.screen'

// Enhance routing performance https://reactnavigation.org/docs/react-native-screens/
enableScreens()
const { Navigator, Screen } = createStackNavigator()

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode="none">
      <Screen name="HomeNavigator" component={HomeNavigator} />
      <Screen name="CreateProduct" component={CreateProduct} />
    </Navigator>
  </NavigationContainer>
)

export default AppNavigator
