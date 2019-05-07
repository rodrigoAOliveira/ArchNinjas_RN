import {Observable} from "rxjs";
import SQLite from 'react-native-sqlite-storage'
import {BuildConfig} from "../../../BuildConfig";
import Ninja from '../models/ninja'
import types from '../models/types'
import Katana from "../models/katana";

export default class DbClient {
  static _instance: DbClient;
  static TABLES = [
    {name: Ninja.TABLE, schema: Ninja.schema},
    {name: Katana.TABLE, schema: Katana.schema}
  ];

  constructor(dbConfig) {
    this._dbConfig = dbConfig;
    this._client = DbClient.openDb(dbConfig.dbName)
  }

  static boot() {
    const tables = DbClient.TABLES;
    const getSQLAttrsFromSchema = (schema) => {
      const foreignKeys = [];
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
        if (field.foreignKey) {
          foreignKeys.push(field);
        }
        if (index !== schema.length - 1) {
          result += ', '
        }
      }
      if (foreignKeys.length > 0) {
        result += ', ';
        for (let index = 0; index < foreignKeys.length; index++) {
          const field = foreignKeys[index];
          const {table, attr} = field.foreignKey;
          result += `FOREIGN KEY(${field.attr}) REFERENCES ${table}(${attr})`;
          if (index !== foreignKeys.length - 1) {
            result += ', '
          }
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

    const attributes = [];
    const values = [];
    for (let field of schema) {
      const {attr} = field;
      const value = object[attr];

      if (value !== undefined || value !== null) {
        attributes.push(attr);
        if (typeof value !== 'boolean') {
          values.push(value)
        } else values.push(value ? 1 : 0);
      }
    }
    const formatSqlValues = () => {
      let result = '';
      for (let index = 0; index < attributes.length; index++) {
        const value = values[index];
        const attr = attributes[index];
        const attrSchema = schema.filter(schema => schema.attr === attr)[0];
        if (attrSchema.type === types.STRING || attrSchema.type === types.BLOB) {
          result += `'${value}'`;
        } else result += value;

        if (index !== attributes.length - 1) {
          result += ', ';
        }
      }
      return result;
    };
    return `(${attributes.toString()}) VALUES (${formatSqlValues()})`;
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
          const sql = `INSERT OR REPLACE INTO ${table} ${DbClient.getSQLFromSchema(object)}`;
          console.tron.log('Executing SQL...', sql);
          transaction.executeSql(sql)
        },
        error => observer.error(error),
        () => observer.next()
      );
    })
  }

  getAll(table: string): Observable {
    return new Observable(observer => {
      let results = [];
      this._client.transaction(transaction => {
        const sql = `SELECT * FROM ${table}`;
        console.tron.log('Executing SQL...', sql);
        transaction.executeSql(sql, [],
          (ignored, result) => {
            for (let index = 0; index < result.rows.length; index++) {
              let row = result.rows.item(index);
              results.push(row)
            }
            observer.next(results)
          },
          (error) => observer.error(error));
      })
    });
  }

  getFrom(table: string, where: [string]): Observable {
    return new Observable(observer => {
      let results = [];
      this._client.transaction(transaction => {
        let sql = `SELECT * FROM ${table}`;
        if (where.length > 0) {
          sql += ' WHERE';
        }
        for (let index = 0; index < where.length; index++) {
          sql += ` ${where[index]}`;
          if (index !== where.length - 1) {
            sql += ' AND'
          }
        }
        console.tron.log('Executing SQL...', sql);
        transaction.executeSql(sql, [],
          (ignored, result) => {
            for (let index = 0; index < result.rows.length; index++) {
              let row = result.rows.item(index);
              results.push(row)
            }
            observer.next(results)
          },
          (error) => observer.error(error));
      })
    });
  }

  execute(sql: string): Observable {
    return new Observable(observer => {
      this._client.transaction(transaction => {
        console.tron.log('Executing SQL...', sql);
        transaction.executeSql(sql, [],
          (ignored, result) => {
            observer.next(result)
          },
          (error) => observer.error(error));
      })
    });
  }
}
