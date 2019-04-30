import NinjaManager from "../../../managers/NinjaManager";
import {Observable} from "rxjs-compat";
import Ninja from "../../../managers/repo/models/ninja";

export default class NinjaControler {
  _ninjaManager = new NinjaManager();

  getNinjas(): Observable<Ninja[]> {
    return this._ninjaManager.getNinjas()
      .flatMap((ninjas) => {
        return Observable.of(ninjas.filter(ninja => !ninja.outsorcing));
      });
  }
}
