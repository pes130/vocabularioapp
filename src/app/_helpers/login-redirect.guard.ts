import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginRedirectGuard implements CanActivate {
  constructor(private _auth_service: AuthService, private router: Router) {}
  canActivate(): boolean {
    // Si estás autenticado, te mando a home
    if (this._auth_service.isUserAuthenticated()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    else {
      return true;
    }
  }
}