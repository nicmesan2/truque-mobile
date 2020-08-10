import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, View, Image } from 'react-native'
import { Drawer, Layout, Icon, DrawerItem } from '@ui-kitten/components'
import AuthContext from '../../context/Auth'

const MENU_ITEMS = [
  { title: 'Configuracion', icon: (style) => <Icon {...style} name="settings-outline" /> },
  { title: 'Cerrar sesion', icon: (style) => <Icon {...style} name="log-out-outline" /> }
]

const HomeDrawer = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext)

  const onItemSelect = ({ row }) => {
    switch (row) {
      case 0: {
        navigation.toggleDrawer()
        return
      }
      case 1: {
        navigation.toggleDrawer()
        signOut()
        return
      }
    }
  }

  const renderHeader = () => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Image
          style={{ width: '100%', height: '80%', resizeMode: 'contain' }}
          source={{
            uri:
              'https://thumbs.dreamstime.com/b/barter-commerce-trade-transaction-economic-concept-exchange-swap-goods-vector-75134587.jpg'
          }}
        />
      </View>
    </Layout>
  )

  return (
    <SafeAreaView style={styles.safeArea} insets="top">
      <Drawer header={renderHeader} onSelect={onItemSelect}>
        {MENU_ITEMS.map((menuItem) => (
          <DrawerItem key={menuItem.title} title={menuItem.title} accessoryLeft={menuItem.icon} />
        ))}
      </Drawer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  profileContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileName: {
    marginHorizontal: 16
  }
})

export default HomeDrawer
