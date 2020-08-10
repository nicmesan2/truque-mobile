import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../screens/ProductDetail/ProductDetail.screen'
import MyItemsScreen from "../screens/MyItems/MyItems.screen"
import CreateProduct from '../screens/Product/CreateProduct.screen'

const { Navigator, Screen } = createStackNavigator()

const MyItemsNavigator = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="MyItems" component={MyItemsScreen} />
      <Screen name="MyItemDetail" component={ProductDetail} />
      <Screen name="MyItemEdit" component={CreateProduct} />
    </Navigator>
  )
}

export default MyItemsNavigator
