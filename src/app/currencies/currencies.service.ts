import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Currency} from "./currency";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  public constructor(public http: HttpClient) {}

  getAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(
      `${environment.url}/currency/fiat?max=${environment.maxResults}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    ).pipe(
      map(data => data),
      catchError(e => throwError(e))
    );
  }
}
