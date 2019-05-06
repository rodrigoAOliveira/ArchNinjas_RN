import types from './types'

export default class Ninja {
  static TABLE = 'Ninjas';
  static schema = [{
    attr: 'id',
    type: types.INT,
    primaryKey: true,
    autoIncrement: true,
  }, {
    attr: 'name',
    type: types.STRING,
    notNull: true,
  }, {
    attr: 'avatarUrl',
    type: types.STRING,
  }, {
    attr: 'job',
    type: types.STRING,
  }, {
    attr: 'outsorcing',
    type: types.INT,
  }];

  constructor(id: number, name: string, avatarUrl: string, job: string, outsorcing?: boolean = false) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.job = job;
    this.outsorcing = outsorcing;
  }

  id: number;
  name: string;
  avatarUrl: string;
  job: string;
  outsorcing: boolean;
}
