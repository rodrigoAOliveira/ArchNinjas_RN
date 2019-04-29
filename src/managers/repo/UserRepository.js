import DbClient from "./orm/DbClient";

export default class UserRepository {
  static _table: string = 'Users';
  static _client: DbClient = DbClient.getDefaultInstance();

  getUser(id) {
    return UserRepository._client.get(UserRepository._table, id);
  }

  saveUser(user) {
    return UserRepository._client.save(UserRepository._table, user);
  }
}
