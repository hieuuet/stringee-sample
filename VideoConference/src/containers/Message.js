import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class Message extends Component {
    static navigationOptions = {
        title: 'Message',
    };

    render () {
        const { params } = this.props.navigation.state
        console.log('params', params)
        console.log('message')
        return (
            <View>
                <Text>
                    Message
                </Text>
            </View>
        )
    }
}
export default Message