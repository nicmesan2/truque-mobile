import React from 'react';
import { BottomNavigationTab, Divider, Icon, BottomNavigation } from '@ui-kitten/components';

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
  
  console.log(shouldHide())
  if(shouldHide()) {
    return null
  }
  
  return (
    <>
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
          title='Oportunidades'
          icon={renderIcon('bulb-outline')}
        />
        <BottomNavigationTab
          title='Mis Trueques'
          icon={renderIcon('flip-2-outline')}
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
