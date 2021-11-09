import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {
  /**
   * HTTP OPTIONS
   */
  httpOptions = {
    headers: new HttpHeaders({
      'content-type' : 'application/json',
      'X-CSRFToken': 'BU9BD3mwuYdZiuKfu2zOpaICGTt4HOrIkaWGAlQRWRxzViYhVpGw6cgyAtIlTXQ9'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * FUNCTION HANDLER
   */
   private handleError(operation = 'operation', result:any){
    return (error: any) => {
      console.log(error);
      return of(result as ['']);
    };
  }

  /** GET ALL PARCOURS */
  allParcours(): Observable<any> {
    return this.http.get(`${endpoint}/parcours/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Parcours', []))
    )
  }

  /** GET ONE PARCOURS BY ID */
  getParcourById(id: string): Observable<any> {
    return this.http.get(`${endpoint}/parcours/${id}/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un parcours', {}))
    );
  }

  /** ADD NEW PARCOURS */
  addParcours(newP: any): Observable<any> {
    return this.http.post(`${endpoint}/parcours/add`, JSON.stringify(newP), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Add Parcours', []))
    );
  }

  /** UPDATE PARCOURS */
  updateParcours(id: string, data: any): Observable<any> {
    return this.http.put(`${endpoint}/parcours/${id}/update`, JSON.stringify(data), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Update Parcours', []))
    );
  }

  /** DELETE PARCOURS */
  deleteParcours(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/parcours/${id}/delete`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Delete Parcours', []))
    )
  }
}
