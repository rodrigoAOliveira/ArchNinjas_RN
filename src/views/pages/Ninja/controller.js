import NinjaManager from "../../../managers/NinjaManager";
import {Observable} from "rxjs";
import { map } from "rxjs/operators"
import Ninja from "../../../managers/repo/models/ninja";

export default class NinjaControler {
  _ninjaManager = new NinjaManager();

  getNinjas(): Observable<Ninja[]> {
    return this._ninjaManager.getNinjas()
      .pipe(
        map(ninjas => ninjas.filter(ninja => !ninja.outsorcing)),
      )
  }
}
