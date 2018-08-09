import React from 'react';

import {StackNavigator} from 'react-navigation'
import HomeScreen from "../containers/callsample/HomeScreen";
import CallScreen from "../containers/callsample/CallScreen";


export const RootStack = StackNavigator (
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        Call: {
            screen: CallScreen,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        initialRouteName: 'Home',
    }
)