import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import loginUser from "./functions/login";

export default class App extends React.Component {
  state = {
    showPassword: true,
    mailBorder: "#0B2B99",
    passwordBorder: "#0B2B99",
    showText: "SHOW",
    email: "",
    password: "",
    loginError: "",
    loginText: "LOG IN",
    disabled:true
  };

  togglePassword = () => {
    // this.setState({showPassword:!this.state.showPassword})
    if (this.state.showPassword) {
      this.setState({ showPassword: false, showText: "HIDE" });
    } else {
      this.setState({ showPassword: true, showText: "SHOW" });
    }
  };

  handleLogin = async () => {
    if (!this.state.email)
      return this.setState({
        mailBorder: "red",
        loginError: "Email is required",
      });
    if (!this.state.password)
      return this.setState({
        passwordBorder: "red",
        loginError: "Password is required",
      });
    if (this.state.password.length <= 7)
      return this.setState({
        passwordBorder: "red",
        loginError: "Password must be atleast 8 chracters",
      });
    this.setState({ loginText: "PROCCESSING...",loginError:"" });
    const result = await loginUser(this.state.email, this.state.password);
    if (result.error)
      return this.setState({
        loginError: result.errMessage,
        loginText: "TRY AGAIN",
      });
    alert("logged in");
    this.setState({ loginError: "", loginText: "SUCCESS" });
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/background2.png")}
        resizeMode="cover"
        style={styles.container}
      >
        <ScrollView style={styles.viewcontainer}>
          <View style={{ alignItems: "center" }}>
            {/*  i added this view here just to set the alignItems to center since scrollview dont allow you to set such else being set on contentcontainerstyle which will actually change behaviour of the scrollview */}
            <Text style={{ color: "red" }}>{this.state.loginError}</Text>
            <TextInput
              style={[styles.textInput, { borderColor: this.state.mailBorder }]}
              placeholder="Email"
              placeholderTextColor="#FFF"
              value={this.state.email}
              onChangeText={(value) =>
                this.setState({
                  email: value,
                  loginError: "",
                  mailBorder: "#0B2B99",
                })
              }
            />

            <View
              style={[
                styles.inputCont,
                {
                  borderColor: this.state.passwordBorder,
                  borderWidth: 1,
                  borderRadius: 11,
                  backgroundColor: "#0B2B99",
                },
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={this.state.showPassword}
                value={this.state.password}
                onChangeText={(value) =>
                  this.setState({
                    password: value,
                    loginError: "",
                    passwordBorder: "#0B2B99",
                  })
                }
              />

              <View style={styles.showView}>
                <TouchableOpacity onPress={this.togglePassword} >
                  <Text style={styles.showText}>{this.state.showText}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.login} onPress={this.handleLogin}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {this.state.loginText}
              </Text>
            </TouchableOpacity>
            <Text style={styles.or}>OR</Text>

            <View style={styles.mediaContainer}>
              <Image
                source={require("./assets/Google.png")}
                style={styles.mediaImage}
              />

              <Image
                source={require("./assets/Facebook.png")}
                style={styles.mediaImage}
              />
              <Image
                source={require("./assets/Dribbble.png")}
                style={styles.mediaImage}
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.downtext}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableHighlight>
              <Text style={styles.downtext}>CREATE ACCOUNT</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewcontainer: {
    top: "16%",
    flex: 1,
    // alignItems:"center",
  },
  textInput: {
    borderColor: "#0B2B99",
    borderWidth: 1,
    width: "80%",
    backgroundColor: "#0B2B99",
    borderRadius: 10,
    padding: 10,
    margin: "5%",
    color: "#fff",
  },
  passwordInput: {
    borderColor: "#0B2B99",
    borderWidth: 1,
    width: "60%",
    backgroundColor: "#0B2B99",
    padding: 10,
    color: "#fff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  inputCont: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  showView: {
    color: "#fff",
    backgroundColor: "#0B2B99",
    width: "20%",
    height: 49.5,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    right: 2,
    textAlign: "center",
  },
  showText: {
    textAlign: "center",
    top: 7,
    fontSize: 10.5,
    color: "#fff",
    backgroundColor: "rgba(28, 143, 248, 0.338428)",
    borderRadius: 2,
  },
  login: {
    backgroundColor: "#645AFF",
    padding: 15,
    width: "50%",
    borderRadius: 50,

    margin: "6%",
  },
  or: {
    color: "#140F26",
    fontSize: 20,
  },
  mediaContainer: {
    flex: 1,
    flexDirection: "row",
    margin: "3%",
    justifyContent: "space-between",
  },
  mediaImage: {
    width: 50,
    height: 50,
    margin: "5%",
  },
  downtext: {
    color: "#140F26",
    fontSize: 12,
    width: 100,
    //no word break is available on react native just like plane css so i chose to use width to set this property
    textAlign: "center",
    // marginBottom:200
  },
  line: {
    backgroundColor: "#000",
    height: 4,
    width: 100,
    borderRadius: 50,
    margin: "5%",
  },
});
