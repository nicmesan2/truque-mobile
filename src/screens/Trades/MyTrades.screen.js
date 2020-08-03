import React from 'react'
import {
    Avatar, Button,
    Card,
    Divider,
    Icon,
    Layout,
    List,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import FlatListSlider from "../../components/ImageSlider/ImageSlider"
import {Dimensions, StyleSheet, View} from 'react-native';

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

const myTrades = [
    {
        user1: {
            name: 'Mathias',
            picture: 'https://lh3.googleusercontent.com/ogw/ADGmqu9C50xcrbBTA1SG8AfmL97g--pjCyJ4K_7XK_jC=s192-c-mo',
            products: [
                {
                    image:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    desc:
                        'Sample Description below the image for representation purpose only',
                },
            ],
        },
        user2: {
            name : 'Nicolas',
            picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q',
            products: [
                {
                    image:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    desc:
                        'Sample Description below the image for representation purpose only',
                },
            ],
        }
    },
    {
        user1: {
            name: 'Mathias',
            picture: 'https://lh3.googleusercontent.com/ogw/ADGmqu9C50xcrbBTA1SG8AfmL97g--pjCyJ4K_7XK_jC=s192-c-mo',
            products: [
                {
                    image:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    desc:
                        'Sample Description below the image for representation purpose only',
                },
            ],
        },
        user2: {
            name : 'Beto',
            picture: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q',
            products: [
                {
                    image:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    desc:
                        'Sample Description below the image for representation purpose only',
                },
                {
                    image:
                        'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    desc:
                        'Sample Description below the image for representation purpose only',
                },
            ],
        }
    },
]

const MyTrades = () => {
    const renderItemHeader = user => {
        return (
            <View style={styles.itemHeader}>
                <Avatar style={{ width: 30, height: 30 }} source={{ uri: user.picture }} />
                <Text category='c2' style={{ marginLeft: 5 }}>
                    {user.name}
                </Text>
            </View>
        );
    }

    const renderItemFooter = user => (
        <Layout style={{ flexDirection: 'row-reverse', padding: 10}}>
            <Layout style={{ flexDirection: 'column'}}>
                <Text style={{ fontSize: 10, marginBottom: 1 }} category="label" appearance='hint'>
                    {`Items: ${user.products.length}`}
                </Text>
            </Layout>
        </Layout>
    );

    const renderListItem = info => (
        <Layout style={{ marginBottom: 15 }}>
            <Layout style={{ flexDirection: 'row'}}>
                <Layout style={{ width: '45%'}}>
                    <Card
                        style={styles.productItem}
                        header={() => renderItemHeader(info.item.user1)}
                        footer={() => renderItemFooter(info.item.user1)}
                        onPress={() => console.log(info)}>
                        <Layout style={{ width: 100}}>
                        <FlatListSlider
                            data={info.item.user1.products}
                            timer={5000}
                            height={150}
                            onPress={item => alert(JSON.stringify(item))}
                            indicatorContainerStyle={{position:'absolute', bottom: 20}}
                            indicatorActiveColor={'#8e44ad'}
                            indicatorInActiveColor={'#ffffff'}
                            indicatorActiveWidth={30}
                            animation
                            autoscroll={false}
                        />
                        </Layout>
                    </Card>
                </Layout>
                <Layout style={{ width: '10%', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon style={{ width: 25, height: 25, tintColor: 'white'}} fill='#8F9BB3' name="flip-2-outline" />
                </Layout>
                <Layout style={{ width: '45%'}}>
                    <Card
                        style={styles.productItem}
                        header={() => renderItemHeader(info.item.user2)}
                        footer={() => renderItemFooter(info.item.user2)}
                        onPress={() => console.log(info)}>
                        <FlatListSlider
                            data={info.item.user2.products}
                            timer={5000}
                            height={150}
                            onPress={item => alert(JSON.stringify(item))}
                            indicatorContainerStyle={{position:'absolute', bottom: 20}}
                            indicatorActiveColor={'#8e44ad'}
                            indicatorInActiveColor={'#ffffff'}
                            indicatorActiveWidth={30}
                            animation
                            autoscroll={false}
                        />
                    </Card>
                </Layout>
            </Layout>
            <Layout style={{  paddingRight: 10, paddingLeft: 10}}>
                <Button size="tiny" onPress={() => console.log('')}>Cancelar Trueque </Button>
            </Layout>

        </Layout>
    )
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
            <Layout  style={{ flex: 1, padding: 10}}>
                <List
                    data={myTrades}
                    renderItem={renderListItem}
                />
            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    productItem: {
        margin: 8,
        backgroundColor: '#FFFFFF',
    },
    itemHeader: {
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

export default React.memo(MyTrades)