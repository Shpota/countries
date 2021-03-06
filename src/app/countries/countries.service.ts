import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Country} from "./model";
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  public constructor(public http: HttpClient) {}

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${environment.url}/country?max=${environment.maxResults}`,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    ).pipe(
      map(data => data),
      catchError(e => throwError(e))
    );
  }
}
