import NinjaManager from "../../../managers/NinjaManager";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators"
import Ninja from "../../../managers/repo/models/ninja";

export default class NinjaControler {
  _ninjaManager = new NinjaManager();

  getNinjas(): Observable<Ninja[]> {
    return this._ninjaManager.getDbNinjas()
      .pipe(
        map(ninjas => ninjas.filter(ninja => !ninja.outsorcing)),
        map(ninjas => ninjas.map(ninja => new Ninja(ninja.id,
          ninja.name,
          ninja.avatar,
          ninja.job,
          ninja.outsorcing))),
      )
  }

  saveNinjas(ninjas): Observable<void> {
    const subscriptions = [];
    ninjas.forEach(ninja => subscriptions.push(this._ninjaManager.saveNinja(ninja)));
    return merge(...subscriptions);
  }
}
