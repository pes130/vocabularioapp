import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private loading: boolean = false;
  private submitted: boolean = false;
  private user: User = new User();

  constructor(
    private _router: Router,
    private _auth_service: AuthService,
    private _alert_service: AlertService
  ) { }

  onSubmit(): void {
    console.log("Vamos a hacer login");
    this.loading = true;
    this.submitted = true;
    this._auth_service.login(this.user)
    .then((result) => {
      console.log(result);

      localStorage.setItem('user', this.user.username);
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
      localStorage.setItem('expires_voc', result.expires);
      // manda al usuario a alguna página (la home)
      this.submitted = false;
      this._router.navigateByUrl('/home');
      
    })
    .catch((err) => {
      this._alert_service.error("Problemas con la autenticación ...");
    });
  }

  logout(): void {
    this._auth_service.logout()
    .then((result)=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires_voc');
        this._router.navigateByUrl('/login');
    
    }).catch((err)=>{
      console.log(err);
    })
  }

}
