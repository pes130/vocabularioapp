import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TerminosService } from '../../services/terminos.service';
import { Termino } from '../../models/termino';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'termino-add',
    templateUrl: './termino-add.component.html',
    providers: [TerminosService]
})
export class TerminoAddComponent {
    private titulo: string;
    private termino_actual: Termino;

    constructor(
        private _terminosService:TerminosService,
        private _route:ActivatedRoute,
        private alertService: AlertService,
        private _router:Router) 
    {
        this.titulo = 'Nuevo Término';
        this.termino_actual = new Termino(0, '', '' ,'', '', 0);
    }


    onSubmit(){
        console.log(this.termino_actual);
        this._terminosService.addTermino(this.termino_actual).subscribe(
            response=> {
                this.alertService.success("Término añadido correctamente", true);
                this._router.navigateByUrl("/terminos");
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}