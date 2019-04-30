import HttpClient from "./client/HttpClient";
import {Observable} from "rxjs";
import Ninja from "../repo/models/ninja";

export default class NinjaService {
  static _url: string = '/ninjas';
  static _client: HttpClient = HttpClient.getDefaultInstance();

  getNinjas(): Observable<Ninja[]> {
    return NinjaService._client.get(NinjaService._url);
  }
}
