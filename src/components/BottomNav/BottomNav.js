import React from 'react';
import { Layout, Button, BottomNavigationTab, Divider, Icon, BottomNavigation } from '@ui-kitten/components';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';

const BottomNav = (props) => {
  const shouldHide = () => {
    if (!props.state.routes[props.state.index].state) return false
    
    return props.state.routes[props.state.index]?.state?.index > 0
  }
  
  const onSelect = (index) => {
    props.navigation.navigate(props.state.routeNames[index]);
  };
  
  const renderIcon = (iconName) => (style) => (
    <Icon {...style} name={iconName}/>
  );

  const routeKey = props.state.routes[props.state.index].key

  if(props.descriptors[routeKey]?.options?.tabBarVisible === false || shouldHide()) {
    return null
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: 'transparent',
      alignItems: "center",
    },
    circleShape: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor:  "#d93535",
      backgroundColor: "#d93535",
      borderRadius: 20,
    },
  });
  
  return (
    <>
      <Layout style={{ justifyContent: 'center', backgroundColor: '#FFFFFF', alignItems: 'center', marginBottom: -10, zIndex: 99 }}>
        <TouchableHighlight onPress={() => props.navigation.navigate('CreateProduct')}>
          <Layout style={styles.container}>
            <Layout style={styles.circleShape}>
              <Icon style={{ width: 25, height: 25, tintColor: 'white'}} fill='#8F9BB3' name="camera-outline" />
            </Layout>
          </Layout>
        </TouchableHighlight>
        </Layout>
      <Divider/>
      <BottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>

        <BottomNavigationTab
          title='Productos'
          icon={renderIcon('home-outline')}
        />
        <BottomNavigationTab
            title='Mis Trueques'
            icon={renderIcon('flip-2-outline')}
        />
        <BottomNavigationTab
          title='Oportunidades'
          icon={renderIcon('bulb-outline')}
        />
        <BottomNavigationTab
          title='Mis Cosas'
          icon={renderIcon('grid-outline')}
        />

      </BottomNavigation>
    </>
  );
  
  
};

export default BottomNav
