import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraExample from './screens/CameraExample'
import QuizPage from './screens/QuizPage'


import { createStackNavigator, createAppContainer } from "react-navigation";

class App extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer />     
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: CameraExample,
    QuizPage: QuizPage,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default App;

