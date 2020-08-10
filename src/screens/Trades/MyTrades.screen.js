import React from 'react'
import moment from 'moment'
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import FlatListSlider from '../../components/ImageSlider/ImageSlider'
import { Dimensions, StyleSheet, View } from 'react-native'

const myTrades = [
  {
    user1: {
      name: 'Mathias',
      picture: 'https://lh3.googleusercontent.com/ogw/ADGmqu9C50xcrbBTA1SG8AfmL97g--pjCyJ4K_7XK_jC=s192-c-mo',
      products: [
        {
          image:
            'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42941873-1-f.jpg',
          desc: 'Sample Description below the image for representation purpose only'
        }
      ]
    },
    user2: {
      name: 'Nicolas',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q',
      products: [
        {
          image:
            'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/2/42893622-1-f.jpg',
          desc: 'Sample Description below the image for representation purpose only'
        }
      ]
    }
  },
  {
    user1: {
      name: 'Mathias',
      picture: 'https://lh3.googleusercontent.com/ogw/ADGmqu9C50xcrbBTA1SG8AfmL97g--pjCyJ4K_7XK_jC=s192-c-mo',
      products: [
        {
          image:
            'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42941873-1-f.jpg',
          desc: 'Sample Description below the image for representation purpose only'
        }
      ]
    },
    user2: {
      name: 'Beto',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q',
      products: [
        {
          image:
            'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/2/42893622-1-f.jpg',
          desc: 'Sample Description below the image for representation purpose only'
        },
        {
          image:
            'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/3/42941873-1-f.jpg',
          desc: 'Sample Description below the image for representation purpose only'
        }
      ]
    }
  }
]

const MyTrades = () => {
  const renderItemHeader = (user, i) => {
    return (
      <View style={styles.itemHeader}>
        <Avatar style={{ width: 30, height: 30 }} source={{ uri: user.picture }} />
        {i === 0 && (
          <Text category="c2" style={{ marginLeft: 5 }}>
            {`${user.name} (Tu)`}
          </Text>
        )}
      </View>
    )
  }

  const renderItemFooter = (user) => {
    // TODO usar el locale de moment para tirar una fecha en espa;ol
    const date = moment().format('D/M/YY - HH:MM:SS')

    return (
      <Layout style={{ flexDirection: 'column' }}>
        <Layout style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 8, margin: 2, padding: 2 }} category="label" appearance="hint">
            {`Enviado dia: ${date}`}
          </Text>
        </Layout>

        <Layout style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 8, margin: 2, padding: 2 }} category="label" appearance="hint">
            {`Items: ${user.products.length}`}
          </Text>
        </Layout>
      </Layout>
    )
  }

  const renderListItem = (info) => (
    <Layout>
      <Layout style={{ flexDirection: 'row' }}>
        {Object.keys(info.item).map((user, i) => (
          <>
            <Layout style={{ width: '40%' }}>
              <Card
                style={styles.productItem}
                header={() => renderItemHeader(info.item[user], i)}
                footer={() => renderItemFooter(info.item[user])}
                onPress={() => console.log(info)}
              >
                <Layout style={{ width: 100 }}>
                  <FlatListSlider
                    data={info.item[user].products}
                    height={100}
                    timer={5000}
                    width={100}
                    onPress={(item) => alert(JSON.stringify(item))}
                    animation
                    autoscroll={false}
                  />
                </Layout>
              </Card>
            </Layout>
            {i === 0 && (
              <Layout style={{ width: '5%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon style={{ width: 25, height: 25, tintColor: 'white', marginBottom: 10 }} fill="#8F9BB3" name="arrow-forward" />
              </Layout>
            )}
            
          </>
        ))}
        <Button size="tiny" onPress={() => console.log('')}>
          Cancelar
        </Button>
      </Layout>
    </Layout>
  )

  return (
    <List data={myTrades} renderItem={renderListItem} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  productItem: {
    margin: 8,
    backgroundColor: '#FFFFFF'
  },
  itemHeader: {
    padding: 5,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButton: {
    paddingHorizontal: 0
  }
})

export default React.memo(MyTrades)
