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

const user1 = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1NDVjl0OE9NWWlPOWNqSGF3T25QWDlzeWdHRDBqeWctMTUzMzY5ODUzNSIsImlzcyI6IlNLU0NWOXQ4T01ZaU85Y2pIYXdPblBYOXN5Z0dEMGp5ZyIsImV4cCI6MTUzMzcwMjEzNSwidXNlcklkIjoiaGlldW52In0.oTpiVvgWwNVJvnizd6Yn5YevSDKrR0icy9rSpLfHeD0";
const user2 = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1NDVjl0OE9NWWlPOWNqSGF3T25QWDlzeWdHRDBqeWctMTUzMzY5MzQwMiIsImlzcyI6IlNLU0NWOXQ4T01ZaU85Y2pIYXdPblBYOXN5Z0dEMGp5ZyIsImV4cCI6MTUzMzY5NzAwMiwidXNlcklkIjoiaGlldW52In0.0YSwD47t-L7W-QoQtkIWUAlCwrsQaYfSj-KBh7NYx9U";

const iOS = Platform.OS === "ios" ? true : false;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { myUserId: "", roomId: "", hasConnected: false, user1: "" };

    this.clientEventHandlers = {
      onConnect: this._clientDidConnect,
      onDisConnect: this._clientDidDisConnect,
      onFailWithError: this._clientDidFailWithError,
      onRequestAccessToken: this._clientRequestAccessToken,
      onIncomingCall: this._callIncomingCall
    };
  }

  componentWillMount() {}

    _getAccessToken = () => {
        fetch("http://14.225.5.181:82/stringee/php/access_token_for_client.php?u=huydd", {})
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
  };

  // Action
  _makeRoomButtonPress = () => {
    console.log("_makeRoomButtonPress");
    Keyboard.dismiss();
    if (this.state.hasConnected) {
      this.props.navigation.navigate("Call", {
        roomId: null,
        isRoomMaking: true
      });
    }
  };

  _joinRoomButtonPress = () => {
    Keyboard.dismiss();
    console.log("_joinRoomButtonPress");
    if (this.state.roomId != "" && this.state.hasConnected) {
      this.props.navigation.navigate("Call", {
        roomId: Number(this.state.roomId),
        isRoomMaking: false
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
          value={this.state.roomId}
          placeholder="RoomId"
          onChangeText={text => this.setState({ roomId: text })}
        />

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._makeRoomButtonPress}
          >
            <Text style={styles.text}>MakeRoom</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this._joinRoomButtonPress}
          >
            <Text style={styles.text}>JoinRoom</Text>
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
