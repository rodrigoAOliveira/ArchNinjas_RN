export class BuildConfig {
  static getAppUrl() {
    if (__DEV__) {
      return 'DEV URL'
    }
    return 'PRODUCTION URL'
  }
}
