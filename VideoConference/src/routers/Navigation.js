
import React from 'react';

import {StackNavigator} from 'react-navigation'
import HomeScreen from "../containers/video_conference/HomeScreen";
import CallScreen from "../containers/video_conference/CallScreen";


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
export default RootStack