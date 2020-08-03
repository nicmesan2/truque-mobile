import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyTrades from '../screens/Trades/MyTrades.screen';

const { Navigator, Screen } = createStackNavigator()

const TradesNavigator = () => {
    return (
        <Navigator headerMode="none">
            <Screen name="MyTrades" component={MyTrades} />
        </Navigator>
    )
}

export default TradesNavigator
