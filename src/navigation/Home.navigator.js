import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductNavigator from './Product.navigator.js'
import TradesNavigator from './Trades.navigator.js'
import BottomNav from '../components/BottomNav/BottomNav'
import HomeDrawer from '../components/Drawer/Drawer.js'
import MyItemsNavigator from './MyItems.navigator.js'

const BottomTab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const HomeTabsNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={ProductNavigator}
      tabBar={(props, ...others) => <BottomNav {...props} others={others} />}
    >
      <BottomTab.Screen name="ProductList" component={ProductNavigator} />
      <BottomTab.Screen name="MyThings" component={TradesNavigator} />
      <BottomTab.Screen name="Opportunities" component={ProductNavigator} />
      <BottomTab.Screen name="MyItems" component={MyItemsNavigator} />
    </BottomTab.Navigator>
  )
}

export const HomeNavigator = () => (
  <Drawer.Navigator screenOptions={{ gestureEnabled: true }} drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name="Home" component={HomeTabsNavigator} />
  </Drawer.Navigator>
)

export default HomeNavigator
