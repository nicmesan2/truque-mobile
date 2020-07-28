import React from 'react';
import {Icon, Layout, Text, TopNavigation, TopNavigationAction, Divider} from '@ui-kitten/components';

const ItemList = ({ navigation }) => {
  const renderDrawerIcon = (props) => <Icon {...props} name="menu-outline" />
  
  const renderDrawerAction = () => <TopNavigationAction icon={renderDrawerIcon} onPress={navigation.toggleDrawer} />
  
  return (
    <>
      <TopNavigation
        title="Trueke"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      <Divider />
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category='h1'>ITEM LIST</Text>
    </Layout>
    </>
  );
}

export default ItemList
