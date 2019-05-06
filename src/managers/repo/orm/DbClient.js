import {Observable} from "rxjs";
import SQLite from 'react-native-sqlite-storage'
import {BuildConfig} from "../../../BuildConfig";
import Ninja from '../models/ninja'

export const types = {
  INT: 'INTEGER',
  REAL: 'REAL',
  STRING: 'TEXT',
  BLOB: 'BLOB'
};

export default class DbClient {
  static _instance: DbClient;

  constructor(dbConfig) {
    this._dbConfig = dbConfig;
    this._dbConfig = DbClient.openDb(dbConfig.dbName)
  }

  static boot() {
    const tables = [{name: Ninja.TABLE, schema: Ninja.schema}];
    const getSQLAttrsFromSchema = (schema) => {
      let result = '';
      for (let field of schema) {
        result += `${field.attr} ${field.type}`;

        if (field.primaryKey) {
          result += ' PRIMARY KEY'
        }
        if (field.autoIncrement) {
          result += ' AUTOINCREMENT';
        }
        if (field.notNull) {
          result += ' NOT NULL';
        }
      }
      return result;
    };

    const dbClient = DbClient.getDefaultInstance();
    tables.forEach(table => {
      const values = getSQLAttrsFromSchema(table.schema);
      const sql = `CREATE TABLE IF NOT EXISTS ${table.name}(${values})`;
      console.tron.log('Executing SQL...', sql);
      dbClient._client.executeSql(sql,
        [],
        () => {
        },
        (error) => console.tron.log(`Table ${table.name} failed to create`,
          error));
    })
  }

  static openDb(dbName) {
    return SQLite.openDatabase({name: dbName, location: 'default'},
      () => console.tron.log(`Database ${dbName} open successfully`),
      (error) => console.tron.log(`Database ${dbName} failed to open`,
        error));
  }

  static getSQLFromSchema(object: any) {
    const {schema} = object.constructor;
    const attributes = schema.map(scheme => scheme.attr);
    const values = attributes.map(attr => object[attr]);

    return `(${attributes.toString()}) VALUES (${values.toString()})`;
  }

  static getDefaultInstance(): DbClient {
    if (!DbClient._instance) {
      DbClient._instance = new DbClient({dbName: BuildConfig.getAppName()});
    }
    return DbClient._instance;
  }

  _dbConfig: any;
  _client;

  save(table: string, object: any): Observable<void> {
    return new Observable(observer => {
      this._client.transaction(
        transaction => {
          const sql = `INSERT INTO ${table} ${DbClient.getSQLFromSchema(object)}`;
          console.tron.log('Executing SQL...', sql);
          transaction.executeSql(sql)
        },
        error => observer.error(error),
        () => observer.next()
      );
    })
  }

  get(table: string, id: string): Observable {
    return Observable.of('Todo')
  }

  getAll(table: string): Observable {

  }
}
