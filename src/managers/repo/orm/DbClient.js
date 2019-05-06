import {Observable} from "rxjs";
import SQLite from 'react-native-sqlite-storage'
import {BuildConfig} from "../../../BuildConfig";
import Ninja from '../models/ninja'
import types from '../models/types'

export default class DbClient {
  static _instance: DbClient;
  static TABLES = [{name: Ninja.TABLE, schema: Ninja.schema}];

  constructor(dbConfig) {
    this._dbConfig = dbConfig;
    this._client = DbClient.openDb(dbConfig.dbName)
  }

  static boot() {
    const tables = DbClient.TABLES;
    const getSQLAttrsFromSchema = (schema) => {
      let result = '';
      for (let index = 0; index < schema.length; index++) {
        const field = schema[index];
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
        if (index !== schema.length - 1) {
          result += ', ';
        }
      }
      return result;
    };

    const dbClient = DbClient.getDefaultInstance();
    tables.forEach(table => {
      const values = getSQLAttrsFromSchema(table.schema);
      const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${values})`;
      console.tron.log('Executing SQL...', sql);
      dbClient._client.executeSql(sql,
        [],
        () => console.tron.log(`Table ${table.name} created successfully`),
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
    const schema = object.constructor.schema;
    const attributes = schema.map(scheme => scheme.attr);
    const values = attributes.map(attr => {
      const objectAttr = object[attr];
      if (typeof objectAttr === 'boolean') {
        return objectAttr ? 1 : 0;
      } else return objectAttr;
    });
    const formatSql = () => {
      let result = '';
      for (let index = 0; index < attributes.length; index++) {
        const value = values[index];
        const attrSchema = schema[index];
        if (attrSchema.type === types.STRING || attrSchema.type === types.BLOB) {
          result += `'${value}'`;
        } else result += value;

        if (index !== attributes.length - 1) {
          result += ', ';
        }
      }
      return result;
    };

    return `(${attributes.toString()}) VALUES (${formatSql()})`;
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
