import UserRepository from "./repo/UserRepository";
import UserService from "./service/UserService";
import {Observable} from "rxjs";

export default class UserManager {
  _userRepo: UserRepository;
  _userService: UserRepository;

  constructor() {
    this._userRepo = new UserRepository();
    this._userService = new UserService();
  }

  getUserData(id): Observable {
    return this._userService
      .getUser(id)
      .catch(ignored => this._userRepo.getUser(id));
  }
}
