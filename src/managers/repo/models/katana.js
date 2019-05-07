import types from './types'
import Ninja from './ninja'

export default class Katana {
  static TABLE = 'Katanas';
  static schema = [{
    attr: 'id',
    type: types.INT,
    primaryKey: true,
    autoIncrement: true,
  }, {
    attr: 'ownerId',
    type: types.INT,
    foreignKey: {
      table: Ninja.TABLE,
      attr: 'id'
    }
  }, {
    attr: 'ownerOutsorcing',
    type: types.INT,
    foreignKey: {
      table: Ninja.TABLE,
      attr: 'outsorcing'
    }
  }, {
    attr: 'bladeLenght',
    type: types.INT
  }, {
    attr: 'bladeWidth',
    type: types.INT
  }];

  constructor(ownerId: number, bladeLenght: number, bladeWidth: number) {
    this.ownerId = ownerId;
    this.bladeLenght = bladeLenght;
    this.bladeWidth = bladeWidth;
  }

  id: number;
  ownerId: number;
  ownerOutsorcing: boolean;
  bladeLenght: number;
  bladeWidth: number;
}
