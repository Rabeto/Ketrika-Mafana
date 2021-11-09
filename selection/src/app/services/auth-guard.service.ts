import { UsersService } from '../services/users.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  session: any;
  constructor(private auth: UsersService,
              private router: Router) {
                this.session = this.auth.getUserSession();
               }
  /** declation de fonction canActivate */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.session.username != null && this.session.role == "USER"){
      return true;
    } else {
      this.router.navigate(['/univFianar/selection/login']);
      return false;
    }
  }
}
