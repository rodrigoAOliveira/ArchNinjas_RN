import {Observable} from "rxjs";

export default class DbClient {
  static _instance: DbClient;

  constructor(dbConfig) {
    this._dbConfig = dbConfig;
  }

  static getDefaultInstance(): DbClient {
    if (!DbClient._instance) {
      DbClient._instance = new DbClient({});
    }
    return DbClient._instance;
  }

  _dbConfig: any;

  openDb(): Observable {
    return Observable.of('Todo')
  }

  save(table: string, object: any): Observable {
    return Observable.of('Todo')
  }

  get(table: string, id: string): Observable {
    return Observable.of('Todo')
  }
}
