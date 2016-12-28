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

class MyScannerApp extends Component {
  render() {
    return (
      <View>
        <Text>
          My Scanner
        </Text>
		<HostIdentifier />
      </View>
    );
  }
}

class HostIdentifier extends Component {
	render() {
		return (
			<View>
				<Text>Hostname: </Text>
				<TextInput onChangeText={(hostname) => this.setState({hostname})} value={this.state.hostname}/>
				<Button title="Identify"/>
				<Text>IP: </Text>
				<TextInput onChangeText={(ip) => this.setState({ip})} value={this.state.ip} />
				<Scanner ip={this.state.ip} />
			</View>
		);
	}
}

class Scanner extends Component {
		render() {
			return (
				<View>
					<Text>Scan</Text>
					<Picker onValueChange={(port) => this.setState({port})}>
						<Picker.Item label="FTP" value="21" />
						<Picker.Item label="SSH" value="22" />
						<Picker.Item label="HTTP" value="80" />
					</Picker>
					<Button title="Scan" />
					<ScanResults />
				</View>
			);
		}
}

class ScanResults extends Component {
	render() {
		return(
			<View>
				<Text> Scanning </Text>
			</View>
		);
	}
}
AppRegistry.registerComponent('MyScannerApp', () => MyScannerApp);
