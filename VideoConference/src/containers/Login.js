import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    };
    render() {
        console.log("login")

        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate("Home", {
                    itemId: 86,
                    otherParam: 'anything you want here',
                })}>
                    <Text>
                        home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.push("Message", {
                    itemId: 86,
                    otherParam: 'anything you want here',
                })}>
                    <Text>
                        message
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login