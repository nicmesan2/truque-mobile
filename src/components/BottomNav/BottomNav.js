import React from 'react';
import { BottomNavigationTab, Divider, Icon, BottomNavigation } from '@ui-kitten/components';

const BottomNav = (props) => {
  
  const onSelect = (index) => {
    props.navigation.navigate(props.state.routeNames[index]);
  };
  
  const renderIcon = (iconName) => (style) => (
    <Icon {...style} name={iconName}/>
  );
  
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
