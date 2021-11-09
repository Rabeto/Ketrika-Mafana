import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';

@Injectable({
  providedIn: 'root'
})
export class RelevesService {

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

  /** GET ONE RN OF A DOSSIER */
  getRNDossier(id: string): Observable<any> {
    return this.http.get(`${endpoint}/dossiers/${id}/releves`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un Dossier', {}))
    );
  }

  /** ADD RN TO A DOSSIER */
  addRNDossier(id: string, newD: any): Observable<any> {
    return this.http.post(`${endpoint}/dossiers/${id}/releves/add`, JSON.stringify(newD), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Add RN', []))
    );
  }

  /** UPDATE Dossiers */
  updateRNDossier(id: string, data: any): Observable<any> {
    return this.http.put(`${endpoint}/dossiers/${id}/releves/update`, JSON.stringify(data), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Update Dossier', []))
    );
  }
}
