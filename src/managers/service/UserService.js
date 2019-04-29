import HttpClient from "./client/HttpClient";

export default class UserService {
  static _url: string = '/users';
  static _client: HttpClient = HttpClient.getDefaultInstance();

  getUsers() {
    return UserService._client.get(UserService._url);
  }

  postUser(body) {
    return UserService._client.post(UserService._url, body);
  }
}
