import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service'

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  providers: [AlertService]
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  constructor(
    private _alert_service: AlertService
  ) { }

  ngOnInit() {
    console.log("Cargando componente de alertas");
    this.subscription = this._alert_service.getAlert()
            .subscribe(message => {
              console.log("Recibo algo de alert service");
              console.log(message);
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}