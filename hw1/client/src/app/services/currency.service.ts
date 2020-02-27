import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiURL: string;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      Accept: "text/plain",
      "Content-Type": "text/plain"
    }),
    responseType: "text" as "json"
  };

  getCurrencyIP(): Observable<any> {
    let params = new HttpParams();
    params = params.append('ip', '127.0.0.1');

    return this.http.get<any>('http://localhost:4300/currency', {params: params})
    .pipe(
      retry(1),
    )
  }

  getCurrencyCountry(country): Observable<any> {
    let params = new HttpParams();
    params = params.append('country', country);

    return this.http.get<any>('http://localhost:4300/currency', {params: params})
    .pipe(
      retry(1),
    )
  }

  getResult(baseCurrency, toCurrency, amount): Observable<any> {
    let params = new HttpParams();
    params = params.append('from', baseCurrency);
    params = params.append('to', toCurrency);
    params = params.append('amount', amount);

    return this.http.get<any>('http://localhost:4300/result', {params: params})
    .pipe(
      retry(1),
    )
  }

  getCurrencies(): Observable<any> {
    return this.http.get<any>('http://localhost:4300/currencies')
    .pipe(
      retry(1),
    )
  }

  getMetrics(): Observable<any> {
    return this.http.get<any>('http://localhost:4300/metrics', this.httpOptions)
    .pipe(
      retry(1),
    )
  }
}
