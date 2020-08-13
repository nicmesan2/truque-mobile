import React from 'react'
import { Layout, Icon, Text, withStyles } from '@ui-kitten/components'
import { Image, FlatList, View } from 'react-native'

const userItems = [
  {
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/69850905-1-f.jpg',
    title: 'Mid Western Heel Boots\n',
    hasBeenTraded: true
  },
  {
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42941873-1-f.jpg',
    title: 'Sukin Cleansing Hand Wash 500ml'
  },
  {
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/9/42894209-1-f.jpg',
    title: 'Entertainment Unit'
  },
  {
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/2/42893622-1-f.jpg',
    title: 'Rattan Side Table',
    hasBeenTraded: true
  },
  {
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/9/42901969-1-f.jpg',
    title: 'Bluetooth Headphones Grey'
  }
]

const SwapChooser = ({ itemImage, eva }) => {
  return (
    <View>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Image style={{ borderRadius: 10, width: 50, height: 50 }} source={{ uri: itemImage }}/>
      <Icon name="swap-outline" style={{ width: 25, height: 25, tintColor: eva.theme['color-basic-600'], marginHorizontal: 10 }} />
      <View style={{ backgroundColor: eva.theme['color-basic-transparent-200'], borderRadius: 10, width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="question-mark-outline" style={{ width: 30, height: 30, tintColor: eva.theme['color-basic-500'], marginHorizontal: 10 }} />
      </View>
      </View>
      <View style={{alignItems: 'center', marginBottom: 20 }}>
      <Text>Elige por cual de tus cosas te gustaria cambiarlo</Text>
      </View>
      <FlatList
        style={{ marginTop: -10 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={userItems}
        renderItem={({item}) => (
          <View style={{ marginHorizontal: 10, width: 100, height: 100 }}>
            <Image source={{ uri: item.image}} style={{ borderRadius: 10, width: 100, height: 100, borderWidth: 1, borderColor: eva.theme['color-basic-300'], marginBottom: 5 }} />
            <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 10, fontWeight: 'bold' }}>{item.title}</Text>
          </View>
          )
          
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default withStyles(SwapChooser)
