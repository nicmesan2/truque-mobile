import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductNavigator from './Product.navigator.js'
import BottomNav from '../components/BottomNav/BottomNav'
import HomeDrawer from '../components/Drawer/Drawer.js'

const BottomTab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

// export const HomeNavigator = () => (
//     <Drawer.Navigator screenOptions={{ gestureEnabled: true }} drawerContent={(props) => <HomeDrawer {...props} />}>
//       <Drawer.Screen name="Home" component={DeviceNavigator} />
//     </Drawer.Navigator>
// )

const HomeTabsNavigator = (props) => {
  return (
    <BottomTab.Navigator
      initialRouteName={ProductNavigator}
      tabBar={(props, ...others) => <BottomNav {...props} others={others} />}
    >
      <BottomTab.Screen name="ProductList" component={ProductNavigator} />
      <BottomTab.Screen name="Opportunities" component={ProductNavigator} />
      <BottomTab.Screen name="Barter" component={ProductNavigator} />
      <BottomTab.Screen name="MyThings" component={ProductNavigator} />
    </BottomTab.Navigator>
  )
}

export const HomeNavigator = () => (
  <Drawer.Navigator screenOptions={{ gestureEnabled: true }} drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name="Home" component={HomeTabsNavigator} />
  </Drawer.Navigator>
)

export default HomeNavigator
