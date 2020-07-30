import React from 'react';
import { Image } from 'react-native'
import {Icon, Layout, Text, TopNavigation, TopNavigationAction, Divider} from '@ui-kitten/components';
import AuthContext from "../../context/Auth"

const ItemList = ({ navigation }) => {
  const { userData } = React.useContext(AuthContext)
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
      <Image style={{ width: 50, height: 50}} source={{ uri: userData.picture }} />
      <Text category='h1'>{userData.name}</Text>
      <Text category='h2'>{userData.email}</Text>
    </Layout>
    </>
  );
}

export default ItemList
