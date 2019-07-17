import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protector de rutas restringidas ante usuarios no autenticados. 
 * Implementa la interfaz CanActivate que permite decidir si una ruta 
 * puede ser visitada por el usuario actual o no.
 */
/**
 * LO usas en app.module.ts donde defines las rutas.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth_service:AuthService,
        private router: Router
    ) {

    }

    canActivate(): boolean {
        let loggedIn = this._auth_service.isUserAuthenticated()
        if(loggedIn){
            return true;
        } else {
            console.log("No estás autenticado");
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}