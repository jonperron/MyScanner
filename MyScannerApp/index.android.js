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

class ServerStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {serverStatus:"Server unavailable !"}
	}
	
	componentWillMount() {
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				this.setState({
					serverStatus: "Checking..."
				})					
			}
			if (request.status === 200){
				this.setState({
					serverStatus: "Server available !"
				})				
			}
		};
		request.open('GET','http://192.168.1.17:8001/');
		request.send();
	}
	render() {
		return(
			<View>
				<Text>Scanner status: {this.state.serverStatus}</Text>
			</View>
		);
	}
}
class HostIdentifier extends Component {
    constructor(props) {
      super(props);
      this.state= {hostname: "localhost",ip:"192.168.1.1"}
    }
	
	resolveButton() {
		var hostnameToSolve = 'http://192.168.1.17:8001/get_hostname/?hostname=' + this.state.hostname
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				this.setState({
					ip: "Checking..."
				})					
			}
			if (request.status === 200){
				var responseToParse = request.response.split(' ')[1];
				this.setState({
					ip: responseToParse
				})				
			}
		};
		request.open('GET',hostnameToSolve);
		request.send();		
	}
	render() {
		return (
			<View style={styles.identifier}>
				<ServerStatus />
				<Text>Hostname: </Text>
				<TextInput style={styles.textinput} onChangeText={(hostname) => this.setState({hostname})} value={this.state.hostname}/>
                <Button onPress={this.resolveButton.bind(this)} title="Resolve" color="#6495ed" accessibilityLabel="Identify this hostname"/>
				<Text>IP: </Text>
				<TextInput style={styles.textinput} onChangeText={(ip) => this.setState({ip})} value={this.state.ip} />
                <Scanner ip={this.state.ip}/>
			</View>
		);
	}
}

class Scanner extends Component {
		constructor(props) {
			super(props);
			this.state= {result:'',port:'80'}
		}
	
		scanButton() {
			var ws = new WebSocket('ws://192.168.1.17:8001/scan_port/');
			
			ws.onopen = () => {
				this.setState({
					result:"Scanning..."
				})
				ws.send(String(this.props.ip + ',' + this.state.port + ',' + this.state.port));
			};
			
			ws.onmessage = (e) => {
				this.setState({
					results: 
				});	
			};
			
		}
		render() {
			return (
				<View style={styles.scanner}>
					<Text>Scan</Text>
					<Picker onValueChange={(port) => this.setState({port})}>
						<Picker.Item label="FTP" value="21" />
						<Picker.Item label="SSH" value="22" />
						<Picker.Item label="HTTP" value="80" />
					</Picker>
					<Button  onPress={this.scanButton.bind(this)} title="Scan" color="#6495ed" accessibilityLabel="Start scanner"/>
					<ScanResults result={this.state.result}/>
				</View>
			);
		}
}

class ScanResults extends Component {
	render() {
		return(
			<View style={styles.results}>
				<Text> {this.props.result} </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgreen',
  },
  welcome: {
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10,
  },
  identifier : {
    flex:1,
    margin:4,
    justifyContent: 'center',
  },
  textinput: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  scanner : {
    flex:15
  },
  results : {
    flex:1,
    backgroundColor: 'white',
    borderColor: 'black',
  }
})

AppRegistry.registerComponent('MyScannerApp', () => MyScannerApp)
