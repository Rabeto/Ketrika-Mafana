import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  /**
     * HTTP OPTIONS
     */
   httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'X-CSRFToken': 'BU9BD3mwuYdZiuKfu2zOpaICGTt4HOrIkaWGAlQRWRxzViYhVpGw6cgyAtIlTXQ9'
    })
  };

  id_parcours: string | null;

  constructor(
    private http: HttpClient
  ) {
    this.id_parcours = sessionStorage.getItem('parcours');
  }

  /**
   * FUNCTION HANDLER
   */
  private handleError(operation = 'operation', result: any) {
    return (error: any) => {
      console.log(error);
      return of(result as ['']);
    };
  }

   /** GET ALL Matieres */
   allMatieres(): Observable<any> {
    return this.http.get(`${endpoint}/parcours/${this.id_parcours}/matieres/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Matieres', []))
    )
  }

  /** GET ALL Matieres */
  allMatieresP(id_parcours: string): Observable<any> {
    return this.http.get(`${endpoint}/parcours/${id_parcours}/matieres/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Matieres', []))
    )
  }

  /** GET ONE Matieres BY ID */
  getMatiereById(id: string): Observable<any> {
    return this.http.get(`${endpoint}/matieres/${id}/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un Matiere', {}))
    );
  }

  /** ADD NEW Matieres */
  addMatieres(id_parcours: string, newM: any): Observable<any> {
    return this.http.post(`${endpoint}/parcours/${id_parcours}/matieres/add`, JSON.stringify(newM), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Add Matiere', []))
    );
  }

  /** UPDATE Matieres */
  updateMatiere(id: string, data: any): Observable<any> {
    return this.http.put(`${endpoint}/matieres/${id}/update`, JSON.stringify(data), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Update Matiere', []))
    );
  }

  /** DELETE Matieres */
  deleteMatiere(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/matieres/${id}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Delete Matiere', []))
    )
  }
}
