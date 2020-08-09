import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductList from '../screens/ProductList/ProductList.screen'
import ProductDetail from '../screens/ProductDetail/ProductDetail.screen'
import CreateProduct from '../screens/Product/CreateProduct.screen'

const { Navigator, Screen } = createStackNavigator()

const ProductNavigator = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="ProductList" component={ProductList} />
      <Screen name="CreateProduct" component={CreateProduct} />
      <Screen name="ProductDetail" component={ProductDetail} />
    </Navigator>
  )
}

export default ProductNavigator
