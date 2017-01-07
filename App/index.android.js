/**
 * My Scanner App
 * https://github.com/jonperron/MyScanner/
 * Author : Jonathan Perron
 * E-mail : contact@jonathanperron.fr
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const onButtonPress = () => { Alert.alert('Button has been pressed!'); };

class MyScannerApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My Scanner
        </Text>
        <HostIdentifier />
      </View>
    );
  }
}

class HostIdentifier extends Component {
    constructor(props) {
      super(props);
      this.state= {hostname: "Hostname to look for",ip:"IP to scan"}
    }
	
	render() {
		return (
			<View style={styles.identifier}>
				<Text>Hostname: </Text>
				<TextInput style={styles.textinput} onChangeText={(hostname) => this.setState({hostname})} value={this.state.hostname}/>
                <Button onPress={onButtonPress} title="Resolve" color="#6495ed" accessibilityLabel="Identify this hostname"/>
				<Text>IP: </Text>
				<TextInput style={styles.textinput} onChangeText={(ip) => this.setState({ip})} value={this.state.ip} />
                <Scanner />
			</View>
		);
	}
}

class Scanner extends Component {
		render() {
			return (
				<View style={styles.scanner}>
					<Text>Scan</Text>
					<Picker onValueChange={(port) => this.setState({port})}>
						<Picker.Item label="FTP" value="21" />
						<Picker.Item label="SSH" value="22" />
						<Picker.Item label="HTTP" value="80" />
					</Picker>
					<Button  onPress={onButtonPress} title="Scan" color="#6495ed" accessibilityLabel="Start scanner"/>
					<ScanResults />
				</View>
			);
		}
}

class ScanResults extends Component {
	render() {
		return(
			<View style={styles.results}>
				<Text> Scanning </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgreen',
    fontFamily : 'Helvetice'
  },
  welcome: {
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10,
    color : "white",
  },
  identifier : {
    flex:1,
    margin:4,
    justifyContent: 'center',
    color : "white",
  },
  textinput: {
    backgroundColor: 'white',
    borderColor: 'black',
    color : "black",
  },
  scanner : {
    flex:15
  },
  results : {
    flex:1,
    backgroundColor: 'white',
    borderColor: 'black',
    color: "black",
  }
})

AppRegistry.registerComponent('MyScannerApp', () => MyScannerApp)
