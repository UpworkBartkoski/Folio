import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LOGO from '../../assets/folio.png';

export default class IntroScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <Image source={LOGO} style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={Actions.loginUser}>
            <Text style={styles.button}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.createUser}>
            <Text style={styles.button}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'cover',
    width: 400,
    height: 400,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#FF5636',
  },
  button: {
    fontSize: 20,
    color: 'white',
  },
});
