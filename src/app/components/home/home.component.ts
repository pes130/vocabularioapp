import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {
  currentUser: string;
  private titulo:string;;

  constructor() { 
    this.currentUser = localStorage.getItem('user');
    this.titulo = "Home";
  }



}
