import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Layout, Tab, TabView, Divider, TopNavigationAction, TopNavigation } from '@ui-kitten/components'
import MyTrades from '../screens/Trades/MyTrades.screen'

export const TabViewSimpleUsageShowcase = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const renderDrawerIcon = (props) => <Icon {...props} name="menu-outline" />
  const renderChatIcon = (props) => <Icon {...props} name="message-square-outline" />

  const renderDrawerAction = () => <TopNavigationAction icon={renderDrawerIcon} onPress={() => console.log('asd')} />
  const renderFilterAction = () => <TopNavigationAction icon={renderChatIcon} onPress={() => {}} />

  return (
    <>
      <TopNavigation
        title="Mis Trueques"
        alignment="center"
        accessoryLeft={renderDrawerAction}
        accessoryRight={renderFilterAction}
      />
      <Divider />

      <TabView selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="ENVIADOS">
          <Layout style={styles.tabContainer}>
            <MyTrades />
          </Layout>
        </Tab>
        <Tab title="CONFIRMADOS">
          <Layout style={styles.tabContainer}></Layout>
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
