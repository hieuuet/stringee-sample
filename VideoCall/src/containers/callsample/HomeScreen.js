import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Keyboard,
    AsyncStorage
} from "react-native";
import { StringeeClient } from "stringee-react-native";

// import FCM from "react-native-fcm";
// import { FCMEvent } from "react-native-fcm";

// const user1 =
//     "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1NDVjl0OE9NWWlPOWNqSGF3T25QWDlzeWdHRDBqeWctMTUzMzM1NjA4MCIsImlzcyI6IlNLU0NWOXQ4T01ZaU85Y2pIYXdPblBYOXN5Z0dEMGp5ZyIsImV4cCI6MTUzMzM1OTY4MCwidXNlcklkIjoiaGlldW52In0.1pYLS3JjM5zzkhSkbVHbpTBxVfETB0CVMTwNmbrQH-Q";
// const user2 =
//     "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1NDVjl0OE9NWWlPOWNqSGF3T25QWDlzeWdHRDBqeWctMTUzMzI5MDk1MSIsImlzcyI6IlNLU0NWOXQ4T01ZaU85Y2pIYXdPblBYOXN5Z0dEMGp5ZyIsImV4cCI6MTUzMzI5NDU1MSwidXNlcklkIjoiaHV5bHEifQ.g2RTiCULZJVw6HlOkpQj1yFAQOsrPOywHm7DzS8J130";

const iOS = Platform.OS === "ios" ? true : false;

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { user1: "", myUserId: "", callToUserId: "", hasConnected: false };

        this.clientEventHandlers = {
            onConnect: this._clientDidConnect,
            onDisConnect: this._clientDidDisConnect,
            onFailWithError: this._clientDidFailWithError,
            onRequestAccessToken: this._clientRequestAccessToken,
            onIncomingCall: this._callIncomingCall
        };
    }

    componentWillMount() {
        // this._getAccessToken()

    }
    _getAccessToken = () => {
        fetch("http://14.225.5.181:82/stringee/php/access_token_for_client.php?u=huylq", {})
            .then(response => {
                return response.json()
            }).then(dataRes => {
            // console.log('access_token', dataRes.access_token)
            this.setState({
                user1: dataRes.access_token
            }, () =>
                this.refs.client.connect(this.state.user1))


        }).catch(e => {
            console.log("exception", e);
        });
    }

    async componentDidMount() {

        await this._getAccessToken();
    }

    // Connection
    _clientDidConnect = ({ userId }) => {
        console.log("_clientDidConnect - " + userId);
        this.setState({
            myUserId: userId,
            hasConnected: true
        });

        // if (!iOS) {
        //     AsyncStorage.getItem("isPushTokenRegistered").then(value => {
        //         if (value !== "true") {
        //             FCM.getFCMToken().then(token => {
        //                 this.refs.client.registerPush(
        //                     token,
        //                     true,
        //                     true,
        //                     (result, code, desc) => {
        //                         if (result) {
        //                             AsyncStorage.multiSet([
        //                                 ["isPushTokenRegistered", "true"],
        //                                 ["token", token]
        //                             ]);
        //                         }
        //                     }
        //                 );
        //             });
        //         }
        //     });
        //
        //     FCM.on(FCMEvent.RefreshToken, token => {
        //         this.refs.client.registerPush(
        //             token,
        //             true,
        //             true,
        //             (result, code, desc) => {}
        //         );
        //     });
        // }
    };

    _clientDidDisConnect = () => {
        console.log("_clientDidDisConnect");
        this.setState({
            myUserId: "",
            hasConnected: false
        });
    };

    _clientDidFailWithError = () => {
        console.log("_clientDidFailWithError");
    };

    _clientRequestAccessToken = () => {
        console.log("_clientRequestAccessToken");
        // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
        // this.refs.client.connect("NEW_TOKEN");
    };

    // Call events
    _callIncomingCall = ({
                             callId,
                             from,
                             to,
                             fromAlias,
                             toAlias,
                             callType,
                             isVideoCall,
                             customDataFromYourServer
                         }) => {
        console.log(
            "IncomingCallId-" +
            callId +
            " from-" +
            from +
            " to-" +
            to +
            " fromAlias-" +
            fromAlias +
            " toAlias-" +
            toAlias +
            " isVideoCall-" +
            isVideoCall +
            "callType-" +
            callType +
            "customDataFromYourServer-" +
            customDataFromYourServer
        );

        this.props.navigation.navigate("Call", {
            callId: callId,
            from: from,
            to: to,
            isOutgoingCall: false,
            isVideoCall: isVideoCall
        });
    };

    // Action
    _onVoiceCallButtonPress = () => {
        console.log("-------------------------_onVoiceCallButtonPress------------------------------");
        Keyboard.dismiss();
        // console.log('callToUserId', this.state.callToUserId)
        // console.log('hasConnected', this.state.hasConnected)
        if (this.state.callToUserId != "" && this.state.hasConnected) {
            this.props.navigation.navigate("Call", {
                from: this.state.myUserId,
                to: this.state.callToUserId,
                isOutgoingCall: true,
                isVideoCall: false
            });
        }
    };

    _onVideoCallButtonPress = () => {
        console.log("-------------------------_onVideoCallButtonPress------------------------------");
        Keyboard.dismiss();
        if (this.state.callToUserId != ""&& this.state.hasConnected) {
            this.props.navigation.navigate("Call", {
                from: this.state.myUserId,
                to: this.state.callToUserId,
                isOutgoingCall: true,
                isVideoCall: true
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    React Native wrapper for Stringee mobile SDK!
                </Text>

                <Text style={styles.info}>Logged in as: {this.state.myUserId}</Text>

                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    autoCapitalize="none"
                    value={this.state.callToUserId}
                    placeholder="Make a call to userId"
                    onChangeText={text => this.setState({ callToUserId: text })}
                />

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onVoiceCallButtonPress}
                    >
                        <Text style={styles.text}>Voice Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onVideoCallButtonPress}
                    >
                        <Text style={styles.text}>Video Call</Text>
                    </TouchableOpacity>
                </View>

                <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    info: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold",
        color: "red"
    },

    text: {
        textAlign: "center",
        color: "#F5FCFF",
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 15
    },

    input: {
        height: 35,
        width: 280,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "#ECECEC"
    },

    button: {
        width: 120,
        height: 40,
        marginTop: 40,
        paddingTop: 10,
        // paddingBottom: ,
        backgroundColor: "#1E6738",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff"
    },

    buttonView: {
        width: 280,
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});