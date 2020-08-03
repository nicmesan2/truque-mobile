import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { TopNavigation, TopNavigationAction, Layout, Text, Icon } from '@ui-kitten/components';
import FlatListSlider from '../../components/ImageSlider/ImageSlider'
import KeyboardAvoidingView from '../../components/KeyboardAvoidView/KeyboardAvoidView'

const keyboardOffset = (height) => Platform.select({
  android: 0,
  ios: height,
});

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

const ProductDetails3Screen = ({ navigation, route }) => {
  const productDetails = route.params.productDetails
  
  const navigateBack = () => {
    navigation.goBack()
  }
  
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );
  
  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  
  
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        title='Product Details'
        accessoryLeft={BackAction}
      />
      <KeyboardAvoidingView
        style={styles.container}
        offset={keyboardOffset}>
        <Layout style={styles.header}>
          <FlatListSlider
            data={data}
            timer={5000}
            onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position:'absolute', bottom: 20}}
            indicatorActiveColor={'#8e44ad'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
          />
          <Layout
            style={styles.detailsContainer}
            level='1'>
            <Text
              category='h6'>
              {productDetails.title}
            </Text>
            <Text
              style={styles.subtitle}
              appearance='hint'
              category='p2'>
              {productDetails.subtitle}
            </Text>
            <Text
              style={styles.description}
              appearance='hint'>
              {productDetails.description}
            </Text>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  commentList: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 8,
  },
  image: {
    height: 340,
    width: '100%',
  },
  detailsContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 4,
  },
  price: {
    position: 'absolute',
    top: 24,
    right: 16,
  },
  description: {
    marginVertical: 16,
  },
  size: {
    marginBottom: 16,
  },
  colorGroup: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  colorRadio: {
    marginHorizontal: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionLabel: {
    marginVertical: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  commentInput: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});

export default ProductDetails3Screen
