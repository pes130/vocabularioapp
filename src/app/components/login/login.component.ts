import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../services/messages.services';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading: boolean = false;
  submitted: boolean = false;
  user: User = new User();

  constructor(
    private _router: Router,
    private _auth_service: AuthService,
    private _alert_service: MessagesService
  ) { }

  onSubmit(): void {
    this.loading = true;
    this.submitted = true;
    this._auth_service.login(this.user)
    .then((result) => {

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
      this.loading = false;
      this.submitted = false;
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
