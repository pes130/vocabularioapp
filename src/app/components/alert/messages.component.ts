import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.services';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'panel-mensajes',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: Mensaje;
  constructor(
    private _message_service: MessagesService
  ) { }

  ngOnInit() {
    this._message_service.getAlert().subscribe(message => {
      console.log("Uea, un mensjae");
      console.log(message);
      if(message!=undefined && message.type == 'success'){
        message.cssClass = 'alert alert-success alert-dismissible show';
      } else if (message!=undefined && message.type == 'error') {
        message.cssClass = 'alert alert-danger alert-dismissible show';
      }
      this.message = message;
    });
  }

  ngOnDestroy() {
    
  }

  limpiar() {
    this._message_service.clear();
  }

}
