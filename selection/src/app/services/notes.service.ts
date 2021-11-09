import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

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

   /** GET ALL NOTES OF A RN */
   allNoteOfRN(id_rn: string): Observable<any> {
    return this.http.get(`${endpoint}/releves/${id_rn}/notes/`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List Notes', []))
    )
  }

  /** GET ONE NOTE */
  getNote(id_rn: string, id_matiere: string): Observable<any> {
    return this.http.get(`${endpoint}/releves/${id_rn}/matieres/${id_matiere}/notes`).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Un Note', {}))
    );
  }

  /** ADD NEW Dossiers */
  addNoteToRN(id_rn: string, id_matiere: string, newN: any): Observable<any> {
    return this.http.post(`${endpoint}/releves/${id_rn}/matieres/${id_matiere}/notes/add`, JSON.stringify(newN), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Add Note', []))
    );
  }

  /** UPDATE Dossiers */
  updateNote(id: string, data: any): Observable<any> {
    return this.http.put(`${endpoint}/notes/${id}/update`, JSON.stringify(data), this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('Update Note', []))
    );
  }
}
