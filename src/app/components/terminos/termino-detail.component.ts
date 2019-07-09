import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TerminosService } from '../../services/terminos.service';
import { Termino } from '../../models/termino';

@Component({
    selector: 'termino-detail',
    templateUrl: './termino-detail.component.html',
    providers: [TerminosService]
})
export class TerminoDetailComponent implements OnInit {
    private termino_actual: Termino;

    constructor(
        private _terminosService:TerminosService,
        private _route:ActivatedRoute,
        private _router:Router) 
    {
        
    }

    ngOnInit(): void {
        this.getTermino();
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