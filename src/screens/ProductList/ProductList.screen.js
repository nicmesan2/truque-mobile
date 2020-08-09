import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import {
  Card,
  Text,
  useStyleSheet,
  List,
  Avatar,
  TopNavigationAction,
  Icon,
  TopNavigation
} from '@ui-kitten/components'
import FlatListSlider from '../../components/ImageSlider/ImageSlider'

const products = [
  {
    title: 'Mesa, un titulo mas largo',
    description:
      'Una mesa muy copada! Y no te digo lo que pensas si imaginas lo que ves perror. Una mesa muy copada! Y no te digo lo que pensas si imaginas lo que ves perror. Una mesa muy copada! Y no te digo lo que pensas si imaginas lo que ves perror.',
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-1-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-2-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-3-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-4-f.jpg'
    ],
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa',
    description: 'Una mesa muy copada!',
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-1-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-2-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-3-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-4-f.jpg'
    ],
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa, otro titulo que es largo',
    description: 'Una mesa muy copada!',
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-1-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-2-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-3-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-4-f.jpg'
    ],
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa',
    description: 'Una mesa muy copada!',
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-1-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-2-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-3-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-4-f.jpg'
    ],
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa',
    description: 'Una mesa muy copada!',
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-1-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-2-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-3-f.jpg',
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42767503-4-f.jpg'
    ],
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  }
]

const ProductListScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles)

  const onItemPress = (item) => {
    navigation.navigate('ProductDetail', { productDetails: item })
  }

  const renderItemFooter = ({ item }) => {
    return (
      <View style={styles.itemFooter}>
        <Avatar style={{ width: 30, height: 30 }} source={{ uri: item.user.picture }} />
        <Text category="c2" style={{ marginLeft: 5 }}>
          {item.user.name}
        </Text>
      </View>
    )
  }

  const renderItemHeader = ({ item }) => (
    <FlatListSlider
      data={item.images.map((image) => ({ image }))}
      timer={5000}
      onPress={() => {
        console.log(item)
        onItemPress(item)
      }}
      indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
      indicatorActiveColor={'#FFFFFF'}
      indicatorInActiveColor={'#7b7b7b'}
      animation
      autoscroll={false}
    />
  )

  const renderProductItem = (info) => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.item)}
    >
      <Text category="s1">{info.item.title}</Text>
    </Card>
  )

  const renderDrawerIcon = (props) => <Icon {...props} name="menu-outline" />

  const renderFilterIcon = (props) => <Icon {...props} name="options-outline" />

  const renderDrawerAction = () => <TopNavigationAction icon={renderDrawerIcon} onPress={navigation.toggleDrawer} />

  const renderFilterAction = () => <TopNavigationAction icon={renderFilterIcon} onPress={() => {}} />

  return (
    <>
      <TopNavigation
        title="Trueke"
        alignment="center"
        accessoryLeft={renderDrawerAction}
        accessoryRight={renderFilterAction}
      />
      <List contentContainerStyle={styles.productList} data={products} numColumns={2} renderItem={renderProductItem} />
    </>
  )
}

const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: '#FFFFFF'
  },
  itemHeader: {
    height: 140
  },
  itemFooter: {
    padding: 5,
    flex: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconButton: {
    paddingHorizontal: 0
  }
})

export default ProductListScreen
