/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Beacons from 'react-native-beacons-manager';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  beaconsDidRangeEvent = null;
  constructor(props) {
    super(props);
    this.rangeBeacons = this.rangeBeacons.bind(this);

  }
  async  componentWillMount(){
    await Beacons.detectIBeacons();
  }

async componentDidMount(){
  Beacons
.startRangingBeaconsInRegion("test")
.then(() => console.log('Beacons monitoring started successfully'))
.catch(error => console.log(`Beacons monitoring not started, error: ${error}`));
this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
  "beaconsDidRange",
  data => {
  console.log('1111', data);
  }
  );
  }

  async componentWillUnMount() {
    await Beacons.stopRangingBeaconsInRegion("test");
    console.log('Beacons ranging stopped successfully');
    this.beaconsDidRangeEvent.remove();
  }


 rangeBeacons(){
    console.log("in ranging function")
  
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});