import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { Card, Text, useStyleSheet, List, Avatar, TopNavigationAction, Icon, TopNavigation } from '@ui-kitten/components';
import FlatListSlider from "../../components/ImageSlider/ImageSlider"

const products = [
  {
    title: 'Mesa, un titulo mas largo',
    description: 'Una mesa muy copada! Y no te digo lo que pensas si imaginas lo que ves perror.',
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/42516415-1-f.jpg',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa',
    description: 'Una mesa muy copada!',
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/42516415-1-f.jpg',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa, otro titulo que es largo',
    description: 'Una mesa muy copada!',
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/42516415-1-f.jpg',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa',
    description: 'Una mesa muy copada!',
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/42516415-1-f.jpg',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  },
  {
    title: 'Mesa',
    description: 'Una mesa muy copada!',
    image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/5/42516415-1-f.jpg',
    user: {
      name: 'Nicolas Medina',
      picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'
    }
  }
]

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    desc:
      'Sample Description below the image for representation purpose only',
  },
  {
    image:
      'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    desc:
      'Sample Description below the image for representation purpose only',
  },
  {
    image:
      'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
    desc:
      'Sample Description below the image for representation purpose only',
  },
]

const ProductListScreen = ({ navigation }) => {
  
  const styles = useStyleSheet(themedStyles);
  
  const onItemPress = (item) => {
    navigation.navigate('ProductDetail', { productDetails: item });
  };
  
  const renderItemFooter = ({ item }) => {
    return (
      <View style={styles.itemFooter}>
        <Avatar style={{ width: 30, height: 30 }} source={{ uri: item.user.picture }} />
        <Text category='c2' style={{ marginLeft: 5 }}>
          {item.user.name}
        </Text>
      </View>
    );
  }
  
  const renderItemHeader = ({ item }) => (
    <FlatListSlider
      data={data}
      timer={5000}
      onPress={item => alert(JSON.stringify(item))}
      indicatorContainerStyle={{position:'absolute', bottom: 20}}
      indicatorActiveColor={'#8e44ad'}
      indicatorInActiveColor={'#ffffff'}
      indicatorActiveWidth={30}
      animation
      autoscroll={false}
    />
  );
  
  const renderProductItem = (info) => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.item)}>
      <Text category='s1'>
        {info.item.title}
      </Text>
    </Card>
  );
  
  const renderDrawerIcon = (props) => <Icon {...props} name="menu-outline" />
  
  const renderFilterIcon = (props) => <Icon {...props} name="options-outline" />
  
  const renderDrawerAction = () => <TopNavigationAction icon={renderDrawerIcon} onPress={navigation.toggleDrawer} />
  
  const renderFilterAction = () => <TopNavigationAction icon={renderFilterIcon} onPress={() => {}} />
  
  return (
    <>
      <TopNavigation
        title="Trueke"
        alignment="center"
        accessoryLeft={renderDrawerAction}
        accessoryRight={renderFilterAction}
      />
    <List
      contentContainerStyle={styles.productList}
      data={products}
      numColumns={2}
      renderItem={renderProductItem}
    />
    </>
  );
};

const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: '#FFFFFF',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    padding: 5,
    flex: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});

export default ProductListScreen
