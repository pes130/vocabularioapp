import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { PopupService } from './services/popup.services';
import { Subscription } from 'rxjs';
import { Mensaje } from './models/mensaje';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PopupService]
})
export class AppComponent  implements OnInit {
  private title = 'Mi vocabulario';
  private isLoggedIn: boolean;
  private subscription: Subscription;
  message: Mensaje;

  constructor(
    private router: Router,
    private _auth_service: AuthService,
    private popup: Popup,
    private _pop_up_service: PopupService
  ) {
      this.popup.options = {
        header: "Info",
        color: "#007bff", // red, blue....
        widthProsentage: 40, // The with of the popou measured by browser width
        animationDuration: 0.5, // in seconds, 0 = no animation
        showButtons: true, // You can hide this in case you want to use custom buttons
        confirmBtnContent: "Ok", // The text on your confirm button
        //cancleBtnContent: "Cancel", // the text on your cancel button
        confirmBtnClass: "btn btn-default", // your class for styling the confirm button
        cancleBtnClass: "hidden", // you class for styling the cancel button
        animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
  }

  ngOnInit() {
    this._pop_up_service.getMessage().subscribe(message => {
      console.log("recibo un mensaje para el popup!!!");
      console.log(message);
      this.message = message;
      console.log(this.message);
      if(this.message!=undefined){
        console.log("Vamos a mostrarlo!!")
        this.popup.show();
      }
    })
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

  clickCerrarEnPopup() {
    this.popup.hide();
    this._pop_up_service.clear();
  }
}
