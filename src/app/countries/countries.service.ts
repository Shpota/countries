import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Country} from "./country";
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  public constructor(public http: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.url}/country?max=100000`, {headers: this.headers}).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
