import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TerminosService } from '../../services/terminos.service';
import { Termino } from '../../models/termino';

@Component({
    selector: 'termino-edit',
    templateUrl: './termino-edit.component.html',
    providers: [TerminosService]
})
export class TerminoEditComponent implements OnInit {
    termino_actual: Termino;

    constructor(
        private _terminosService:TerminosService,
        private _route:ActivatedRoute,
        private _router:Router) 
    {
        this.termino_actual = new Termino(0, '', '' ,'', '', 0);
    }

    ngOnInit() {
        this.getTermino();
    }

    onSubmit(){
        let id = this._route.snapshot.paramMap.get("id");
        this._terminosService.updateTermino(id, this.termino_actual).subscribe(
            response=> {
              console.log(response);
                //this.alertService.success("Término actualizado correctamente", true);
                this._router.navigateByUrl("/termino/"+id);
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    getTermino(){
        let id = this._route.snapshot.paramMap.get("id");
        this._terminosService.getTermino(id).subscribe(
            response=> {
              console.log(response);
                this.termino_actual = response;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}