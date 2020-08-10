import React from 'react'
import { Image } from 'react-native'
import { TopNavigation, Divider, ListItem, List, Icon } from '@ui-kitten/components'
import AuthContext from "../../context/Auth"

const userItems = [
  {
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/69850905-1-f.jpg'
      ],
    title: 'Mid Western Heel Boots',
    description: 'A very good descriptioin',
    hasBeenTraded: true,
    quality: 'Usado',
    category: 'Deportes'
  },
  {
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42941873-1-f.jpg'
      ],
    title: 'Sukin Cleansing Hand Wash 500ml',
    description: 'A very good descriptioin',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    },
    quality: 'Usado',
    category: 'Deportes'
  },
  {
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/9/42894209-1-f.jpg'
      ],
    title: 'Entertainment Unit',
    description: 'A very good descriptioin',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    },
    quality: 'Usado',
    category: 'Deportes'
  },
  {
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/2/42893622-1-f.jpg'
      ],
    title: 'Rattan Side Table',
    description: 'A very good descriptioin',
    hasBeenTraded: true,
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    },
    quality: 'Como nuevo',
    category: 'Deportes'
  },
  {
    images: [
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/9/42901969-1-f.jpg'
      ],
    title: 'Bluetooth Headphones Grey',
    description: 'A very good descriptioin',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    },
    quality: 'Muy usado',
    category: 'Deportes'
  }
]

const MyItemsScreen = (props) => {
  const { userData } = React.useContext(AuthContext)
  const renderItemAccessory = (props) => (
    <Icon {...props} size="tiny" name="chevron-right">
      FOLLOW
    </Icon>
  )
  
  const ItemImage = (imageUrl) => <Image style={{ width: 100, height: 100 }} source={{ uri: imageUrl }} />
  
  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => props.navigation.navigate('MyItemDetail', { productDetails: {...item, user: userData  }, editable: true })}
      title={item.title}
      accessoryRight={renderItemAccessory}
      accessoryLeft={() => ItemImage(item.images[0])}
    />
  )
  
  console.log('---', userData)
  
  return (
    <>
      <TopNavigation title="Mis Cosas" alignment="center" />
      <Divider />
      <List data={userItems} ItemSeparatorComponent={Divider} renderItem={renderItem} />
    </>
  )
}

export default MyItemsScreen
