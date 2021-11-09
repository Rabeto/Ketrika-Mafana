import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';

@Injectable({
  providedIn: 'root'
})
export class DossiersService {

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

   /** GET ALL Dossiers */
   allDossiers(id_parcours: string, id_session: string): Observable<any> {
    return this.http.get(`${endpoint}/parcours/${id_parcours}/sessions/${id_session}/dossiers/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Dossiers', []))
    )
  }

  /**GET ALL DOSSIERS OF ALL PARCOURS */
  allDossiersAllParcours(id_session: string): Observable<any> {
    return this.http.get(`${endpoint}/sessions/${id_session}/dossiers/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Dossiers All parcours', []))
    )
  }

  /** GET ONE Dossiers BY ID */
  getDossierById(id: string): Observable<any> {
    return this.http.get(`${endpoint}/dossiers/${id}/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un Dossier', {}))
    );
  }

  /** ADD NEW Dossiers */
  addDossiers(id_parcours: string, id_session: string, newD: any): Observable<any> {
    return this.http.post(`${endpoint}/parcours/${id_parcours}/sessions/${id_session}/dossiers/add`, JSON.stringify(newD), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Add Dossier', []))
    );
  }

  /** UPDATE Dossiers */
  updateDossier(id: string, data: any): Observable<any> {
    return this.http.put(`${endpoint}/dossiers/${id}/update`, JSON.stringify(data), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Update Dossier', []))
    );
  }

  /** DELETE Dossiers */
  deleteDossier(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/dossiers/${id}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Delete dossier', []))
    )
  }
}
