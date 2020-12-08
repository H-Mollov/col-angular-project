import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateGuard implements CanActivate {
  constructor(
    private router: Router,
    private user: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.user.authenticateUser();

    const isAuthenticated = this.user.isLogged;
    if (isAuthenticated) {
      return true;
    }
    
    return false;
  }

}


//next.data - returns data included in the route