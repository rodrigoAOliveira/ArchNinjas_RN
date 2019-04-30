import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import NinjaPage from "./views/pages/Ninja/view";
import {BuildConfig} from "./BuildConfig";

const mainNavigator = createStackNavigator(
  {
    Profile: NinjaPage
  },
  {
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(mainNavigator);
BuildConfig.boot();
export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}
