import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Layout, Tab, TabView, Text, TopNavigationAction, TopNavigation } from '@ui-kitten/components'
import MyTrades from '../screens/Trades/MyTrades.screen'

export const TabViewSimpleUsageShowcase = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const renderDrawerIcon = (props) => <Icon {...props} name="menu-outline" />
  const renderFilterIcon = (props) => <Icon {...props} name="options-outline" />

  const renderDrawerAction = () => <TopNavigationAction icon={renderDrawerIcon} onPress={() => console.log('asd')} />
  const renderFilterAction = () => <TopNavigationAction icon={renderFilterIcon} onPress={() => {}} />

  return (
    <>
      <TopNavigation
        title="Mis Trueques"
        alignment="center"
        accessoryLeft={renderDrawerAction}
        accessoryRight={renderFilterAction}
      />

      <TabView selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="Enviados">
          <Layout style={styles.tabContainer}>
            <MyTrades />
          </Layout>
        </Tab>
        <Tab title="Recibidos">
          <Layout style={styles.tabContainer}></Layout>
        </Tab>
        <Tab title="Oportunidades">
          <Layout style={styles.tabContainer}>
            <Text category="h5">TRANSACTIONS</Text>
          </Layout>
        </Tab>
      </TabView>
    </>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    height: 'auto',
    alignItems: 'center'
  }
})

export default TabViewSimpleUsageShowcase
