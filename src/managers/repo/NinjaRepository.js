import DbClient from "./orm/DbClient";
import Ninja from "./models/ninja";
import {Observable} from "rxjs";

export default class NinjaRepository {
  static _table: string = Ninja.TABLE;
  static _client: DbClient = DbClient.getDefaultInstance();

  getNinja(id): Observable<Ninja> {
    return NinjaRepository._client.get(NinjaRepository._table, id);
  }

  getNinjas(): Observable<Ninja[]> {
    return NinjaRepository._client.get(NinjaRepository._table);
  }

  saveNinja(ninja): Observable<void> {
    return NinjaRepository._client.save(NinjaRepository._table, ninja);
  }
}
