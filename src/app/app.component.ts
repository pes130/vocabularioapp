import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AlertService]
})
export class AppComponent {
  private title = 'Mi vocabulario';
  private isLoggedIn: boolean;

  constructor(
    private router: Router,
    private _auth_service: AuthService,
    private _alert_service: AlertService
  ) {

  }

  check_user_logged_in() {
    return this._auth_service.isUserAuthenticated();
  }

  logout(): void {
    this._auth_service.logout().then((result)=> {

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires_voc');
        this.router.navigateByUrl('/login');
        //this._alert_service.success("Sesión cerrada");
     
    }).catch((err)=>{
      console.log(err);
    })
  }


}
