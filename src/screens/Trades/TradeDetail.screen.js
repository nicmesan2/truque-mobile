import React from 'react'
import {
    Avatar,
    Layout,
    TopNavigation,
    Divider,
    Icon,
    TopNavigationAction
} from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';

const TradeDetail = ({ navigation }) => {
    const navigateBack = () => {
        navigation.goBack()
    }

    const BackIcon = (props) => <Icon {...props} name="arrow-back" />

    const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />

    return (
        <>
        <TopNavigation title="Mis Trueques" accessoryLeft={BackAction} />
            <Divider />
            <Layout style={styles.container}>
                <Layout style={{ marginRight: 10 }}>
                    <Layout style={{
                        zIndex: 99,
                        position:'absolute',
                        backgroundColor: 'transparent',
                        marginTop: -5,
                        marginLeft: -5,
                    }}>

                        <Avatar style={{ width: 45, height: 45, borderWidth: 2, borderColor: 'white'}} source={{ uri: 'https://lh3.googleusercontent.com/ogw/ADGmqu9C50xcrbBTA1SG8AfmL97g--pjCyJ4K_7XK_jC=s64-c-mo' }} />
                    </Layout>
                    <Image style={{ width: 80, height: 80, borderRadius: 20 }}
                           source={{ uri: 'https://trueque-dev.s3.amazonaws.com/Mon%20Aug%2010%202020%2009%3A56%3A08%20GMT-0300%20%28-03%29' }} />
                </Layout>
                <Layout style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Icon style={{ width: 25, height: 25 }} fill="#8F9BB3" name="sync-outline" />
                </Layout>
                <Layout style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Layout style={{
                        zIndex: 99,
                        position:'absolute',
                        backgroundColor: 'transparent',
                        right: 0,
                        marginTop: -5,
                        marginRight: -5,
                    }}>
                        <Avatar style={{ width: 45, height: 45, borderWidth: 2, borderColor: 'white'}}  source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GjyEjZZtJ6QqClUj6REGVv5iRzi8-byNDN4fYWS4Q'}} />
                    </Layout>
                    <Image style={{ width: 80, height: 80, borderRadius: 20 }}
                           source={{ uri: 'https://trueque-dev.s3.sa-east-1.amazonaws.com/Sun%20Aug%2009%202020%2019%3A37%3A49%20GMT-0300%20%28-03%29' }} />
                </Layout>

            </Layout>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default React.memo(TradeDetail)