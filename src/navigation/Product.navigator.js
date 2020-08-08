import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductList from '../screens/ProductList/ProductList.screen'
import ProductDetail from '../screens/ProductDetail/ProductDetail.screen'

const { Navigator, Screen } = createStackNavigator()

const ProductNavigator = ({ navigation, route }) => {
  if (route.state && route.state.index > 0) {
    console.log('entraaa')
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }

  return (
    <Navigator headerMode="none">
      <Screen name="ProductList" component={ProductList} />
      <Screen name="ProductDetail" component={ProductDetail} />
    </Navigator>
  )
}

export default ProductNavigator
