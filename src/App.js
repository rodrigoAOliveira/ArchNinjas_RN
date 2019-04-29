import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import ProfilePage from "./views/pages/Profile/view";

const mainNavigator = createStackNavigator(
  {
    Profile: ProfilePage
  },
  {
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(mainNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}
