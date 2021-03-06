import Reactotron from 'reactotron-react-native'
import {name as appName} from '../app.json';
import DbClient from "./managers/repo/orm/DbClient";

export class BuildConfig {
  static getAppUrl() {
    if (__DEV__) {
      return 'https://5cc795ceae1431001472e4da.mockapi.io'
    }
    return 'PRODUCTION URL'
  }

  static boot() {
    this._disableYellowBox();
    this._linkReactotron();
    DbClient.boot();
  }

  static _linkReactotron() {
    Reactotron
      .configure({
        name: appName,
      }).useReactNative({
      networking: true
    }).connect();

    console.tron = Reactotron;
  }

  static _disableYellowBox() {
    console.disableYellowBox = true;
  }

  static getAppName() {
    return appName;
  };
}
