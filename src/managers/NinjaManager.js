import NinjaRepository from "./repo/NinjaRepository";
import NinjaService from "./service/NinjaService";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
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
      .pipe(catchError((ignored) =>
        this._repo.getNinjas()
      ))
  }

  getDbNinjas(): Observable<Ninja[]> {
    return this._repo.getNinjas();
  }

  saveNinja(ninja): Observable<void> {
    return this._repo
      .saveNinja(ninja)
  }
}
