import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Trades from '../screens/Trades/Trades.screen'
import TradeDetail from '../screens/Trades/TradeDetail.screen'

const { Navigator, Screen } = createStackNavigator()

const MyItemsNavigator = () => {
    return (
        <Navigator headerMode="none">
            <Screen name="Trades" component={Trades} />
            <Screen name="TradeDetail" component={TradeDetail} />
        </Navigator>
    )
}

export default MyItemsNavigator
