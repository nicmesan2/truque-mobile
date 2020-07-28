import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ItemList from '../screens/ItemList/ItemList.screen'

const { Navigator, Screen } = createStackNavigator()

const DeviceNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="ItemList" component={ItemList} />
  </Navigator>
)

export default DeviceNavigator
