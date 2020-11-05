import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpParams,HttpHeaders, HttpEvent, HttpRequest} from "@angular/common/http";
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityData(city){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=094aa776d64c50d5b9e9043edd4ffd00',{responseType: 'json'}).pipe(catchError(this.handleError));

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
