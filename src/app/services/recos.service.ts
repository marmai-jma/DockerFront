import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RecoDto } from '../shared-data/reco-dto';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class RecosService {
  globals: Globals;
  url: string;

  constructor(private http: HttpClient,
              globals: Globals, ) {this.globals = globals; }


  //
  getRecos(): Observable<RecoDto[]> {
    this.url = this.globals.BACKEND_URL;
    return this.http.get(`${this.url}/recommendations`)
      .pipe(
        map((jsonRecos: any[]) => jsonRecos.map(jsonReco => new RecoDto(jsonReco)))
      );
  }

}
