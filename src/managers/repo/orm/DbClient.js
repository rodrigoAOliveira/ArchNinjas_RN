import Realm from 'realm'
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

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
    return fromPromise(Realm.open(this._dbConfig));
  }

  save(table: string, object: any): Observable {
    return this.openDb()
      .flatMap(realm => {
        //Todo: save into realm

        return Observable.next()
      })
  }

  get(table: string, id: string): Observable {
    return this.openDb()
      .flatMap(realm => {
        //Todo: get from realm
        return Observable.next(/*Pass here the fetched object*/)
      })
  }
}
