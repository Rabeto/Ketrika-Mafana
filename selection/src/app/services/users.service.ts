import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/univ_fianar/selection';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * HTTP OPTIONS
   */
  httpOptions = {
    headers: new HttpHeaders({
      'content-type' : 'application/json',
      'X-CSRFToken': 'BU9BD3mwuYdZiuKfu2zOpaICGTt4HOrIkaWGAlQRWRxzViYhVpGw6cgyAtIlTXQ9'
    })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * FUNCTION HANDLER
   */
  private handleError(operation = 'operation', result:any){
    return (error: any) => {
      console.log(error);
      return of(result as ['']);
    };
  }

  /** Get user */
  allUsers(): Observable<any>{
    return this.http.get(endpoint + '/comptes/users/').pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError('List users', []))
    );
  }

  /** GET ONE user */
  getOneUser(id:string): Observable<any> {
    return this.http.get(`${endpoint}/comptes/${id}/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE user', []))
    );
  }

  /** Add new user */
  addUser(id_parcours: string, user: any): Observable<any> {
    return this.http.post(`${endpoint}/parcours/${id_parcours}/comptes/add`, JSON.stringify(user), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('POST user', []))
    );
  }

  /** Update an user */
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${endpoint}/comptes/${id}/update`, JSON.stringify(user), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('PUT user', []))
    );
  }

  /** Change password */
  changePassword(id: string, pass: any): Observable<any> {
    return this.http.put(`${endpoint}/comptes/${id}/change_pw`, JSON.stringify(pass), this.httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('CHANGE PASSWORD', []))
    );
  }

  /** Delete an user */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${endpoint}/comptes/${id}/delete`).pipe(
      map ((data) => {
        return data;
      }),
      catchError(this.handleError('DELETE user', []))
    );
  }

  authentification(n:string, p: string): Observable<any> {
    return this.http.get(`${endpoint}/auth/${n}/password/${p}/`).pipe(
      map((data) => {
        return data;
      }),
      catchError(this.handleError('GET ONE user', []))
    );
  }

  /** Set user information in session after login */
  addUserToSession(user: any) {
    sessionStorage.setItem('id', user.compteId);
    sessionStorage.setItem('username', user.compteUsername);
    sessionStorage.setItem('parcours', user.compteParcours);
    sessionStorage.setItem('role', user.compteRole);
  }

  /** Reset the user inforamtion in session after logout */
  removeUserSession(){
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('parcours');
    sessionStorage.removeItem('role');
  }

  /** Get the user information save in session */
  getUserSession(){
    const user = {
      id: sessionStorage.getItem('id'),
      username: sessionStorage.getItem('username'),
      parcours: sessionStorage.getItem('parcours'),
      role: sessionStorage.getItem('role')
    }
    return user;
  }
}
