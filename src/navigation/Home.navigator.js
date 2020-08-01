import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import DeviceNavigator from './Device.navigator.js'
import BottomNav from '../components/BottomNav/BottomNav'
import HomeDrawer from '../components/Drawer/Drawer.js'
import CreateProduct from '../screens/Product/CreateProduct.screen';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// export const HomeNavigator = () => (
//     <Drawer.Navigator screenOptions={{ gestureEnabled: true }} drawerContent={(props) => <HomeDrawer {...props} />}>
//       <Drawer.Screen name="Home" component={DeviceNavigator} />
//     </Drawer.Navigator>
// )

const ROOT_ROUTES = ['Home', 'Layouts', 'Components', 'Themes'];

const isOneOfRootRoutes = (currentRoute) => {
  return ROOT_ROUTES.includes(currentRoute);
};

const TabBarVisibleOnRootScreenOptions = ({ route }) => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const HomeTabsNavigator = () => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={DeviceNavigator}
    tabBar={props => <BottomNav {...props} />}>
    <BottomTab.Screen name='ProductList' component={DeviceNavigator}/>
    <BottomTab.Screen name='Opportunities' component={DeviceNavigator}/>
    <BottomTab.Screen name='CreateProduct' component={CreateProduct}/>
    <BottomTab.Screen name='Barter' component={DeviceNavigator}/>
    <BottomTab.Screen name='MyThings' component={DeviceNavigator}/>
  </BottomTab.Navigator>
);

export const HomeNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: true }}
    drawerContent={(props) => <HomeDrawer {...props} />} >
    <Drawer.Screen name="Home" component={HomeTabsNavigator} />
  </Drawer.Navigator>
);

export default HomeNavigator
