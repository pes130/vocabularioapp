import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TerminosService } from '../../services/terminos.service';
import { Termino } from '../../models/termino';
import { MessagesService } from '../../services/messages.services';

@Component({
    selector: 'termino-add',
    templateUrl: './termino-add.component.html',
    providers: [TerminosService]
})
export class TerminoAddComponent {
    titulo: string;
    termino_actual: Termino;

    constructor(
        private _terminosService:TerminosService,
        private _route:ActivatedRoute,
        private _messages_service: MessagesService,
        private _router:Router) 
    {
        this.titulo = 'Nuevo Término';
        this.termino_actual = new Termino(0, '', '' ,'', '', 0);
    }


    onSubmit(){
        console.log(this.termino_actual);
        this._terminosService.addTermino(this.termino_actual).subscribe(
            response=> {
                this._messages_service.success("Término añadido correctamente", true);
                this._router.navigateByUrl("/terminos");
            },
            error => {
                this._messages_service.success(error, true);
            }
        );
    }

}