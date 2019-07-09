import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

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
        private router: Router,
        private _alert_service: AlertService
    ) {

    }

    canActivate(): boolean {
        let loggedIn = this._auth_service.isUserAuthenticated()
        if(loggedIn){
            return true;
        } else {
            console.log("No estás autenticado");
            //this._alert_service.success("No estás autenticado", true);
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}