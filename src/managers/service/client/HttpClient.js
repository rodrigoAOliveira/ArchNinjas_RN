import {BuildConfig} from "../../../BuildConfig";
import Axios, {AxiosInstance} from "axios";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {map} from 'rxjs/operators'

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
    console.tron.display({
      name: 'POST',
      preview: url,
      value: [fullUrl, body || 'No Body', headers || 'No Headers'],
      important: true
    });

    return fromPromise(this._client.post(fullUrl, body, options))
      .pipe(
        map(value => HttpClient.mapResponseToProps(value))
      );
  }

  put(url: string, body: any, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;
    console.tron.display({
      name: 'PUT',
      preview: url,
      value: [fullUrl, body || 'No Body', headers || 'No Headers'],
      important: true
    });

    return fromPromise(this._client.put(fullUrl, body, options))
      .pipe(
        map(value => HttpClient.mapResponseToProps(value))
      );
  }

  get(url: string, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;
    console.tron.display({
      name: 'GET',
      preview: url,
      value: [fullUrl, headers || 'No Headers'],
      important: true
    });

    return fromPromise(this._client.get(fullUrl, options))
      .pipe(
        map(value => HttpClient.mapResponseToProps(value))
      );
  }

  delete(url: string, headers: any): Observable {
    const fullUrl = this._baseUrl + url;
    const options = headers ? {headers} : undefined;
    console.tron.display({
      name: 'DELETE',
      preview: url,
      value: [fullUrl, headers || 'No Headers'],
      important: true
    });

    return fromPromise(this._client.delete(fullUrl, options))
      .pipe(
        map(value => HttpClient.mapResponseToProps(value))
      );
  }

  static mapResponseToProps(response) {
    return response.data;
  }

  //Todo: Add custom interceptors to each individual client
}
