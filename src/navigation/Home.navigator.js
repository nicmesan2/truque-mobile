import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DeviceNavigator from './Device.navigator.js'
import HomeDrawer from '../components/Drawer/Drawer.js'
import { enableScreens } from 'react-native-screens'

// Enhance routing performance https://reactnavigation.org/docs/react-native-screens/
enableScreens()

const Drawer = createDrawerNavigator()

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator screenOptions={{ gestureEnabled: true }} drawerContent={(props) => <HomeDrawer {...props} />}>
      <Drawer.Screen name="Home" component={DeviceNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default AppNavigator
