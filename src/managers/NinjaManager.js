import NinjaRepository from "./repo/NinjaRepository";
import NinjaService from "./service/NinjaService";
import {Observable} from "rxjs-compat";
import Ninja from "./repo/models/ninja";

export default class NinjaManager {
  _repo: NinjaRepository;
  _service: NinjaService;

  constructor() {
    this._repo = new NinjaRepository();
    this._service = new NinjaService();
  }

  getNinjas(): Observable<Ninja[]> {
    return this._service
      .getNinjas()
      .catch((ignored) => {
        this._repo.getNinjas()
      });
  }
}
