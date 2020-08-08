import React, { useRef } from 'react'
import { StyleSheet, ImageBackground, Image, ScrollView } from 'react-native'
import {
  TopNavigation,
  TopNavigationAction,
  Layout,
  Text,
  Icon,
  Button,
  ListItem,
  List,
  Divider,
  Avatar
} from '@ui-kitten/components'
import MapSnapshot from '../../components/MapSnapshot/MapSnapshot'
import FlatListSlider from '../../components/ImageSlider/ImageSlider'
import KeyboardAvoidingView from '../../components/KeyboardAvoidView/KeyboardAvoidView'
import RBSheet from 'react-native-raw-bottom-sheet'

const keyboardOffset = (height) =>
  Platform.select({
    android: 0,
    ios: height
  })

const userItems = [
  {
    image:
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/69850905-1-f.jpg',
    title: 'Mid Western Heel Boots\n',
    hasBeenTraded: true
  },
  {
    image:
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42941873-1-f.jpg',
    title: 'Sukin Cleansing Hand Wash 500ml'
  },
  {
    image:
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/9/42894209-1-f.jpg',
    title: 'Entertainment Unit'
  },
  {
    image:
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/2/42893622-1-f.jpg',
    title: 'Rattan Side Table',
    hasBeenTraded: true
  },
  {
    image:
      'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/9/42901969-1-f.jpg',
    title: 'Bluetooth Headphones Grey'
  }
]

const ProductDetails3Screen = ({ navigation, route }) => {
  const refRBSheet = useRef()
  const productDetails = route.params.productDetails

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackIcon = (props) => <Icon {...props} name="arrow-back" />

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />

  const ItemImage = (uri) => <Image style={{ height: 50, width: 50 }} source={{ uri }} />

  const TradeButton = (disabled = false) => {
    return (
      <Button disabled={disabled} size="tiny" onPress={() => refRBSheet.current.close()}>
        {disabled ? 'Ya enviado' : 'Cambiar'}
      </Button>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.title}
        description="A set of React Native components"
        accessoryLeft={() => ItemImage(item.image)}
        accessoryRight={() => TradeButton(item.hasBeenTraded)}
      />
    )
  }

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title="Product Details" accessoryLeft={BackAction} />
      <KeyboardAvoidingView style={styles.container} offset={keyboardOffset}>
        <Layout style={styles.header}>
          <ScrollView>
            <Layout style={{ flex: 1 }}>
              <FlatListSlider
                data={productDetails.images.map((image) => ({ image }))}
                timer={5000}
                onPress={() => {}}
                indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
                indicatorActiveColor={'#FFFFFF'}
                indicatorInActiveColor={'#7b7b7b'}
                animation
              />
              <Layout style={styles.detailsContainer} level="1">
                <Text category="h6">{productDetails.title}</Text>
                <Text style={styles.subtitle} appearance="hint" category="p2">
                  {productDetails.subtitle}
                </Text>
                <Text style={styles.description} appearance="hint">
                  {productDetails.description}
                </Text>
                <Divider />
                <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 20}}>
                  <Avatar source={{ uri: productDetails.user.picture }} />
                  <Text style={{ paddingLeft: 5 }}>{productDetails.user.name}</Text>
                </Layout>
                <MapSnapshot lat={-34.572558} lng={-58.432502} />
                <RBSheet
                  dragFromTopOnly
                  closeOnDragDown
                  ref={refRBSheet}
                  height={300}
                  openDuration={250}
                  customStyles={{
                    container: {
                      justifyContent: 'center',
                      alignItems: 'center'
                    }
                  }}
                >
                  <List style={{ width: '100%' }} data={userItems} renderItem={renderItem} />
                </RBSheet>
              </Layout>
            </Layout>
          </ScrollView>
          <Layout style={{ padding: 10 }}>
            <Button onPress={() => refRBSheet.current.open()}>Lo quiero!</Button>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  commentList: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  header: {
    marginBottom: 8,
    flex: 1
  },
  image: {
    height: 340,
    width: '100%'
  },
  detailsContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flex: 1
  },
  subtitle: {
    marginTop: 4
  },
  price: {
    position: 'absolute',
    top: 24,
    right: 16
  },
  description: {
    marginVertical: 16
  },
  size: {
    marginBottom: 16
  },
  colorGroup: {
    flexDirection: 'row',
    marginHorizontal: -8
  },
  colorRadio: {
    marginHorizontal: 8
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginTop: 24
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8
  },
  sectionLabel: {
    marginVertical: 8
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF'
  },
  commentInput: {
    marginHorizontal: 16,
    marginVertical: 24
  }
})

export default ProductDetails3Screen
