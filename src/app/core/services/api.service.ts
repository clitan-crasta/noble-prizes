import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Class - ApiService
 */

@Injectable({ providedIn: 'root' })
export class ApiService {
  /**
   * Class Var: Base_URL
   */
  Base_URL = 'https://api.nobelprize.org/2.1/';

  /**
   * Class constructor
   * @param __http HttpClient
   */
  constructor(protected __http: HttpClient) {}

  /**
   * getAll
   *
   * @param serviceName string
   * @returns Observable
   */
  getAll(endpoint: string, params?: any): Observable<any> {
    const options = { params: this.simpleHttpParams(params) };
    return this.__http
      .get(`${this.Base_URL}/${endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * getAllByParams
   * Simple wrapper that accepts a plain params object and forwards it to `getAll`.
   */
  getAllByParams(
    endpoint: string,
    params?: Record<string, any>
  ): Observable<any> {
    return this.getAll(endpoint, params as any);
  }

  /**
   * getAll
   *
   * @param serviceName string
   * @returns Observable
   */
  getOneById(endpoint: string, id: string, params?: any): Observable<any> {
    const options = { params: new HttpParams({ fromObject: params }) };
    return this.__http
      .get(`${this.Base_URL}/${endpoint}/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  private simpleHttpParams(params?: any): HttpParams {
    if (!params) return new HttpParams();
    if (params instanceof HttpParams) return params;

    const search = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, val]) => {
      if (val === undefined || val === null) return;
      if (Array.isArray(val)) {
        val.forEach((v) => search.append(key, String(v)));
      } else {
        search.set(key, String(val));
      }
    });

    return new HttpParams({ fromString: search.toString() });
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    let errorMsg = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client error: ${error.error.message}`;
    } else {
      errorMsg = `Server error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
