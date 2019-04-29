import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const mainNavigator = createStackNavigator(
  {
    //Todo: Setup app screens
  }
);

const AppContainer = createAppContainer(mainNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}
