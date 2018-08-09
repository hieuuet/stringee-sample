import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { StringeeRoom, StringeeVideoView, StringeeClient} from 'stringee-react-native'

class Home extends Component {
    render () {
        return (
            <View style = {{flex:1}}>
                <StringeeVideoView style={styles.localView} />
            </View>
        )
    }
}
export default Home
const styles = StyleSheet.create({
    localView: {
        backgroundColor: "black",
        position: "absolute",
        top: 20,
        right: 20,
        width: 100,
        height: 100,
        zIndex: 1
    },
})