import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookie: CookieService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.cookie.get("user-token");

    if (isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl('/home-guest')
    return false;
  }

}


//next.data - returns data included in the route