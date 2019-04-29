import {BuildConfig} from "../../../BuildConfig";
import Axios, {AxiosInstance} from "axios";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

export default class HttpClient {
  static _instance: HttpClient;

  constructor(client, baseUrl) {
    this._client = client;
    this._baseUrl = baseUrl;
  }

  static getDefaultInstance(): HttpClient {
    if (!HttpClient._instance) {
      HttpClient._instance = new HttpClient(Axios.create(), BuildConfig.getAppUrl());
    }
    return HttpClient._instance;
  }

  _client: AxiosInstance;
  _baseUrl: string;

  post(url: string, body: any, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;

    return fromPromise(this._client.post(fullUrl, body, options));
  }

  put(url: string, body: any, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;

    return fromPromise(this._client.put(fullUrl, body, options));
  }

  get(url: string, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;

    return fromPromise(this._client.get(fullUrl, options));
  }

  delete(url: string, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;

    return fromPromise(this._client.delete(fullUrl, options));
  }

  //Todo: Add custom interceptors to each individual client
}
