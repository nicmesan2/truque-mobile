import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { List, ListItem, Text, Layout, Avatar, TopNavigation, Divider } from '@ui-kitten/components';
import moment from 'moment'
import 'moment/locale/es';

const data = [
    {
        "userItem": {
            "name": "Mouse",
            "description": "Un mouse gamer",
            "image": 'https://trueque-dev.s3.amazonaws.com/Mon%20Aug%2010%202020%2009%3A56%3A08%20GMT-0300%20%28-03%29',
        },
        "opportunity": {
            "name": "TV",
            "description": "TV 42 pulgadas",
            "image": 'https://trueque-dev.s3.sa-east-1.amazonaws.com/Sun%20Aug%2009%202020%2019%3A37%3A49%20GMT-0300%20%28-03%29',
            "user": {
                "name": "Nicolas Medina",
                "image": 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q',
            },
        },
    }
]

const Trades = ({ navigation }) => {
    const renderTitle = item => (
        <Layout style={{ flexDirection: 'column'}}>
            <Layout>
                <Layout style={styles.itemHeader}>
                    <Avatar style={{ width: 30, height: 30 }} source={{ uri: item.opportunity.user.image }} />
                    <Text category="c2" style={{ marginLeft: 5 }}>
                        Nicolas Medina
                    </Text>
                </Layout>
            </Layout>
            <Layout style={{ width: 200, textAling: 'center', marginLeft: 5, paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, marginBottom: 10}} numberOfLines={1}>
                    Le has enviado una solicitud a Nicolas Medina
                </Text>
                <Text style={{  fontSize: 12, color: '#c1b9b9'}} numberOfLines={1}>
                    Esperando confirmacion
                </Text>
            </Layout>
        </Layout>
    )

    const renderRight = item => (
        <Layout style={{ height: 100, flexDirection: 'column', justifyContent: 'space-between'}}>
            <Layout style={{ padding: 5 }}>
                <Text>{ moment().startOf('hour').fromNow(true) }</Text>
            </Layout>
            <Layout style={{ paddingBottom: 20, alignSelf: 'flex-end'}}>
                <Image style={{ width: 40, height: 40, borderRadius: 12 }} source={{ uri: item.opportunity.image }} />
            </Layout>
        </Layout>
    )

    const renderLeft = item => (
        <Layout style={styles.squareShape}>
            <Image style={{ width: 80, height: 80, borderRadius: 30 }} source={{ uri: item.userItem.image }} />
        </Layout>
    )

    const renderItem = ({ item }) => (
        <ListItem
            onPress={() => {navigation.navigate('TradeDetail')}}
            title={() => renderTitle(item)}
            accessoryRight={() => renderRight(item)}
            accessoryLeft={() => renderLeft(item)}
        />
    )

    return (
        <>
            <TopNavigation title="Mis Trueques" alignment="center" />
            <Divider />
            <List
                contentContainerStyle={styles.contentContainer}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 10,
    },
    squareShape: {
        marginRight: 5,
        paddingLeft: 10,
    },
    itemHeader: {
        marginLeft: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default React.memo(Trades)