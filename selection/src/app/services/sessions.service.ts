import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  /**
     * HTTP OPTIONS
     */
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'X-CSRFToken': 'BU9BD3mwuYdZiuKfu2zOpaICGTt4HOrIkaWGAlQRWRxzViYhVpGw6cgyAtIlTXQ9'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * FUNCTION HANDLER
   */
  private handleError(operation = 'operation', result: any) {
    return (error: any) => {
      console.log(error);
      return of(result as ['']);
    };
  }

   /** GET ALL Sessions */
   allSessions(): Observable<any> {
    return this.http.get(`${endpoint}/sessions/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Sessions', []))
    )
  }

  /** GET ONE Sessions BY ID */
  getSessionById(id: string): Observable<any> {
    return this.http.get(`${endpoint}/sessions/${id}/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un Session', {}))
    );
  }

  /** GET ONE Sessions BY ID */
  closeSession(id: string): Observable<any> {
    return this.http.get(`${endpoint}/sessions/${id}/close`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un Session', {}))
    );
  }

  /** ADD NEW Sessions */
  addSessions(newS: any): Observable<any> {
    return this.http.post(`${endpoint}/sessions/add`, JSON.stringify(newS), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Add Sessions', []))
    );
  }

  /** UPDATE Sessions */
  updateSession(id: string, data: any): Observable<any> {
    return this.http.put(`${endpoint}/sessions/${id}/update`, JSON.stringify(data), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Update Sessions', []))
    );
  }

  /** DELETE Sessions */
  deleteSession(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/sessions/${id}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Delete Sessions', []))
    )
  }
}
