import NinjaRepository from "./repo/NinjaRepository";
import NinjaService from "./service/NinjaService";
import {Observable} from "rxjs";
import Ninja from "./repo/models/ninja";
import {catchError} from "rxjs/operators";

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
      .pipe(catchError((ignored) =>
        this._repo.getNinjas()
      ))
  }
}
